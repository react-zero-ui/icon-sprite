import { SPRITE_PATH } from "../config.js";
import { StickyNoteOff as DevIcon } from "../lucide-archive/StickyNoteOff.js";
import { renderUse, type IconProps } from "../_shared.js";

export function StickyNoteOff(props: IconProps) {
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
  return renderUse("sticky-note-off", SPRITE_PATH, props);
}
