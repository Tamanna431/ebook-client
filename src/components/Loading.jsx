'use client';

import { motion } from 'framer-motion';

export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-gray-900">
      {/* Animated Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-gray-700 border-t-violet-500 border-r-blue-500"
        />
        
        {/* Inner Ring (Opposite direction) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-transparent border-b-violet-400 border-l-blue-400"
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-6 text-gray-400 text-lg font-medium"
      >
        {message}
      </motion.p>
    </div>
  );
}