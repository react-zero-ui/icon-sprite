// utils.ts

// Tokenize PascalCase + digits with Lucide quirks
export // src/utils.ts
/**
 * Generate the lucide-static filename for a given Lucide React component.
 * If `available` is provided, returns the first candidate that exists.
 */
function componentNameToStaticId(name: string, available?: Set<string>): string {
	// 1) Tokenize PascalCase + digits + lowercase, preserving special forms
	//    - "3d" stays as "3d"
	//    - uppercase runs "AZ" become ["a","z"] (primary), but we’ll also try keeping them
	//    - digits "10" default to per-digit ["1","0"] (primary), but we also try keeping "10"
	//    - merge pattern DIGITS + 'x' + DIGITS into "2x2" (primary)
	const re = /(\d+d)|([A-Z]+(?![a-z]))|([A-Z][a-z]+)|(\d+)|([a-z])/g;
	const raw: string[] = [];
	let m: RegExpExecArray | null;
	while ((m = re.exec(name))) {
		const [, dPlusD, upperRun, capWord, digits, lower] = m;
		if (dPlusD) raw.push(dPlusD.toLowerCase());
		else if (upperRun) raw.push(upperRun); // keep run for now, lower later
		else if (capWord) raw.push(capWord);
		else if (digits) raw.push(digits);
		else if (lower) raw.push(lower);
	}

	// Merge DIGITS 'x' DIGITS -> "2x2"
	const merged: string[] = [];
	for (let i = 0; i < raw.length; i++) {
		const a = raw[i],
			b = raw[i + 1],
			c = raw[i + 2];
		if (a && b === "x" && c && /^\d+$/.test(a) && /^\d+$/.test(c)) {
			merged.push(`${a}x${c}`);
			i += 2;
		} else {
			merged.push(a);
		}
	}

	// helper transforms
	const lower = (t: string) => t.toLowerCase();
	const splitUpperRun = (t: string) => (/^[A-Z]+$/.test(t) ? t.toLowerCase().split("") : [t]);
	const splitDigits = (t: string) => (/^\d+$/.test(t) ? t.split("") : [t]);
	const keepDigits = (t: string) => [t]; // no-op, kept as is
	const keepUpperRun = (t: string) => (/^[A-Z]+$/.test(t) ? [t.toLowerCase()] : [t]);

	// Build candidate variants in descending preference
	// Primary matches ArrowUp10 (1-0) & AZ (a-z) & 2x2 merged
	const v1 = merged.flatMap(splitUpperRun).flatMap(splitDigits).map(lower).join("-");
	// Keep digit groups (Clock10 -> 10), split caps (AZ -> a-z)
	const v2 = merged.flatMap(splitUpperRun).flatMap(keepDigits).map(lower).join("-");
	// Split digits, keep cap runs (AZ -> az)
	const v3 = merged.flatMap(keepUpperRun).flatMap(splitDigits).map(lower).join("-");
	// Keep both caps & digits
	const v4 = merged.flatMap(keepUpperRun).flatMap(keepDigits).map(lower).join("-");

	const candidates = dedupe([v1, v2, v3, v4]);

	if (available && available.size) {
		for (const id of candidates) if (available.has(id)) return id;
	}
	return candidates[0]; // deterministic fallback
}

function dedupe<T>(arr: T[]): T[] {
	const s = new Set<T>();
	const out: T[] = [];
	for (const x of arr)
		if (!s.has(x)) {
			s.add(x);
			out.push(x);
		}
	return out;
}
