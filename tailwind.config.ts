import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#121212',
          surface: '#232323',
        },
        text: {
          primary: '#E5E5E5',
          secondary: '#9CA3AF',
        },
        accent: {
          DEFAULT: '#6EE7B7',
        },
      },
    },
  },
  plugins: [],
};

export default config;
