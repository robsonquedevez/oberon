import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    administrator: boolean;
    enterprise: string;
}

interface AuthState {
    user: User;
    token: string;
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
        const token = localStorage.getItem('@Oberon:token');
        const user = localStorage.getItem('@Oberon:user');

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

        localStorage.setItem('@Oberon:token', token);
        localStorage.setItem('@Oberon:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@Oberon:token');
        localStorage.removeItem('@Oberon:user');
        setData({} as AuthState);
    }, []);

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