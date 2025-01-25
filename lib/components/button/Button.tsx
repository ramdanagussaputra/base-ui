import React from "react";

export interface ButtonProps {
  readonly children: React.ReactNode;
  readonly onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-error-300 bigtext cursor-pointer rounded p-1"
    >
      {children}
    </button>
  );
}
