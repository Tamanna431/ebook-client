'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/axios';  // ✅ গ্লোবাল axios এর বদলে আপনার কাস্টম api ইম্পোর্ট করা হলো
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setIsAuthenticated } = useAuth();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        console.log('📥 Callback received');
        console.log('Token:', token ? 'Present' : 'Missing');
        console.log('User:', userParam ? 'Present' : 'Missing');

        if (!token || !userParam) {
          console.error('❌ Missing token or user data');
          toast.error('Authentication failed - missing data');
          router.push('/login?error=missing_data');
          return;
        }

        // Parse user data
        let userData;
        try {
          userData = JSON.parse(decodeURIComponent(userParam));
        } catch (parseError) {
          console.error('❌ Failed to parse user data:', parseError);
          toast.error('Invalid user data');
          router.push('/login?error=invalid_data');
          return;
        }
        
        console.log('✅ Parsed user data:', userData);

        // ✅ Validate user data
        if (!userData.id || !userData.email) {
          console.error('❌ Invalid user data structure');
          toast.error('Invalid user data');
          router.push('/login?error=invalid_user');
          return;
        }

        // ========= 🔥 ফিক্সড এরিয়া 🔥 =========
        // ✅ ১. টোকেন এবং ইউজার দুটোই localStorage এ সেভ করা হলো
        localStorage.setItem('token', token); 
        localStorage.setItem('user', JSON.stringify(userData));

        // ✅ ২. কাস্টম api ইনস্ট্যান্সে টোকেন ডিফল্ট হেডার হিসেবে সেট করা হলো
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // ===================================

        // ✅ Auth context update
        setUser(userData);
        setIsAuthenticated(true);

        toast.success(`Welcome, ${userData.name}!`);

        // ✅ Role-based redirect to dashboard
        setTimeout(() => {
          if (userData.role === 'admin') {
            router.push('/dashboard/admin');
          } else if (userData.role === 'writer') {
            router.push('/dashboard/writer');
          } else {
            router.push('/dashboard/user');
          }
        }, 500);

      } catch (error) {
        console.error('❌ Callback error:', error);
        toast.error('Authentication failed');
        router.push('/login?error=callback_failed');
      } finally {
        setProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (processing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Completing authentication...</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}