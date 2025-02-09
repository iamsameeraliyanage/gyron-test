'use client';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import React from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import { GoDownload } from 'react-icons/go';
import { GyroSpecificationModel } from '@/api/types';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function NavBar({
  configurationModal,
}: {
  configurationModal: GyroSpecificationModel;
}) {
  const { getValues } = useFormContext();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = () => {
    setIsSaving(true);
    const currentPartId = configurationModal.partId;
    const savedData = JSON.parse(
      localStorage.getItem('configuratorData') || '{}'
    );
    const formData = getValues();
    const updatedData = {
      ...savedData,
      [currentPartId]: formData,
    };
    localStorage.setItem('configuratorData', JSON.stringify(updatedData));
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };
  return (
    <header className="bg-configOverlay sticky top-0 left-0 right-0 z-50">
      <nav className="px-8">
        <div className="h-18 flex items-center w-full border-b border-gray-200">
          <div className="flex items-center w-full ">
            <div className="flex items-center basis-[500px]">
              <Link
                title={`Go back to ${configurationModal.name} overview`}
                href={`/models/${configurationModal.slug}`}
                className="flex gap-2 items-center transition-all hover:gap-3 group"
              >
                <div>
                  <HiOutlineArrowLeft className="h-4 w-4 group-hover:text-skyline" />
                </div>
                <div className="text-sm group-hover:text-skyline">
                  Model overview
                </div>
              </Link>
            </div>

            <div className="flex  items-center grow justify-center">
              <Link href="/" className="p-2">
                <Image
                  src="/gyron-black.png"
                  alt="Gyron Logo"
                  width={59}
                  height={50}
                />
              </Link>
            </div>

            <div className="basis-[500px]">
              <div className="flex justify-end">
                <div className="flex gap-6 items-center">
                  <div>
                    <button
                      onClick={(e) => {
                        handleSave();
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className={clsx(
                        ` text-white px-4 py-2 rounded-lg flex gap-2 items-center transition-all  group `,
                        isSaving
                          ? 'pointer-events-none bg-green-800'
                          : 'bg-primary hover:bg-skyline'
                      )}
                    >
                      <div className="text-sm">
                        {isSaving
                          ? 'Saving Configuration'
                          : 'Save Configuration'}
                      </div>
                      <div>
                        {isSaving ? (
                          <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                        ) : (
                          <GoDownload className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  </div>
                  <div className="hidden">
                    <button className="flex gap-2 items-center transition-all bg-white px-4 py-2  rounded-lg hover:bg-skyline hover:text-white">
                      <div className="text-sm">Technical Data</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
