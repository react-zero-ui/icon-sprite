#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test 1: Verify EXCLUDE_DIRS is exported from config
async function testExcludeDirsExport() {
	console.log("\n🧪 Test 1: EXCLUDE_DIRS is exported from config");

	try {
		const { EXCLUDE_DIRS } = await import("../dist/config.js");

		if (!Array.isArray(EXCLUDE_DIRS)) {
			console.error("  ❌ EXCLUDE_DIRS is not an array");
			return false;
		}

		if (!EXCLUDE_DIRS.includes("node_modules")) {
			console.error("  ❌ EXCLUDE_DIRS doesn't include 'node_modules'");
			return false;
		}

		console.log(`  ✅ EXCLUDE_DIRS exported: ${JSON.stringify(EXCLUDE_DIRS)}`);
		console.log(`  ✅ Contains 'node_modules': ${EXCLUDE_DIRS.includes("node_modules")}`);
		console.log(`  ✅ Contains '.git': ${EXCLUDE_DIRS.includes(".git")}`);
		console.log(`  ✅ Contains 'dist': ${EXCLUDE_DIRS.includes("dist")}`);

		return true;
	} catch (err) {
		console.error(`  ❌ Test failed: ${err.message}`);
		return false;
	}
}

// Test 2: Verify scan-icons.js imports EXCLUDE_DIRS
async function testScannerImportsExcludeDirs() {
	console.log("\n🧪 Test 2: scan-icons.js imports EXCLUDE_DIRS");

	try {
		const scannerPath = path.resolve(__dirname, "../scripts/scan-icons.js");
		const scannerContent = fs.readFileSync(scannerPath, "utf8");

		// Check if EXCLUDE_DIRS is imported
		if (!scannerContent.includes("EXCLUDE_DIRS")) {
			console.error("  ❌ scan-icons.js doesn't import EXCLUDE_DIRS");
			return false;
		}

		// Check if the exclusion logic exists
		if (!scannerContent.includes("EXCLUDE_DIRS.includes")) {
			console.error("  ❌ scan-icons.js doesn't use EXCLUDE_DIRS.includes()");
			return false;
		}

		console.log("  ✅ scan-icons.js imports EXCLUDE_DIRS");
		console.log("  ✅ scan-icons.js uses EXCLUDE_DIRS for exclusion logic");

		return true;
	} catch (err) {
		console.error(`  ❌ Test failed: ${err.message}`);
		return false;
	}
}

// Test 3: Verify default ROOT_DIR is "src"
async function testDefaultRootDir() {
	console.log("\n🧪 Test 3: Default ROOT_DIR is 'src' (not empty string)");

	try {
		const { ROOT_DIR } = await import("../dist/config.js");

		if (ROOT_DIR !== "src") {
			console.error(`  ❌ ROOT_DIR is "${ROOT_DIR}", expected "src"`);
			return false;
		}

		console.log(`  ✅ ROOT_DIR: "${ROOT_DIR}"`);
		console.log("  ✅ This prevents scanning from project root by default");

		return true;
	} catch (err) {
		console.error(`  ❌ Test failed: ${err.message}`);
		return false;
	}
}

// Test 4: Verify config loading logic is uncommented
async function testConfigLoadingUncommented() {
	console.log("\n🧪 Test 4: Config loading logic is uncommented");

	try {
		const configPath = path.resolve(__dirname, "../src/config.ts");
		const configContent = fs.readFileSync(configPath, "utf8");

		// Check that imports are not commented
		if (configContent.includes("// import fs from") || configContent.includes("// import path from")) {
			console.error("  ❌ Config imports are still commented");
			return false;
		}

		// Check that DEFAULT_CONFIG is not commented
		if (configContent.includes("// const DEFAULT_CONFIG")) {
			console.error("  ❌ DEFAULT_CONFIG is still commented");
			return false;
		}

		// Check that config file loading is not commented
		if (configContent.includes("// if (fs.existsSync(configFile))")) {
			console.error("  ❌ Config file loading is still commented");
			return false;
		}

		console.log("  ✅ Config imports are uncommented");
		console.log("  ✅ Config loading logic is active");
		console.log("  ✅ zero-ui.config.js can be used");

		return true;
	} catch (err) {
		console.error(`  ❌ Test failed: ${err.message}`);
		return false;
	}
}

// Run all tests
async function runTests() {
	console.log("🚀 Running scanner exclusion tests...\n");

	const results = [];

	results.push({ name: "EXCLUDE_DIRS export", passed: await testExcludeDirsExport() });
	results.push({ name: "Scanner imports EXCLUDE_DIRS", passed: await testScannerImportsExcludeDirs() });
	results.push({ name: "Default ROOT_DIR", passed: await testDefaultRootDir() });
	results.push({ name: "Config loading uncommented", passed: await testConfigLoadingUncommented() });

	console.log("\n" + "=".repeat(50));
	console.log("📊 Test Results:");
	console.log("=".repeat(50));

	let allPassed = true;
	for (const result of results) {
		const status = result.passed ? "✅ PASS" : "❌ FAIL";
		console.log(`${status} - ${result.name}`);
		if (!result.passed) allPassed = false;
	}

	console.log("=".repeat(50));

	if (allPassed) {
		console.log("\n✅ All scanner exclusion tests passed!");
		console.log("\nℹ️  These tests verify that:");
		console.log("  1. EXCLUDE_DIRS is properly exported from config");
		console.log("  2. The scanner uses EXCLUDE_DIRS to skip directories");
		console.log("  3. ROOT_DIR defaults to 'src' to avoid scanning node_modules");
		console.log("  4. Config loading from zero-ui.config.js is enabled");
		process.exit(0);
	} else {
		console.error("\n❌ Some scanner exclusion tests failed!");
		process.exit(1);
	}
}

runTests().catch((err) => {
	console.error("❌ Test runner error:", err);
	process.exit(1);
});
