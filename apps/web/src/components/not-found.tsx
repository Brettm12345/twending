import { BinocularsIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

export function NotFound({
  title = "404 - Not Found",
  buttonText = "Return Home",
  message = "The page you're looking for doesn't exist. Click the button below to return to the home page.",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string;
  buttonText?: string;
  message?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-dvh w-dvw flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      <Empty>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={BinocularsIcon} />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{message}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link to="/">{buttonText}</Link>} variant="outline" />
        </EmptyContent>
      </Empty>
    </div>
  );
}
