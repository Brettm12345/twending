import { Image } from "@unpic/react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      className={cn(
        "relative rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      href="https://github.com/brettm12345/twending"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt="Twending"
        className={className}
        height={40}
        layout="constrained"
        src="/logo.png"
        width={40}
      />
    </a>
  );
}
