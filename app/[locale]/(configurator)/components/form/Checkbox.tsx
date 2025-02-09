import { clsx } from 'clsx';
import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  error,
}) => (
  <div className="flex items-center cursor-pointer">
    <input
      id={id}
      name={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={clsx(
        'h-4 w-4 rounded border-gray-300 cursor-pointer',
        error
          ? 'text-red-600 focus:ring-red-500'
          : 'text-indigo-600 focus:ring-indigo-500'
      )}
    />
    <label
      htmlFor={id}
      className={clsx(
        `ml-2 block text-sm cursor-pointer`,
        error ? ' text-red-500' : 'text-gray-900'
      )}
    >
      {label}
    </label>
  </div>
);

export default Checkbox;
