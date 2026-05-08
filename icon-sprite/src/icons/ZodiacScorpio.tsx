import { SPRITE_PATH } from "../config.js";
import { ZodiacScorpio as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function ZodiacScorpio(props: IconProps) {
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
  return renderUse("zodiac-scorpio", SPRITE_PATH, props);
}
