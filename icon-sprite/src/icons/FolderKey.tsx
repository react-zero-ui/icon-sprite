import { SPRITE_PATH } from "../config.js";
import { FolderKey as DevIcon } from "../lucide-archive/FolderKey.js";
import { renderUse, type IconProps } from "../_shared.js";

export function FolderKey(props: IconProps) {
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
  return renderUse("folder-key", SPRITE_PATH, props);
}
