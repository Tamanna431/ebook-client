'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBook, FaUsers, FaStar, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import Hero from '@/components/Hero';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [featuredEbooks, setFeaturedEbooks] = useState([]);
  const [topWriters, setTopWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest 6 ebooks
        const ebooksResponse = await axios.get(`${API_URL}/ebooks?limit=6`);
        setFeaturedEbooks(ebooksResponse.data.data || []);

        // Fetch top writers
        const writersResponse = await axios.get(`${API_URL}/users/top-writers`);
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

  return (
    <div className="min-h-screen">
      {/* Hero Section - আপনার existing Hero component */}
      <Hero />

      {/* Featured Ebooks Section */}
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
        </div>
      </section>

      {/* Top Writers Section */}
      <section className="py-20 bg-gray-800/50">
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
                  key={writer._id}
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

      {/* Genres Section */}
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
    </div>
  );
}