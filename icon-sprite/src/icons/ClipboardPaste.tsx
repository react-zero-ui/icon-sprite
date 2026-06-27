import { SPRITE_PATH } from "../config.js";
import { ClipboardPaste as DevIcon } from "../lucide-archive/ClipboardPaste.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ClipboardPaste(props: IconProps) {
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
  return renderUse("clipboard-paste", SPRITE_PATH, props);
}
