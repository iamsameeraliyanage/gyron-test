'use client';

import { NavBarLink } from '@/api/types';
import { Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';
import React from 'react';

const NavLinks = ({
  navLinks,
  isMobile = false,
}: {
  navLinks: NavBarLink[];
  isMobile?: boolean;
}) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <ul
      className={clsx(
        'flex list-none items-center',
        isMobile ? 'flex-col pt-8' : 'flex-row'
      )}
    >
      {navLinks.map((link: NavBarLink) => (
        <li
          key={link.id}
          className={isMobile ? 'mb-8 border-b border-gray-500' : ''}
        >
          <Link
            href={link.link === '/home' ? '/' : link.link}
            className={clsx(
              isMobile
                ? 'w-full px-4 py-3 block text-2xl'
                : 'px-3 py-2 rounded-md text-base',
              isActive(link.link)
                ? 'text-skyline'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
