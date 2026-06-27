import { SPRITE_PATH } from "../config.js";
import { FileAudio2 as DevIcon } from "../lucide-archive/FileAudio2.js";
import { renderUse, type IconProps } from "../_shared.js";

export function FileAudio2(props: IconProps) {
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
  return renderUse("file-audio-2", SPRITE_PATH, props);
}
