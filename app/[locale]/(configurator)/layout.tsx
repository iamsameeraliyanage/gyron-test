import type { Metadata } from 'next';
import BaseLayout from '@/app/components/base-layout/BaseLayout';
import { notFound } from 'next/navigation';
import { Locale, routing } from '@/i18n/routing';

import 'swiper/css';

export const metadata: Metadata = {
  title: 'Gyron Pro Configurator',
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

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <BaseLayout locale={locale} bgColorClassName="bg-configOverlay">
      <main className="flex flex-col flex-grow relative overflow-auto">
        {children}
      </main>
    </BaseLayout>
  );
}
