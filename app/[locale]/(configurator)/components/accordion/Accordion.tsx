'use client';
import clsx from 'clsx';
import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  open = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className="flex flex-col">
      <button
        aria-expanded={isOpen}
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
          e.preventDefault();
        }}
        className="flex justify-between items-center w-full py-4 px-6 text-left border border-stone-200 bg-gray-100 hover:bg-gray-200 focus:outline-none rounded-md"
      >
        <span className="text-gray-800">{title}</span>
        <BsChevronDown
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={clsx(
          ` bg-white border border-t-0 transition-all duration-500 rounded-md`,
          isOpen
            ? 'max-h-screen overflow-auto border-stone-200'
            : 'max-h-0 overflow-hidden border-transparent'
        )}
      >
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
