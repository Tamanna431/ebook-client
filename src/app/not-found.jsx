'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaBook, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              404
            </h1>
            
            {/* Floating Book Icon */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <FaBook className="text-6xl text-violet-400/50" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <FaExclamationTriangle className="text-6xl text-yellow-400 mx-auto mb-4" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-400 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved or deleted permanently.
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-center gap-4 text-gray-500">
              <FaBook className="text-4xl" />
              <span className="text-2xl">📚</span>
              <FaBook className="text-4xl" />
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Let's get you back to discovering great ebooks!
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-semibold text-lg hover:from-violet-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-violet-500/25 hover:scale-105 flex items-center gap-3"
          >
            <FaHome />
            Go to Home
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
          
          <Link
            href="/browse"
            className="px-8 py-4 border-2 border-violet-500 text-violet-400 rounded-full font-semibold text-lg hover:bg-violet-500/10 transition-all duration-300 flex items-center gap-2"
          >
            <FaBook />
            Browse Ebooks
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-gray-500 text-sm"
        >
          If you believe this is a mistake, please{' '}
          <Link href="/contact" className="text-violet-400 hover:text-violet-300 underline">
            contact support
          </Link>
        </motion.p>
      </div>
    </div>
  );
}