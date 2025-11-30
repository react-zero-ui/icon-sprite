export type Dim = number | string | undefined;

// Props that reliably work with SVG sprites
export type IconProps = {
	className?: string;
	style?: React.CSSProperties;
	size?: Dim;
	width?: Dim;
	height?: Dim;
	strokeWidth?: number | string;
	id?: string;
	role?: string;
	"aria-label"?: string;
	"aria-hidden"?: boolean | "true" | "false";
	"data-testid"?: string;
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
