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

export function NotFound({
  title = "404 - Not Found",
  buttonText = "Return Home",
  message = "The page you&apos;re looking for doesn&apos;t exist. Click the button below to return to the home page.",
  ...props
}: React.ComponentProps<typeof Empty> & {
  title?: string;
  buttonText?: string;
  message?: string;
}) {
  return (
    <Empty {...props}>
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
  );
}
