import React from 'react'

interface AppBarProps {
  children?: React.ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ children }) => (
  <header className="fixed top-0 right-0 flex w-full bg-gray-800">
    <div className="relative flex items-center justify-end w-full h-20 px-4">
      {children}
    </div>
  </header>
);

export default AppBar;
