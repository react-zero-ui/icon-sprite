import { SPRITE_PATH } from "../config.js";
import { IconBrandAdobeAfterEffect as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconBrandAdobeAfterEffect(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("tabler-brand-adobe-after-effect", SPRITE_PATH, props);
}
