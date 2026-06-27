import { SPRITE_PATH } from "../config.js";
import { TextWrap as DevIcon } from "../lucide-archive/TextWrap.js";
import { renderUse, type IconProps } from "../_shared.js";

export function TextWrap(props: IconProps) {
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
  return renderUse("text-wrap", SPRITE_PATH, props);
}
