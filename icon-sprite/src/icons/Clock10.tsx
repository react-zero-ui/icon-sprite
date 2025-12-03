import { SPRITE_PATH } from "../config.js";
import { Clock10 as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Clock10(props: IconProps) {
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
  return renderUse("clock-10", SPRITE_PATH, props);
}
