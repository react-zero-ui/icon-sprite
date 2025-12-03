import { SPRITE_PATH } from "../config.js";
import { Grid2x2 as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Grid2x2(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return (
      <DevIcon
        {...(rest as any)}
        size={size ?? 24}
        {...(width != null ? { width } : {})}
        {...(height != null ? { height } : {})}
      />
    );
  }
  return renderUse("grid-2-x-2", SPRITE_PATH, props);
}
