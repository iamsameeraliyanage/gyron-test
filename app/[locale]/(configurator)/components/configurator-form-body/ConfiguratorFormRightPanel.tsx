/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderNowButton from '../order-now-button/OrderNowButton';
import {
  ConfigurationGroup,
  SubConfigurationGroup,
  GyroSpecificationModel,
  ConfiguratorOption,
  ConfiguratorOptionType,
} from '@/api/types';

import './configure-form.css';
import { Controller, useFormContext } from 'react-hook-form';
import ConfigurationFormStepButtons from './ConfigurationFormStepButtons';
import {
  calculateTotalOptionPrice,
  calculateTotalOptionWeight,
  getWieghtBarColorClases,
} from '../../utils/form-utils';
import clsx from 'clsx';
import ConfigureFormFieldItem from './ConfigureFormFieldItem';

const ConfiguratorFormRightPanel = ({
  configurationModal,
  handleBack,
  currentStep,
}: {
  configurationModal: GyroSpecificationModel;
  handleBack: () => void;
  currentStep: number;
}) => {
  const configGroups: ConfigurationGroup[] =
    configurationModal.configurationGroups;
  const nextStepConfig = configGroups[currentStep + 1];
  const isLastStep = currentStep === configGroups.length - 1;

  const { watch } = useFormContext();

  const allValues = watch();
  const modelMaxWeight = 390; // todo: should get maxWeight from API

  const totalOptionPrice = calculateTotalOptionPrice(configGroups, allValues);
  const totalPrice = totalOptionPrice + configurationModal.cost;

  const formattedTotalPrice = totalPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const totalOptionWeight = calculateTotalOptionWeight(configGroups, allValues);

  const totalWeight = totalOptionWeight + configurationModal.weight;
  const weightBarClasses = getWieghtBarColorClases(totalWeight, modelMaxWeight);

  const widthPercentage = Math.min((totalWeight / modelMaxWeight) * 100, 100);
  const isOverWeight = totalWeight > modelMaxWeight;

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-auto">
      <div className="flex-grow flex flex-col overflow-auto px-4 py-6">
        <ConfigGroup configGroup={configGroups[currentStep]} />

        <div className="mt-auto">
          <ConfigurationFormStepButtons
            nextButtonText={nextStepConfig?.category || 'Next'}
            handleBack={handleBack}
            currentStep={currentStep}
            isLastStep={isLastStep}
          />
        </div>
      </div>
      <div className="relative pt-4 px-4">
        <div
          className="w-full flex h-2 rounded-lg bg-gray-200 mb-2"
          title={`${totalWeight}/${modelMaxWeight} Kg`}
        >
          <div
            className={clsx('h-2 rounded-lg ', weightBarClasses)}
            style={{
              width: `${widthPercentage}%`,
            }}
          />
        </div>
        <OrderNowButton
          totalPrice={formattedTotalPrice}
          totalWeight={totalWeight}
          disabled={isOverWeight || currentStep !== configGroups.length - 1}
        />
      </div>
    </div>
  );
};

export default ConfiguratorFormRightPanel;

const OptionList = ({
  options,
  selectType,
  fieldName,
}: {
  options: ConfiguratorOption[];
  selectType: ConfiguratorOptionType;
  fieldName: string;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <ul className="mb-3 flex flex-col gap-2">
        {options.map((option) => (
          <li key={option.id}>
            <label className="flex items-center space-x-2">
              <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                  <ConfigureFormFieldItem option={option}>
                    {selectType === 'MULTI_SELECT' ? (
                      <input
                        type="checkbox"
                        disabled={option.isDisabled}
                        className="form-checkbox text-blue-500"
                        {...field}
                        value={option.partId.toString()}
                        checked={field.value.includes(option.partId.toString())}
                        onChange={(e) => {
                          const value = e.target.checked
                            ? [...field.value, option.partId.toString()]
                            : field.value.filter(
                                (id: string) => id !== option.partId.toString()
                              );
                          field.onChange(value);
                        }}
                      />
                    ) : (
                      <input
                        type="radio"
                        disabled={option.isDisabled}
                        className="form-radio text-blue-500"
                        {...field}
                        value={option.partId.toString()}
                        checked={field.value === option.partId.toString()}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  </ConfigureFormFieldItem>
                )}
              />
            </label>
          </li>
        ))}
      </ul>
      {errors[fieldName] && (
        <p className="text-red-500">{errors[fieldName]?.message as string}</p>
      )}
    </div>
  );
};

const ConfigGroup = ({ configGroup }: { configGroup: ConfigurationGroup }) => {
  return (
    <div key={configGroup.id} className="mb-2">
      <div className="font-bold mb-3">
        {configGroup.category} -
        {configGroup.isOptional ? 'Optional' : 'Required'}
      </div>
      {configGroup.optionCategories.length > 0 ? (
        <div className="pl-6">
          {configGroup.optionCategories.map((subConfigGroup) => (
            <SubConfigGroup
              key={subConfigGroup.id}
              subConfigGroup={subConfigGroup}
            />
          ))}
        </div>
      ) : (
        <OptionList
          options={configGroup.options}
          selectType={configGroup.selectType}
          fieldName={configGroup.fieldName!}
        />
      )}
    </div>
  );
};

const SubConfigGroup = ({
  subConfigGroup,
}: {
  subConfigGroup: SubConfigurationGroup;
}) => {
  return (
    <div key={subConfigGroup.id} className="mb-3">
      <div className="font-bold mb-2">{subConfigGroup.category}</div>
      <OptionList
        options={subConfigGroup.options}
        selectType={subConfigGroup.selectType}
        fieldName={subConfigGroup.fieldName!}
      />
    </div>
  );
};
