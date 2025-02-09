import { STRAPI_IMAGE_BASE_URL } from '@/api/endpoints';
import { ConfiguratorOption } from '@/api/types';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const ConfigureFormFieldItem = ({
  children,
  option,
}: {
  children: React.ReactNode;
  option: ConfiguratorOption;
}) => {
  const imageUrl = option.image && STRAPI_IMAGE_BASE_URL + option.image?.url;

  return (
    <div
      className="border rounded-md p-4 w-full cursor-pointer"
      title={option.description}
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-start gap-2">
            <div className="field">{children}</div>
            <h3 className="text-md font-medium">{option.name}</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="font-thin text-xs px-2 py-1 rounded-lg text-[#FFA600] border border-[#FFA600]">
              +{option.weight}Kg
            </div>
            <div
              className={clsx(
                `font-thin rounded-lg border text-xs px-2 py-1`,
                option.availability === 'AVAILABLE'
                  ? 'text-green-500 border-green-500'
                  : 'text-red-500 border-red-500'
              )}
            >
              {option.availability === 'AVAILABLE'
                ? 'Available'
                : 'Unavailable'}
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2 justify-between">
          <div>
            <div>
              {option.details && Object.keys(option.details).length > 0 && (
                <div className="text-sm font-thin flex flex-wrap mb-2">
                  {Object.keys(option.details).map((key, index, array) => {
                    const isLastDetail = index === array.length - 1;
                    return (
                      <div
                        key={key}
                        className={clsx(
                          `text-gray-500 whitespace-nowrap mr-2 leading-4 border-r pr-2 border-gray-500`,
                          isLastDetail && 'mr-0 border-none'
                        )}
                      >
                        {key}: {option.details?.[key]}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="font-bold text-lg">+ ${option.price} </div>
          </div>
          {option.image && imageUrl && (
            <div className="basis-[100px] max-w-[100px] h-[75px]">
              <div className="rounded-md overflow-hidden relative w-full h-full  border border-gray-300">
                <Image
                  aria-details={option.name}
                  src={imageUrl}
                  alt={option.image.alternativeText || option.name}
                  fill
                  quality={100}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigureFormFieldItem;
