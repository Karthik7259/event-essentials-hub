import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        // Optionally verify token with backend
        try {
          const response = await fetch(`${API_BASE_URL}/api/user/verify-token`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });
          if (!response.ok) {
            localStorage.removeItem('authToken');
            setToken(null);
            setIsAuthenticated(false);
          }
        } catch (err) {
          console.error('Token verification failed:', err);
        }
      }
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('token', data.token); // Also store as 'token' for compatibility
      localStorage.setItem('userId', data.user?._id || data.user?.id || '');
      localStorage.setItem('userName', data.user?.name || email);
      setToken(data.token);
      setIsAuthenticated(true);
      setUser({ 
        id: data.user?._id || data.user?.id,
        name: data.user?.name || email.split('@')[0],
        email: data.user?.email || email
      });

      return { success: true, message: 'Login successful' };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during login';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('token', data.token); // Also store as 'token' for compatibility
      localStorage.setItem('userId', data.user?._id || data.user?.id || '');
      localStorage.setItem('userName', name);
      setToken(data.token);
      setIsAuthenticated(true);
      setUser({ 
        id: data.user?._id || data.user?.id,
        name: name,
        email: email
      });

      return { success: true, message: 'Registration successful' };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during registration';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      return { success: true, message: data.message };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email, otp) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'OTP verification failed');
      }

      return { success: true, message: data.message };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email, otp, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Password reset failed');
      }

      return { success: true, message: data.message };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        forgotPassword,
        verifyOTP,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
