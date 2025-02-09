import ConfigIconButton from './ConfigIconButton';
import { ConfigurationGroup, GyroSpecificationModel } from '@/api/types';
import './config-footer.css';

const ConfiguratorFooter = ({
  configurationModal,
  currentStep,
  onCompletedStepClick,
}: {
  configurationModal: GyroSpecificationModel;
  currentStep: number;
  onCompletedStepClick: (index: number) => void;
}) => {
  const configListByOrder: ConfigurationGroup[] =
    configurationModal.configurationGroups.sort((a, b) => a.order - b.order);
  const currentStepConfig = configListByOrder[currentStep];
  // const isStepCompleted = (index: number) => completedSteps.includes(index);
  return (
    <div className="bg-white py-2 px-4 flex justify-start overflow-auto">
      <div className="flex gap-4">
        {configListByOrder.map((configGroup, index) => (
          <ConfigIconButton
            configGroup={configGroup}
            key={configGroup.id}
            isCurrent={currentStepConfig.id === configGroup.id}
            isCompleted={false}
            onCompletedStepClick={() => onCompletedStepClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfiguratorFooter;
