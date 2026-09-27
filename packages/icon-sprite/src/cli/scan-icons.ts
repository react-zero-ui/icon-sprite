import fs from "node:fs"
import path from "node:path"
import { type ParserPlugin, parse } from "@babel/parser"
import traverse, { type NodePath } from "@babel/traverse"
import type { ImportDeclaration, JSXOpeningElement } from "@babel/types"
import type { ZeroUIConfig } from "../config.js"

const sourceFilePattern = /\.[jt]sx?$/
const genericIcons = new Set(["Icon", "CustomIcon"])
const riskyProps = new Set([
  "stroke",
  "fill",
  "color",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeMiterlimit",
  "strokeOpacity",
  "fillOpacity",
  "fillRule",
  "opacity",
  "transform",
  "vectorEffect",
])

interface ScanState {
  customIcons: Set<string>
  excluded: Set<string>
  icons: Set<string>
  ignored: Set<string>
  importName: string
  projectDir: string
  visited: Set<string>
  warnings: string[]
}

function isRuntimeReference(reference: NodePath): boolean {
  return !reference.findParent(
    (parent) =>
      parent.isTSType() ||
      ((parent.isExportSpecifier() || parent.isExportNamedDeclaration()) &&
        parent.node.exportKind === "type")
  )
}

function staticName(opening: NodePath<JSXOpeningElement>): string | undefined {
  let value: string | undefined
  for (const attribute of opening.get("attributes")) {
    // A later spread can override an earlier name.
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

function parserPlugins(file: string): ParserPlugin[] {
  if (file.endsWith(".tsx")) {
    return ["typescript", "jsx"]
  }
  if (file.endsWith(".ts")) {
    return ["typescript"]
  }
  return ["jsx"]
}

function sourceLocation(state: ScanState, file: string, line: number | undefined): string {
  return `${path.relative(state.projectDir, file)}:${line ?? "?"}`
}

function iconOpeningElement(reference: NodePath): NodePath<JSXOpeningElement> | undefined {
  const opening = reference.parentPath
  if (!opening?.isJSXOpeningElement() || opening.node.name !== reference.node) {
    return undefined
  }
  return opening
}

function recordRiskyProps(
  state: ScanState,
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
      state.warnings.push(
        `${location}: <${name}> prop "${prop}" may differ in production sprite mode. Use className/style with currentColor for colors.`
      )
    }
  }
}

function recordGenericName(
  state: ScanState,
  name: string,
  opening: NodePath<JSXOpeningElement>,
  location: string
): void {
  const value = staticName(opening)
  if (value !== undefined) {
    const target = name === "CustomIcon" ? state.customIcons : state.icons
    target.add(value)
    return
  }
  if (name === "Icon") {
    throw new Error(
      `${location}: Unable to statically evaluate <Icon name={...}>. Use a string literal or a statically evaluable constant.`
    )
  }
}

function recordUsage(state: ScanState, file: string, name: string, reference: NodePath): void {
  if (name !== "CustomIcon" && state.ignored.has(name)) {
    return
  }
  if (!genericIcons.has(name)) {
    state.icons.add(name)
  }
  const opening = iconOpeningElement(reference)
  if (!opening) {
    return
  }
  const location = sourceLocation(state, file, opening.node.loc?.start.line)
  recordRiskyProps(state, name, opening, location)
  if (genericIcons.has(name)) {
    recordGenericName(state, name, opening, location)
  }
}

function namespaceMember(reference: NodePath): NodePath | undefined {
  const member = reference.parentPath
  if (member?.isMemberExpression() && member.node.object === reference.node) {
    return member
  }
  if (member?.isJSXMemberExpression() && member.node.object === reference.node) {
    return member
  }
  return undefined
}

function namespaceMemberName(member: NodePath): string | undefined {
  if (member.isMemberExpression()) {
    const property = member.node.property
    if (member.node.computed) {
      return property.type === "StringLiteral" ? property.value : undefined
    }
    return property.type === "Identifier" ? property.name : undefined
  }
  if (member.isJSXMemberExpression()) {
    return member.node.property.name
  }
  return undefined
}

function recordNamespaceUsage(state: ScanState, file: string, reference: NodePath): void {
  const member = namespaceMember(reference)
  if (!member) {
    return
  }
  const name = namespaceMemberName(member)
  if (name !== undefined) {
    recordUsage(state, file, name, member)
    return
  }
  const location = sourceLocation(state, file, member.node.loc?.start.line)
  state.warnings.push(
    `${location}: Dynamic icon namespace access cannot be scanned; use named imports or static member names.`
  )
}

function recordSpecifierUsage(
  state: ScanState,
  file: string,
  importPath: NodePath<ImportDeclaration>,
  specifier: NodePath
): void {
  if (specifier.isImportSpecifier() && specifier.node.importKind === "type") {
    return
  }
  if (!(specifier.isImportSpecifier() || specifier.isImportNamespaceSpecifier())) {
    return
  }
  const binding = importPath.scope.getBinding(specifier.node.local.name)
  if (!binding) {
    return
  }
  const references = binding.referencePaths.filter(isRuntimeReference)
  if (specifier.isImportSpecifier()) {
    const imported = specifier.node.imported
    const name = imported.type === "Identifier" ? imported.name : imported.value
    for (const reference of references) {
      recordUsage(state, file, name, reference)
    }
    return
  }
  for (const reference of references) {
    recordNamespaceUsage(state, file, reference)
  }
}

function recordImportUsages(
  state: ScanState,
  file: string,
  importPath: NodePath<ImportDeclaration>
): void {
  if (importPath.node.source.value !== state.importName || importPath.node.importKind === "type") {
    return
  }
  for (const specifier of importPath.get("specifiers")) {
    recordSpecifierUsage(state, file, importPath, specifier)
  }
}

function scanFile(state: ScanState, file: string): void {
  let ast: ReturnType<typeof parse>
  try {
    ast = parse(fs.readFileSync(file, "utf8"), {
      sourceFilename: file,
      sourceType: "unambiguous",
      plugins: parserPlugins(file),
    })
  } catch (error) {
    throw new Error(
      `Unable to parse ${file}: ${error instanceof Error ? error.message : String(error)}`,
      {
        cause: error,
      }
    )
  }

  traverse(ast, {
    ImportDeclaration(importPath) {
      recordImportUsages(state, file, importPath)
    },
  })
}

function scanDirectory(state: ScanState, directory: string): void {
  const realDirectory = fs.realpathSync(directory)
  if (state.visited.has(realDirectory)) {
    return
  }
  state.visited.add(realDirectory)
  const entries = fs.readdirSync(directory, { withFileTypes: true })
  entries.sort((left, right) => left.name.localeCompare(right.name))
  for (const entry of entries) {
    const file = path.join(directory, entry.name)
    const info = entry.isSymbolicLink() ? fs.statSync(file) : entry
    if (info.isDirectory()) {
      if (!state.excluded.has(entry.name)) {
        scanDirectory(state, file)
      }
    } else if (info.isFile() && sourceFilePattern.test(entry.name)) {
      scanFile(state, file)
    }
  }
}

/**
 * Scan runtime references in .js/.jsx/.ts/.tsx without executing consumer code
 * or loading its Babel config. Exclusions are directory basenames; linked
 * directories are visited once. Dynamic CustomIcon names work because every
 * custom SVG is bundled.
 */
export function scanIcons(projectDir: string, config: Required<ZeroUIConfig>) {
  const state: ScanState = {
    customIcons: new Set<string>(),
    excluded: new Set(config.EXCLUDE_DIRS),
    icons: new Set<string>(),
    ignored: new Set(config.IGNORE_ICONS),
    importName: config.IMPORT_NAME,
    projectDir,
    visited: new Set<string>(),
    warnings: [],
  }
  scanDirectory(state, path.resolve(projectDir, config.ROOT_DIR))
  return {
    icons: [...state.icons].sort(),
    customIcons: [...state.customIcons].sort(),
    warnings: state.warnings,
  }
}
