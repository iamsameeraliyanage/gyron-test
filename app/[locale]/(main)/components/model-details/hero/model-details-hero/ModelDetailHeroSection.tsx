import Image from 'next/image';
import StartConfiguration from './StartConfiguration';
import { GyroSpecificationModel } from '@/api/types';
// import { STRAPI_IMAGE_BASE_URL } from '@/api/endpoints';
import ModelDetailHeroItem from './ModelDetailHeroDetailItem';
import Breadcrumbs from '@/app/components/breadcrumbs/Breadcrumbs';
import { STRAPI_IMAGE_BASE_URL } from '@/api/endpoints';

const ModelDetailHeroSection = ({
  modelDetail,
}: {
  modelDetail: GyroSpecificationModel;
}) => {
  const heroSpecifications = modelDetail.heroSection;

  const updateImgUrl = STRAPI_IMAGE_BASE_URL + modelDetail.image.url;

  return (
    <section className="relative h-[calc(80vh-5rem)] md:h-[calc(100vh-5rem)]">
      <div className="relative h-full">
        <Image
          src={updateImgUrl}
          alt={modelDetail.image.alternativeText || modelDetail.name}
          fill
          quality={100}
          className="z-[-1]"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute top-6 left-0 z-20 hidden md:block">
          <Breadcrumbs />
        </div>
      </div>
      <div className="absolute z-10 inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparen p-4 md:p-12 pt-14">
        <div className="lg:flex justify-center md:justify-start items-center">
          <div className="flex-grow">
            <ul className="md:flex gap-8">
              {heroSpecifications.map((configItem, index) => {
                return (
                  <li key={index} className="mb-2 md:mb-0">
                    <ModelDetailHeroItem
                      mainText={configItem.value}
                      subText={configItem.name}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4 lg:mt-0">
            <StartConfiguration modelId={modelDetail.slug} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelDetailHeroSection;
