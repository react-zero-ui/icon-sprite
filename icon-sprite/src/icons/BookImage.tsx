import { SPRITE_PATH } from "../config.js";
import { BookImage as DevIcon } from "../lucide-archive/BookImage.js";
import { renderUse, type IconProps } from "../_shared.js";

export function BookImage(props: IconProps) {
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
  return renderUse("book-image", SPRITE_PATH, props);
}
