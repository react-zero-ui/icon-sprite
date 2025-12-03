import { SPRITE_PATH } from "../config.js";
import { BookmarkMinus as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function BookmarkMinus(props: IconProps) {
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
  return renderUse("bookmark-minus", SPRITE_PATH, props);
}
