import { SPRITE_PATH } from "../config.js";
import { FileSearch as DevIcon } from "../lucide-archive/FileSearch.js";
import { renderUse, type IconProps } from "../_shared.js";

export function FileSearch(props: IconProps) {
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
  return renderUse("file-search", SPRITE_PATH, props);
}
