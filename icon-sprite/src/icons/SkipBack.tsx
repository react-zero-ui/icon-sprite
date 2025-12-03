import { SPRITE_PATH } from "../config.js";
import { SkipBack as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function SkipBack(props: IconProps) {
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
  return renderUse("skip-back", SPRITE_PATH, props);
}
