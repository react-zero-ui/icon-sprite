import { SPRITE_PATH } from "../config.js";
import { ZodiacCapricorn as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function ZodiacCapricorn(props: IconProps) {
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
  return renderUse("zodiac-capricorn", SPRITE_PATH, props);
}
