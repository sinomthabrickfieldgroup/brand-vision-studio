import { WORDMARK } from "@/components/wordmark-paths";
import { cn } from "@/lib/utils";

/**
 * The Brickfield Group wordmark (approved). BRICKFIELD takes the current text colour and
 * GROUP the brand gold, so it works on light and dark backgrounds. The monograms in the
 * concepts deck are not approved yet and are deliberately not used.
 */
export function Wordmark({
  layout = "horizontal",
  className,
  title = "Brickfield Group",
}: {
  layout?: "horizontal" | "stacked" | undefined;
  className?: string | undefined;
  title?: string;
}) {
  const l = WORDMARK[layout];
  return (
    <svg
      viewBox={l.viewBox}
      role="img"
      aria-label={title}
      className={cn("wordmark", `wordmark-${layout}`, className)}
    >
      <path
        d={WORDMARK.brickfield}
        transform={`translate(${l.brickfield[0]} ${l.brickfield[1]})`}
        className="wordmark-brickfield"
      />
      <path
        d={WORDMARK.group}
        transform={`translate(${l.group[0]} ${l.group[1]})`}
        className="wordmark-group"
      />
    </svg>
  );
}
