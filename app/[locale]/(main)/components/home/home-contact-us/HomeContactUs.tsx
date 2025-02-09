import { Locale } from '@/i18n/routing';
import ContactForm from '../../contact-form/ContactForm';
import { GrLocation } from 'react-icons/gr';
import { TbPhoneCall } from 'react-icons/tb';
import { MdOutlineMail } from 'react-icons/md';
import { HomePageContent } from '@/api/types';

const HomeContactSection = async ({
  homePageContent,
  locale,
}: {
  homePageContent: HomePageContent;
  locale: Locale;
}) => {
  console.log(locale);
  const contactDetails = homePageContent.contactUseSection;
  return (
    <section className="flex flex-col">
      <div
        className="py-2 md:py-4 h-32 md:h-60 bg-cover bg-center flex justify-end items-center"
        style={{
          backgroundImage: `url('/contact/home-contact-banner.jpg')`,
        }}
      >
        <div className="container px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center md:text-right uppercase">
            Contact Us
          </h2>
        </div>
      </div>
      <div className="container px-4 md:px-8 py-12 md:py-16 mx-auto">
        <div className="flex -mx-4 md:-mx-8 flex-wrap">
          <div className="px-4 md:px-8 w-full md:basis-1/2 md:max-w-[50%] order-last md:order-first mt-8 md:mt-0">
            <div className="flex w-full h-full justify-center items-center">
              <div className="max-w-96">
                <div className="mb-4">
                  <h3 className="font-bold text-4xl mb-4">Lets talk with us</h3>
                  <p className="mb-8">
                    Questions, comments, or suggestions? Simply fill in the form
                    and we’ll be in touch shortly.
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="flex items-start mb-4 gap-2 text-lg font-bold">
                      <div className="pt-0.5">
                        <GrLocation className="h-6 w-6 text-skyline" />
                      </div>
                      <div className="leading-6">{contactDetails.location}</div>
                    </li>
                    <li className="flex items-start mb-4 gap-2 text-lg font-bold">
                      <div className="pt-0.5">
                        <TbPhoneCall className="h-6 w-6 text-skyline" />
                      </div>
                      <a
                        href={`tel:${contactDetails.contactNumber}`}
                        className="leading-6 hover:underline"
                      >
                        {contactDetails.contactNumber}
                      </a>
                    </li>
                    <li className="flex items-start mb-4 gap-2 text-lg font-bold">
                      <div className="pt-0.5">
                        <MdOutlineMail className="h-6 w-6 text-skyline" />
                      </div>
                      <a
                        href="mailto:contact@gyronproag.com"
                        className="leading-6 hover:underline lowercase"
                      >
                        {contactDetails.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 md:px-8  w-full md:basis-1/2 md:max-w-[50%] order-first md:order-last">
            <div className="p-4 lg:p-8 border border-stone-200 rounded-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
