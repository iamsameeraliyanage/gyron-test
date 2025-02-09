/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ConfigurationGroup, GyroSpecificationModel } from '@/api/types';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  generateValidationSchema,
  getDefaultValues,
  getUpdatedDataWithFieldName,
  useYupValidationResolver,
} from '../../utils/form-utils';
import NavBar from '../navbar/Navbar';
import ConfiguratorHeader from '../configurator-header/ConfiguratorHeader';
import ConfiguratorMainBody from './ConfiguratorMainBody';
import ConfiguratorFormRightPanel from './ConfiguratorFormRightPanel';
import ConfiguratorFooter from '../configurator-footer/ConfiguratorFooter';
import CheckoutFormDialog from '../checkout-form/CheckoutFormDialog';

export interface ConfiggurationFormData {
  [key: string]: any;
}
const ConfiguratorForm = ({
  configurationModal,
}: {
  configurationModal: GyroSpecificationModel;
}) => {
  const configurationList = configurationModal.configurationGroups;
  const updatedData: ConfigurationGroup[] =
    getUpdatedDataWithFieldName(configurationList);

  const currentPartId = configurationModal.partId;

  const schema = generateValidationSchema(updatedData);

  const [currentStep, setCurrentStep] = useState(0);

  const resolver = useYupValidationResolver(schema);
  const [openOrderNow, setOpenOrderNow] = useState(false);

  const updatedGyroSpecificationModel: GyroSpecificationModel = {
    ...configurationModal,
    configurationGroups: updatedData,
  };
  const methods = useForm<ConfiggurationFormData>({
    mode: 'onChange',
    resolver,
    defaultValues: getDefaultValues(updatedData),
  });
  const orderData = methods.getValues();

  const { handleSubmit, trigger, reset } = methods;

  const handleNext = async () => {
    const isValid = await trigger();
    // if (!completedSteps.includes(currentStep)) {
    //   setCompletedSteps([...completedSteps, currentStep]);
    // }
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, updatedData.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: ConfiggurationFormData) => {
    if (currentStep < updatedData.length - 1) {
      handleNext();
    } else {
      console.log(data);
      setOpenOrderNow(true);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem('configuratorData') || '{}'
    );

    if (savedData[currentPartId]) {
      reset(savedData[currentPartId]);
    }
  }, [currentPartId, reset]);

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col overflow-auto"
        >
          <NavBar configurationModal={configurationModal} />
          <section className="grow w-full max-w-full relative overflow-auto">
            <div className="flex h-full">
              <div
                className="flex basis-[calc(100%-400px)] max-w-[calc(100%-400px)] overflow-auto"
                aria-label="configurator-main"
              >
                <div className="flex flex-col w-full relative">
                  <ConfiguratorHeader configurationModal={configurationModal} />
                  <ConfiguratorMainBody />
                  <ConfiguratorFooter
                    configurationModal={updatedGyroSpecificationModel}
                    currentStep={currentStep}
                    onCompletedStepClick={() => {}}
                  />
                </div>
              </div>
              <div
                className="flex basis-[400px] max-w-[400px] drop-shadow-lg overflow-auto"
                aria-label="configurator-right-drawer"
              >
                <ConfiguratorFormRightPanel
                  configurationModal={updatedGyroSpecificationModel}
                  handleBack={handleBack}
                  currentStep={currentStep}
                />
              </div>
            </div>
          </section>
        </form>
      </FormProvider>
      {openOrderNow && (
        <CheckoutFormDialog
          onClose={() => setOpenOrderNow(false)}
          orderData={orderData}
        />
      )}
    </>
  );
};

export default ConfiguratorForm;
