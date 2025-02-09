// import { getHomeContent } from '@/api/services';
import { Locale } from '@/i18n/routing';
import HomeEvent from './components/home/home-event/HomeEvent';
// import HomeNews from './components/home/home-news/HomeNews';
// import HomeContactSection from './components/home/home-contact-us/HomeContactUs';
// import HomeVideoSection from './components/home/home-video/HomeVideoSection';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // const { data: homePageContent } = await getHomeContent(locale);

  return (
    <main className="flex flex-col flex-grow " data-lang={locale}>
      <HomeEvent />
      {/* <HomeVideoSection homePageContent={homePageContent} /> */}
      {/* <HomeModelSection homePageContent={homePageContent} /> */}
      {/* <HomeVideoSection homePageContent={homePageContent} /> */}
      {/* <HomeDetailSlider homePageContent={homePageContent} /> */}
      {/* <HomeBuiltKit homePageContent={homePageContent} /> */}
      {/* <HomeNews /> */}
      {/* <HomeContactSection locale={locale} homePageContent={homePageContent} /> */}
    </main>
  );
}
