import React from 'react';

import { AuthProvider } from './Auth';

const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default AppProvider;