'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaSortAmountDown, FaBook, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const GENRES = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror', 'Biography', 'Self-Help', 'Other'];

export default function BrowseEbooks() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 0 });

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [genre, setGenre] = useState(searchParams.get('genre') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [available, setAvailable] = useState(searchParams.get('available') || '');

  // Fetch ebooks
  const fetchEbooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', '12');
      params.set('page', searchParams.get('page') || '1');

      if (search) params.set('search', search);
      if (genre) params.set('genre', genre);
      if (sort) params.set('sort', sort);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (available) params.set('available', available);

      const response = await axios.get(`${API_URL}/ebooks?${params.toString()}`);
      setEbooks(response.data.data || []);
      setPagination(response.data.pagination || { total: 0, page: 1, pages: 0 });
    } catch (error) {
      console.error('Error fetching ebooks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEbooks();
  }, [searchParams]);

  // Update URL params
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to page 1
    router.push(`/browse?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch('');
    setGenre('');
    setSort('newest');
    setMinPrice('');
    setMaxPrice('');
    setAvailable('');
    router.push('/browse');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Browse Ebooks
          </h1>
          <p className="text-gray-400">Discover amazing stories from talented writers</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or writer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') updateFilters('search', search);
              }}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button
              onClick={() => updateFilters('search', search)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Filters & Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaFilter className="inline mr-2" />
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                updateFilters('genre', e.target.value);
              }}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
            >
              <option value="">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaSortAmountDown className="inline mr-2" />
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                updateFilters('sort', e.target.value);
              }}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
            >
              <option value="newest">Newest First</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Min Price
            </label>
            <input
              type="number"
              placeholder="$0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={() => updateFilters('minPrice', minPrice)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Max Price
            </label>
            <input
              type="number"
              placeholder="$100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={() => updateFilters('maxPrice', maxPrice)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </motion.div>

        {/* Active Filters & Clear */}
        {(genre || sort !== 'newest' || minPrice || maxPrice || available) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-400">Active filters:</span>
            {genre && (
              <span className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">
                {genre}
              </span>
            )}
            {minPrice && (
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                Min: ${minPrice}
              </span>
            )}
            {maxPrice && (
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                Max: ${maxPrice}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          Showing {ebooks.length} of {pagination.total} ebooks
        </div>

        {/* Ebooks Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-20">
            <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No ebooks found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {ebooks.map((ebook, index) => (
                <motion.div
                  key={ebook._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
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
                      {!ebook.isAvailable && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Sold Out</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{ebook.title}</h3>
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
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center items-center gap-2"
          >
            <Link
              href={`/browse?${new URLSearchParams({
                ...Object.fromEntries(searchParams),
                page: Math.max(1, pagination.page - 1),
              }).toString()}`}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pagination.page === 1
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </Link>

            {[...Array(pagination.pages)].map((_, i) => (
              <Link
                key={i}
                href={`/browse?${new URLSearchParams({
                  ...Object.fromEntries(searchParams),
                  page: i + 1,
                }).toString()}`}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  pagination.page === i + 1
                    ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </Link>
            ))}

            <Link
              href={`/browse?${new URLSearchParams({
                ...Object.fromEntries(searchParams),
                page: Math.min(pagination.pages, pagination.page + 1),
              }).toString()}`}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pagination.page === pagination.pages
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Next
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}