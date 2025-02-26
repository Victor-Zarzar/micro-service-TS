'use client';

import PasswordIcon from '@mui/icons-material/Password';
import { Box, Button, CircularProgress, Container, FormControl, FormLabel, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { resetPasswordService } from '../../../services/UserService';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const t = useTranslations('Forgot-Password');
    const theme = useTheme();

    function validateEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleResetPassword() {
        if (!email) {
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
            await resetPasswordService(email);
            alert(t('emailsent'));
            router.push('/login');
        } catch (err) {
            setError(t('error'));
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container
            maxWidth="xs"
            className="mx-auto p-4 md:p-10 rounded-lg shadow-md mt-40"
            sx={{
                backgroundColor: theme.palette.mode === 'dark' ? grey[800] : theme.palette.background.default,
            }}
        >
            <FormControl fullWidth={true}>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <PasswordIcon sx={{ mr: 1, color: theme.palette.text.primary }} />
                    <FormLabel htmlFor="forgot-password" sx={{ color: theme.palette.text.primary, fontSize: '1.25rem' }}>
                        {t('title')}
                    </FormLabel>
                </Box>

                <TextField
                    id="email"
                    label={t('email')}
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error}
                    helperText={error}
                    autoComplete="email"
                />

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleResetPassword}
                    disabled={loading}
                    fullWidth={true}
                    sx={{ textTransform: 'none', marginTop: '16px' }}
                >
                    {loading ? <CircularProgress size={24} /> : t('send')}
                </Button>

                <Button
                    variant="text"
                    onClick={() => router.push('/login')}
                    fullWidth={true}
                    style={{
                        marginTop: '8px',
                        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
                    }}
                    sx={{ textTransform: 'none' }}
                >
                    {t('backtologin')}
                </Button>
            </FormControl>
        </Container>
    );
}
