import { SPRITE_PATH } from "../config.js";
import { FileBarChart as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function FileBarChart(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("file-bar-chart", SPRITE_PATH, props);
}
