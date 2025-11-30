import { SPRITE_PATH } from "../config.js";
import { Grid3x3 as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Grid3x3(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("grid-3-x-3", SPRITE_PATH, props);
}
