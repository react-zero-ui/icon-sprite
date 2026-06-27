import { SPRITE_PATH } from "../config.js";
import { AlignHorizontalJustifyStart as DevIcon } from "../lucide-archive/AlignHorizontalJustifyStart.js";
import { renderUse, type IconProps } from "../_shared.js";

export function AlignHorizontalJustifyStart(props: IconProps) {
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
  return renderUse("align-horizontal-justify-start", SPRITE_PATH, props);
}
