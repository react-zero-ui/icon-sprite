import { SPRITE_PATH } from "../config.js";
import { Mountain as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Mountain(props: IconProps) {
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
  return renderUse("mountain", SPRITE_PATH, props);
}
