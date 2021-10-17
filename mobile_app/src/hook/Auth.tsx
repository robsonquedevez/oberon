import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    token: string,
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);

    useEffect(() => {
        (
            async () => {
                const token = await AsyncStorage.getItem('@Oberon:token');
                const user = await AsyncStorage.getItem('@Oberon:user');

                if(token && user) {
                    setData({token, user: JSON.parse(user)});
                    api.defaults.headers.authorization = `Bearer ${token}`;
                }
            }
        )()
    }, []);

    const signIn = useCallback( async ({ email, password }) => {
        const response = await api.post('/session', {
            email,
            password
        });

        const { token, user } = response.data;

        await AsyncStorage.setItem('@Oberon:token', token);
        await AsyncStorage.setItem('@Oberon:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        AsyncStorage.removeItem('@Oberon:token');
        AsyncStorage.removeItem('@Oberon:user');
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: data.user, signIn, signOut, token: data.token }}
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