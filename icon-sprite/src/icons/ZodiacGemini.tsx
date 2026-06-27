import { SPRITE_PATH } from "../config.js";
import { ZodiacGemini as DevIcon } from "../lucide-archive/ZodiacGemini.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ZodiacGemini(props: IconProps) {
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
  return renderUse("zodiac-gemini", SPRITE_PATH, props);
}
