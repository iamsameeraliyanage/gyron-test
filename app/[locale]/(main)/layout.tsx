import type { Metadata } from 'next';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Locale, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import BaseLayout from '@/app/components/base-layout/BaseLayout';
import { getGlobalContent } from '@/api/services';

export const metadata: Metadata = {
  title: 'Gyron Pro Website',
  description:
    'The GYRON.PRO is equipped with a 6-cylinder engine that delivers maximum performance while still producing low noise emissions. The robust and maintenance-friendly construction made of high-quality materials enables easy maintenance. The sliding doors have locks that allow them to be opened in different positions - even during flight.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const { data: globalContent } = await getGlobalContent(locale);

  const navLinks = globalContent?.navbar;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <BaseLayout locale={locale} bgColorClassName="bg-[#1f2d3b]">
      <Navbar navLinks={navLinks} />
      {children}
      {/* <Footer /> */}
    </BaseLayout>
  );
}
