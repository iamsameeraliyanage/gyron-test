import { Link } from '@/i18n/routing';
import { HiOutlineArrowDownRight } from 'react-icons/hi2';

const StartConfiguration = () => {
  return (
    <div>
      <Link href="/models" className="group">
        <div className="flex items-center gap-6">
          <div>
            <h3 className="text-4xl font-extrabold uppercase group-hover:text-skyline transition-colors">
              Start Configuration
            </h3>
          </div>
          <div className="flex items-center bg-primary p-5 rounded-full group-hover:bg-skyline transition-all group-hover:rotate-[-45deg]">
            <HiOutlineArrowDownRight className="h-4 w-4 text-white " />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StartConfiguration;
