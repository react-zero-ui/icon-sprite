import { SPRITE_PATH } from "../config.js";
import { IconAlignBoxLeftMiddle as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconAlignBoxLeftMiddle(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("tabler-align-box-left-middle", SPRITE_PATH, props);
}
