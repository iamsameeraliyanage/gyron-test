'use client';
import { Link } from '@/i18n/routing';
import { IoCalendar } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import SubscribeForm from './SubscribeForm';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';

const HomeEvent = () => {
  const videoUrl = '/temp/home-event.mp4';
  const translate = useTranslations('Homepage.event');
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  return (
    <section className="relative mt-[4vh] md:mt-0 md:h-[calc(100vh-5rem)]">
      <div className="container mx-auto relative h-full md:py-4 px-4 md:pb-8 md:px-8 md:overflow-auto">
        <div className="w-full md:h-full rounded-lg relative overflow-hidden border border-white border-opacity-15">
          <video
            className="w-full h-full object-cover hidden md:block"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="md:absolute inset-0 z-10 flex flex-col md:overflow-auto">
            {isLogoVisible && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10 bg-black/75"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                onAnimationComplete={() => setIsLogoVisible(false)}
              >
                <motion.img
                  src="/gyro-logo-icon.png"
                  alt="Gyro Logo Icon"
                  className="w-24 h-24"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 360, opacity: 1 }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 0.5,
                      ease: 'linear',
                    },
                    opacity: {
                      duration: 0.25,
                      ease: 'linear',
                    },
                  }}
                />
              </motion.div>
            )}

            <motion.div
              className="text-white bg-gradient-to-l from-transparent via-black/90 to-black/95 grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
            >
              <div className="h-full px-8 py-16 md:py-6 md:px-14 3xl:px-20 w-full flex flex-col justify-center">
                <div className="max-w-xl 3xl:max-w-4xl">
                  <motion.h3
                    className="text-3xl md:text-3xl 3xl:text-4xl font-medium"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.9 }}
                  >
                    {translate('infoTitle')}
                  </motion.h3>
                  <div className="mt-2">
                    <motion.h2
                      className="text-5xl md:text-5xl 3xl:text-7xl font-semibold text-[#EF443B] 3xl:leading-[1.15]"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 3.2 }}
                    >
                      {translate('title')}
                    </motion.h2>
                    <div className="mt-4 md:mt-6 3xl:mt-8 pl-0 md:pl-8 3xl:pl-12">
                      <ul className="flex flex-col gap-3">
                        <motion.li
                          className="flex gap-3 items-center text-xl md:text-xl 3xl:text-2xl"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 3.5 }}
                        >
                          <div>
                            <IoCalendar />
                          </div>
                          <div>{translate('eventDate')}</div>
                        </motion.li>
                        <motion.li
                          className="flex gap-3 items-center text-xl md:text-xl 3xl:text-2xl"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 3.8 }}
                        >
                          <div>
                            <FaLocationDot />
                          </div>
                          <div>{translate('eventLocation')} </div>
                        </motion.li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-white py-6 md:py-10 px-6 md:px-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
            >
              <div className="block md:flex md:-mx-8">
                <div className="md:grow md:px-8">
                  <motion.h3
                    className="text-4xl md:text-4xl 3xl:text-5xl font-bold"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 4.2 }}
                  >
                    {translate('footerTitle')}
                  </motion.h3>
                  <div className="mt-1 md:mt-2">
                    <motion.p
                      className="text-md md:text-lg"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 4.5 }}
                    >
                      {translate('footerDescription')}
                    </motion.p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:basis-[520px] xl:basis[600px] md:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 4.8 }}
                  >
                    <SubscribeForm />
                  </motion.div>

                  <div className="mt-4">
                    <motion.p
                      className="text-xs"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 5.1 }}
                    >
                      {translate.rich('termsCondition', {
                        termsLink: (chunks) => (
                          <Link
                            href="/terms-of-use"
                            className="underline hover:text-skyline"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeEvent;
