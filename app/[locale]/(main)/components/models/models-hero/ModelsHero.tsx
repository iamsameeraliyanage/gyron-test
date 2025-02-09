import { Link } from '@/i18n/routing';
import Image from 'next/image';
import React from 'react';
import { FaHelicopter as FaHelicopter6 } from 'react-icons/fa6';
import Breadcrumbs from '@/app/components/breadcrumbs/Breadcrumbs';
import { GyroSpecificationModel } from '@/api/types';

const ModelsHero = ({ models }: { models: GyroSpecificationModel[] }) => {
  return (
    <section className="h-[calc(90vh-5rem)] md:h-[calc(100vh-5rem)] relative bg-[linear-gradient(85.56deg,_#001148_3.64%,_#3272A7_69.44%)]">
      <Image
        src="/models/models-hero.png"
        alt="model-hero"
        fill
        className="object-contain object-right md:object-right-top"
      />
      <div className="absolute top-6 left-0 z-20 hidden md:block">
        <Breadcrumbs />
      </div>
      <div className="absolute top-0 bottom-0 left-0 z-10 pt-8 md:pt-12">
        <div className="flex h-full flex-col justify-center p-8 md:p-12">
          <div className="text-white">
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold uppercase">
              Gyron.Pro
            </h4>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.8]">
              Models
            </h1>
            <div className="mt-8 md:mt-12">
              <div className="flex gap-4 items-center">
                {models.map((model) => {
                  return (
                    <Link
                      key={model.id}
                      href={`/models/${model.slug}`}
                      className="group shadow-md bg-[#0077C133] py-3 md:py-4 px-6 md:px-8 rounded-xl text-lg hover:bg-skyline transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <FaHelicopter6 />
                        <div>{model.name}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelsHero;
