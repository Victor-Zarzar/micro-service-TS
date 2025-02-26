import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: ['/', '/login', '/register', '/forgot-password', '/dashboard', '/dashboard/costs', '/dashboard/admin', '/(en|pt|es)/:path*'],
};
