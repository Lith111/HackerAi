/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',  // indigo-600
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        danger: {
          50: '#fff1f2',
          500: '#f43f5e',  // rose-500
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981',  // emerald-500
        },
        dark: {
          900: '#0f172a',  // slate-900
          800: '#1e293b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}