'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, FormHelperText, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../components/AuthContext/AuthContext';

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        setError('');

        if (!email || !password || !confirmPassword) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não correspondem.');
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
                <FormLabel htmlFor="email" className="dark:text-black text-center text-lg mb-4">
                    Registrar
                </FormLabel>

                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error && !validateEmail(email)}
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
                    error={!!error && password.length === 0}
                    helperText={error && password.length === 0 ? 'Senha é obrigatória' : ''}
                    autoComplete="current-password"
                />

                <TextField
                    id="confirm-password"
                    label="Confirme a Senha"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!error && confirmPassword !== password}
                    helperText={error && confirmPassword !== password ? 'As senhas não correspondem' : ''}
                    autoComplete="new-password"
                />

                {error && <FormHelperText error>{error}</FormHelperText>}

                <Button variant="contained" color="primary" onClick={handleRegister} disabled={loading} fullWidth style={{ marginTop: '16px' }}>
                    {loading ? <CircularProgress size={24} /> : 'Registrar'}
                </Button>

                <Button variant="text" color="primary" onClick={handleReturnLogin} fullWidth style={{ marginTop: '8px' }}>
                    Já tem uma conta? Fazer login
                </Button>
            </FormControl>
        </Container>
    );
};

export default RegisterPage;