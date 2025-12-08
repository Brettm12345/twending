import { Github } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      href="https://github.com/brettm12345/twending"
      target="_blank"
      rel="noopener"
      className={cn("outline-none", className)}
      {...props}
    >
      <Github className="size-10" />
    </a>
  );
}
