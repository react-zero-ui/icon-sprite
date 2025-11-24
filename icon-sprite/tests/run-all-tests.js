#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test suite configuration
const testSuites = [
	{
		name: "Icon Mapping Tests",
		file: "test-mapping.test.js",
		description: "Verify all React icon components map to lucide-static SVGs",
	},
	{
		name: "Config Loading Tests",
		file: "test-config.test.js",
		description: "Verify config loading and merging with defaults",
	},
	{
		name: "Scanner Exclusion Tests",
		file: "test-scanner-exclusion.test.js",
		description: "Verify directory exclusion and ROOT_DIR functionality",
	},
];

// Color codes for terminal output
const colors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	green: "\x1b[32m",
	red: "\x1b[31m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	cyan: "\x1b[36m",
};

function printHeader() {
	console.log("\n" + "=".repeat(60));
	console.log(colors.bright + colors.cyan + "🧪 @react-zero-ui/icon-sprite Test Suite" + colors.reset);
	console.log("=".repeat(60) + "\n");
}

function printTestSuiteHeader(suite, index, total) {
	console.log(colors.bright + `\n[${ index + 1}/${total}] ${suite.name}` + colors.reset);
	console.log(colors.blue + `📝 ${suite.description}` + colors.reset);
	console.log("-".repeat(60));
}

function runTest(testFile) {
	const testPath = path.join(__dirname, testFile);
	try {
		const output = execSync(`node "${testPath}"`, {
			cwd: __dirname,
			encoding: "utf8",
			stdio: "pipe",
		});
		return { success: true, output };
	} catch (err) {
		return { success: false, output: err.stdout || err.message };
	}
}

async function main() {
	printHeader();

	const results = [];
	let totalPassed = 0;
	let totalFailed = 0;

	// Run each test suite
	for (let i = 0; i < testSuites.length; i++) {
		const suite = testSuites[i];
		printTestSuiteHeader(suite, i, testSuites.length);

		const result = runTest(suite.file);
		results.push({ suite, result });

		if (result.success) {
			console.log(result.output);
			console.log(colors.green + `✅ ${suite.name} PASSED` + colors.reset);
			totalPassed++;
		} else {
			console.log(result.output);
			console.error(colors.red + `❌ ${suite.name} FAILED` + colors.reset);
			totalFailed++;
		}
	}

	// Print summary
	console.log("\n" + "=".repeat(60));
	console.log(colors.bright + "📊 Test Summary" + colors.reset);
	console.log("=".repeat(60));

	for (const { suite, result } of results) {
		const status = result.success
			? colors.green + "✅ PASS" + colors.reset
			: colors.red + "❌ FAIL" + colors.reset;
		console.log(`${status} - ${suite.name}`);
	}

	console.log("-".repeat(60));
	console.log(
		`Total: ${totalPassed + totalFailed} | ` +
		colors.green + `Passed: ${totalPassed}` + colors.reset + " | " +
		colors.red + `Failed: ${totalFailed}` + colors.reset
	);
	console.log("=".repeat(60));

	if (totalFailed === 0) {
		console.log(colors.green + colors.bright + "\n🎉 All tests passed!" + colors.reset);
		console.log(colors.green + "✨ Your changes are ready to ship!\n" + colors.reset);
		process.exit(0);
	} else {
		console.error(colors.red + colors.bright + "\n❌ Some tests failed!" + colors.reset);
		console.error(colors.yellow + "Please fix the failing tests before committing.\n" + colors.reset);
		process.exit(1);
	}
}

main().catch((err) => {
	console.error(colors.red + "❌ Test runner error:" + colors.reset, err);
	process.exit(1);
});
