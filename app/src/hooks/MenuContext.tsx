import React, { createContext, useState, useCallback, useContext } from 'react';

interface MenuContextData {
    show: boolean,
    setShow(): void;
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

export const MenuProvider: React.FC = ({ children }) => {
    const [showMenu, setShowMenu ] = useState<boolean>(false);

    const setShow = useCallback(() => {
        setShowMenu(!showMenu);
    }, [showMenu]);

    return (
        <MenuContext.Provider
            value={{ show: showMenu, setShow }}
        >
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu(): MenuContextData {
    const context = useContext(MenuContext);
    if(!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
}