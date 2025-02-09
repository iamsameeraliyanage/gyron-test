import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Define supported locales
const locales = ['en', 'de'];

// Define country-to-language mapping
const countryLanguageMap: Record<string, string> = {
  DE: 'de', // Germany → German
  AT: 'de', // Austria → German
  CH: 'de', // Switzerland → German
  LI: 'de', // Liechtenstein → German
  LU: 'de', // Luxembourg → German (official language)
  BE: 'de', // Belgium → German (German-speaking community in the east)
  IT: 'de', // Italy (South Tyrol region → German)
};

// Default locale when no match is found
const defaultLocale = 'de';

// Middleware function
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Extract the locale from the URL (e.g., `/en/about` → `en`)
  const pathSegments = pathname.split('/');
  const currentLocale = locales.includes(pathSegments[1])
    ? pathSegments[1]
    : null;

  // If locale is already set, continue as usual
  if (currentLocale) {
    return createMiddleware({
      locales,
      defaultLocale,
    })(req);
  }

  // Get user's country from Cloudflare headers (or use another geo-location service)
  const country = req.headers.get('cf-ipcountry') || ''; // Default to unknown

  // Determine locale (default to English unless mapped otherwise)
  const detectedLocale = countryLanguageMap[country] || defaultLocale;

  // Redirect to the detected locale
  return NextResponse.redirect(
    new URL(`/${detectedLocale}${pathname}`, req.url)
  );
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/', '/(de|en)/:path*'],
};
