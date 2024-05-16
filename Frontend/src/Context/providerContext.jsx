/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import dataContext from './createContext';

function ProviderContext({ children }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoading(false);
    }, []);

    return (
        <dataContext.Provider value={{ token, setToken, loading }}>
            {children}
        </dataContext.Provider>
    );
}

export default ProviderContext;
