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
            main: '#e5133c',
            contrastText: '#fff',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
