'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBook, 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt,
  FaTachometerAlt
} from 'react-icons/fa';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Role-based dashboard link
  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'writer':
        return '/dashboard/writer';
      default:
        return '/dashboard/user';
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <FaBook className="text-violet-400 text-2xl" />
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Fable
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-violet-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/browse" 
              className="text-gray-300 hover:text-violet-400 transition-colors"
            >
              Browse Ebooks
            </Link>
            
            {isAuthenticated && user ? (
              <>
                <Link 
                  href={getDashboardLink()}
                  className="text-gray-300 hover:text-violet-400 transition-colors flex items-center gap-2"
                >
                  <FaTachometerAlt />
                  Dashboard
                </Link>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-gray-300 text-sm">{user.name}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-colors"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  href="/login"
                  className="px-4 py-2 text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg hover:from-violet-700 hover:to-blue-700 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-violet-400"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800 rounded-lg mt-2 p-4 space-y-4"
            >
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-violet-400 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/browse" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-violet-400 transition-colors"
              >
                Browse Ebooks
              </Link>
              
              {isAuthenticated && user ? (
                <>
                  <Link 
                    href={getDashboardLink()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-violet-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{user.name}</p>
                        <p className="text-gray-400 text-xs capitalize">{user.role}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-colors"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  <Link 
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center px-4 py-2 text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg hover:from-violet-700 hover:to-blue-700 transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}