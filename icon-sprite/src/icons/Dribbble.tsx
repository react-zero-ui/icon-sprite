import { SPRITE_PATH } from "../config.js";
import { Dribbble as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Dribbble(props: IconProps) {
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
  return renderUse("dribbble", SPRITE_PATH, props);
}
