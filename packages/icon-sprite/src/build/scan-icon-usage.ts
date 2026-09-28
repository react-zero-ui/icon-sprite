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
  /** Static custom names support diagnostics; asset collection still includes every custom SVG. */
  customIcons: string[]
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

function staticIconName(opening: NodePath<JSXOpeningElement>): string | undefined {
  let value: string | undefined
  for (const attribute of opening.get("attributes")) {
    // Spreads can override earlier names. A later explicit name establishes a new
    // static value, and Babel evaluation accepts constants only when it is confident.
    if (attribute.isJSXSpreadAttribute()) {
      value = undefined
    }
    if (
      !attribute.isJSXAttribute() ||
      attribute.node.name.type !== "JSXIdentifier" ||
      attribute.node.name.name !== "name"
    ) {
      continue
    }
    const expression = attribute.get("value")
    if (expression.isStringLiteral()) {
      value = expression.node.value
    } else if (expression.isJSXExpressionContainer()) {
      const result = expression.get("expression").evaluate()
      value = result.confident && typeof result.value === "string" ? result.value : undefined
    } else {
      value = undefined
    }
  }
  return value
}

class IconUsageScanner {
  private readonly customIcons = new Set<string>()
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
      customIcons: [...this.customIcons].sort(),
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
    const value = staticIconName(opening)
    if (value !== undefined) {
      const target = name === "CustomIcon" ? this.customIcons : this.icons
      target.add(value)
      return
    }
    if (name === "Icon") {
      throw new Error(
        `${location}: Unable to statically evaluate <Icon name={...}>. Use a string literal or a statically evaluable constant.`
      )
    }
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
    if (!opening?.isJSXOpeningElement() || opening.node.name !== reference.node) {
      return
    }
    const location = this.location(file, opening.node.loc?.start.line)
    this.recordPresentationWarnings(name, opening, location)
    if (genericIcons.has(name)) {
      this.recordGenericName(name, opening, location)
    }
  }

  private recordNamespaceReference(file: string, reference: NodePath): void {
    const member = reference.parentPath
    let name: string | undefined
    if (member?.isMemberExpression() && member.node.object === reference.node) {
      const property = member.node.property
      if (member.node.computed && property.type === "StringLiteral") {
        name = property.value
      } else if (!member.node.computed && property.type === "Identifier") {
        name = property.name
      }
    } else if (member?.isJSXMemberExpression() && member.node.object === reference.node) {
      name = member.node.property.name
    } else {
      return
    }

    if (name !== undefined) {
      this.recordUsage(file, name, member)
      return
    }
    this.warnings.push(
      `${this.location(file, member.node.loc?.start.line)}: Dynamic icon namespace access cannot be scanned; use named imports or static member names.`
    )
  }

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Named and namespace imports share one binding lookup and reference policy; splitting this creates shallow dispatch helpers around the same Babel mechanism.
  private recordImport(file: string, importPath: NodePath<ImportDeclaration>): void {
    if (
      importPath.node.source.value !== this.options.importName ||
      importPath.node.importKind === "type"
    ) {
      return
    }

    for (const specifier of importPath.get("specifiers")) {
      if (specifier.isImportSpecifier() && specifier.node.importKind === "type") {
        continue
      }
      if (!(specifier.isImportSpecifier() || specifier.isImportNamespaceSpecifier())) {
        continue
      }

      // Babel bindings preserve import identity through aliases and shadowing, and
      // include references that appear before the import declaration in source order.
      const binding = importPath.scope.getBinding(specifier.node.local.name)
      if (!binding) {
        continue
      }
      const references = binding.referencePaths.filter(isRuntimeReference)
      if (specifier.isImportSpecifier()) {
        const imported = specifier.node.imported
        const name = imported.type === "Identifier" ? imported.name : imported.value
        for (const reference of references) {
          this.recordUsage(file, name, reference)
        }
      } else {
        for (const reference of references) {
          this.recordNamespaceReference(file, reference)
        }
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
 */
export function scanIconUsage(options: IconScanOptions): IconUsage {
  return new IconUsageScanner(options).scan()
}
