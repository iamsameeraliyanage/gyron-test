import React from 'react';

const HamburgerMenuIconButton = ({
  onClick,
  isActive,
  color = 'white',
}: {
  onClick: () => void;
  isActive: boolean;
  color?: 'white' | 'primary';
}) => {
  const bgColor = color === 'white' ? 'bg-white' : 'bg-primary';
  return (
    <button
      className="relative group"
      onClick={onClick}
      aria-label="Toggle Menu"
    >
      <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200">
        <div
          className={`flex flex-col justify-between w-[24px] h-[18px] transform transition-all duration-300 origin-center overflow-hidden ${
            isActive ? 'active' : ''
          }`}
        >
          {/* Top bar */}
          <div
            className={`${bgColor} h-[2px] w-8 transform transition-all duration-300 origin-left ${
              isActive ? 'translate-x-10' : ''
            }`}
          ></div>

          {/* Middle bar */}
          <div
            className={`${bgColor} h-[2px]  w-8 rounded transform transition-all duration-300 ${
              isActive ? 'translate-x-10 delay-75' : ''
            }`}
          ></div>

          {/* Bottom bar */}
          <div
            className={`${bgColor} h-[2px]  w-8 transform transition-all duration-300 origin-left ${
              isActive ? 'translate-x-10 delay-150' : ''
            }`}
          ></div>

          {/* X Icon */}
          <div
            className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 ${
              isActive ? 'translate-x-0' : ''
            } flex w-0 ${isActive ? 'w-8' : ''}`}
          >
            <div
              className={`absolute ${bgColor} h-[2px] w-6 transform transition-all duration-500 rotate-0 delay-300 ${
                isActive ? 'rotate-45' : ''
              }`}
            ></div>
            <div
              className={`absolute ${bgColor} h-[2px] w-6 transform transition-all duration-500 -rotate-0 delay-300 ${
                isActive ? '-rotate-45' : ''
              }`}
            ></div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default HamburgerMenuIconButton;
