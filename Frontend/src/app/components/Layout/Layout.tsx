'use client';
import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../AuthContext/AuthContext';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();

    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {isAuthenticated && <Navbar />}
            {children}
            {isAuthenticated && <Footer />}
        </NextThemesProvider>
    );
}
