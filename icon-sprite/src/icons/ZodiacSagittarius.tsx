import { SPRITE_PATH } from "../config.js";
import { ZodiacSagittarius as DevIcon } from "../lucide-archive/ZodiacSagittarius.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ZodiacSagittarius(props: IconProps) {
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
  return renderUse("zodiac-sagittarius", SPRITE_PATH, props);
}
