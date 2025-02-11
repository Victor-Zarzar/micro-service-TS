import { blue, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: blue[500],
        },
        secondary: {
            main: blue[700],
        },
        background: {
            default: grey[50],
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: grey[800],
        },
        secondary: {
            main: grey[700],
        },
        background: {
            default: grey[900],
        },
    },
});

export { darkTheme, lightTheme };
