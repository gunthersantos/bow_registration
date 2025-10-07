import clsx from 'clsx';

export const Card = ({ children, className }) => (
  <div className={clsx("rounded-2xl shadow-lg bg-white", className)}>
    {children}
  </div>
);