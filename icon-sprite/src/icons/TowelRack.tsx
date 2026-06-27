import { SPRITE_PATH } from "../config.js";
import { TowelRack as DevIcon } from "../lucide-archive/TowelRack.js";
import { renderUse, type IconProps } from "../_shared.js";

export function TowelRack(props: IconProps) {
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
  return renderUse("towel-rack", SPRITE_PATH, props);
}
