import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            light: '#4fb3be',
            main: '#00838e',
            dark: '#005661',
            contrastText: '#fff',
        },
        secondary: {
            light: '#636871',
            main: '#393e46',
            dark: '#13181f',
            contrastText: '#fff',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
