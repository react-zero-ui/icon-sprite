import { SPRITE_PATH } from "../config.js";
import { Columns4 as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Columns4(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("columns-4", SPRITE_PATH, props);
}
