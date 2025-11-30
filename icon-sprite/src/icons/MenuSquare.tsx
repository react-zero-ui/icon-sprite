import { SPRITE_PATH } from "../config.js";
import { MenuSquare as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function MenuSquare(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("menu-square", SPRITE_PATH, props);
}
