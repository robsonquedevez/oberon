import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
    code: string;
    name: string;
    email: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GPClients:token');
        const user = localStorage.getItem('@GPClients:user');

        if(token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback( async ({ email, password }) => {
        const response = await api.post('/session', {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem('@GPClients:token', token);
        localStorage.setItem('@GPClients:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@GPClients:token');
        localStorage.removeItem('@GPClients:user');
        localStorage.removeItem(`@GPClients${data.user.code}:Invoices`);
        localStorage.removeItem(`@GPClients${data.user.code}:Orders`);
        setData({} as AuthState);
    }, [data]);

    return (
        <AuthContext.Provider
            value={{ user: data.user, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}