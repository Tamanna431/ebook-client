'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// API Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
 
 // console.log('Google URL:', googleUrl);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Setup axios defaults
  useEffect(() => {
   // axios.defaults.baseURL = API_URL;
     axios.defaults.baseURL = `${API_URL}/api`; 
     // console.log('API URL:', apiUrl);
  
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        // Set token in axios headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Register function - ✅ FIXED: No auto-login, redirect to login page
  const register = async (formData) => {
    try {
      const response = await axios.post('/auth/register', formData);
      
      if (response.data.success) {
        // ✅ শুধু success message দেখান, token সেভ করবেন না
        toast.success('Registration successful! Please sign in.');
        
        // ✅ Login page এ redirect করুন
        router.push('/login');
        
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Login function - ✅ Token সেভ হবে এবং home page এ যাবে
  const login = async (formData) => {
    try {
      const response = await axios.post('/auth/login', formData);
      
      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        // ✅ Token এবং user সেভ করুন
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(userData);
        toast.success(`Welcome back, ${userData.name}!`);
        
        // ✅ Role-based redirection
        if (userData.role === 'admin') {
          router.push('/dashboard/admin');
        } else if (userData.role === 'writer') {
          router.push('/dashboard/writer');
        } else {
          router.push('/');
        }
        
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};