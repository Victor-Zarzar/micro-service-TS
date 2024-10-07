'use client';
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, FormHelperText, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Email e senha são obrigatórios.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Por favor, insira um e-mail válido.');
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
            <Container fixed className="max-w-md mx-auto p-4 md:p-10 bg-white rounded-lg shadow-md mt-40">
                <FormControl fullWidth>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                        <LockOpenIcon sx={{ mr: 1 }} className='dark:text-black' />
                        <FormLabel htmlFor="login" className="dark:text-black text-lg">
                            Login
                        </FormLabel>
                    </Box>

                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error}
                        helperText={error && !validateEmail(email) ? 'E-mail inválido' : ''}
                        autoComplete="email"
                    />
                    <TextField
                        id="password"
                        label="Senha"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        helperText={error && password.length === 0 ? 'Senha é obrigatória' : ''}
                        autoComplete="password"
                    />
                    {error && <FormHelperText error>{error}</FormHelperText>}

                    <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading} fullWidth style={{ marginTop: '16px' }}>
                        {loading ? <CircularProgress size={24} /> : 'Entrar'}
                    </Button>
                    <Button variant="text" color="primary" onClick={handleRegisterRedirect} fullWidth style={{ marginTop: '8px' }}>
                        Não tem uma conta? Registre-se
                    </Button>
                </FormControl>
            </Container>
        </>
    );
};

export default LoginPage;