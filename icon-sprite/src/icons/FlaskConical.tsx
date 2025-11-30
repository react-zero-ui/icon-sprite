import { SPRITE_PATH } from "../config.js";
import { FlaskConical as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function FlaskConical(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return <DevIcon {...(rest as any)} size={size ?? 24} width={width} height={height} />;
  }
  return renderUse("flask-conical", SPRITE_PATH, props);
}
