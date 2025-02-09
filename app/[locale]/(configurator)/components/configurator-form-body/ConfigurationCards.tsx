import { STRAPI_IMAGE_BASE_URL } from '@/api/endpoints';
import { ConfiguratorSubModel } from '@/api/types';
import Image from 'next/image';
import React from 'react';

const ConfigurationDefaultViewCard = ({
  model,
}: {
  model: ConfiguratorSubModel;
}) => {
  return (
    <div>
      <div>{model.name}</div>
      <div>{model.description}</div>
      <div>Cost: {model.price}</div>
      <div>Availability: {model.availability}</div>
      <div>Weight: {model.weight}</div>
    </div>
  );
};

const ConfigurationMultiViewCard = ({
  model,
}: {
  model: ConfiguratorSubModel;
}) => {
  const updateImgUrl = model.image && STRAPI_IMAGE_BASE_URL + model.image.url;
  return (
    <div className="flex">
      <div>
        <div>{model.name}</div>
        <div>{model.description}</div>
        <div>Cost: {model.price}</div>
        <div>Availability: {model.availability}</div>
        <div>Weight: {model.weight}</div>
      </div>

      {updateImgUrl && model.image && (
        <div>
          <div className="w-20 h-auto rounded-lg overflow-hidden">
            <Image
              src={updateImgUrl}
              alt={model.image.alternativeText || model.name}
              width={model.image.width}
              height={model.image.height}
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ConfigurationSingleImageCard = ({
  model,
}: {
  model: ConfiguratorSubModel;
}) => {
  const updateImgUrl = model.image && STRAPI_IMAGE_BASE_URL + model.image.url;

  return (
    <div className="flex">
      <div>
        <div>{model.name}</div>
        <div>{model.description}</div>
        <div>Cost: {model.price}</div>
        <div>Availability: {model.availability}</div>
        <div>Weight: {model.weight}</div>
      </div>

      {updateImgUrl && model.image && (
        <div>
          <div className="w-20 h-auto rounded-lg overflow-hidden">
            <Image
              src={updateImgUrl}
              alt={model.image.alternativeText || model.name}
              width={model.image.width}
              height={model.image.height}
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ConfigurationSingleDetailedViewCard = ({
  model,
}: {
  model: ConfiguratorSubModel;
}) => {
  return (
    <div>
      <div>{model.name}</div>
      <div>{model.description}</div>
      <div>Cost: {model.price}</div>
      <div>Availability: {model.availability}</div>
      <div>Weight: {model.weight}</div>
    </div>
  );
};

const ConfigurationSingleRGBViewCard = ({
  model,
}: {
  model: ConfiguratorSubModel;
}) => {
  return (
    <div className="flex justify-between w-full">
      <div>
        <div>{model.name}</div>
        <div>{model.description}</div>
        <div>Cost: {model.price}</div>
        <div>Availability: {model.availability}</div>
        <div>Weight: {model.weight}</div>
      </div>
      <div>
        <div
          className="w-6 h-6 rounded-full"
          style={{ background: `rgba(${model.rgb})` }}
        />
        {model.image && model.image.url && (
          <div className="w-6 h-6 rounded-full">
            <Image
              src={model.image.url}
              alt={model.image.alternativeText || model.name}
              width={model.image.width}
              height={model.image.height}
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
};
export {
  ConfigurationMultiViewCard,
  ConfigurationSingleImageCard,
  ConfigurationDefaultViewCard,
  ConfigurationSingleDetailedViewCard,
  ConfigurationSingleRGBViewCard,
};
