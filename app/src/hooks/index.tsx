import React from 'react';
import { MenuProvider } from './MenuContext';
import { AuthProvider } from './Auth';
import { SnackbarProvider } from 'notistack'
  

const AppProvider: React.FC = ({ children }) => (
    <AuthProvider>
        <MenuProvider>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                { children }
            </SnackbarProvider>
        </MenuProvider>
    </AuthProvider>
)

export default AppProvider;