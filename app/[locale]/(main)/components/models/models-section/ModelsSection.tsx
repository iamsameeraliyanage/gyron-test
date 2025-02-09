import { GyroSpecificationModel } from '@/api/types';
import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const ModelsSection = ({
  model,
  index = 0,
}: {
  model: GyroSpecificationModel;
  index?: number;
}) => {
  let contentSide: 'left' | 'right' = 'left';
  if (index % 2 === 0) {
    contentSide = 'right';
  }
  return (
    <section className="flex flex-col relative h-[calc(70vh-5rem)] md:h-[calc(100vh-5rem)]">
      <Image
        src={`/models/${model.partId}.png`}
        alt={model.name}
        fill
        className="object-cover"
      />

      <div
        className={clsx(
          'absolute z-10 bottom-0 md:top-0 flex flex-col justify-center p-4 py-8 md:py-12 sm:p-8 md:p-12',
          contentSide === 'left' ? 'left-4 md:left-6' : 'right-4 md:right-6'
        )}
      >
        <h3 className="text-xl md:text-2xl text-primary font-semibold">
          Model {index + 1}
        </h3>

        <h3 className="text-5xl md:text-7xl text-primary font-bold   uppercase">
          {model.name}
        </h3>

        <div className="flex gap-6 mt-4">
          <Link
            href={`/models/${model.slug}`}
            className="text-primary px-6 py-3 bg-white rounded-md font-semibold hover:bg-skyline hover:text-white transition-all"
          >
            Check the Specifications
          </Link>
          <Link
            href={`/design/${model.slug}`}
            className="text-white px-6 py-3 bg-primary rounded-md font-semibold hover:bg-skyline hover:text-white transition-all"
          >
            Configure Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
