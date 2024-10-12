'use client';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResponsiveAppBar from '../../components/AppBar/AppBar';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../components/AuthContext/AuthContext';

export default function DashboardPage() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <ResponsiveAppBar />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <h1>Dashboard</h1>
            </main>
            <Footer />
        </>
    );
}
