import { SPRITE_PATH } from "../config.js";
import { Laptop as DevIcon } from "../lucide-archive/Laptop.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Laptop(props: IconProps) {
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
  return renderUse("laptop", SPRITE_PATH, props);
}
