const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      red: 'red',
      black: 'black',
      white: 'white',
      proxcard: {
        border:'hsl(280 10% 50% / 1)',
        card: 'hsl(237 36% 10%)',
        text: 'hsl(240 18% 80%)',
        container: 'hsl(246 44% 7%)'
      },
    },
    extend: {
      backgroundImage: {
        'proxcard-gradient-2': 'conic-gradient(from 180deg at 50% 70%,hsla(0,0%,98%,1) 0deg,#eec32d 72.0000010728836deg,#ec4b4b 144.0000021457672deg,#709ab9 216.00000858306885deg,#4dffbf 288.0000042915344deg,hsla(0,0%,98%,1) 1turn);',
        'proxcard-gradient': 'linear-gradient(135deg, #d0e4f7 0%,#73b1e7 24%,#0a77d5 50%,#539fe1 79%,#87bcea 100%);'
      },
    },
  },
  plugins: [],
};
