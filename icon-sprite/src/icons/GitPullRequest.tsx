import { SPRITE_PATH } from "../config.js";
import { GitPullRequest as DevIcon } from "../lucide-archive/GitPullRequest.js";
import { renderUse, type IconProps } from "../_shared.js";

export function GitPullRequest(props: IconProps) {
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
  return renderUse("git-pull-request", SPRITE_PATH, props);
}
