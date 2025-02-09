import { ConfigurationGroup } from '@/api/types';
import { clsx } from 'clsx';
import React from 'react';

import { PiEngineBold } from 'react-icons/pi';
import { LiaOilCanSolid } from 'react-icons/lia';
import { FaBuffer } from 'react-icons/fa';
import { GrCloudlinux } from 'react-icons/gr';
import { PiSeatLight } from 'react-icons/pi';
import { PiChalkboardTeacher } from 'react-icons/pi';
import { AiOutlineSafety } from 'react-icons/ai';
import { PiTrolleySuitcase } from 'react-icons/pi';
import { GiPowerLightning } from 'react-icons/gi';
import { FaRegCompass } from 'react-icons/fa6';
import { IoFlaskOutline } from 'react-icons/io5';

const configMainIcons = [
  {
    imageId: 'engine',
    icon: <PiEngineBold />,
  },
  {
    imageId: 'exterior',
    icon: <LiaOilCanSolid />,
  },
  {
    imageId: 'fuelTank',
    icon: <FaBuffer />,
  },
  {
    imageId: 'accessories',
    icon: <GrCloudlinux />,
  },
  {
    imageId: 'avionics',
    icon: <PiSeatLight />,
  },
  {
    imageId: 'safetyEquipments',
    icon: <PiChalkboardTeacher />,
  },
  {
    imageId: 'powerSupply',
    icon: <AiOutlineSafety />,
  },
  {
    imageId: 'payloadVariants',
    icon: <PiTrolleySuitcase />,
  },
  {
    imageId: 'instructorEquipment',
    icon: <GiPowerLightning />,
  },
  {
    imageId: 'safetyEquipment',
    icon: <FaRegCompass />,
  },
  {
    imageId: 'interior',
    icon: <IoFlaskOutline />,
  },
];

const ConfigIconButton = ({
  configGroup,
  isCurrent,
  isCompleted,
  onCompletedStepClick,
}: {
  configGroup: ConfigurationGroup;
  isCurrent: boolean;
  isCompleted: boolean;
  onCompletedStepClick: () => void;
}) => {
  const isActive = isCurrent;

  const icon = configMainIcons.find(
    (icon) => icon.imageId === configGroup.imageId
  )?.icon;

  return (
    <div className="relative h-full w-20">
      <div
        role="button"
        className={clsx(
          'configIconButton px-2 py-3 rounded-lg h-full pointer-events-none',
          isActive && 'isActive pointer-events-auto',
          isCompleted && 'isCompleted pointer-events-auto'
        )}
        onClick={isCompleted ? () => onCompletedStepClick() : undefined}
      >
        <div className="configIconButtonInner flex flex-col justify-center items-center">
          <div className="relative configButtonIconWrapper">
            {isCompleted && (
              <div className="absolute  top-[-2px] right-[-2px] bg-green-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px] z-10"></div>
            )}

            <div className="configButtonIcon p-3 rounded-full text-primary">
              {icon}
            </div>
          </div>

          <div className="configButtonText text-xs mt-2 text-center leading-4">
            {configGroup.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigIconButton;
