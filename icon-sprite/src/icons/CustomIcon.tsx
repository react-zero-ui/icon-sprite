import React, { lazy, Suspense } from "react";
import { SPRITE_PATH } from "../config";
import { renderUse, type IconProps as BaseIconProps } from "../_shared";

export interface IconProps extends BaseIconProps {
	name: string;
}

// Dev-only client renderer. In production this becomes `null` and is tree-shaken.
const DevIcon = process.env.NODE_ENV === "development" ? (lazy(() => import("../_custom-dev-icon")) as React.ComponentType<IconProps>) : null;

export function CustomIcon({ name, ...props }: IconProps) {
	if (process.env.NODE_ENV === "development" && DevIcon) {
		const fallback = renderUse(name, SPRITE_PATH, props);
		return (
			<Suspense fallback={fallback}>
				<DevIcon name={name} {...props} />
			</Suspense>
		);
	}
	return renderUse(name, SPRITE_PATH, props);
}

export default CustomIcon;
