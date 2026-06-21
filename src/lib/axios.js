import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor - সব request এ automatically fable_token যোগ করবে
api.interceptors.request.use(
  (config) => {
    // 'token' এর বদলে 'fable_token' থেকে টোকেন নেওয়া হচ্ছে
    const token = typeof window !== 'undefined' ? localStorage.getItem('fable_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor - 401 error handle করবে
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // সেশন এক্সপায়ার হলে 'fable_token' এবং 'fable_user' রিমুভ করা হচ্ছে
      localStorage.removeItem('fable_token');
      localStorage.removeItem('fable_user');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/login?error=session_expired';
      }
    }
    return Promise.reject(error);
  }
);

export default api;