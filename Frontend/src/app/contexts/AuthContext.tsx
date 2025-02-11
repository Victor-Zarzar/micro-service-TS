'use client';
import React, { createContext, useContext, useState } from 'react';
import * as UserService from '../../services/UserService';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

    async function login(email: string, password: string) {
        try {
            const token = await UserService.loginService(email, password);
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Erro de login:', error);
        }
    }

    async function register(email: string, password: string, confirmPassword: string) {
        try {
            if (password !== confirmPassword) {
                throw new Error('As senhas não correspondem.');
            }
            await UserService.registerService(email, password, confirmPassword);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Erro de registro:', error);
        }
    }

    function logout() {
        UserService.logoutService();
        setIsAuthenticated(false);
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
