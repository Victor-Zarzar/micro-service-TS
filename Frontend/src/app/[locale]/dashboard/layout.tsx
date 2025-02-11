'use client';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../../components/AppBar/AppBar';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login');
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <ResponsiveAppBar />
            <main className="flex min-h-screen flex-col items-center justify-between">{children}</main>
            <Footer />
        </div>
    );
}
