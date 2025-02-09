import React from 'react';
import ConfiguratorSlider from '../configurator-slider/ConfiguratorSlider';
import { Link } from '@/i18n/routing';
import { BsTelephone } from 'react-icons/bs';

const ConfiguratorMainBody = () => {
  return (
    <div className="relative grow">
      <ConfiguratorSlider />
      <div className="absolute left-0 bottom-2 z-20">
        <Link
          href="#"
          className="flex gap-2 items-center transition-all bg-skyline px-5 py-2 text-white rounded-r-full hover:bg-primary"
        >
          <div>
            <BsTelephone className="h-4 w-4" />
          </div>
          <div className="text-sm">Contact Dealer</div>
        </Link>
      </div>
    </div>
  );
};

export default ConfiguratorMainBody;
