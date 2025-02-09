import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  helperText?: string;
  optional?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  optional,
  ...props
}) => (
  <div>
    {label && (
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-primary mb-2"
      >
        {label}{' '}
        {optional && <span className="ml-1 text-gray-400">(Optional)</span>}
      </label>
    )}
    <div className="">
      <input
        {...props}
        className={`block outline-none w-full rounded-md bg-white px-4 py-3 text-base text-primary placeholder-gray-400 border ${
          error
            ? 'border-red-500 focus:border-red-700'
            : 'border-gray-300 focus:border-indigo-600'
        }`}
      />
      {error && helperText && (
        <div className="text-sm text-red-500">{helperText}</div>
      )}
    </div>
  </div>
);

export default TextInput;
