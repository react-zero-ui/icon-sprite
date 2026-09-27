import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export function resolveTablerIconsDir() {
	return path.dirname(require.resolve("@tabler/icons/outline/check.svg"));
}
