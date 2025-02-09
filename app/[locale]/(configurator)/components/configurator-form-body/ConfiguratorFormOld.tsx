/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ConfiguratorHeader from '../configurator-header/ConfiguratorHeader';
import ConfiguratorFooter from '../configurator-footer/ConfiguratorFooter';
import { GyroSpecificationModel, SubConfigurationGroup } from '@/api/types';
import NavBar from '../navbar/Navbar';
import ConfiguratorMainBody from './ConfiguratorMainBody';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import './configure-form.css';
import CheckoutFormDialog from '../checkout-form/CheckoutFormDialog';
// import ConfiguratorFormRightPanel from './ConfiguratorFormRightPanel';
import { DevTool } from '@hookform/devtools';

export interface ConfiggurationFormData {
  [key: string]: any;
}

const ConfiguratorForm = ({
  configurationModal,
}: {
  configurationModal: GyroSpecificationModel;
}) => {
  const configurationList = configurationModal.configurationGroups;
  const updatedData = configurationList.map((category) => {
    const categoryFieldName = category.category
      .toLowerCase()
      .replace(/\s+/g, '-');

    if (category.optionCategories && category.optionCategories.length > 0) {
      const updatedOptionCategories: SubConfigurationGroup[] =
        category.optionCategories.map((subCategory) => ({
          ...subCategory,
          fieldName: `${categoryFieldName}-${subCategory.category.toLowerCase().replace(/\s+/g, '-')}`,
        }));
      return {
        ...category,
        fieldName: categoryFieldName,
        optionCategories: updatedOptionCategories,
      };
    }

    return { ...category, fieldName: categoryFieldName };
  });

  const updatedGyroSpecificationModel: GyroSpecificationModel = {
    ...configurationModal,
    configurationGroups: updatedData,
  };

  const currentPartId = configurationModal.partId;

  const isEnvDev = process.env.NODE_ENV === 'development';

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [openOrderNow, setOpenOrderNow] = useState(false);

  const methods = useForm<ConfiggurationFormData>({
    mode: 'onChange',
  });

  const { reset, handleSubmit, control, trigger } = methods;
  const orderData = methods.getValues();

  const handleNext = async () => {
    const isValid = await trigger();
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, updatedData.length - 1));
    }
  };

  // const handleBack = () => {
  //   setCurrentStep((prev) => Math.max(prev - 1, 0));
  // };

  const onSubmit = () => {
    if (currentStep < updatedData.length - 1) {
      handleNext();
    } else {
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
                    onCompletedStepClick={(index) => setCurrentStep(index)}
                  />
                </div>
              </div>
              <div
                className="flex basis-[400px] max-w-[400px] drop-shadow-lg overflow-auto"
                aria-label="configurator-right-drawer"
              >
                {/* <ConfiguratorFormRightPanel
                  configurationModal={updatedGyroSpecificationModel}
                  currentStep={currentStep}
                  handleBack={handleBack}
                /> */}
              </div>
            </div>
          </section>
          {isEnvDev && <DevTool control={control} />}
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
