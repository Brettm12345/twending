import { languages } from "@/lib/languages";
import { cn } from "@/lib/utils";

interface LanguageIndicatorProps extends React.ComponentProps<"div"> {
  language: string;
}

const allLanguagesColor = "#ef4444";

export const LanguageIndicator = ({
  language = "Unknown",
  className,
  ...props
}: LanguageIndicatorProps) => (
  <div
    className={cn("size-3.5 rounded-full border border-border", className)}
    data-slot="language-indicator"
    style={{
      backgroundColor:
        language === "All Languages"
          ? allLanguagesColor
          : languages.colors[language as keyof typeof languages.colors],
    }}
    {...props}
  />
);
