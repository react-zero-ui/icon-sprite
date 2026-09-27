#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { resolveTablerIconsDir } from "../scripts/resolve-icon-pack.js";

const tablerDir = resolveTablerIconsDir();
const checkIcon = path.join(tablerDir, "check.svg");

if (path.basename(tablerDir) !== "outline") {
	console.error(`❌ Expected Tabler outline directory, got: ${tablerDir}`);
	process.exit(1);
}

if (!fs.existsSync(checkIcon)) {
	console.error(`❌ Expected resolved Tabler icon to exist: ${checkIcon}`);
	process.exit(1);
}

console.log(`✅ Tabler icons resolve through the package export map: ${tablerDir}`);
