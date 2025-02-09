import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '960px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1360px',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        skyline: 'var(--skyline)',
        configOverlay: 'var(--configOverlay)',
        configFooter: 'var(--configFooter)',
      },
      fontFamily: {
        albert: ['var(--font-albert-sans)', ...fontFamily.sans],
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      screens: {
        '3xl': '1520px',
        '4xl': '1760px',
        '5xl': '1920px',
      },
      container: {
        screens: {
          '2xl': '1280px',
          '3xl': '1440px',
          '4xl': '1520px',
          '5xl': '1560px',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
