This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Developer Guildene

### Folder structure

```
frontend/
|── app/                                # Root folder for Next.js pages and components
|   ├── fonts/                          # Global fonts for the application
|   ├── components/                     # All Common Components goes inside here
|   ├── [locale]/                       # Dynamic locale folder for i18n localization
|   │   ├── (configurator)/             # Group routing for the gyrocopter configurator
|   │   │   ├── componenets/            # Configurator-specific Components goes inside here
|   │   │   ├── design/                 # Design-specific pages for gyrocopter configurator
|   │   │   ├── [id]/                   # Dynamic page for specific gyrocopter configurator ("/design/:id")
|   │   │   │   ├── page.tsx            # Dynamic gyrocopter configurator page
|   │   │   ├── layout.tsx              # Layout for configurator pages
|   │   ├── (main)/                     # Group routing for main website pages
|   │   │   ├── componenets/            # Main Web-specific Components goes inside here
|   │   │   ├── models/                  # Gyrocopter model details page ("/models")
|   │   │   │   ├── page.tsx            # Model details page
|   │   │   ├── [id]/                   # Dynamic page for specific gyrocopter details ("/models/:id")
|   │   │   │   ├── page.tsx            # Dynamic gyrocopter details page
|   │   │   ├── about/                  # About page ("/about")
|   │   │   │   ├── page.tsx            # About page content
|   │   │   ├── contact/                # Contact page ("/contact")
|   │   │   │   ├── page.tsx            # Contact page content
|   │   │   ├── layout.tsx              # Layout for main website pages
|   │   │   ├── page.tsx                # Home page ("/")
|   ├── globals.css                     # Global styles for the web application
|── i18n/                                # Localization message JSON files for i18n
|   |── middleware.ts                   # Middleware for handling i18n locale detection
|   |── routing.ts                      # Helper file for routing setup and links
|── messages/                           # Localization message JSON files for i18n
|   ├── en.json                         # English translations
|   ├── de.json                         # German translations
|── public/                             # Static files like images and icons
|── .eslintrc.json                      # ESLint configuration file
|── next.config.ts                      # Next.js configuration file
|── package-lock.json                   # Package-lock file for dependencies
|── package.json                        # NPM package file defining dependencies and scripts
|── tailwind.config.ts                  # TailwindCSS configuration file
|── tsconfig.json                       # TypeScript configuration file


```

### Folder Naming

      - Use lowercase names for folders.
      - For multi-word folder names, separate words with hyphens `(-)`.
            - Example: `app`, `privacy-policy`

### Component Naming

      - For component folders, follow the same naming convention as regular folders (lowercase, hyphen-separated).
            - Example: `locale-switcher/`
      - Inside component folders, use PascalCase (also known as UpperCamelCase) for the main .tsx component file.
            - Example: `LocaleSwitcher.tsx`

### File Naming

      - For other files, use lowercase names with words separated by hyphens `(-)`.
      - Example: `index.ts`, `config-settings.ts`

### i18n translation

####

Use `import { Link, redirect, usePathname, useRouter, getPathname } from "@/i18/routing";` for internal routing

#### Default pages

```

      const translate = useTranslations("Homepage");

```

#### Async pages

```

      const translate = await getTranslations("Homepage");

```

#### 'use client' components

```
      // const translate = useTranslations("Homepage"); or const translate = await getTranslations("Homepage");
            from server component and pass as prop

    <SomeUseClientComponent translate={translate}  />

```
