import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            light: '#d77367',
            main: '#cd5141',
            dark: '#8f382d',
            contrastText: '#fff',
        },
        secondary: {
            light: '#d7ab67',
            main: '#cd9741',
            dark: '#8f692d',
            contrastText: '#000',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
