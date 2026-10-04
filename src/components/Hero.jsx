'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBookOpen, FaPenNib, FaArrowRight } from 'react-icons/fa';
import TypewriterText from './TypewriterText';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden pt-24 pb-16">
      {/* Background Gradient & Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-gray-900 to-blue-950/20 pointer-events-none" />

      {/* Subtle Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 2-Column Hero: Left Content, Right Dynamic Banner Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Typewriter, Description, CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 text-left"
          >
            {/* Top Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span>✨ The Ultimate Digital Ebook Universe</span>
            </motion.div>

            {/* Dynamic Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
              Discover & Read <br />
              <TypewriterText
                words={[
                  'Original Ebooks',
                  'Bestselling Stories',
                  'World-Class Novels',
                  'Creative Masterpieces',
                  'Inspiring Ideas',
                ]}
                typingSpeed={80}
                deletingSpeed={45}
                pauseTime={2200}
              />
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Connect with visionary authors, explore an infinite library of original ebooks, 
              and publish your own stories to earn directly from readers worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/browse"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-base bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.03] active:scale-95 overflow-hidden"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                <FaBookOpen className="text-lg text-violet-200" />
                <span>Browse Ebooks</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-violet-300 text-base bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 hover:border-violet-400 transition-all duration-300 backdrop-blur-md hover:scale-[1.03] active:scale-95 shadow-sm"
              >
                <FaPenNib className="text-sm text-violet-400" />
                <span>Become a Writer</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Banner Image entering smoothly from right */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Animated floating wrapper for the image */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-lg lg:max-w-none"
            >
              {/* Subtle backglow around the artwork */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-violet-600/30 to-blue-600/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

              {/* Clean Image Container with smooth rounded corners and shadow */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-violet-950/70 border border-gray-800">
                <img
                  src="/hero-banner.jpg"
                  alt="Fable Ebook Universe"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;