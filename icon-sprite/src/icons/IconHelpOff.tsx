import { SPRITE_PATH } from "../config.js";
import { IconHelpOff as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconHelpOff(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("tabler-help-off", SPRITE_PATH, props);
}
