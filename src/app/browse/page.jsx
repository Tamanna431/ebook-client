'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaSort, FaBook, FaSpinner } from 'react-icons/fa';
import api from '@/lib/axios';
import Loading from '@/components/Loading';
import SkeletonCard from '@/components/SkeletonCard';

const GENRES = ['All Genres', 'Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror', 'Biography', 'Self-Help', 'Other'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

function BrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  
  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [genre, setGenre] = useState(searchParams.get('genre') || 'All Genres');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchEbooks();
  }, [genre, sort, currentPage, search]);

  const fetchEbooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (search) params.append('search', search);
      if (genre && genre !== 'All Genres') params.append('genre', genre);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (sort) params.append('sort', sort);
      params.append('page', currentPage);
      params.append('limit', 12);

      const response = await api.get(`/api/ebooks?${params.toString()}`);
      
      setEbooks(response.data.data || []);
      setPagination(response.data.pagination || { total: 0, page: 1, pages: 1 });
    } catch (error) {
      console.error('Error fetching ebooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchEbooks();
  };

  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1);
    switch (filterType) {
      case 'genre':
        setGenre(value);
        break;
      case 'sort':
        setSort(value);
        break;
      case 'minPrice':
        setMinPrice(value);
        break;
      case 'maxPrice':
        setMaxPrice(value);
        break;
    }
  };

  const clearFilters = () => {
    setSearch('');
    setGenre('All Genres');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    setCurrentPage(1);
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
          <p className="text-gray-400">Discover your next great read</p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or writer name..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FaFilter /> Filters
            </button>
          </form>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Genre</label>
                <select
                  value={genre}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-violet-500 outline-none"
                >
                  {GENRES.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Min Price ($)</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-violet-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Max Price ($)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="100"
                  min="0"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-violet-500 outline-none"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Sort By</label>
                <select
                  value={sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-violet-500 outline-none"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400">
            {loading ? 'Loading...' : `Showing ${ebooks.length} of ${pagination.total} ebooks`}
          </p>
        </div>

        {/* Ebooks Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SkeletonCard count={12} />
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-20">
            <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl mb-4">No ebooks found</p>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ebooks.map((ebook, index) => (
              <motion.div
                key={ebook._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
                    {ebook.soldCount > 0 && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {ebook.soldCount} sold
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{ebook.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">by {ebook.writer?.name || 'Unknown'}</p>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">{ebook.description}</p>
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

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-all"
            >
              Previous
            </button>
            
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
              disabled={currentPage === pagination.pages}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 pt-24 flex items-center justify-center">
        <Loading message="Loading ebooks..." />
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}