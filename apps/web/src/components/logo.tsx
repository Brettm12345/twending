import { Image } from "@unpic/react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="https://github.com/brettm12345/twending"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-md relative",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="Twending"
        layout="constrained"
        width={40}
        height={40}
        className={className}
      />
    </a>
  );
}
