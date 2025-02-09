import { Link } from '@/i18n/routing';
import { HiOutlineArrowDownRight } from 'react-icons/hi2';

const StartConfiguration = ({ modelId }: { modelId: string }) => {
  return (
    <div>
      <Link href={`/design/${modelId}`} className="group">
        <div className="flex items-center gap-2 md:gap-6">
          <div>
            <h3 className="text-xl md:text-4xl font-extrabold uppercase group-hover:text-skyline transition-colors">
              Start Configuration
            </h3>
          </div>
          <div className="flex items-center bg-primary p-2 md:p-5 rounded-full group-hover:bg-skyline transition-all group-hover:rotate-[-45deg]">
            <HiOutlineArrowDownRight className="h-2 w-2 md:h-4 md:w-4 text-white " />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StartConfiguration;
