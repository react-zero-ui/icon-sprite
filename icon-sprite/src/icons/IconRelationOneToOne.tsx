import { SPRITE_PATH } from "../config.js";
import { IconRelationOneToOne as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconRelationOneToOne(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("tabler-relation-one-to-one", SPRITE_PATH, props);
}
