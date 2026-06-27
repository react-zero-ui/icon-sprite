import { SPRITE_PATH } from "../config.js";
import { Codepen as DevIcon } from "../lucide-archive/Codepen.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Codepen(props: IconProps) {
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
  return renderUse("codepen", SPRITE_PATH, props);
}
