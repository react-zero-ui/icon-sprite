export type Dim = number | string | undefined;

/**
 * Icon props - extends all SVG props for maximum compatibility.
 * 
 * ✅ RELIABLE (work same in dev & prod):
 *   - className, style, size, width, height
 *   - strokeWidth (via CSS variable)
 *   - id, role, aria-*, data-*
 * 
 * ⚠️ COLOR (use className instead):
 *   - stroke, fill, color → Use className="text-red-500" (works via currentColor)
 * 
 * ❌ MAY DIFFER in prod (don't cascade into <use> shadow DOM):
 *   - strokeLinecap, strokeLinejoin, strokeDasharray, etc.
 *   - These work in dev but may not apply in prod sprite mode
 */
export type IconProps = React.SVGProps<SVGSVGElement> & {
	size?: Dim;
};

// Ultra-minimal renderUse - all logic in one place
export function renderUse(id: string, path: string, { size, width, height, style, strokeWidth, ...rest }: IconProps) {
	return (
		<svg
			{...rest}
			width={width ?? size ?? 24}
			height={height ?? size ?? 24}
			style={strokeWidth != null ? { "--icon-stroke-width": strokeWidth, ...style } as React.CSSProperties : style}
		>
			<use href={`${path}#${id}`} />
		</svg>
	);
}
