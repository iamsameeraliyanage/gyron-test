/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderNowButton from '../order-now-button/OrderNowButton';
import {
  ConfigurationGroup,
  // ConfiguratorOption,
  ConfiguratorSubModel,
  SubConfigurationGroup,
  GyroSpecificationModel,
} from '@/api/types';
// import ConfigureFormFieldItem from './ConfigureFormFieldItem';
import ConfigurationViewWrapper from './ConfigurationViewWrapper';

import './configure-form.css';
import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import {
  calculateTotalOptionPrice,
  calculateTotalOptionWeight,
  getWieghtBarColorClases,
} from '../../utils/form-utils';
import SubConfigViewParentWrapper from './SubConfigViewParentWrapper';
import ConfigCardViewWrapper from './ConfigCardViewWrapper';
import ConfigurationFormStepButtons from './ConfigurationFormStepButtons';

const ConfiguratorFormRightPanel = ({
  configurationModal,
  currentStep,
  handleBack,
}: {
  configurationModal: GyroSpecificationModel;
  currentStep: number;
  handleBack: () => void;
}) => {
  const configurationList = configurationModal.configurationGroups;
  const nextStepConfig = configurationList[currentStep + 1];

  const { watch } = useFormContext();

  const allValues = watch();
  const modelMaxWeight = 390; // todo: should get maxWeight from API

  const totalOptionPrice = calculateTotalOptionPrice(
    configurationList,
    allValues
  );
  const totalPrice = totalOptionPrice + configurationModal.cost;

  const formattedTotalPrice = totalPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const totalOptionWeight = calculateTotalOptionWeight(
    configurationList,
    allValues
  );

  const totalWeight = totalOptionWeight + configurationModal.weight;
  const weightBarClasses = getWieghtBarColorClases(totalWeight, modelMaxWeight);

  const widthPercentage = Math.min((totalWeight / modelMaxWeight) * 100, 100);
  const isOverWeight = totalWeight > modelMaxWeight;

  const isLastStep = currentStep === configurationList.length - 1;

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-auto">
      <div className="flex-grow flex flex-col overflow-auto px-4 py-6">
        <StepContent step={configurationList[currentStep]} />
        <div className="mt-auto">
          <ConfigurationFormStepButtons
            nextButtonText={nextStepConfig?.category || 'Next'}
            handleBack={handleBack}
            currentStep={currentStep}
            isLastStep={isLastStep}
          />
        </div>
      </div>
      <div
        className="relative pt-4 px-4"
        title={isOverWeight ? 'Overweighted' : ''}
      >
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
          disabled={
            isOverWeight || currentStep !== configurationList.length - 1
          }
          totalPrice={formattedTotalPrice}
          totalWeight={totalWeight}
        />
      </div>
    </div>
  );
};

export default ConfiguratorFormRightPanel;

const StepContent = ({ step }: { step: ConfigurationGroup }) => {
  const { control } = useFormContext();

  if (step.hasSubGroups || step.optionCategories.length > 0) {
    return (
      <SubConfigViewParentWrapper title={step.category} tooltip={step.tooltip}>
        {step?.optionCategories?.map((group: SubConfigurationGroup) => (
          <div key={group.id} className="mb-4">
            <ConfigurationViewWrapper
              title={group.category}
              isOptional={step.isOptional}
            >
              <ConfigCardViewWrapper visualization={step.visualization}>
                {group.selectType === 'SINGLE_SELECT' ? (
                  <Controller
                    name={`${group.fieldName}`}
                    control={control}
                    defaultValue=""
                    rules={{
                      required: group.isOptional
                        ? false
                        : 'This field is required',
                    }}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <div>
                          <div className="space-y-2">
                            {group.options.map(
                              (option: ConfiguratorSubModel) => (
                                <label
                                  key={option.partId}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="radio"
                                    {...field}
                                    value={option.partId}
                                    className="form-radio text-blue-500"
                                    checked={field.value === option.partId}
                                  />
                                  <span>{`${option.name} - ${option.description}`}</span>
                                </label>
                              )
                            )}
                          </div>
                          {error && (
                            <p className="text-red-500 text-sm mt-1">
                              This field is required{' '}
                              {`${step.category}.${group.category}`}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                ) : (
                  <Controller
                    name={`${group.fieldName}`}
                    control={control}
                    defaultValue={[]}
                    rules={{ required: 'Please select at least one option' }}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <div>
                          <div className="space-y-2">
                            {group.options.map(
                              (option: ConfiguratorSubModel) => (
                                <label
                                  key={option.partId}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={field.value.includes(
                                      option.partId
                                    )}
                                    onChange={(e) => {
                                      const value = e.target.checked
                                        ? [...field.value, option.partId]
                                        : field.value.filter(
                                            (partId: any) =>
                                              partId !== option.partId
                                          );
                                      field.onChange(value);
                                    }}
                                    className="form-checkbox text-blue-500"
                                  />
                                  <span>{`${option.name} - ${option.description}`}</span>
                                </label>
                              )
                            )}
                          </div>
                          {error && (
                            <p className="text-red-500 text-sm mt-1">
                              This field is required{' '}
                              {`${step.category}.${group.category}`}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                )}
              </ConfigCardViewWrapper>
            </ConfigurationViewWrapper>
          </div>
        ))}
      </SubConfigViewParentWrapper>
    );
  }

  return (
    <ConfigurationViewWrapper
      title={step.category}
      isOptional={step.isOptional}
    >
      <ConfigCardViewWrapper visualization={step.visualization}>
        {step.selectType === 'SINGLE_SELECT' ? (
          <Controller
            name={`${step.fieldName}`}
            control={control}
            defaultValue=""
            rules={{
              required: step.isOptional ? false : 'This field is required',
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <div>
                  <div className="space-y-2">
                    {step.options.map((option: ConfiguratorSubModel) => (
                      <label
                        key={option.partId}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          {...field}
                          value={option.partId}
                          className="form-radio text-blue-500"
                          checked={field.value === option.partId}
                        />
                        <span>{`${option.name} - ${option.description}`}</span>
                      </label>
                    ))}
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-1">
                      This field is required {`${step.category}`}
                    </p>
                  )}
                </div>
              );
            }}
          />
        ) : (
          <Controller
            name={`${step.fieldName}`}
            control={control}
            defaultValue={[]}
            rules={{
              required: step.isOptional ? false : 'This field is required',
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <div className="space-y-2">
                  {step.options.map((option: ConfiguratorSubModel) => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={field.value.includes(option.partId)}
                        onChange={(e) => {
                          const value = e.target.checked
                            ? [...field.value, option.partId]
                            : field.value.filter(
                                (partId: any) => partId !== option.partId
                              );
                          field.onChange(value);
                        }}
                        className="form-checkbox text-blue-500"
                      />
                      <span>{`${option.name} - ${option.description}`}</span>
                    </label>
                  ))}
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-1">
                    This field is required {`${step.category}`}
                  </p>
                )}
              </div>
            )}
          />
        )}
      </ConfigCardViewWrapper>
    </ConfigurationViewWrapper>
  );
};
