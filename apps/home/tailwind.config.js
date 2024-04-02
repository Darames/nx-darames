const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      'md': '768px',
      'lg': '1024px',
    },
    colors: {
      transparent: 'transparent',
      red: 'red',
      black: 'black',
      white: 'white',
      bg: '#141414',
      proxcard: {
        border:'hsl(280 10% 50% / 1)',
        card: 'rgb(30, 30, 35)',
        text: 'hsl(240 18% 80%)',
        container: ''
        // card: 'hsl(237 36% 10%)', // original
        // container: 'hsl(246 44% 7%)' // original
      },
      fm: {
        lct: {
          grayishBlue: 'hsl(237, 18%, 59%)',
          softRed: 'hsl(345, 95%, 68%)',
          darkDesaturatedBlue: 'hsl(236, 21%, 26%)',
          veryDarkBlue: 'hsl(235, 16%, 14%)',
          veryVeryDarkBlue: 'hsl(234, 17%, 12%)'
        }
      }
    },
    fontFamily: {
      redHat: 'Red Hat Text'
    },
    extend: {
      backgroundImage: {
        'proxcard-gradient-2': 'conic-gradient(from 180deg at 50% 70%,hsla(0,0%,98%,1) 0deg,#eec32d 72.0000010728836deg,#ec4b4b 144.0000021457672deg,#709ab9 216.00000858306885deg,#4dffbf 288.0000042915344deg,hsla(0,0%,98%,1) 1turn);',
        'proxcard-gradient': 'linear-gradient(135deg, #d0e4f7 0%,#73b1e7 24%,#0a77d5 50%,#539fe1 79%,#87bcea 100%);'
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const utility = {
        '.preserve-3d': {
          transformStyle: 'preserve-3d'
        },
        '.flip-x': {
          transform: 'rotateX(180deg)'
        },
        '.-flip-x': {
          transform: 'rotateX(-180deg)'
        },
        '.flip-y': {
          transform: 'rotateY(180deg)'
        },
      };
      addUtilities(utility);
    }),
  ],
};
