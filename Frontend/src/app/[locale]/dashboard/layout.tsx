'use client';

import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DashboardLayoutBasic from '../../components/Dashboard/Dashboard';
import { useAuth } from '../../contexts/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
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
                <CircularProgress sx={{ color: '#1976d2' }} />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <DashboardLayoutBasic>{children}</DashboardLayoutBasic>
        </div>
    );
}
