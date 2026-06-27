import { SPRITE_PATH } from "../config.js";
import { DatabaseSearch as DevIcon } from "../lucide-archive/DatabaseSearch.js";
import { renderUse, type IconProps } from "../_shared.js";

export function DatabaseSearch(props: IconProps) {
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
  return renderUse("database-search", SPRITE_PATH, props);
}
