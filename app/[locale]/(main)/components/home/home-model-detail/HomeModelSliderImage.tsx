import { GyroModel } from '@/api/types';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { IoMdArrowForward } from 'react-icons/io';
import { STRAPI_IMAGE_BASE_URL } from '@/api/endpoints';

const HomeModelSliderImage = ({ model }: { model: GyroModel }) => {
  const imageUrl = STRAPI_IMAGE_BASE_URL + model.images[0].url;
  return (
    <div className="relative h-full">
      <Image
        aria-details={model.name}
        src={imageUrl}
        alt={model.name}
        fill
        quality={100}
        style={{ objectFit: 'cover' }}
      />
      <div className="modelSliderOverlay absolute top-0 left-0 bottom-0 w-3/4 z-[2]" />
      <div className="absolute z-10 bottom-0 left-0 text-white p-4 md:p-12 max-w-[50%]">
        <p className="text-sm sm:text-base md:text-lg text-inherit">
          {model.description}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold text-inherit uppercase mb-2 mt-2">
          {model.name}
        </h2>
        <div>
          <div>
            <Link href={`/design/${model.slug}`} className="group">
              <div className="flex items-center gap-4">
                <h3 className="text-base sm:text-xl md:text-2xl font-bold uppercase group-hover:text-skyline transition-colors">
                  Start Configuration
                </h3>
                <div className="flex items-center transition-all text-base md:text-2xl font-extrabold group-hover:translate-x-2 group-hover:text-skyline">
                  <MdOutlineArrowForwardIos />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Link
          href={`/models/${model.slug}`}
          className="absolute z-10 bottom-4 md:bottom-6 right-4 md:right-6 text-white p-4  md:p-8 bg-primary text-xl md:text-4xl rounded-full group hover:bg-skyline transition-all"
        >
          <IoMdArrowForward className="group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
};

export default HomeModelSliderImage;
