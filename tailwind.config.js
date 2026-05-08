/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ember: {
          50: '#fff3e6',
          200: '#ffc26e',
          400: '#ff8a22',
          500: '#f56516',
          700: '#b72f13',
          900: '#55130d',
        },
        forge: {
          200: '#f7d27a',
          400: '#d99a2b',
          600: '#8d5e17',
        },
        void: {
          950: '#080706',
          900: '#100b09',
          850: '#171210',
          800: '#211916',
          700: '#30231f',
        },
      },
      boxShadow: {
        ember: '0 0 34px rgba(245, 101, 22, 0.16)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
