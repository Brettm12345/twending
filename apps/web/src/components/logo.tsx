import { Github } from "lucide-react";

export function Logo({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a href="https://github.com/brettm12345/twending" target="_blank" rel="noopener" className={className} {...props}>
      <Github className="size-10" />
    </a>
  );
}