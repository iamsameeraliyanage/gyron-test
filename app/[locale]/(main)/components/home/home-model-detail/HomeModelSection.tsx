import { HomePageContent } from '@/api/types';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import HomeModelSlider from './HomeModelSlider';
const HomeModelSection = async ({
  homePageContent,
}: {
  homePageContent: HomePageContent;
}) => {
  console.log(homePageContent);

  const models = homePageContent.models;
  return (
    <section className="bg-primary text-white h-[60vh] sm:h-[70vh] lg:h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-grow">
        <HomeModelSlider models={models} />
      </div>
    </section>
  );
};

export default HomeModelSection;
