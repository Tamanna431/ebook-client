'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { FaGoogle, FaBookOpen, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Register = () => {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    // ✅ Validation check
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        role: selectedRole, // ✅ Role পাঠানো হচ্ছে
      };

      console.log('📤 Registering user:', userData);

      const result = await registerUser(userData);

      if (result && result.success) {
        localStorage.setItem('registeredEmail', data.email);
        reset(); // ✅ Form reset
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Google Login with role
  const handleGoogleLogin = (role) => {
    try {
      console.log(`🔔 Google login initiated for role: ${role}`);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      //const state = Buffer.from(JSON.stringify({ role })).toString('base64');
       
      window.location.href = `${apiUrl}/api/auth/google?role=${role}`;
    } catch (error) {
      console.error('❌ Google login error:', error);
      toast.error('Google login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <FaBookOpen className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="mt-2 text-gray-400">
            Join Fable and start your reading journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                I want to join as a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('user')}
                  className={`relative flex flex-col items-center justify-center p-4 border rounded-lg transition-all duration-300 ${
                    selectedRole === 'user'
                      ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                      : 'border-gray-700 text-gray-300 hover:border-violet-500'
                  }`}
                >
                  <FaBookOpen className="text-2xl mb-2" />
                  <span className="text-sm font-medium">Reader</span>
                  <span className="text-xs text-gray-500 mt-1">Browse & Buy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('writer')}
                  className={`relative flex flex-col items-center justify-center p-4 border rounded-lg transition-all duration-300 ${
                    selectedRole === 'writer'
                      ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                      : 'border-gray-700 text-gray-300 hover:border-violet-500'
                  }`}
                >
                  <FaBookOpen className="text-2xl mb-2" />
                  <span className="text-sm font-medium">Writer</span>
                  <span className="text-xs text-gray-500 mt-1">Publish Ebooks</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-violet-500/25"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with Google</span>
            </div>
          </div>

          {/* Google Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleGoogleLogin('user')}
              disabled={isSubmitting}
              className="py-3 px-4 border border-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FaGoogle className="text-red-500" />
              <span className="text-sm">Reader</span>
            </button>
            <button
              type="button"
              onClick={() => handleGoogleLogin('writer')}
              disabled={isSubmitting}
              className="py-3 px-4 border border-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FaGoogle className="text-red-500" />
              <span className="text-sm">Writer</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;