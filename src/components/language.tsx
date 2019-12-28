import { getColor } from 'data/languages'
import { prop } from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { cn } from 'ts-classnames'

const Dot = styled("span")<{ color: string }>`
  background-color: ${prop("color")};
  bottom: -0.1em;
`;

interface LanguageProps {
  children: string;
}

const Language: React.FC<LanguageProps> = ({ children }) => (
  <span className={cn("inline-flex", "mr-4")}>
    <Dot
      color={getColor(children)}
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
