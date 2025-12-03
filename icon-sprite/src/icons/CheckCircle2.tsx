import { SPRITE_PATH } from "../config.js";
import { CheckCircle2 as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function CheckCircle2(props: IconProps) {
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
  return renderUse("check-circle-2", SPRITE_PATH, props);
}
