'use client';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { extendTheme } from '@mui/material/styles';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import Footer from '../Footer/Footer';

const NAVIGATION: Navigation = [
    { segment: 'dashboard', title: 'Dashboard', pattern: '/dashboard', icon: <DashboardIcon /> },
    { segment: 'costs', title: 'Costs', pattern: '/dashboard/costs', icon: <AttachMoneyIcon /> },
    { segment: 'admin', title: 'Admin', pattern: '/dashboard/admin', icon: <AdminPanelSettingsIcon /> },
    { segment: 'logout', title: 'Logout', pattern: '/dashboard/logout', icon: <LogoutIcon /> },
];

const DashboardTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

function useDemoRouter(): Router {
    const router = useRouter();
    const pathname = usePathname();

    return React.useMemo(
        () => ({
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => {
                if (!String(path).startsWith('/dashboard')) {
                    router.push(`/dashboard${String(path)}`);
                } else {
                    router.push(String(path));
                }
            },
        }),
        [pathname, router],
    );
}

export default function DashboardLayoutBasic({ children }: { children: React.ReactNode }) {
    const router = useDemoRouter();

    return (
        <AppProvider
            branding={{
                logo: <span />,
                title: 'Dashboard',
                homeUrl: '/dashboard',
            }}
            navigation={NAVIGATION}
            router={router}
            theme={DashboardTheme}
        >
            <DashboardLayout>
                <PageContainer>{children}</PageContainer>
                <Footer />
            </DashboardLayout>
        </AppProvider>
    );
}
