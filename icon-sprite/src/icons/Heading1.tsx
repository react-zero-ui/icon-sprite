import { SPRITE_PATH } from "../config.js";
import { Heading1 as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Heading1(props: IconProps) {
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
  return renderUse("heading-1", SPRITE_PATH, props);
}
