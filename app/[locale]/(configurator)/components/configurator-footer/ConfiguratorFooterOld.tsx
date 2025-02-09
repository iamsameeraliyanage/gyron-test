import ConfigIconButton from './ConfigIconButton';
import { ConfigurationGroup } from '@/api/types';
import './config-footer.css';

const ConfiguratorFooter = ({
  configurationList,
  currentStep,
  completedSteps,
  onCompletedStepClick,
}: {
  configurationList: ConfigurationGroup[];
  currentStep: number;
  completedSteps: number[];
  onCompletedStepClick: (index: number) => void;
}) => {
  const configListByOrder = configurationList.sort((a, b) => a.order - b.order);
  const currentStepConfig = configListByOrder[currentStep];
  const isStepCompleted = (index: number) => completedSteps.includes(index);
  return (
    <div className="bg-white py-2 px-4 flex justify-start overflow-auto">
      <div className="flex gap-4">
        {configListByOrder.map((configGroup, index) => (
          <ConfigIconButton
            configGroup={configGroup}
            key={configGroup.id}
            isCurrent={currentStepConfig.id === configGroup.id}
            isCompleted={isStepCompleted(index)}
            onCompletedStepClick={() => onCompletedStepClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfiguratorFooter;
