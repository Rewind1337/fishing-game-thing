import { createTheme } from '@mui/material/styles';

const Theme = createTheme(
  {
    palette: {
      mindaro: {
        main: '#D9ED92',
        dark: '#E6F7A5',
        contrastText: '#222222',
      },
      lime: {
        main: '#99D98C',
        dark: '#B3EFA7',
        contrastText: '#222222',
      },
      keppel: {
        main: '#52B69A',
        dark: '#77E0C2',
        contrastText: '#222222',
      },
      bondi: {
        main: '#168AAD',
        dark: '#37C5F0',
        contrastText: '#222222',
      },
      indigo: {
        main: '#184E77',
        dark: '#208FE5',
        contrastText: '#DDDDDD',
      },
      violet: {
        main: '#3E205D',
        dark: '#7D27D3',
        contrastText: '#DDDDDD',
      },
      blood: {
        main: '#60140C',
        dark: '#DD240F',
        contrastText: '#DDDDDD',
      },
    },
  }
);

export default Theme;