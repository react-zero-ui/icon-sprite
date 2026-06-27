import { SPRITE_PATH } from "../config.js";
import { CaseLower as DevIcon } from "../lucide-archive/CaseLower.js";
import { renderUse, type IconProps } from "../_shared.js";

export function CaseLower(props: IconProps) {
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
  return renderUse("case-lower", SPRITE_PATH, props);
}
