'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay, EffectFade } from 'swiper/modules';

import { Swiper as SwiperCore } from 'swiper';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import HomeModelSliderImage from './HomeModelSliderImage';
import { GyroModel } from '@/api/types';

const HomeModelSlider = ({ models }: { models: GyroModel[] }) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="h-full w-full relative">
      <Swiper
        modules={[Navigation, A11y, EffectFade, Autoplay]}
        effect="fade"
        loop={true}
        className="h-full w-full"
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        onInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {models.map((model) => (
          <SwiperSlide key={model.id} className="h-full bg-primary">
            <HomeModelSliderImage model={model} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute top-0 left-0 w-4/5 z-10 p-4 md:p-12">
        <div className="h-full flex flex-col">
          <div className="mb-4">
            <div className="mb-2 md:mb-4">
              <h6 className="text-lg md:text-3xl font-bold">MODELS</h6>
            </div>
            <div className="flex gap-2">
              <button
                className="custom-prev bg-primary p-2 md:p-4 rounded-full shadow-md hover:bg-gray-800 hover:opacity-65 transition-all"
                onClick={handlePrevClick}
              >
                <IoMdArrowBack className="h-4 w-4 text-white" />
              </button>

              <button
                className="custom-next bg-primary p-2 md:p-4 rounded-full shadow-md hover:bg-gray-800 hover:opacity-65 transition-all"
                onClick={handleNextClick}
              >
                <IoMdArrowForward className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModelSlider;
