import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const appBarVariants = cva(
  "bg-sidebar shadow-sm border-b border-border flex items-center justify-between px-4",
  {
    variants: {
      size: {
        default: "h-16",
        sm: "h-12",
        lg: "h-20",
      },
      position: {
        default: "relative",
        fixed:
          "fixed top-0 left-0 right-0 z-10 mb-16 has-[[data-size=sm]]:mb-12 has-[[data-size=lg]]:mb-20",
        sticky: "sticky top-0 left-0 right-0 z-10",
      },
      defaultVariants: {
        size: "default",
        position: "default",
      },
    },
  },
);

export function AppBar({
  size = "default",
  position = "default",
  className,
  ...props
}: React.ComponentProps<"header"> & VariantProps<typeof appBarVariants>) {
  return (
    <header
      className={cn(appBarVariants({ size, position }), className)}
      data-slot="app-bar"
      data-size={size}
      {...props}
    />
  );
}
