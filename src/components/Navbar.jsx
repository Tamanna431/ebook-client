'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaBookOpen, FaUserCircle } from 'react-icons/fa';
import { navLinks } from '@/utils/constants';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaBookOpen className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Fable
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-violet-400 transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* ✅ User Name দেখানো */}
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaUserCircle className="text-violet-400 text-lg" />
                  <span className="text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-6 py-2.5 border border-red-500 text-red-400 rounded-full font-medium text-sm hover:bg-red-500/10 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-medium text-sm hover:from-violet-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900 border-b border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-200 py-2"
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-300 py-2">
                    <FaUserCircle className="text-violet-400" />
                    <span className="text-sm font-medium">
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-center px-6 py-2.5 border border-red-500 text-red-400 rounded-full font-medium text-sm hover:bg-red-500/10 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="pt-4 space-y-3 border-t border-gray-800">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-violet-400 hover:text-violet-300 font-medium py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;