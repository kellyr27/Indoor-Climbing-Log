import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      main: '#f44336',
    },
    error: {
        main: '#f44336',
    },
    warning: {
        main: '#ff9800',
    },
    info: {
        main: '#2196f3',
    },
    success: {
        main: '#4caf50',
    },
    background: {
        default: '#fafafa',
        paper: '#fff',
    },
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
            },
          },
        },
    },
  },
});

export default theme;