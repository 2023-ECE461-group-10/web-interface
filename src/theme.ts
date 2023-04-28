import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: red.A400,
            dark: '#ba000d',
            contrastText: '#000',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
