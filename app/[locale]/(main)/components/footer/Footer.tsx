import { Link } from '@/i18n/routing';
import React from 'react';

const Footer = () => {
  return (
    <div className="bg-primary px-8 py-10 mt-auto">
      <div className="max-w-5xl mx-auto text-white text-center">
        <div className="mb-4">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            euismod, justo ut placerat facilisis, nulla dolor sollicitudin
            lacus, ac luctus justo neque non mauris. Curabitur nec nisi nec mi
            cursus ullamcorper id a libero. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Suspendisse potenti. Quisque et pharetra odio.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 mb-4">
          <Link href="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-use" className="text-sm  hover:underline">
            Terms of Use
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4">
          <p className="text-sm">
            GYRON PRO.AG © {new Date().getFullYear()}. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
