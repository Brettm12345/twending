import { FC, ReactNode } from 'react'
import { Github } from 'styled-icons/feather/Github'
import { cn } from 'ts-classnames'

interface AppBarProps {
  children?: ReactNode;
}

const AppBar: FC<AppBarProps> = ({ children }) => (
  <header
    className={cn(
      "fixed",
      "top-0",
      "right-0",
      "z-50",
      "flex",
      "w-full",
      "bg-gray-800",
      "shadow-md"
    )}
  >
    <div
      className={cn(
        "relative",
        "flex",
        "items-center",
        "w-full",
        "h-20",
        "px-4"
      )}
    >
      <a
        className={cn(
          "mr-16",
          "opacity-75",
          "hover:opacity-100",
          "transition-opacity"
        )}
        href="https://github.com/brettm12345/twending"
      >
        <Github size="3em" />
      </a>
      <div
        className={cn("flex", "justify-end")}
        style={{ width: "calc(100vw - 9em)" }}
      >
        {children}
      </div>
    </div>
  </header>
);

export default AppBar;
