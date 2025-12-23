import { cn } from "#/utils";
import { ReactNode } from "react";

interface FooterTextProps {
  children: ReactNode;
  className?: string;
}

export default function FooterText({ children, className }: FooterTextProps) {
  return (
    <p className={cn("text-b4-400 text-secondary-300", className)}>
      {children}
    </p>
  );
}
