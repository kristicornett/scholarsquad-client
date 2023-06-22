import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#39325F',
    },
    secondary: {
      main: '#F0F8FF',
    },
    tertiary: {
      main: '#FFE436',
    },
    error: {
      main: red.A400,
    },
  },
});
export default theme;