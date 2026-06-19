'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        if (!token || !userParam) {
          setError('Authentication failed');
          toast.error('Google login failed');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }

        const user = JSON.parse(decodeURIComponent(userParam));

        // Save token and user
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        toast.success('Google login successful!');

        // Role-based redirection
        if (user.role === 'admin') {
          router.push('/dashboard/admin');
        } else if (user.role === 'writer') {
          router.push('/dashboard/writer');
        } else {
          router.push('/');
        }
      } catch (err) {
        console.error('Callback error:', err);
        setError('Authentication failed');
        toast.error('Google login failed');
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        {error ? (
          <div className="text-red-500 text-xl">{error}</div>
        ) : (
          <div className="text-violet-400 text-xl flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
            <p>Processing Google login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;