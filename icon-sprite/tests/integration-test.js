#!/usr/bin/env node
/**
 * Integration test for @react-zero-ui/icon-sprite
 * 
 * Tests the full flow:
 * 1. Build the library
 * 2. Pack as .tgz
 * 3. Install in test next-app
 * 4. Build next-app (runs prebuild sprite generation)
 * 5. Start dev server and verify page loads
 * 
 * Usage: node tests/integration-test.js
 */

import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICON_SPRITE_DIR = path.resolve(__dirname, "..");
const NEXT_APP_DIR = path.resolve(__dirname, "../../next-app");

const colors = {
	reset: "\x1b[0m",
	green: "\x1b[32m",
	red: "\x1b[31m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	dim: "\x1b[2m",
};

function log(msg, color = "reset") {
	console.log(`${colors[color]}${msg}${colors.reset}`);
}

function exec(cmd, cwd = ICON_SPRITE_DIR, silent = false) {
	try {
		const output = execSync(cmd, {
			cwd,
			encoding: "utf8",
			stdio: silent ? "pipe" : "inherit",
		});
		return { success: true, output };
	} catch (e) {
		return { success: false, error: e.message, output: e.stdout };
	}
}

async function waitForServer(url, timeout = 30000) {
	const start = Date.now();
	await new Promise((r) => setTimeout(r, 2000)); // Initial delay
	
	while (Date.now() - start < timeout) {
		try {
			const res = await fetch(url);
			return true;
		} catch {
			// Server not ready yet
		}
		await new Promise((r) => setTimeout(r, 500));
	}
	return false;
}

function killProcess(proc) {
	if (proc && !proc.killed) {
		proc.kill("SIGTERM");
	}
}

async function runTests() {
	const results = [];
	let devServer = null;

	console.log("\n" + "=".repeat(60));
	log("🧪 Integration Test Suite", "blue");
	console.log("=".repeat(60) + "\n");

	try {
		// Step 1: Build the library
		log("[1/5] Building library...", "blue");
		const buildResult = exec("npm run build");
		if (!buildResult.success) {
			results.push({ name: "Build library", passed: false });
			throw new Error("Library build failed");
		}
		results.push({ name: "Build library", passed: true });
		log("✅ Library built successfully", "green");

		// Step 2: Pack the library
		log("\n[2/5] Packing library...", "blue");
		const oldTgz = fs.readdirSync(ICON_SPRITE_DIR).filter((f) => f.endsWith(".tgz"));
		oldTgz.forEach((f) => fs.unlinkSync(path.join(ICON_SPRITE_DIR, f)));

		const packResult = exec("npm pack --quiet", ICON_SPRITE_DIR, true);
		if (!packResult.success) {
			results.push({ name: "Pack library", passed: false });
			throw new Error("Library pack failed");
		}

		const tgzFile = fs.readdirSync(ICON_SPRITE_DIR).find((f) => f.endsWith(".tgz"));
		if (!tgzFile) {
			results.push({ name: "Pack library", passed: false });
			throw new Error("No .tgz file created");
		}
		results.push({ name: "Pack library", passed: true });
		log(`✅ Packed: ${tgzFile}`, "green");

		// Step 3: Install in next-app
		log("\n[3/5] Installing in next-app...", "blue");

		const pkgJsonPath = path.join(NEXT_APP_DIR, "package.json");
		const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
		pkgJson.dependencies["@react-zero-ui/icon-sprite"] = `file:../icon-sprite/${tgzFile}`;
		fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");

		exec("rm -rf node_modules/@react-zero-ui", NEXT_APP_DIR, true);
		const installResult = exec("npm install", NEXT_APP_DIR);
		if (!installResult.success) {
			results.push({ name: "Install in next-app", passed: false });
			throw new Error("npm install failed");
		}
		results.push({ name: "Install in next-app", passed: true });
		log("✅ Installed in next-app", "green");

		// Step 4: Build next-app (includes prebuild sprite generation)
		log("\n[4/5] Building next-app...", "blue");
		exec("rm -rf .next", NEXT_APP_DIR, true);
		const nextBuildResult = exec("npm run build", NEXT_APP_DIR);
		if (!nextBuildResult.success) {
			results.push({ name: "Build next-app", passed: false });
			throw new Error("next build failed");
		}
		results.push({ name: "Build next-app", passed: true });
		log("✅ next-app built successfully", "green");

		// Step 5: Test dev server
		log("\n[5/5] Testing dev server...", "blue");
		devServer = spawn("npm run dev", {
			cwd: NEXT_APP_DIR,
			stdio: "pipe",
			shell: true,
		});

		const devReady = await waitForServer("http://localhost:3000", 30000);
		if (!devReady) {
			results.push({ name: "Dev server starts", passed: false });
			throw new Error("Dev server failed to start");
		}

		const devResponse = await fetch("http://localhost:3000");
		const devHtml = await devResponse.text();
		const devPageLoaded = devResponse.ok && devHtml.includes("</html>");

		killProcess(devServer);

		results.push({ name: "Dev server starts", passed: devPageLoaded });
		if (devPageLoaded) {
			log("✅ Dev server works", "green");
		} else {
			log("❌ Dev server page failed to load", "red");
		}

	} catch (e) {
		log(`\n❌ Test failed: ${e.message}`, "red");
	} finally {
		killProcess(devServer);
	}

	// Print summary
	console.log("\n" + "=".repeat(60));
	log("📊 Test Summary", "blue");
	console.log("=".repeat(60));

	let passed = 0;
	let failed = 0;
	for (const r of results) {
		const status = r.passed ? `${colors.green}✅ PASS` : `${colors.red}❌ FAIL`;
		console.log(`${status}${colors.reset} - ${r.name}`);
		if (r.passed) passed++;
		else failed++;
	}

	console.log("-".repeat(60));
	console.log(`Total: ${results.length} | ${colors.green}Passed: ${passed}${colors.reset} | ${colors.red}Failed: ${failed}${colors.reset}`);
	console.log("=".repeat(60) + "\n");

	process.exit(failed > 0 ? 1 : 0);
}

runTests();
