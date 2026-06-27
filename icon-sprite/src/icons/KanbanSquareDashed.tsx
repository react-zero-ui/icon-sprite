import { SPRITE_PATH } from "../config.js";
import { KanbanSquareDashed as DevIcon } from "../lucide-archive/KanbanSquareDashed.js";
import { renderUse, type IconProps } from "../_shared.js";

export function KanbanSquareDashed(props: IconProps) {
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
  return renderUse("kanban-square-dashed", SPRITE_PATH, props);
}
