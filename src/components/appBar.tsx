import React from 'react'
import { Github } from 'styled-icons/feather/Github'

interface AppBarProps {
  children?: React.ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ children }) => (
  <header className="fixed top-0 right-0 z-50 flex w-full bg-gray-800 shadow-md">
    <div className="relative flex items-center w-full h-20 px-4">
      <a
        className="mr-16 opacity-75 hover:opacity-100 transition-opacity"
        href="https://github.com/brettm12345/twending"
      >
        <Github size="3em" />
      </a>
      <div className="flex justify-end" style={{ width: "calc(100vw - 9em)" }}>
        {children}
      </div>
    </div>
  </header>
);

export default AppBar;
