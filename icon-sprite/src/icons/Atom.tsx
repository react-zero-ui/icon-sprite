import { SPRITE_PATH } from "../config.js";
import { Atom as DevIcon } from "../lucide-archive/Atom.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Atom(props: IconProps) {
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
  return renderUse("atom", SPRITE_PATH, props);
}
