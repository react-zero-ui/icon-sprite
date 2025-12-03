import { SPRITE_PATH } from "../config.js";
import { IconArrowUpRightCircle as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconArrowUpRightCircle(props: IconProps) {
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
  return renderUse("tabler-arrow-up-right-circle", SPRITE_PATH, props);
}
