/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: '#6C737F',
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D2D6DB',
          400: '#9DA4AE',
          500: '#6C737F',
          600: '#4D5761',
          700: '#384250',
          800: '#1F2A37',
          900: '#111927',
        },
        primary: {
          DEFAULT: '#0074D8',
          10: '#E6F2FC',
          30: '#B2D5F3',
          100: '#0074D8',
          200: '#004682',
        },
        success: {
          DEFAULT: '#07893B',
          10: '#E7F4EA',
          30: '#B4DBC4',
          100: '#07893B',
          200: '#045223',
        },
        danger: {
          DEFAULT: '#F75D34',
          10: '#F6E8E7',
          30: '#E2B8B5',
          100: '#9F140B',
          200: '#5F0C07',
        },
        warning: {
          DEFAULT: '#FFE248',
          10: '#F9F4E8',
          30: '#EADCB9',
          100: '#BC8B18',
          200: '#71530E',
        },
      },
      boxShadow: {
        wb: '3px 4px 16px 0px rgba(0,0,0,0.16)',
        wt: '0px -4px 16px 0px rgba(0,0,0,0.16)',
        tb: '0px 2px 6px 0px rgba(0,0,0,0.08)',
        tt: '0px -2px 6px 0px rgba(0,0,0,0.08)',
      },
      borderColor: '#CACDCD',
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
    function ({ addBase, theme }) {
      function hexToRgb(hex) {
        const value = hex.charAt(0) === '#' ? hex.substring(1, 7) : hex;

        return [
          parseInt(value.substring(0, 2), 16),
          parseInt(value.substring(2, 4), 16),
          parseInt(value.substring(4, 6), 16),
        ].join(',');
      }

      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable =
            colorKey === 'DEFAULT' ? `--color${colorGroup}` : `--color${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === 'string'
              ? {
                  [cssVariable]: value,
                  [`${cssVariable}-rgb`]: hexToRgb(value),
                }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
};
