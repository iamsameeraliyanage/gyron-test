import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  ConfigurationVisualization,
  ConfiguratorOptionType,
  ConfiguratorSubModel,
} from '@/api/types';
import clsx from 'clsx';
import {
  ConfigurationDefaultViewCard,
  ConfigurationMultiViewCard,
  ConfigurationSingleDetailedViewCard,
  ConfigurationSingleImageCard,
  ConfigurationSingleRGBViewCard,
} from './ConfigurationCards';

const ConfigureFormFieldItem = ({
  optionType,
  fieldNname,
  model,
  visualization,
  isOptional,
}: {
  optionType: ConfiguratorOptionType;
  fieldNname: string;
  model: ConfiguratorSubModel;
  visualization: ConfigurationVisualization;
  isOptional?: boolean;
}) => {
  const { control } = useFormContext();
  console.log(isOptional);

  return (
    <Controller
      name={fieldNname}
      control={control}
      render={({ field }) => {
        const isChecked = Array.isArray(field.value)
          ? field.value.includes(model.partId)
          : field.value === model.partId;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (optionType === 'MULTI_SELECT') {
            const newValue = e.target.checked
              ? [...(field.value || []), model.partId]
              : field.value.filter((value: string) => value !== model.partId);
            field.onChange(newValue);
          } else {
            field.onChange(model.partId);
          }
        };

        return (
          <ConfigFormFieldItemWrapper
            isChecked={isChecked}
            onChange={handleChange}
            optionType={optionType}
            visualization={visualization}
          >
            {visualization === ConfigurationVisualization.COLOR_CARD ? (
              <ConfigurationSingleRGBViewCard model={model} />
            ) : visualization === ConfigurationVisualization.IMAGE_CARD ? (
              <ConfigurationSingleImageCard model={model} />
            ) : visualization === ConfigurationVisualization.NUMBER_CARD ? (
              <ConfigurationSingleDetailedViewCard model={model} />
            ) : visualization === ConfigurationVisualization.TWO_COLUMN_CARD ? (
              <ConfigurationMultiViewCard model={model} />
            ) : (
              <ConfigurationDefaultViewCard model={model} />
            )}
          </ConfigFormFieldItemWrapper>
        );
      }}
    />
  );
};

export default ConfigureFormFieldItem;

function ConfigFormFieldItemWrapper({
  optionType,
  children,
  isChecked,
  visualization,
  onChange,
}: {
  optionType: ConfiguratorOptionType;
  children: React.ReactNode;
  isChecked: boolean;
  visualization: ConfigurationVisualization;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="block configFormFieldItemWrapper w-full">
      <label
        className={clsx(
          'configFormFieldItemWrapperLabel flex gap-2 cursor-pointer w-full',
          isChecked && 'isChecked',
          visualization
        )}
      >
        {optionType === 'MULTI_SELECT' ? (
          <div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={onChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
          </div>
        ) : (
          <div>
            <input
              type="radio"
              checked={isChecked}
              onChange={onChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:blue-500 focus:ring-2"
            />
          </div>
        )}
        <div
          className={`configFormFieldItemChildrenWrapper grow ${visualization}`}
        >
          {children}
        </div>
      </label>
    </div>
  );
}
