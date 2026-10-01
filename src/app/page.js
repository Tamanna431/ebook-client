'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import Hero from '@/components/Hero';
import {
  FaBook, FaUsers, FaStar, FaShoppingCart, FaDownload,
  FaCheckCircle, FaPen, FaShieldAlt, FaMobile
} from 'react-icons/fa';

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
    { name: 'Fiction', icon: '📚', link: '/browse?genre=Fiction' },
    { name: 'Mystery', icon: '🔍', link: '/browse?genre=Mystery' },
    { name: 'Romance', icon: '💕', link: '/browse?genre=Romance' },
    { name: 'Sci-Fi', icon: '🚀', link: '/browse?genre=Sci-Fi' },
    { name: 'Fantasy', icon: '🐉', link: '/browse?genre=Fantasy' },
    { name: 'Horror', icon: '👻', link: '/browse?genre=Horror' },
    { name: 'Self-Help', icon: '💪', link: '/browse?genre=Self-Help' },
    { name: 'Biography', icon: '📖', link: '/browse?genre=Biography' },
  ];

  // ✅ NEW: Statistics Data
  const stats = [
    { value: '10K+', label: 'Ebooks Available', icon: <FaBook className="text-3xl" /> },
    { value: '5K+', label: 'Active Readers', icon: <FaUsers className="text-3xl" /> },
    { value: '500+', label: 'Talented Writers', icon: <FaPen className="text-3xl" /> },
    { value: '50K+', label: 'Books Sold', icon: <FaShoppingCart className="text-3xl" /> },
  ];

  // ✅ NEW: How It Works Data
  const steps = [
    {
      icon: <FaBook className="text-4xl text-violet-400" />,
      title: 'Browse & Discover',
      description: 'Explore thousands of original ebooks across multiple genres from talented writers.',
    },
    {
      icon: <FaShoppingCart className="text-4xl text-blue-400" />,
      title: 'Secure Purchase',
      description: 'Buy your favorite ebooks securely using our Stripe-powered checkout system.',
    },
    {
      icon: <FaDownload className="text-4xl text-emerald-400" />,
      title: 'Read Anywhere',
      description: 'Get instant access and read your ebooks on any device, anytime you want.',
    },
  ];

  // ✅ NEW: Why Choose Us Data
  const features = [
    { icon: <FaShieldAlt className="text-3xl text-violet-400" />, title: '100% Secure Payments', desc: 'Industry-standard encryption for all transactions.' },
    { icon: <FaMobile className="text-3xl text-blue-400" />, title: 'Mobile Friendly', desc: 'Seamless reading experience on phones and tablets.' },
    { icon: <FaCheckCircle className="text-3xl text-emerald-400" />, title: 'Support Independent Writers', desc: 'Every purchase directly empowers creators.' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 1. Hero Section (Existing) */}
      <Hero />

      {/* 3. Featured Ebooks Section (Existing) */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Featured Ebooks
            </h2>
            <p className="text-gray-400">Discover our latest and most popular ebooks</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEbooks.map((ebook, index) => (
                <motion.div
                  key={ebook._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
                >
                  <Link href={`/ebooks/${ebook._id}`}>
                    <div className="relative h-64 bg-gray-700">
                      <img
                        src={ebook.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
                        alt={ebook.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${ebook.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{ebook.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">by {ebook.writer?.name || 'Unknown'}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                          {ebook.genre}
                        </span>
                        <span className="text-xs text-gray-500">
                          {ebook.soldCount || 0} sold
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && featuredEbooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">No ebooks available yet. Check back soon!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/browse" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-full hover:bg-gray-700 transition-all">
              View All Ebooks <FaStar className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. NEW: How It Works Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-gray-400">Get started in three simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700 hover:border-violet-500 transition-all duration-300 relative"
              >
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <div className="mb-6 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Top Writers Section (Existing) */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Top Writers
            </h2>
            <p className="text-gray-400">Meet our most successful authors</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-2xl p-8 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topWriters.map((writer, index) => (
                <motion.div
                  key={writer._id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700 hover:border-violet-500 transition-all duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
                    {writer.name?.charAt(0) || 'W'}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{writer.name || 'Writer'}</h3>
                  <p className="text-violet-400 font-semibold">{writer.totalSales || 0} sales</p>
                  <p className="text-gray-500 text-sm mt-1">{writer.totalEbooks || 0} ebooks</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Genres Section (Existing) */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Browse by Genre
            </h2>
            <p className="text-gray-400">Find your favorite type of stories</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={genre.link}
                  className="block bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-violet-500 hover:bg-gray-750 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{genre.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{genre.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEW: Why Choose Us Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Why Choose Fable
            </h2>
            <p className="text-gray-400">The best platform for both readers and writers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-violet-500 transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEW: Call to Action (Become a Writer) */}
      <section className="py-20 bg-gradient-to-r from-violet-900/50 to-blue-900/50 border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaPen className="text-5xl text-violet-400 mb-6 mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Share Your Story?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of writers who publish and sell their ebooks on Fable.
              Start earning from your passion and reach readers worldwide today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-semibold hover:from-violet-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-violet-500/50"
              >
                Start Publishing Now
              </Link>
              <Link
                href="/browse"
                className="px-8 py-4 bg-gray-800 border border-gray-700 text-white rounded-full font-semibold hover:bg-gray-700 transition-all"
              >
                Explore Ebooks
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}