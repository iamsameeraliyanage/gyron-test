import Image from 'next/image';
import React from 'react';

export interface ConfiguratorSlide {
  id: number;
  img: string;
  alt: string;
}

const ConfiguratorSliderImage = ({ slide }: { slide: ConfiguratorSlide }) => {
  return (
    <div className="relative h-full">
      <Image
        src={slide.img}
        alt={slide.alt}
        fill
        quality={100}
        style={{ objectFit: 'cover' }}
        unoptimized
      />
    </div>
  );
};

export default ConfiguratorSliderImage;
