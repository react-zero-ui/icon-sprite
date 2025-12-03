import { SPRITE_PATH } from "../config.js";
import { IconHomeHand as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconHomeHand(props: IconProps) {
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
  return renderUse("tabler-home-hand", SPRITE_PATH, props);
}
