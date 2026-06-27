import { SPRITE_PATH } from "../config.js";
import { SignalMedium as DevIcon } from "../lucide-archive/SignalMedium.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SignalMedium(props: IconProps) {
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
  return renderUse("signal-medium", SPRITE_PATH, props);
}
