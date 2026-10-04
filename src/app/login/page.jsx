'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash, FaUserShield, FaBook } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      const messages = {
        google_callback_failed: 'Google sign-in failed. Please try again.',
        no_code: 'Google sign-in was cancelled.',
        token_exchange_failed: 'Failed to complete Google verification.',
        access_denied: 'Google sign-in access was denied.',
      };
      toast.error(messages[error] || `Sign in failed: ${error.replace(/_/g, ' ')}`);
    }
    const registeredEmail = localStorage.getItem('registeredEmail');
    if (registeredEmail) {
      setFormData((prev) => ({ ...prev, email: registeredEmail }));
      localStorage.removeItem('registeredEmail');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    const demoData = { email: 'admin@fable.com', password: 'admin123' };
    setFormData(demoData);
    setLoading(true);

    try {
      await login(demoData);
    } catch (error) {
      console.error('Demo admin login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (role = 'user') => {
    try {
      const selectedRole = typeof role === 'string' && ['user', 'writer', 'admin'].includes(role) ? role : 'user';
      console.log(`🔔 Google login initiated for role: ${selectedRole}`);
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      window.location.href = `${apiUrl}/api/auth/google?role=${selectedRole}`;
    } catch (err) {
      console.error('❌ Google login error:', err);
      toast.error('Could not initiate Google login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 pb-16 flex items-center justify-center relative overflow-hidden px-4">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-gray-900/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-gray-800 shadow-2xl shadow-black/80 hover:border-violet-500/30 transition-all duration-300">
          
          {/* Logo Icon and Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-xl shadow-violet-600/30">
              <FaBook />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to continue your reading & publishing journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-violet-400/60" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-gray-950/70 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-violet-400/60" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 bg-gray-950/70 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-white text-base transition-all duration-300 shadow-lg cursor-pointer ${
                loading
                  ? 'bg-gray-700 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.01] active:scale-95'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Admin Login Box */}
          <div className="mt-6 pt-5 border-t border-gray-800">
            <div className="bg-gradient-to-r from-violet-950/30 via-gray-950/50 to-blue-950/30 border border-violet-500/30 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center">
                    <FaUserShield className="text-base" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Demo Admin Account</h3>
                    <p className="text-[11px] text-gray-400">One-click evaluation access</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDemoAdminLogin}
                  disabled={loading}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white transition-all shadow-md hover:shadow-violet-500/25 disabled:opacity-50 cursor-pointer"
                >
                  Login as Admin
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-gray-950/80 p-2.5 rounded-xl border border-gray-800/80 font-mono text-gray-300">
                <div>
                  <span className="text-gray-500 block text-[10px] font-sans">Email:</span>
                  admin@fable.com
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] font-sans">Password:</span>
                  admin123
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-4 bg-gray-900 text-gray-500 font-semibold tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={() => handleGoogleLogin('user')}
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gray-950/60 hover:bg-gray-800/80 border border-gray-800 hover:border-gray-700 text-gray-200 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:scale-[1.01] active:scale-95 cursor-pointer"
          >
            <FaGoogle className="text-red-500 text-base" />
            <span>Continue with Google</span>
          </button>

          {/* Sign Up Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-violet-400 hover:text-violet-300 font-bold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
};