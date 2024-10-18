'use client';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { darkTheme, lightTheme } from '../Theme/Theme';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}