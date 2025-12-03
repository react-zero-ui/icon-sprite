import { SPRITE_PATH } from "../config.js";
import { CloudDownload as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function CloudDownload(props: IconProps) {
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
  return renderUse("cloud-download", SPRITE_PATH, props);
}
