import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_FRONT_HOST || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function loginService(email: string, password: string): Promise<string> {
    const response = await api.post('/auth/login', { email, password });
    const { access_token } = response.data;
    return access_token;
}

export async function registerService(email: string, password: string, confirmPassword: string): Promise<void> {
    await api.post('/auth/register', { email, password, confirmPassword });
}

export function logoutService(): void {
    localStorage.removeItem('token');
}
