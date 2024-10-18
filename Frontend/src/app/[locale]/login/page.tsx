'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, FormHelperText, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuth } from '../../components/AuthContext/AuthContext';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const t = useTranslations('LoginPage');
    const theme = useTheme();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError(t('requiredfields'));
            return;
        }

        if (!validateEmail(email)) {
            setError(t('invalidemail'));
            return;
        }

        setLoading(true);
        setError('');

        try {
            login(email, password);
            router.push('/dashboard');
        } catch (err) {
            setError(String(err));
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterRedirect = () => {
        router.push('/register');
    };

    return (
        <>
            <Container
                fixed
                className="max-w-md mx-auto p-4 md:p-10 rounded-lg shadow-md mt-40"
                sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? grey[800] : theme.palette.background.default,
                }}
            >
                <FormControl fullWidth>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                        <LockOpenIcon sx={{ mr: 1, color: theme.palette.text.primary }} />
                        <FormLabel htmlFor="login" sx={{ color: theme.palette.text.primary, fontSize: '1.25rem' }}>
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
                        error={!!error}
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
                        error={!!error}
                        helperText={error && password.length === 0 ? t('passwordisrequired') : ''}
                        autoComplete="password"
                    />
                    {error && <FormHelperText error>{error}</FormHelperText>}

                    <Button variant="contained" color="secondary" onClick={handleLogin} disabled={loading} fullWidth style={{ marginTop: '16px' }}>
                        {loading ? <CircularProgress size={24} /> : t('toenter')}
                    </Button>
                    <Button
                        variant="text"
                        onClick={handleRegisterRedirect}
                        fullWidth
                        style={{
                            marginTop: '8px',
                            color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
                        }}
                    >
                        {t('register')}
                    </Button>
                </FormControl>
            </Container>
        </>
    );
};

export default LoginPage;