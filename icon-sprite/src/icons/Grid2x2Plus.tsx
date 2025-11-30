import { SPRITE_PATH } from "../config.js";
import { Grid2x2Plus as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Grid2x2Plus(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("grid-2-x-2-plus", SPRITE_PATH, props);
}
