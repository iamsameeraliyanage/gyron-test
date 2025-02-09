'use client';

import { Link, usePathname } from '@/i18n/routing';

const Breadcrumbs = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');

    const label = segment === '[modelId]' ? 'Model Name' : segment;

    return { href, label };
  });

  return (
    <nav
      aria-label="breadcrumbs"
      className="flex text-sm px-6 pb-2 pt-2.5 bg-[#181818] uppercase relative"
    >
      <div
        className="absolute top-0 right-[-2.4rem] w-0 h-0 border-solid [border-width:2.5rem_2.5rem_0_0] 
  [border-color:#181818_transparent_transparent_transparent] 
  [transform:rotate(0deg)]"
      />
      <Link href="/" className="text-white hover:underline">
        Home
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.href} className="flex items-center">
          <span className="mx-2 text-white">/</span>
          {index === breadcrumbs.length - 1 ? (
            <span className="text-white font-bold">{breadcrumb.label}</span>
          ) : (
            <Link href={breadcrumb.href} className="text-white hover:underline">
              {breadcrumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
