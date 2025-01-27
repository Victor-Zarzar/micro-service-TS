'use client';
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, confirmPasword: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login(email: string, password: string) {
        if (email && password) {
            setIsAuthenticated(true);
        }
    }

    async function register(email: string, password: string, confirmPassword: string) {
        return new Promise<void>((resolve, reject) => {
            if (password !== confirmPassword) {
                reject('As senhas não correspondem.');
            } else {
                setTimeout(() => {
                    setIsAuthenticated(true);
                    resolve();
                }, 1000);
            }
        });
    }

    function logout() {
        return setIsAuthenticated(false);
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