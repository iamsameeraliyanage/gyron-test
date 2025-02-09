'use client';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import React, { useState } from 'react';
import LocaleSwitcher from '../../../../components/locale-switcher/LocaleSwitcher';
import NavLinks from './NavLinks';
import HamburguerMenuIconButton from '@/app/components/hamburger-menu-icon-button/HamburguerMenuIconButton';
import { NavBarLink } from '@/api/types';
import clsx from 'clsx';

const Navbar = ({ navLinks }: { navLinks: NavBarLink[] }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => setIsActive(!isActive);

  return (
    <>
      <header className="relative top-0 left-0 right-0 z-50">
        <nav>
          <div className="px-4 md:px-8 h-20 hidden items-center w-full md:flex">
            <div className="flex items-center justify-center w-full">
              <div className="flex  items-center ">
                <Link href="/" className="p-4 pt-8 w-80 h-auto">
                  <Image
                    src="/gyro-full.png"
                    alt="Gyron Logo"
                    width={922}
                    height={180}
                  />
                </Link>
              </div>
              <div className="hidden items-center basis-[300px] ">
                <NavLinks navLinks={navLinks} />
              </div>

              <div className="hidden basis-[300px] justify-end">
                <div>
                  <LocaleSwitcher />
                </div>
              </div>
            </div>
          </div>

          <div
            className="md:hidden flex items-center w-full px-4"
            aria-description="mobile-menu"
          >
            <div className="flex items-center w-full justify-center">
              <Link href="/" className="p-8 w-80 h-auto">
                <Image
                  src="/gyro-full.png"
                  alt="Gyron Logo"
                  width={922}
                  height={180}
                />
              </Link>
            </div>

            <div className="ml-auto hidden items-center">
              <LocaleSwitcher />
              <HamburguerMenuIconButton
                isActive={isActive}
                onClick={toggleMenu}
              />
            </div>
          </div>
        </nav>
      </header>
      <div
        className={clsx(
          'fixed top-[52px] w-full h-full md:hidden bg-primary z-50 ease-in-out duration-300',
          isActive ? 'right-0' : '-right-full'
        )}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLinks navLinks={navLinks} isMobile />
        </div>
      </div>
    </>
  );
};

export default Navbar;
