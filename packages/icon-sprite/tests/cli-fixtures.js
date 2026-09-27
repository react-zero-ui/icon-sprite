import fs from "node:fs"
import os from "node:os"
import path from "node:path"

export const svg =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1h14"/></svg>'

export function writeProject(projectDir, files) {
  for (const [name, contents] of Object.entries(files)) {
    const file = path.join(projectDir, name)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, contents)
  }
}

export function createProject(test, files = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "zero-icons project #"))
  test.after(() => fs.rmSync(root, { recursive: true, force: true }))
  writeProject(root, { "package.json": '{"type":"module"}', ...files })
  return root
}
