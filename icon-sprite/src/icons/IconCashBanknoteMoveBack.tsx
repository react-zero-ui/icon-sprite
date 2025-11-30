import { SPRITE_PATH } from "../config.js";
import { IconCashBanknoteMoveBack as DevIcon } from "@tabler/icons-react";
import { renderUse, type IconProps } from "../_shared.js";

export function IconCashBanknoteMoveBack(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("tabler-cash-banknote-move-back", SPRITE_PATH, props);
}
