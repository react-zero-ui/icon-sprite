import { SPRITE_PATH } from "../config.js";
import { FileBox as DevIcon } from "../lucide-archive/FileBox.js";
import { renderUse, type IconProps } from "../_shared.js";

export function FileBox(props: IconProps) {
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
  return renderUse("file-box", SPRITE_PATH, props);
}
