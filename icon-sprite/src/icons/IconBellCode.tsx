import { SPRITE_PATH } from "../config.js";
import { IconBellCode as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconBellCode(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("tabler-bell-code", SPRITE_PATH, props);
}
