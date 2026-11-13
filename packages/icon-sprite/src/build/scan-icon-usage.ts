import fs from "node:fs"
import path from "node:path"
import { type ParserPlugin, parse } from "@babel/parser"
import traverse, { type NodePath } from "@babel/traverse"
import type { ImportDeclaration, JSXOpeningElement } from "@babel/types"
import { RISKY_SPRITE_PRESENTATION_PROPS } from "../sprite-contract.js"

const sourceFilePattern = /\.[jt]sx?$/
const genericIcons = new Set(["Icon", "CustomIcon"])
const riskyProps: ReadonlySet<string> = new Set(RISKY_SPRITE_PRESENTATION_PROPS)

/** Discovery results use imported public names, independent of local JSX aliases. */
export interface IconUsage {
  /** Root-relative public SVG paths read from inline string literals. */
  customSources: string[]
  icons: string[]
  warnings: string[]
}

/** Resolved inputs supplied by project resolution; the scanner never loads user configuration. */
export interface IconScanOptions {
  excludeDirectories: readonly string[]
  ignoreIcons: readonly string[]
  importName: string
  /** Absolute root used to display diagnostic locations. */
  projectDirectory: string
  /** Absolute root of the single source tree to discover. */
  sourceDirectory: string
}

function parserPlugins(file: string): ParserPlugin[] {
  if (file.endsWith(".tsx")) {
    return ["typescript", "jsx"]
  }
  if (file.endsWith(".ts")) {
    return ["typescript"]
  }
  return ["jsx"]
}

function isRuntimeReference(reference: NodePath): boolean {
  return !reference.findParent(
    (parent) =>
      parent.isTSType() ||
      ((parent.isExportSpecifier() || parent.isExportNamedDeclaration()) &&
        parent.node.exportKind === "type")
  )
}

function staticStringAttribute(
  opening: NodePath<JSXOpeningElement>,
  property: "name" | "src"
): string | undefined {
  let value: string | undefined
  for (const attribute of opening.get("attributes")) {
    // Spreads can override earlier attributes; later explicit values take precedence.
    if (attribute.isJSXSpreadAttribute()) {
      value = undefined
    }
    if (
      !attribute.isJSXAttribute() ||
      attribute.node.name.type !== "JSXIdentifier" ||
      attribute.node.name.name !== property
    ) {
      continue
    }
    const attributeValue = attribute.get("value")
    const expression = attributeValue.isJSXExpressionContainer()
      ? attributeValue.get("expression")
      : attributeValue
    if (expression.isStringLiteral()) {
      value = expression.node.value
    } else if (property === "name" && attributeValue.isJSXExpressionContainer()) {
      // Preserve legacy generic Icon names; CustomIcon src is always an inline literal.
      const result = attributeValue.get("expression").evaluate()
      value = result.confident && typeof result.value === "string" ? result.value : undefined
    } else {
      value = undefined
    }
  }
  return value
}

function validateCustomSrc(src: string, location: string): void {
  const segments = src.slice(1).split("/")
  if (
    !src.startsWith("/") ||
    src.startsWith("//") ||
    !src.endsWith(".svg") ||
    src.includes("\\") ||
    src.includes("?") ||
    src.includes("#") ||
    src.includes("%") ||
    [...src].some((character) => character.charCodeAt(0) < 32) ||
    segments.some((segment) => !segment || segment === "." || segment === "..")
  ) {
    throw new Error(
      `${location}: <CustomIcon src> must be a root-relative .svg URL under public/ (for example, "/brand/logo.svg").`
    )
  }
}

class IconUsageScanner {
  private readonly customSources = new Set<string>()
  private readonly excluded: ReadonlySet<string>
  private readonly icons = new Set<string>()
  private readonly ignored: ReadonlySet<string>
  private readonly options: IconScanOptions
  private readonly visited = new Set<string>()
  private readonly warnings: string[] = []

  constructor(options: IconScanOptions) {
    this.options = options
    this.excluded = new Set(options.excludeDirectories)
    this.ignored = new Set(options.ignoreIcons)
  }

  scan(): IconUsage {
    this.scanDirectory(this.options.sourceDirectory)
    return {
      customSources: [...this.customSources].sort(),
      icons: [...this.icons].sort(),
      warnings: this.warnings,
    }
  }

  private location(file: string, line: number | undefined): string {
    return `${path.relative(this.options.projectDirectory, file)}:${line ?? "?"}`
  }

  private recordGenericName(
    name: string,
    opening: NodePath<JSXOpeningElement>,
    location: string
  ): void {
    const property = name === "CustomIcon" ? "src" : "name"
    const value = staticStringAttribute(opening, property)
    if (value !== undefined) {
      if (name === "CustomIcon") {
        validateCustomSrc(value, location)
        this.customSources.add(value)
      } else {
        this.icons.add(value)
      }
      return
    }
    if (name === "CustomIcon") {
      throw new Error(
        `${location}: <CustomIcon src> requires an inline string literal, such as src="/brand/logo.svg". Place src after JSX spreads.`
      )
    }
    throw new Error(
      `${location}: Unable to statically evaluate <${name} ${property}={...}>. Use a string literal or a statically evaluable constant.`
    )
  }

  private recordPresentationWarnings(
    name: string,
    opening: NodePath<JSXOpeningElement>,
    location: string
  ): void {
    for (const attribute of opening.get("attributes")) {
      if (!attribute.isJSXAttribute() || attribute.node.name.type !== "JSXIdentifier") {
        continue
      }
      const prop = attribute.node.name.name
      if (riskyProps.has(prop)) {
        this.warnings.push(
          `${location}: <${name}> prop "${prop}" may differ in production sprite mode. Use className/style with currentColor for colors.`
        )
      }
    }
  }

  private recordUsage(file: string, name: string, reference: NodePath): void {
    if (name !== "CustomIcon" && this.ignored.has(name)) {
      return
    }
    if (!genericIcons.has(name)) {
      this.icons.add(name)
    }
    const opening = reference.parentPath
    if (opening?.isJSXClosingElement()) {
      return
    }
    if (!opening?.isJSXOpeningElement() || opening.node.name !== reference.node) {
      if (name === "CustomIcon") {
        throw new Error(
          `${this.location(file, reference.node.loc?.start.line)}: CustomIcon must be used in JSX with an inline string literal src so zero-icons can include its SVG.`
        )
      }
      return
    }
    const location = this.location(file, opening.node.loc?.start.line)
    this.recordPresentationWarnings(name, opening, location)
    if (genericIcons.has(name)) {
      this.recordGenericName(name, opening, location)
    }
  }

  private recordImport(file: string, importPath: NodePath<ImportDeclaration>): void {
    if (
      importPath.node.source.value !== this.options.importName ||
      importPath.node.importKind === "type"
    ) {
      return
    }

    for (const specifier of importPath.get("specifiers")) {
      // Reject the declaration even when unused; later namespace/destructuring
      // usage would otherwise disappear silently from the production sprite.
      if (specifier.isImportNamespaceSpecifier()) {
        throw new Error(
          `${this.location(file, importPath.node.loc?.start.line)}: Namespace icon imports are unsupported. Use named imports from "${this.options.importName}".`
        )
      }
      if (!specifier.isImportSpecifier() || specifier.node.importKind === "type") {
        continue
      }

      // Babel bindings preserve import identity through aliases and shadowing, and
      // include references that appear before the import declaration in source order.
      const binding = importPath.scope.getBinding(specifier.node.local.name)
      if (!binding) {
        continue
      }
      const references = binding.referencePaths.filter(isRuntimeReference)
      const imported = specifier.node.imported
      const name = imported.type === "Identifier" ? imported.name : imported.value
      for (const reference of references) {
        this.recordUsage(file, name, reference)
      }
    }
  }

  private scanFile(file: string): void {
    let ast: ReturnType<typeof parse>
    try {
      ast = parse(fs.readFileSync(file, "utf8"), {
        sourceFilename: file,
        sourceType: "unambiguous",
        plugins: parserPlugins(file),
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown parser error"
      throw new Error(`Unable to parse ${file}: ${message}`, { cause: error })
    }

    traverse(ast, {
      ImportDeclaration: (importPath) => {
        this.recordImport(file, importPath)
      },
    })
  }

  private scanDirectory(directory: string): void {
    const realDirectory = fs.realpathSync(directory)
    if (this.visited.has(realDirectory)) {
      return
    }
    this.visited.add(realDirectory)
    const entries = fs.readdirSync(directory, { withFileTypes: true })
    entries.sort((left, right) => left.name.localeCompare(right.name))
    for (const entry of entries) {
      const file = path.join(directory, entry.name)
      const info = entry.isSymbolicLink() ? fs.statSync(file) : entry
      if (info.isDirectory()) {
        if (!this.excluded.has(entry.name)) {
          this.scanDirectory(file)
        }
      } else if (info.isFile() && sourceFilePattern.test(entry.name)) {
        this.scanFile(file)
      }
    }
  }
}

/**
 * Scan one source tree for runtime icon usage without executing application code
 * or loading its Babel configuration. Exclusions match directory basenames,
 * linked directories are visited once by real path, and results are sorted.
 * Namespace imports fail before sprite output; type-only imports are ignored.
 */
export function scanIconUsage(options: IconScanOptions): IconUsage {
  return new IconUsageScanner(options).scan()
}
