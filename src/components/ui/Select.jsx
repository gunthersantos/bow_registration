import clsx from 'clsx';

export const Select = ({
  label,
  options,
  className,
  ...props
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={props.name} className="text-sm font-semibold text-gray-700">{label}</label>
    <select
      {...props}
      id={props.name}
      className={clsx(
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-bow-indigo focus:border-bow-indigo py-2 px-3",
        className
      )}
    >
      <option value="">Select...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);