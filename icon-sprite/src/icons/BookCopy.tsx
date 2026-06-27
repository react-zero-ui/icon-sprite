import { SPRITE_PATH } from "../config.js";
import { BookCopy as DevIcon } from "../lucide-archive/BookCopy.js";
import { renderUse, type IconProps } from "../_shared.js";

export function BookCopy(props: IconProps) {
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
  return renderUse("book-copy", SPRITE_PATH, props);
}
