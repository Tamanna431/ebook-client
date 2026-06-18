'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBook, FaUsers, FaStar } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden pt-16">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-gray-900 to-blue-900/20" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Discover & Read
          </span>
          <br />
          <span className="text-white">Original Ebooks</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto"
        >
          Connect with talented writers and explore a world of original stories. 
          Your next great read is just a click away.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/browse"
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-semibold text-lg hover:from-violet-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-violet-500/25 hover:scale-105"
          >
            Browse Ebooks
          </Link>
          <Link
            href="/register"
            className="px-8 py-4 border-2 border-violet-500 text-violet-400 rounded-full font-semibold text-lg hover:bg-violet-500/10 transition-all duration-300"
          >
            Become a Writer
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <FaBook className="text-violet-400 text-4xl mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">10K+</h3>
            <p className="text-gray-400">Ebooks Available</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <FaUsers className="text-blue-400 text-4xl mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">50K+</h3>
            <p className="text-gray-400">Active Readers</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <FaStar className="text-violet-400 text-4xl mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">5K+</h3>
            <p className="text-gray-400">Talented Writers</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-violet-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-violet-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;