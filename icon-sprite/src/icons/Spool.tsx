import { SPRITE_PATH } from "../config.js";
import { Spool as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function Spool(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("spool", SPRITE_PATH, props);
}
