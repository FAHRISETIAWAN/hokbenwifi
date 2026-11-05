import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  yellow: "bg-primary/15 text-brand",
  blue: "bg-info/15 text-info",
  neutral: "bg-muted text-foreground",
  solid: "bg-primary text-primary-foreground",
} as const;

const SIZES = {
  sm: "size-8 rounded-lg [&_svg]:size-4",
  md: "size-10 rounded-xl [&_svg]:size-5",
  lg: "size-14 rounded-2xl [&_svg]:size-7",
  xl: "size-20 rounded-3xl [&_svg]:size-10",
} as const;

export function IconBox({
  icon: Icon,
  tone = "yellow",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-colors",
        TONES[tone],
        SIZES[size],
        className,
      )}
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
