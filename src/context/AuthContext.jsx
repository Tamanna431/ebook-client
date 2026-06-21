'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';  // ✅ Custom axios instance
import axios from 'axios';      // ✅ useEffect এ গ্লোবাল axios ব্যবহারের জন্য এটি ইমপোর্ট করা হলো
import toast from 'react-hot-toast';

const AuthContext = createContext();

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

// 1. প্রধান AuthProvider ফাংশনটি এখানে ডিফাইন করা হলো (যা আপনার কোডে মিসিং ছিল)
export const AuthProvider = ({ children }) => {
  const router = useRouter();

  // 2. কোডে ব্যবহৃত স্টেটগুলো ডিক্লেয়ার করা হলো
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.defaults.baseURL = `${API_URL}/api`;

    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      
      // কাস্টম api ইনস্ট্যান্সেও হেডার সেট করে দেওয়া নিরাপদ
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const register = async (formData) => {
    try {
      const response = await api.post('/api/auth/register', formData);

      if (response.data.success) {
        const { token, user: userData } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        // টোকেন পাওয়ার পর এক্সিওস হেডার আপডেট
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(userData);
        setIsAuthenticated(true);

        toast.success('Registration successful!');

        setTimeout(() => {
          if (userData.role === 'writer') {
            router.push('/login');
          } else {
            router.push('/login');
          }
        }, 500);

        return { success: true };
      }
    } catch (error) {
      console.error('❌ Register error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const login = async (formData) => {
    try {
      const response = await api.post('/api/auth/login', formData);

      if (response.data.success) {
        const { token, user: userData } = response.data;

        console.log('🔐 Login success:', userData);
        console.log('🔑 Token:', token);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        // টোকেন পাওয়ার পর এক্সিওস হেডার আপডেট
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(userData);
        setIsAuthenticated(true);

        toast.success(`Welcome back, ${userData.name}!`);

        setTimeout(() => {
          if (userData.role === 'admin') {
            router.push('/dashboard/admin');
          } else if (userData.role === 'writer') {
            router.push('/dashboard/writer');
          } else {
            router.push('/dashboard/user');
          }
        }, 500);

        return { success: true };
      }
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // হেডার থেকে টোকেন রিমুভ করা
    delete axios.defaults.headers.common['Authorization'];
    delete api.defaults.headers.common['Authorization'];

    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    router.push('/');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    setUser,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// অন্যান্য ফাইলে সহজে ব্যবহারের জন্য কাস্টম হুক
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};