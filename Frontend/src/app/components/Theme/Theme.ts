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
            paper: grey[50],
        },
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: blue[500],
                    color: 'white',
                    border: '1px solid #ccc',
                },
            },
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
            paper: grey[900],
        },
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: grey[900],
                    color: 'white',
                    border: '1px solid #444',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                    '&.Mui-focused': {
                        color: 'white',
                    },
                },
            },
        },
    },
});

export { darkTheme, lightTheme };
