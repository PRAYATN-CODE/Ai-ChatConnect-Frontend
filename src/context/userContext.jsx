import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [token, setToken] = useState('');
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return JSON.parse(storedUser);
        } catch (error) {
            console.error('Failed to parse user from localStorage:', error);
            return null;
        }
    });

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext