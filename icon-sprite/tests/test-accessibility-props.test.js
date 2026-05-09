#!/usr/bin/env node
/**
 * Test: sprite-rendered icons match Lucide React's default accessibility behavior.
 *
 * Decorative icons should be hidden from assistive technology by default, while
 * consumers can still override aria-hidden when an icon has semantic meaning.
 */

process.env.NODE_ENV = "production";

try {
	const { Activity } = await import("../dist/icons/Activity.js");

	const defaultIcon = Activity({});
	if (defaultIcon.props["aria-hidden"] !== "true") {
		throw new Error(`Expected default aria-hidden to be "true", received ${defaultIcon.props["aria-hidden"]}`);
	}

	const exposedIcon = Activity({ "aria-hidden": "false", role: "img" });
	if (exposedIcon.props["aria-hidden"] !== "false") {
		throw new Error(`Expected aria-hidden override to be preserved, received ${exposedIcon.props["aria-hidden"]}`);
	}

	if (exposedIcon.props.role !== "img") {
		throw new Error(`Expected role prop to be preserved, received ${exposedIcon.props.role}`);
	}

	console.log("✅ Default aria-hidden behavior matches lucide-react and remains overrideable.");
} catch (e) {
	console.error(`❌ Test failed: ${e.message}`);
	process.exit(1);
}
