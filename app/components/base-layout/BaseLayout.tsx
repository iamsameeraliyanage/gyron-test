import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Albert_Sans, Poppins } from 'next/font/google';
import { ReactNode } from 'react';

import './../../globals.css';
import { Locale } from '@/i18n/routing';
import { Toaster } from 'react-hot-toast';

const albert = Albert_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-albert-sans',
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

type Props = {
  children: ReactNode;
  locale: Locale;
  bgColorClassName?: string;
};

export default async function BaseLayout({
  children,
  locale,
  bgColorClassName,
}: Props) {
  const messages = await getMessages();

  return (
    <html className="h-full " lang={locale}>
      <body
        className={`${albert.variable}  ${poppins.variable} ${bgColorClassName} antialiased flex flex-col bg-cover bg-no-repeat bg-top bg-[url('/bg-images/page-bg.svg')]`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
              },
              success: {
                style: {
                  background: '#4ade80',
                  color: '#000000',
                },
                iconTheme: {
                  primary: '#ffffff',
                  secondary: '#4ade80',
                },
              },
              error: {
                style: {
                  background: '#ef4444', // Red for error
                  color: '#ffffff',
                },
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
