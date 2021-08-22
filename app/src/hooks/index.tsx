import React from 'react';
import { MenuProvider } from './MenuContext';

const AppProvider: React.FC = ({ children }) => (
    <MenuProvider>
        { children }
    </MenuProvider>
)

export default AppProvider;