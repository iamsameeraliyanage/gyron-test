import { GyroSpecificationModel } from '@/api/types';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import React from 'react';
import { GoArrowUpRight } from 'react-icons/go';

const ModelSpecifications = ({
  modelDetail,
}: {
  modelDetail: GyroSpecificationModel;
}) => {
  const modelName = modelDetail.name;
  const specifications = modelDetail.specs;
  const modelId = modelDetail.slug;

  const half = Math.ceil(specifications.length / 2);
  const leftColumn = specifications.slice(0, half);
  const rightColumn = specifications.slice(half);

  return (
    <section className="bg-primary text-white p-4 py-8 md:py-16 md:p-16 relative">
      <h2 className="absolute md:text-9xl lg:text-[200px] font-bold z-0 top-1/2 transform -translate-y-1/2 opacity-5 hidden md:block">
        GYRON PRO
      </h2>
      <div className="flex -mx-4 md:-mx-8">
        <div className="relative min-h-40 lg:w-2/3 px-4 md:px-8 lg:basis-2/3 lg:max-w-[66.6667%] hidden lg:block">
          <Image
            src={'/model-detail/model-spec.png'}
            alt="Specification"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-full lg:w-1/3 px-4 md:px-8  lg:basis-1/3 lg:max-w-[33.33333%]">
          <div className="">
            <h1 className="text-3xl font-semibold mb-8">{modelName}</h1>
            <div className="flex -mx-6">
              <div className="basis-1/2 max-w-[50%] px-6">
                {leftColumn.map((item, index) => (
                  <div key={index} className="mb-6">
                    <div className="mb-4 w-2/3 border-t border-white" />
                    <h5 className="text-xl font-semibold mb-2">{item.name}</h5>
                    <p className="text-sm">{item.value as string}</p>
                  </div>
                ))}
              </div>

              <div className="basis-1/2 max-w-[50%] px-6">
                {rightColumn.map((item, index) => (
                  <div key={index} className="mb-6">
                    <div className="mb-4 w-2/3 border-t border-white" />
                    <h5 className="text-xl font-semibold mb-2">{item.name}</h5>
                    <p className="text-sm">{item.value as string}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex">
              <Link
                href={`/design/${modelId}`}
                className="group text-white bg-skyline px-6 md:px-8 py-2 md:py-4 rounded-xl flex items-center gap-4"
              >
                <div>Configure Now</div>
                <GoArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelSpecifications;
