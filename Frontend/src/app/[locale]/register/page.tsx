'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, FormHelperText, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../../components/AuthContext/AuthContext';
import { useTranslations } from 'next-intl';

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const t = useTranslations('RegisterPage');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        setError('');

        if (!email || !password || !confirmPassword) {
            setError(t('requiredfields'));
            return;
        }

        if (!validateEmail(email)) {
            setError(t('invalidemail'));
            return;
        }

        if (password !== confirmPassword) {
            setError(t('passwordnotmatch'));
            return;
        }

        setLoading(true);

        try {
            await register(email, password, confirmPassword);
            router.push('/login');
        } catch (err) {
            setError(String(err));
        } finally {
            setLoading(false);
        }
    };

    const handleReturnLogin = () => {
        router.push('/login');
    };

    return (
        <Container fixed className="max-w-md mx-auto p-4 md:p-10 bg-white rounded-lg shadow-md mt-40">
            <FormControl fullWidth>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <PersonAddIcon sx={{ mr: 1 }} className="dark:text-black" />
                    <FormLabel htmlFor="register" className="dark:text-black text-lg">
                        {t('title')}
                    </FormLabel>
                </Box>
                <TextField
                    id="email"
                    label={t('email')}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error && !validateEmail(email)}
                    helperText={error && !validateEmail(email) ? t('invalidemail') : ''}
                    autoComplete="email"
                />

                <TextField
                    id="password"
                    label={t('password')}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error && password.length === 0}
                    helperText={error && password.length === 0 ? t('passwordisrequired') : ''}
                    autoComplete="current-password"
                />

                <TextField
                    id="confirm-password"
                    label={t('confirmpassword')}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!error && confirmPassword !== password}
                    helperText={error && confirmPassword !== password ? t('passwordnotmatch') : ''}
                    autoComplete="new-password"
                />

                {error && <FormHelperText error>{error}</FormHelperText>}

                <Button variant="contained" color="primary" onClick={handleRegister} disabled={loading} fullWidth style={{ marginTop: '16px' }}>
                    {loading ? <CircularProgress size={24} /> : t('register')}
                </Button>

                <Button variant="text" color="primary" onClick={handleReturnLogin} fullWidth style={{ marginTop: '8px' }}>
                    {t('login')}
                </Button>
            </FormControl>
        </Container>
    );
};

export default RegisterPage;