import { SPRITE_PATH } from "../config.js";
import { PackageMinus as DevIcon } from "../lucide-archive/PackageMinus.js";
import { renderUse, type IconProps } from "../_shared.js";

export function PackageMinus(props: IconProps) {
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
  return renderUse("package-minus", SPRITE_PATH, props);
}
