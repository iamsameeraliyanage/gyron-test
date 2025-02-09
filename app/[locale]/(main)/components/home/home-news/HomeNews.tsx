import Image from 'next/image';
import React from 'react';

const newsList = [
  {
    image: '/temp/news-1.jpg',
    date: '03/01/2025',
    title: 'Sem ut nunc dignissim, in elementum ex dictum. Donec',
    description:
      'Proin ultrices, magna ac venenatis aliquam, urna erat vulputate arcu, nec ullamcorper arcu lacus vel nunc. Praesent pellentesque',
  },
  {
    image: '/temp/news-2.jpg',
    date: '03/01/2025',
    title: 'Sem ut nunc dignissim, in elementum ex dictum. Donec',
    description:
      'Proin ultrices, magna ac venenatis aliquam, urna erat vulputate arcu, nec ullamcorper arcu lacus vel nunc. Praesent pellentesque',
  },
  {
    image: '/temp/news-3.jpg',
    date: '03/01/2025',
    title: 'Sem ut nunc dignissim, in elementum ex dictum. Donec',
    description:
      'Proin ultrices, magna ac venenatis aliquam, urna erat vulputate arcu, nec ullamcorper arcu lacus vel nunc. Praesent pellentesque',
  },
];

const HomeNews = () => {
  return (
    <section className="relative">
      <div className="md:flex w-full">
        <div className="md:basis-1/2 md:max-w-[50%] bg-gray-300 p-4 py-8 md:p-8">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold">Trending News</h3>
          </div>
          <div>
            {newsList.map((item, index) => {
              return (
                <div key={index} className="mb-4 flex flex-wrap">
                  <div className="w-full sm:basis-1/3 sm:max-w-[33.333%]">
                    <div className="rounded-md h-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt="Background"
                        width={1073}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:basis-2/3 sm:max-w-[66.666%] sm:pl-4 py-4">
                    <p className="text-sm text-gray-600">{item.date}</p>
                    <h4 className="text-lg font-normal text-primary mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:basis-1/2 md:max-w-[50%] flex flex-col">
          <div className="relative h-[70vh] md:h-full w-full ">
            <Image
              src="/temp/home-news.jpg"
              alt="Background"
              width={1073}
              height={600}
              className="h-full w-full object-cover"
            />
            <div className="newsBannerOverlay absolute top-0 left-0 right-0 bottom-0 p-4 md:p-6">
              <div className="flex flex-col h-full justify-end">
                <div className="mb-1 md:mb-2">
                  <p className="text-white text-base md:text-lg">03/01/2025</p>
                </div>
                <div>
                  <h2 className="text-white text-2xl md:text-4xl font-bold">
                    Sem ut nunc dignissim, in elementum ex dictum. Donec
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNews;
