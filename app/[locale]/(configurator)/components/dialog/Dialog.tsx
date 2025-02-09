'use client';

import { ReactNode } from 'react';
import { TfiClose } from 'react-icons/tfi';

export default function Dialog({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-8">
      <div className="relative w-full max-w-2xl py-10 px-8 bg-white rounded-lg shadow-lg  max-h-full overflow-auto">
        <div className="absolute top-3 right-4 p-4">
          <button
            className="text-gray-500 hover:text-black"
            onClick={onClose}
            aria-label="Close"
          >
            <TfiClose />
          </button>
        </div>
        <div className="flex flex-col max-h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
