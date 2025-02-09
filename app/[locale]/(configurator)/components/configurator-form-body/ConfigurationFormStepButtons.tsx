import { IoArrowBackOutline, IoArrowForward } from 'react-icons/io5';

const ConfigurationFormStepButtons = ({
  nextButtonText,
  handleBack,
  currentStep,
  isLastStep,
}: {
  nextButtonText: string;
  handleBack: () => void;
  currentStep: number;
  isLastStep: boolean;
}) => {
  return (
    <div className="flex items-center gap-2 pt-4">
      <button
        type="button"
        onClick={handleBack}
        disabled={currentStep === 0}
        className="group text-primary py-3 px-5 rounded-md border border-primary disabled:border-gray-400 disabled:text-gray-400 disabled:pointer-events-none"
      >
        <div className="group-hover:-translate-x-1 transition-all">
          <IoArrowBackOutline className="h-4 w-4" />
        </div>
      </button>
      {!isLastStep && (
        <button
          type="submit"
          className="grow bg-primary group py-3 px-8 text-white rounded-md hover:bg-skyline transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-4 justify-center">
            <div className="text-sm">{nextButtonText}</div>
            <div className="group-hover:translate-x-1 transition-all">
              <IoArrowForward className="h-4 w-4 text-white" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default ConfigurationFormStepButtons;
