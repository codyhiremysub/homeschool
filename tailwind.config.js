module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '414px',
      },
      height: {
        '9/10': '90%',
      },
      width: {
        '3.5/12': '30%',
        18: '4.5rem',
        30: '7.5rem',
        152: '38rem',
        184: '46rem',
        248: '62rem',
        312: '78rem',
        320: '80rem',
        'screen-25': '25vw',
        'screen-50': '50vw',
        'screen-65': '65vw',
        'screen-75': '75vw',
        'screen-85': '85vw',
        'screen-90': '90vw',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      maxWidth: {
        52: '13rem',
        prose: '80ch',
      },
      colors: {
        'gray-450': '#9F9E9E',
        'blue-55': '#EAF1FF',
        'blue-150': '#EBF2FF',
        'blue-450': '#1E80F9',
      },
      fontSize: {
        '6.2xl': '4rem',
        '4.1xl': '2.0625rem',
        '4.3xl': '2.4rem',
        '4.8xl': '2.875rem',
        '4.7xl': '2.75rem',
        '3.8xl': '1.8rem',
        xs: '12px',
      },
      gap: {
        '1/6': '16.666667%',
        '1/12': '8.333333%',
      },
      margin: {
        3.5: '14px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
};
