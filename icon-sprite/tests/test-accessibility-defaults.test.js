#!/usr/bin/env node
/**
 * Test: Verify icon accessibility defaults match lucide-react behavior.
 */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
try {
	const { renderUse } = await import(path.resolve(__dirname, "../dist/_shared.js"));
	const defaultIcon = renderUse("bell", "/sprite.svg", {});
	if (defaultIcon.props["aria-hidden"] !== true) {
		throw new Error(`Expected default aria-hidden=true, got ${String(defaultIcon.props["aria-hidden"])}`);
	}
	const exposedIcon = renderUse("bell", "/sprite.svg", {
		"aria-hidden": false,
		role: "img",
		"aria-label": "Notifications",
	});
	if (exposedIcon.props["aria-hidden"] !== false) {
		throw new Error(`Expected aria-hidden override=false, got ${String(exposedIcon.props["aria-hidden"])}`);
	}
	if (exposedIcon.props.role !== "img" || exposedIcon.props["aria-label"] !== "Notifications") {
		throw new Error("Expected explicit accessibility props to pass through");
	}
	console.log("✅ Icons default to aria-hidden=true.");
	console.log("✅ Explicit accessibility props override the default.");
} catch (e) {
	console.error(`❌ Test failed: ${e.message}`);
	process.exit(1);
}
