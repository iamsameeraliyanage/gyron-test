import { GyroSpecificationModel } from '@/api/types';

const ConfiguratorHeader = ({
  configurationModal,
}: {
  configurationModal: GyroSpecificationModel;
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center px-8 py-4 z-10">
      <div className="flex-grow">
        <div className="text-center">
          <h2 className="text-5xl uppercase font-bold">
            {configurationModal.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorHeader;
