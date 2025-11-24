#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_PROJECT_ROOT = path.resolve(__dirname, "../test-project");
const CONFIG_FILE = path.join(TEST_PROJECT_ROOT, "zero-ui.config.js");
const PACKAGE_JSON = path.join(TEST_PROJECT_ROOT, "package.json");

// Cleanup and setup test project directory
function setupTestProject() {
	if (fs.existsSync(TEST_PROJECT_ROOT)) {
		fs.rmSync(TEST_PROJECT_ROOT, { recursive: true, force: true });
	}
	fs.mkdirSync(TEST_PROJECT_ROOT, { recursive: true });

	// Create package.json to make it a valid project root
	fs.writeFileSync(
		PACKAGE_JSON,
		JSON.stringify({ name: "test-project", version: "1.0.0" }, null, 2),
		"utf8"
	);
}

function cleanup() {
	if (fs.existsSync(TEST_PROJECT_ROOT)) {
		fs.rmSync(TEST_PROJECT_ROOT, { recursive: true, force: true });
	}
}

// Helper to run a test script in a child process
function runConfigTest() {
	const testScript = `
import { IMPORT_NAME, ROOT_DIR, SPRITE_PATH, CUSTOM_SVG_DIR, OUTPUT_DIR, IGNORE_ICONS, EXCLUDE_DIRS } from "../dist/config.js";
console.log(JSON.stringify({
	IMPORT_NAME,
	ROOT_DIR,
	SPRITE_PATH,
	CUSTOM_SVG_DIR,
	OUTPUT_DIR,
	IGNORE_ICONS,
	EXCLUDE_DIRS
}));
`;

	const testScriptPath = path.join(TEST_PROJECT_ROOT, "test-runner.js");
	fs.writeFileSync(testScriptPath, testScript, "utf8");

	const result = execSync(`node "${testScriptPath}"`, {
		cwd: TEST_PROJECT_ROOT,
		encoding: "utf8",
	});

	return JSON.parse(result.trim());
}

// Test 1: Default config values (no config file)
async function testDefaultConfig() {
	console.log("\n🧪 Test 1: Default config values (no config file)");
	setupTestProject();

	try {
		const config = runConfigTest();

		const assertions = [
			{ name: "IMPORT_NAME", expected: "@react-zero-ui/icon-sprite", actual: config.IMPORT_NAME },
			{ name: "ROOT_DIR", expected: "src", actual: config.ROOT_DIR },
			{ name: "SPRITE_PATH", expected: "/icons.svg", actual: config.SPRITE_PATH },
			{ name: "CUSTOM_SVG_DIR", expected: "zero-ui-icons", actual: config.CUSTOM_SVG_DIR },
			{ name: "OUTPUT_DIR", expected: "public", actual: config.OUTPUT_DIR },
			{ name: "IGNORE_ICONS", expected: JSON.stringify(["CustomIcon"]), actual: JSON.stringify(config.IGNORE_ICONS) },
			{ name: "EXCLUDE_DIRS", expected: JSON.stringify(["node_modules", ".git", "dist", "build", ".next", "out"]), actual: JSON.stringify(config.EXCLUDE_DIRS) },
		];

		let passed = true;
		for (const assertion of assertions) {
			if (assertion.expected === assertion.actual) {
				console.log(`  ✅ ${assertion.name}: ${assertion.actual}`);
			} else {
				console.error(`  ❌ ${assertion.name}: expected ${assertion.expected}, got ${assertion.actual}`);
				passed = false;
			}
		}

		return passed;
	} catch (err) {
		console.error(`  ❌ Test failed: ${err.message}`);
		return false;
	} finally {
		cleanup();
	}
}

// Test 2: Custom config loading
async function testCustomConfig() {
	console.log("\n🧪 Test 2: Custom config loading from zero-ui.config.js");
	setupTestProject();

	try {
		// Create a custom config file
		const customConfig = `export default {
	IMPORT_NAME: "@my-custom/icons",
	ROOT_DIR: "app",
	SPRITE_PATH: "/custom-icons.svg",
	CUSTOM_SVG_DIR: "my-icons",
	OUTPUT_DIR: "static",
	IGNORE_ICONS: ["MyCustomIcon", "AnotherIcon"],
	EXCLUDE_DIRS: ["node_modules", "vendor", "tmp"],
};`;
		fs.writeFileSync(CONFIG_FILE, customConfig, "utf8");

		const config = runConfigTest();

		const assertions = [
			{ name: "IMPORT_NAME", expected: "@my-custom/icons", actual: config.IMPORT_NAME },
			{ name: "ROOT_DIR", expected: "app", actual: config.ROOT_DIR },
			{ name: "SPRITE_PATH", expected: "/custom-icons.svg", actual: config.SPRITE_PATH },
			{ name: "CUSTOM_SVG_DIR", expected: "my-icons", actual: config.CUSTOM_SVG_DIR },
			{ name: "OUTPUT_DIR", expected: "static", actual: config.OUTPUT_DIR },
			{ name: "IGNORE_ICONS", expected: JSON.stringify(["MyCustomIcon", "AnotherIcon"]), actual: JSON.stringify(config.IGNORE_ICONS) },
			{ name: "EXCLUDE_DIRS", expected: JSON.stringify(["node_modules", "vendor", "tmp"]), actual: JSON.stringify(config.EXCLUDE_DIRS) },
		];

		let passed = true;
		for (const assertion of assertions) {
			if (assertion.expected === assertion.actual) {
				console.log(`  ✅ ${assertion.name}: ${assertion.actual}`);
			} else {
				console.error(`  ❌ ${assertion.name}: expected ${assertion.expected}, got ${assertion.actual}`);
				passed = false;
			}
		}

		return passed;
	} catch (err) {
		console.error(`  ❌ Test failed: ${err.message}`);
		return false;
	} finally {
		cleanup();
	}
}

// Test 3: Partial config override (merging with defaults)
async function testPartialConfig() {
	console.log("\n🧪 Test 3: Partial config override (merging with defaults)");
	setupTestProject();

	try {
		// Create a partial config file (only override ROOT_DIR and EXCLUDE_DIRS)
		const partialConfig = `export default {
	ROOT_DIR: "lib",
	EXCLUDE_DIRS: ["node_modules", "coverage"],
};`;
		fs.writeFileSync(CONFIG_FILE, partialConfig, "utf8");

		const config = runConfigTest();

		const assertions = [
			{ name: "IMPORT_NAME (default)", expected: "@react-zero-ui/icon-sprite", actual: config.IMPORT_NAME },
			{ name: "ROOT_DIR (override)", expected: "lib", actual: config.ROOT_DIR },
			{ name: "SPRITE_PATH (default)", expected: "/icons.svg", actual: config.SPRITE_PATH },
			{ name: "EXCLUDE_DIRS (override)", expected: JSON.stringify(["node_modules", "coverage"]), actual: JSON.stringify(config.EXCLUDE_DIRS) },
		];

		let passed = true;
		for (const assertion of assertions) {
			if (assertion.expected === assertion.actual) {
				console.log(`  ✅ ${assertion.name}: ${assertion.actual}`);
			} else {
				console.error(`  ❌ ${assertion.name}: expected ${assertion.expected}, got ${assertion.actual}`);
				passed = false;
			}
		}

		return passed;
	} catch (err) {
		console.error(`  ❌ Test failed: ${err.message}`);
		return false;
	} finally {
		cleanup();
	}
}

// Test 4: Config file with syntax error (should warn and use defaults)
async function testInvalidConfig() {
	console.log("\n🧪 Test 4: Invalid config file (should warn and use defaults)");
	setupTestProject();

	try {
		// Create an invalid config file
		const invalidConfig = `export default {
	IMPORT_NAME: "unclosed string
};`;
		fs.writeFileSync(CONFIG_FILE, invalidConfig, "utf8");

		const testScript = `
import { ROOT_DIR, EXCLUDE_DIRS } from "../dist/config.js";
console.log(JSON.stringify({ ROOT_DIR, EXCLUDE_DIRS }));
`;

		const testScriptPath = path.join(TEST_PROJECT_ROOT, "test-runner.js");
		fs.writeFileSync(testScriptPath, testScript, "utf8");

		// This should warn but still work with defaults
		const result = execSync(`node "${testScriptPath}"`, {
			cwd: TEST_PROJECT_ROOT,
			encoding: "utf8",
			stdio: ["pipe", "pipe", "pipe"]
		});

		const config = JSON.parse(result.trim());

		// Should use defaults when config fails to load
		const assertions = [
			{ name: "ROOT_DIR (fallback to default)", expected: "src", actual: config.ROOT_DIR },
			{ name: "EXCLUDE_DIRS (fallback to default)", expected: JSON.stringify(["node_modules", ".git", "dist", "build", ".next", "out"]), actual: JSON.stringify(config.EXCLUDE_DIRS) },
		];

		let passed = true;
		for (const assertion of assertions) {
			if (assertion.expected === assertion.actual) {
				console.log(`  ✅ ${assertion.name}`);
			} else {
				console.error(`  ❌ ${assertion.name}: expected ${assertion.expected}, got ${assertion.actual}`);
				passed = false;
			}
		}

		console.log("  ℹ️  Warning should have been displayed to stderr");
		return passed;
	} catch (err) {
		console.error(`  ❌ Test failed: ${err.message}`);
		return false;
	} finally {
		cleanup();
	}
}

// Run all tests
async function runTests() {
	console.log("🚀 Running config tests...\n");

	const results = [];

	results.push({ name: "Default config", passed: await testDefaultConfig() });
	results.push({ name: "Custom config", passed: await testCustomConfig() });
	results.push({ name: "Partial config", passed: await testPartialConfig() });
	results.push({ name: "Invalid config", passed: await testInvalidConfig() });

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
		console.log("\n✅ All config tests passed!");
		process.exit(0);
	} else {
		console.error("\n❌ Some config tests failed!");
		process.exit(1);
	}
}

runTests().catch((err) => {
	console.error("❌ Test runner error:", err);
	cleanup();
	process.exit(1);
});
