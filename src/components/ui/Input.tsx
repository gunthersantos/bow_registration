import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, className, ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={props.name} className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      {...props}
      id={props.name}
      className={clsx(
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-bow-indigo focus:border-bow-indigo py-2 px-3",
        className
      )}
    />
  </div>
);