'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, EffectCoverflow, Autoplay } from 'swiper/modules';
import ConfiguratorSliderImage, {
  ConfiguratorSlide,
} from './ConfiguratorSliderImage';
import { Swiper as SwiperCore } from 'swiper';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const sliders: ConfiguratorSlide[] = [
  {
    id: 1,
    img: '/temp/slider/slider-1.jpg',
    alt: 'Background',
  },
  {
    id: 2,
    img: '/temp/slider/slider-2.jpg',
    alt: 'Background',
  },
  {
    id: 3,
    img: '/temp/slider/slider-3.jpg',
    alt: 'Background',
  },
  {
    id: 4,
    img: '/temp/slider/slider-4.jpg',
    alt: 'Background',
  },
];

const ConfiguratorSlider = () => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="h-full w-full">
      <button
        className="custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white py-8 px-4 rounded-tr-lg rounded-br-lg shadow-md hover:bg-slate-100 transition-all"
        onClick={handlePrevClick}
      >
        <SlArrowLeft className="h-4 w-4" />
      </button>

      <Swiper
        modules={[Navigation, A11y, EffectCoverflow, Autoplay]}
        effect="coverflow"
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
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full bg-primary">
            <ConfiguratorSliderImage slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="custom-next absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white py-8 px-4 rounded-tl-lg rounded-bl-lg shadow-md hover:bg-slate-100 transition-all"
        onClick={handleNextClick}
      >
        <SlArrowRight className="h-4 w-4" />
      </button>
      <div className="absolute h-1/3 inset-x-0 bottom-0 bg-gradient-to-t from-configFooter via-configFooter/20 to-transparent p-12 z-10" />
    </div>
  );
};

export default ConfiguratorSlider;
