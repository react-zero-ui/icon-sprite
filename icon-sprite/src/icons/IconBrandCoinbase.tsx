import { SPRITE_PATH } from "../config.js";
import { IconBrandCoinbase as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconBrandCoinbase(props: IconProps) {
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
  return renderUse("tabler-brand-coinbase", SPRITE_PATH, props);
}
