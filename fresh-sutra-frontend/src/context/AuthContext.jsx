import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Load persist auth data
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save to state
            setUser(data.user);
            setToken(data.token);
            setIsAuthenticated(true);

            // Persist
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        isAuthenticated,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
