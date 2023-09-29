import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './tools/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './wedding/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#006FEE',
      },
      fontSize: {
        base: ['17px', '24px'],
        elevated: ['19px', '25px'],
        lead: ['21px', '26px'],
        good: ['24px', '20px'],
        icon: ['28px', '32px'],
      },
      letterSpacing: {
        base: '0.013em',
        lead: '0.021em',
      },
      keyframes: {
        'slide-up': {
          from: { transform: 'translate3d(0, 100%, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
        'slide-down': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(0, 100%, 0)' },
        },
        'fade-in': {
          from: { opacity: '0', visibility: 'hidden' },
          to: { opacity: '1', visibility: 'visible' },
        },
        'fade-out': {
          from: { opacity: '1', visibility: 'visible' },
          to: { opacity: '0', visibility: 'hidden' },
        },
      },
      animation: {
        'fade-in': 'fade-in .3s ease-in-out',
        'fade-out': 'fade-out .3s ease-in-out',
        'slide-up': 'slide-up .5s cubic-bezier(.4, 0, .2, 1)',
        'slide-down': 'slide-down .5s cubic-bezier(.4, 0, .2, 1)',
      },
      transitionTimingFunction: {
        transform: 'cubic-bezier(.4, 0, .2, 1)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
}
export default config
