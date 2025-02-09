import { STRAPI_VIDEO_BASE_URL } from '@/api/endpoints';
import { HomePageContent } from '@/api/types';
import React from 'react';

const HomeVideoSection = ({
  homePageContent,
}: {
  homePageContent: HomePageContent;
}) => {
  const videoSection = homePageContent.videoSection;
  const videoUrl = STRAPI_VIDEO_BASE_URL + videoSection.video.url;

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[calc(100vh-5rem)]">
      <div className="relative h-full">
        <video
          className="w-full h-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
};

export default HomeVideoSection;
