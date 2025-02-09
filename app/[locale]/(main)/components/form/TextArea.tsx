import React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  label?: string;
  helperText?: string;
  optional?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
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
      <textarea
        rows={4}
        {...props}
        className={`block outline-none w-full placeholder-shown:bg-gray-100 rounded-md  bg-white focus:bg-white px-4 py-3 text-base text-primary placeholder-gray-400 border resize-none ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-500 focus:border-skyline'
        }`}
      />
      {error && helperText && (
        <div className="text-sm text-red-500">{helperText}</div>
      )}
    </div>
  </div>
);

export default TextArea;
