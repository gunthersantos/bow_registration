import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div className={clsx("rounded-2xl shadow-lg bg-white", className)}>
    {children}
  </div>
);