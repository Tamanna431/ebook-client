'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import Hero from '@/components/Hero';
import {
  FaBook, FaUsers, FaStar, FaShoppingCart, FaDownload,
  FaCheckCircle, FaPen, FaShieldAlt, FaMobile, FaArrowRight,
  FaFire, FaBookOpen, FaAward, FaPenNib
} from 'react-icons/fa';

const fallbackAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
];

const defaultFeaturedWriters = [
  {
    _id: 'default-1',
    name: 'Tamanna Akter',
    totalSales: 18,
    totalEarnings: 340,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  },
  {
    _id: 'default-2',
    name: 'Shuchi Sen',
    totalSales: 24,
    totalEarnings: 450,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
  },
  {
    _id: 'default-3',
    name: 'Tamanna Shuchi',
    totalSales: 15,
    totalEarnings: 290,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
  },
];

const writerThemes = [
  {
    banner: 'from-violet-600 via-indigo-600 to-purple-800',
    badge: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    ring: 'ring-violet-400',
    btn: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-600/30',
    tag: 'Fantasy & Sci-Fi Maestro',
    rating: '4.9',
    followers: '2.4k',
  },
  {
    banner: 'from-cyan-600 via-blue-600 to-teal-800',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    ring: 'ring-cyan-400',
    btn: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-600/30',
    tag: 'Bestselling Storyteller',
    rating: '5.0',
    followers: '3.1k',
  },
  {
    banner: 'from-rose-600 via-pink-600 to-amber-700',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    ring: 'ring-rose-400',
    btn: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-600/30',
    tag: 'Romance & Thriller Creator',
    rating: '4.8',
    followers: '1.9k',
  },
];

export default function Home() {
  const [featuredEbooks, setFeaturedEbooks] = useState([]);
  const [topWriters, setTopWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ebooksResponse = await api.get('/api/ebooks/featured');
        setFeaturedEbooks(ebooksResponse.data.data || []);

        const writersResponse = await api.get('/api/users/top-writers');
        setTopWriters(writersResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const genres = [
    { name: 'Fiction', icon: '📚', color: 'from-purple-500/20 to-indigo-500/10', link: '/browse?genre=Fiction' },
    { name: 'Mystery', icon: '🔍', color: 'from-blue-500/20 to-cyan-500/10', link: '/browse?genre=Mystery' },
    { name: 'Romance', icon: '💕', color: 'from-pink-500/20 to-rose-500/10', link: '/browse?genre=Romance' },
    { name: 'Sci-Fi', icon: '🚀', color: 'from-cyan-500/20 to-emerald-500/10', link: '/browse?genre=Sci-Fi' },
    { name: 'Fantasy', icon: '🐉', color: 'from-violet-500/20 to-fuchsia-500/10', link: '/browse?genre=Fantasy' },
    { name: 'Horror', icon: '👻', color: 'from-red-500/20 to-orange-500/10', link: '/browse?genre=Horror' },
    { name: 'Self-Help', icon: '💪', color: 'from-emerald-500/20 to-teal-500/10', link: '/browse?genre=Self-Help' },
    { name: 'Biography', icon: '📖', color: 'from-amber-500/20 to-yellow-500/10', link: '/browse?genre=Biography' },
  ];

  const steps = [
    {
      icon: <FaBook className="text-4xl text-violet-400" />,
      title: 'Browse & Discover',
      description: 'Explore thousands of original ebooks across multiple genres from talented, verified writers.',
      badgeColor: 'from-violet-600 to-indigo-600',
    },
    {
      icon: <FaShoppingCart className="text-4xl text-cyan-400" />,
      title: 'Instant Secure Checkout',
      description: 'Buy your favorite ebooks securely using our Stripe-powered encrypted payment system.',
      badgeColor: 'from-cyan-600 to-blue-600',
    },
    {
      icon: <FaDownload className="text-4xl text-emerald-400" />,
      title: 'Read Anywhere, Anytime',
      description: 'Get immediate access and read in your browser or download PDFs for offline pleasure.',
      badgeColor: 'from-emerald-600 to-teal-600',
    },
  ];

  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-violet-400" />,
      title: '100% Secure Payments',
      desc: 'Industry-standard 256-bit encryption for seamless and safe digital transactions.',
      border: 'hover:border-violet-500/60',
    },
    {
      icon: <FaMobile className="text-3xl text-cyan-400" />,
      title: 'Universal Mobile Experience',
      desc: 'Optimized reading on smartphones, tablets, laptops, and e-readers without hassle.',
      border: 'hover:border-cyan-500/60',
    },
    {
      icon: <FaCheckCircle className="text-3xl text-emerald-400" />,
      title: 'Empower Independent Authors',
      desc: 'Every purchase directly supports creators, helping original literature thrive.',
      border: 'hover:border-emerald-500/60',
    },
  ];

  // Active writers list: use backend data or fallback default writers
  const activeWriters = topWriters.length > 0 ? topWriters : defaultFeaturedWriters;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 1. Hero Section with dynamic typewriter text, right-side dynamic banner image, and animated stats */}
      <Hero />

      {/* 2. Featured Ebooks Section */}
      <section className="py-24 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <FaStar className="text-amber-400" /> Curated Collection
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent mb-4">
              Featured Ebooks
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Dive into our handpicked collection of trending stories and reader favorites
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800/60 rounded-2xl h-[420px] animate-pulse border border-gray-700/50" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEbooks.map((ebook, index) => (
                <motion.div
                  key={ebook._id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group bg-gray-800/70 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/60 hover:border-violet-500/50 shadow-xl hover:shadow-2xl hover:shadow-violet-600/15 transition-all duration-300 flex flex-col justify-between"
                >
                  <Link href={`/ebooks/${ebook._id}`} className="block">
                    {/* Book Cover Container */}
                    <div className="relative h-64 sm:h-72 bg-gray-950 overflow-hidden">
                      <img
                        src={ebook.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop'}
                        alt={ebook.title}
                        className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop';
                        }}
                      />
                      
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3.5 py-1.5 rounded-full text-sm font-black shadow-lg shadow-black/40 border border-white/20">
                        ${ebook.price}
                      </div>

                      {/* Genre Tag */}
                      <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md text-violet-300 border border-violet-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                        {ebook.genre}
                      </div>

                      {/* Cover Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>

                    {/* Book Info */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-1.5 line-clamp-1 group-hover:text-violet-400 transition-colors">
                        {ebook.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        by <span className="text-gray-300 font-medium">{ebook.writer?.name || 'Top Author'}</span>
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-700/60 text-xs">
                        <span className="flex items-center gap-1.5 text-orange-400 font-medium">
                          <FaFire className="text-sm" />
                          <span>{ebook.soldCount || 12} sold</span>
                        </span>
                        
                        <span className="inline-flex items-center gap-1 text-violet-400 font-semibold group-hover:translate-x-1 transition-transform">
                          <span>Read Book</span>
                          <FaArrowRight className="text-[10px]" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && featuredEbooks.length === 0 && (
            <div className="text-center py-16 bg-gray-800/40 rounded-2xl border border-gray-800">
              <FaBookOpen className="text-5xl text-violet-500/40 mx-auto mb-3" />
              <p className="text-gray-400 text-lg">No ebooks available yet. Check back soon!</p>
            </div>
          )}

          {/* Polished View All Ebooks Button */}
          <div className="text-center mt-16">
            <Link
              href="/browse"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-blue-600/20 hover:from-violet-600 hover:to-blue-600 border border-violet-500/40 hover:border-transparent text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/30 hover:scale-105 active:scale-95"
            >
              <span>Explore All Ebooks</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Top Writers Section - Enhanced with vibrant, colorful author portraits & badges */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <FaAward className="text-yellow-400" /> Master Storytellers
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4">
              Top Featured Writers
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Meet our acclaimed authors creating unforgettable stories and inspiring thousands of readers
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-3xl h-96 animate-pulse border border-gray-700" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeWriters.slice(0, 3).map((writer, index) => {
                const theme = writerThemes[index % writerThemes.length];
                const authorAvatar = writer.avatar || fallbackAvatars[index % fallbackAvatars.length];

                return (
                  <motion.div
                    key={writer._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/60 hover:border-violet-500/60 shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top Colorful Card Banner */}
                    <div className={`h-28 bg-gradient-to-r ${theme.banner} relative overflow-hidden flex items-end justify-end p-3`}>
                      {/* Decorative banner wave pattern */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${theme.badge} border backdrop-blur-md shadow-sm`}>
                        {theme.tag}
                      </span>
                    </div>

                    {/* Author Avatar with Glowing Ring and Verified Badge */}
                    <div className="relative px-6 pb-6 text-center">
                      <div className="relative -mt-14 mb-4 inline-block">
                        <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-violet-500 via-cyan-400 to-pink-500 shadow-xl group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={authorAvatar}
                            alt={writer.name || 'Author'}
                            className="w-full h-full rounded-full object-cover ring-4 ring-gray-900"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = fallbackAvatars[index % fallbackAvatars.length];
                            }}
                          />
                        </div>
                        {/* Verified checkmark badge */}
                        <div className="absolute bottom-1 right-1 p-1 bg-gray-900 rounded-full shadow-lg">
                          <FaCheckCircle className="text-blue-400 text-lg" />
                        </div>
                      </div>

                      {/* Author Name and Rating */}
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                        {writer.name || 'Visionary Author'}
                      </h3>
                      
                      <div className="flex items-center justify-center gap-1.5 text-amber-400 text-sm mb-4">
                        <FaStar />
                        <span className="font-bold text-white">{theme.rating}</span>
                        <span className="text-gray-500 text-xs">({theme.followers} readers)</span>
                      </div>

                      {/* Writer Stats Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-900/60 p-3.5 rounded-2xl border border-gray-700/50">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-orange-400 font-bold text-lg">
                            <FaFire className="text-sm" />
                            <span>{writer.totalSales || 15}+</span>
                          </div>
                          <span className="text-gray-400 text-xs font-medium">Books Sold</span>
                        </div>
                        
                        <div className="text-center border-l border-gray-700/60">
                          <div className="flex items-center justify-center gap-1 text-violet-400 font-bold text-lg">
                            <FaBookOpen className="text-sm" />
                            <span>{writer.totalEbooks || 8}</span>
                          </div>
                          <span className="text-gray-400 text-xs font-medium">Published</span>
                        </div>
                      </div>

                      {/* Colorful Action Button */}
                      <Link
                        href={`/browse?search=${encodeURIComponent(writer.name || '')}`}
                        className={`inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-bold text-sm ${theme.btn} transition-all duration-300 shadow-lg active:scale-95`}
                      >
                        <FaBookOpen className="text-xs" />
                        <span>Explore Author's Works</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-24 bg-gray-850/50 relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Simple & Smooth
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-4">
              How Fable Works
            </h2>
            <p className="text-gray-400 text-lg">Start your reading and publishing journey in three easy steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 text-center border border-gray-700/60 hover:border-violet-500/50 shadow-xl transition-all duration-300 relative group"
              >
                {/* Step Number Pill */}
                <div className={`absolute -top-4 -right-4 w-11 h-11 bg-gradient-to-br ${step.badgeColor} rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                  {index + 1}
                </div>

                <div className="mb-6 flex justify-center p-4 rounded-2xl bg-gray-900/60 w-20 h-20 mx-auto items-center border border-gray-700/50 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Browse by Genre Section */}
      <section className="py-24 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Explore Diversity
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Browse by Genre
            </h2>
            <p className="text-gray-400 text-lg">Pick your preferred category and discover compelling reads</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <Link
                  href={genre.link}
                  className={`block bg-gradient-to-b ${genre.color} bg-gray-800/80 rounded-2xl p-6 text-center border border-gray-700/60 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-600/15 transition-all duration-300 group`}
                >
                  <div className="text-5xl mb-3 transform group-hover:scale-120 transition-transform duration-300">{genre.icon}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">{genre.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Fable Section */}
      <section className="py-24 bg-gray-850/40 relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Built for Book Lovers
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent mb-4">
              Why Readers & Authors Choose Fable
            </h2>
            <p className="text-gray-400 text-lg">Designed from the ground up for seamless reading and creator empowerment</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border border-gray-700/60 ${feature.border} shadow-xl transition-all duration-300`}
              >
                <div className="mb-5 p-3.5 rounded-2xl bg-gray-900/60 w-16 h-16 flex items-center justify-center border border-gray-700/50">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call to Action (Become a Writer) - Vibrant Gradient & Polished Buttons */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 via-violet-950/40 to-gray-900 border-t border-gray-800">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/40 mb-6 shadow-xl">
              <FaPenNib className="text-4xl text-violet-400" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to Share <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Your Story with the World?
              </span>
            </h2>

            <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of writers who publish, sell, and build their audience on Fable. 
              Earn directly from your talent with transparent payouts.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-full font-bold text-base transition-all duration-300 shadow-xl shadow-violet-600/35 hover:shadow-violet-600/60 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <FaPen className="text-sm" />
                <span>Start Publishing Today</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-gray-800/90 border border-gray-700 hover:border-violet-500 text-white rounded-full font-bold text-base hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 shadow-md"
              >
                <FaBookOpen className="text-sm text-violet-400" />
                <span>Explore Full Library</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}