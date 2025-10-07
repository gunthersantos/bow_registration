import clsx from 'clsx';

export const Button = ({ 
  variant = "primary", 
  size = "md", 
  className, 
  children, 
  ...props 
}) => {
  return (
    <button
      className={clsx(
        "rounded-lg font-medium transition-all duration-150 flex items-center gap-1",
        {
          "bg-bow-indigo text-white hover:bg-bow-indigo/90": variant === "primary",
          "border border-bow-indigo text-bow-indigo bg-white hover:bg-bow-indigo/10": variant === "outline",
          "bg-transparent text-bow-indigo hover:bg-bow-indigo/5": variant === "ghost",
          "py-2 px-4 text-base": size === "md",
          "py-1 px-3 text-sm": size === "sm",
          "py-3 px-6 text-lg": size === "lg"
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};