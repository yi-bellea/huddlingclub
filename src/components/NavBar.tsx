import type { ReactNode } from "react";
import IconNone from "./IconNone";

export type NavBarProps = {
  className?: string;
  left?: ReactNode;
  right?: ReactNode;
  title?: string;
};

export default function NavBar({ className = "", left, right, title = "Label" }: NavBarProps) {
  return (
    <header className={`flex h-[calc(var(--spacing-60)+var(--spacing-5))] w-full items-center gap-[var(--spacing-section)] px-[var(--spacing-page-horizontal)] ${className}`}>
      {left ?? <IconNone />}
      <p className="min-w-0 flex-1 typography-preserved-semibold-18-1 text-center text-[var(--color-guide-text-preserved-1)]">
        {title}
      </p>
      {right ?? <IconNone />}
    </header>
  );
}
