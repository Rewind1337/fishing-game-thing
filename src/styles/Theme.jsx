import { createTheme } from '@mui/material/styles';

const Theme = createTheme(
  {
    palette: {
      mode: 'dark',
      fishing: {
        main: '#005792',
        dark: '#4081ad',
        contrastText: '#EEEEEE',
      },
      gathering: {
        main: '#3c8d42',
        dark: '#6daa71',
        contrastText: '#EEEEEE',
      },
      adventure: {
        main: '#c07f24',
        dark: '#d09f5b',
        contrastText: '#EEEEEE',
      },
      queen: {
        main: '#c53c3c',
        dark: '#d46d6d',
        contrastText: '#EEEEEE',
      },
      home: {
        main: '#888888',
        dark: '#aaaaaa',
        contrastText: '#EEEEEE',
      },
      tutorial: {
        main: '#3baea0',
        dark: '#6cc2b8',
        contrastText: '#EEEEEE',
      },
    },
  }
);

export default Theme;