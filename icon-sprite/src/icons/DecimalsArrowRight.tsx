import { SPRITE_PATH } from "../config.js";
import { DecimalsArrowRight as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function DecimalsArrowRight(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("decimals-arrow-right", SPRITE_PATH, props);
}
