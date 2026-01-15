import { Link } from "@tanstack/react-router";
import { BinocularsIcon } from "lucide-react";
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
        "flex flex-col items-center justify-center h-dvh w-dvw",
        className,
      )}
      {...props}
    >
      <Empty>
        <EmptyMedia variant="icon">
          <BinocularsIcon />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{message}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" render={<Link to="/">{buttonText}</Link>} />
        </EmptyContent>
      </Empty>
    </div>
  );
}
