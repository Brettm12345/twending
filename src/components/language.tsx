import { getColor } from 'data/languages'
import { FC } from 'react'
import { cn } from 'ts-classnames'

interface LanguageProps {
  children: string;
}

const Language: FC<LanguageProps> = ({ children }) => (
  <span className={cn("inline-flex", "mr-4")}>
    <span
      css={{
        backgroundColor: getColor(children),
        bottom: "-0.1em"
      }}
      className={cn(
        "relative",
        "w-4",
        "h-4",
        "mr-1",
        "text-gray-400",
        "rounded-full"
      )}
    />
    <span>{children}</span>
  </span>
);

export default Language;
