import { SPRITE_PATH } from "../config.js";
import { FolderBookmark as DevIcon } from "../lucide-archive/FolderBookmark.js";
import { renderUse, type IconProps } from "../_shared.js";

export function FolderBookmark(props: IconProps) {
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
  return renderUse("folder-bookmark", SPRITE_PATH, props);
}
