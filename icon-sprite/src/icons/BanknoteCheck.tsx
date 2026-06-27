import { SPRITE_PATH } from "../config.js";
import { BanknoteCheck as DevIcon } from "../lucide-archive/BanknoteCheck.js";
import { renderUse, type IconProps } from "../_shared.js";

export function BanknoteCheck(props: IconProps) {
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
  return renderUse("banknote-check", SPRITE_PATH, props);
}
