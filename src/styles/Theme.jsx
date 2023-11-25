import { createTheme } from '@mui/material/styles';

const PALETTE = {
  mode: 'dark',
  adventure: {
    main: '#c07f24',
    dark: '#d09f5b',
    sidebarHover: '#d8af76',
    contrastText: '#EEEEEE',
  },
  archaeology: {
    main: '#f9eb97',
    dark: '#9c935e',
    sidebarHover: '#fbf2be',
    contrastText: '#343434',
  },
  fishing: {
    main: '#005792',
    dark: '#4081ad',
    sidebarHover: '#80abc9',
    contrastText: '#EEEEEE',
  },
  gathering: {
    main: '#3c8d42',
    dark: '#6daa71',
    sidebarHover: '#85b889',
    contrastText: '#EEEEEE',
  },
  home: {
    main: '#888888',
    dark: '#aaaaaa',
    sidebarHover: '#bbbbbb',
    contrastText: '#EEEEEE',
  },
  inventory: {
    main: '#694709',
    dark: '#422c06',
    sidebarHover: '#b4a384',
    contrastText: '#EEEEEE',
  },
  mining: {
    main: '#5f40be',
    dark: '#30205f',
    sidebarHover: '#8770ce',
    contrastText: '#EEEEEE',
  },
  traders: {
    main: '#4cad00',
    dark: ' #419300',
    sidebarHover: '#94de5a',
    contrastText: '#EEEEEE',
  },
  queen: {
    main: '#c53c3c',
    dark: '#d46d6d',
    sidebarHover: '#db8585',
    contrastText: '#EEEEEE',
  },
  pets: {
    main: '#e58eff',
    dark: '#8f599f',
    sidebarHover: '#efb8ff',
    contrastText: '#EEEEEE',
  },
  tutorial: {
    main: '#3baea0',
    dark: '#6cc2b8',
    sidebarHover: '#9dd6d0',
    contrastText: '#EEEEEE',
  },
}

const BREAKPOINTS = {
  values: {
    //min-body-width is 500px
    mobile: 0,
    tablet: 640,
    desktop: 1000,
    widescreen: 1600,
  },
}

const Theme = createTheme(
  {
    breakpoints: BREAKPOINTS,
    palette: PALETTE,
  }
);

export default Theme;