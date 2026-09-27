import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import traverse, { type NodePath } from "@babel/traverse";
import type { JSXOpeningElement } from "@babel/types";
import type { ZeroUIConfig } from "../config.js";

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
]);

function isRuntimeReference(reference: NodePath): boolean {
  return !reference.findParent(
    (parent) =>
      parent.isTSType() ||
      ((parent.isExportSpecifier() || parent.isExportNamedDeclaration()) && parent.node.exportKind === "type"),
  );
}

function staticName(opening: NodePath<JSXOpeningElement>): string | undefined {
  let value: string | undefined;
  for (const attribute of opening.get("attributes")) {
    // A later spread can override an earlier name.
    if (attribute.isJSXSpreadAttribute()) value = undefined;
    if (
      !attribute.isJSXAttribute() ||
      attribute.node.name.type !== "JSXIdentifier" ||
      attribute.node.name.name !== "name"
    )
      continue;
    const expression = attribute.get("value");
    if (expression.isStringLiteral()) {
      value = expression.node.value;
    } else if (expression.isJSXExpressionContainer()) {
      const result = expression.get("expression").evaluate();
      value = result.confident && typeof result.value === "string" ? result.value : undefined;
    } else {
      value = undefined;
    }
  }
  return value;
}

/**
 * Scan runtime references in .js/.jsx/.ts/.tsx without executing consumer code
 * or loading its Babel config. Exclusions are directory basenames; linked
 * directories are visited once. Dynamic CustomIcon names work because every
 * custom SVG is bundled.
 */
export function scanIcons(projectDir: string, config: Required<ZeroUIConfig>) {
  const icons = new Set<string>();
  const customIcons = new Set<string>();
  const warnings: string[] = [];
  const ignored = new Set(config.IGNORE_ICONS);
  const excluded = new Set(config.EXCLUDE_DIRS);
  const visited = new Set<string>();

  function scanFile(file: string): void {
    let ast: ReturnType<typeof parse>;
    try {
      ast = parse(fs.readFileSync(file, "utf8"), {
        sourceFilename: file,
        sourceType: "unambiguous",
        plugins: file.endsWith(".ts") ? ["typescript"] : file.endsWith(".tsx") ? ["typescript", "jsx"] : ["jsx"],
      });
    } catch (error) {
      throw new Error(`Unable to parse ${file}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }

    function recordUsage(name: string, reference: NodePath): void {
      if (name !== "CustomIcon" && ignored.has(name)) return;
      if (name !== "Icon" && name !== "CustomIcon") icons.add(name);
      const opening = reference.parentPath;
      if (!opening?.isJSXOpeningElement() || opening.node.name !== reference.node) return;
      const location = `${path.relative(projectDir, file)}:${opening.node.loc?.start.line ?? "?"}`;
      for (const attribute of opening.get("attributes")) {
        if (!attribute.isJSXAttribute() || attribute.node.name.type !== "JSXIdentifier") continue;
        const prop = attribute.node.name.name;
        if (riskyProps.has(prop)) {
          warnings.push(
            `${location}: <${name}> prop "${prop}" may differ in production sprite mode. Use className/style with currentColor for colors.`,
          );
        }
      }
      if (name !== "Icon" && name !== "CustomIcon") return;
      const value = staticName(opening);
      if (value !== undefined) {
        (name === "CustomIcon" ? customIcons : icons).add(value);
      } else if (name === "Icon") {
        throw new Error(
          `${location}: Unable to statically evaluate <Icon name={...}>. Use a string literal or a statically evaluable constant.`,
        );
      }
    }

    traverse(ast, {
      ImportDeclaration(importPath) {
        if (importPath.node.source.value !== config.IMPORT_NAME || importPath.node.importKind === "type") return;
        for (const specifier of importPath.get("specifiers")) {
          if (specifier.isImportSpecifier() && specifier.node.importKind === "type") continue;
          const binding = importPath.scope.getBinding(specifier.node.local.name);
          if (!binding) continue;
          for (const reference of binding.referencePaths) {
            if (!isRuntimeReference(reference)) continue;
            if (specifier.isImportSpecifier()) {
              const imported = specifier.node.imported;
              recordUsage(imported.type === "Identifier" ? imported.name : imported.value, reference);
            } else if (specifier.isImportNamespaceSpecifier()) {
              const member = reference.parentPath;
              if (
                !member ||
                !(member.isMemberExpression() || member.isJSXMemberExpression()) ||
                member.node.object !== reference.node
              )
                continue;
              const property = member.node.property;
              const computed = member.isMemberExpression() && member.node.computed;
              const name = computed
                ? property.type === "StringLiteral"
                  ? property.value
                  : undefined
                : property.type === "Identifier" || property.type === "JSXIdentifier"
                  ? property.name
                  : undefined;
              if (typeof name === "string") recordUsage(name, member);
              else
                warnings.push(
                  `${path.relative(projectDir, file)}:${member.node.loc?.start.line ?? "?"}: Dynamic icon namespace access cannot be scanned; use named imports or static member names.`,
                );
            }
          }
        }
      },
    });
  }

  function scanDirectory(directory: string): void {
    const realDirectory = fs.realpathSync(directory);
    if (visited.has(realDirectory)) return;
    visited.add(realDirectory);
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const file = path.join(directory, entry.name);
      const info = entry.isSymbolicLink() ? fs.statSync(file) : entry;
      if (info.isDirectory()) {
        if (!excluded.has(entry.name)) scanDirectory(file);
      } else if (info.isFile() && /\.[jt]sx?$/.test(entry.name)) {
        scanFile(file);
      }
    }
  }

  scanDirectory(path.resolve(projectDir, config.ROOT_DIR));
  return { icons: [...icons].sort(), customIcons: [...customIcons].sort(), warnings };
}
