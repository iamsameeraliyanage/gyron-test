import { GyroSpecificationModel } from '@/api/types';
import { Link } from '@/i18n/routing';
import React from 'react';
import { GoArrowUpRight } from 'react-icons/go';

const ModelOverview = ({
  modelDetail,
}: {
  modelDetail: GyroSpecificationModel;
}) => {
  const modelId = modelDetail.slug;
  return (
    <section className="relative bg-white py-8">
      <div className="container px-4 md:px-12">
        <div className="flex -mx-4 md:-mx-6">
          <div className="basis-1/2 max-w-[50%] px-4 md:px-6">
            <div className="h-full flex flex-col justify-center">
              <h4 className="text-sm font-semibold">Overview</h4>
              <h2 className="text-4xl font-bold">Model</h2>
              <div className="flex mt-4">
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
          <div className="basis-1/2 max-w-[50%] px-4 md:px-6">
            <div className="h-full flex items-center">
              <p>{modelDetail.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelOverview;
