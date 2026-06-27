import { SPRITE_PATH } from "../config.js";
import { StickyNoteCheck as DevIcon } from "../lucide-archive/StickyNoteCheck.js";
import { renderUse, type IconProps } from "../_shared.js";

export function StickyNoteCheck(props: IconProps) {
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
  return renderUse("sticky-note-check", SPRITE_PATH, props);
}
