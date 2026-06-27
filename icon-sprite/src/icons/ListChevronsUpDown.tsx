import { SPRITE_PATH } from "../config.js";
import { ListChevronsUpDown as DevIcon } from "../lucide-archive/ListChevronsUpDown.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ListChevronsUpDown(props: IconProps) {
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
  return renderUse("list-chevrons-up-down", SPRITE_PATH, props);
}
