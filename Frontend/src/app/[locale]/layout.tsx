import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../components/AuthContext/AuthContext';
import LayoutProvider from '../components/Layout/Layout';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Microservice Full Stack',
    description: 'Generated by create Victor Zarzar',
};

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={JetBrains.className}>
                <AuthProvider>
                    <NextIntlClientProvider messages={messages}>
                        <LayoutProvider>{children}</LayoutProvider>
                    </NextIntlClientProvider>
                </AuthProvider>
            </body>
        </html>
    );
}