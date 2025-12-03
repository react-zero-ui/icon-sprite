import { SPRITE_PATH } from "../config.js";
import { WalletCards as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function WalletCards(props: IconProps) {
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
  return renderUse("wallet-cards", SPRITE_PATH, props);
}
