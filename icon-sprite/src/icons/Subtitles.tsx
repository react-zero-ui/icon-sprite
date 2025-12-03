import { SPRITE_PATH } from "../config.js";
import { Subtitles as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Subtitles(props: IconProps) {
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
  return renderUse("subtitles", SPRITE_PATH, props);
}
