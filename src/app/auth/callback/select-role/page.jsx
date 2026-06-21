'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUser, FaBook, FaArrowRight } from 'react-icons/fa';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function SelectRole() {
  const { user, setUser, setIsAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSelectRole = async (role) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.patch(
        `${API_URL}/api/auth/update-role`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const updatedUser = response.data.user;
        
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update context
        setUser(updatedUser);
        
        toast.success(`You are now a ${role}!`);
        
        // Redirect based on role
        if (role === 'writer') {
          router.push('/dashboard/writer');
        } else {
          router.push('/dashboard/user');
        }
      }
    } catch (error) {
      console.error('Role update error:', error);
      toast.error('Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-400">
              Select your account type to continue
            </p>
          </div>

          <div className="space-y-4">
            {/* Writer Option */}
            <button
              onClick={() => handleSelectRole('writer')}
              disabled={loading}
              className="w-full p-6 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl text-white hover:from-violet-700 hover:to-blue-700 transition-all flex items-center justify-between group disabled:opacity-50"
            >
              <div className="flex items-center gap-4">
                <FaBook className="text-3xl" />
                <div className="text-left">
                  <h3 className="text-xl font-bold">I'm a Writer</h3>
                  <p className="text-gray-200 text-sm">Create and sell ebooks</p>
                </div>
              </div>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>

            {/* Reader Option */}
            <button
              onClick={() => handleSelectRole('user')}
              disabled={loading}
              className="w-full p-6 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition-all flex items-center justify-between group disabled:opacity-50"
            >
              <div className="flex items-center gap-4">
                <FaUser className="text-3xl" />
                <div className="text-left">
                  <h3 className="text-xl font-bold">I'm a Reader</h3>
                  <p className="text-gray-300 text-sm">Buy and read ebooks</p>
                </div>
              </div>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            You can change this later in your profile settings
          </p>
        </div>
      </div>
    </div>
  );
}