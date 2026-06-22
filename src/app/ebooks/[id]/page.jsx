'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBook, FaUser, FaTag, FaDollarSign, FaHeart, FaShoppingCart, FaArrowLeft, FaStar } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

export default function EbookDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [ebook, setEbook] = useState(null);
  const [relatedEbooks, setRelatedEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Debug logs
  console.log('🎯 EbookDetails rendering...');
  console.log('📖 Ebook ID:', id);

  useEffect(() => {
    const fetchEbook = async () => {
      try {
        console.log('📡 Fetching ebook:', id);
        console.log('🔗 API URL:', process.env.NEXT_PUBLIC_API_URL);
        
        const response = await api.get(`/api/ebooks/${id}`);
        console.log('✅ Ebook fetched:', response.data.data);
        
        setEbook(response.data.data);
        setError(null);

        // Fetch related ebooks (same genre)
        const relatedResponse = await api.get(
          `/api/ebooks?genre=${response.data.data.genre}&limit=4`
        );
        setRelatedEbooks(
          relatedResponse.data.data.filter((e) => e._id !== id).slice(0, 4)
        );
      } catch (error) {
        console.error('❌ Error fetching ebook:', error);
        console.error('❌ Error response:', error.response?.data);
        console.error('❌ Error status:', error.response?.status);
        
        setError(error.response?.data?.message || 'Failed to load ebook details');
        
        // ❌ Redirect remove করা হয়েছে!
        // শুধু 404 হলে redirect করুন
        if (error.response?.status === 404) {
          toast.error('Ebook not found');
          setTimeout(() => {
            router.push('/browse');
          }, 2000);
        } else {
          toast.error('Failed to load ebook details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEbook();
  }, [id]);

  // ✅ Bookmark handler
  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to bookmark');
      router.push('/login');
      return;
    }

    try {
      if (isBookmarked) {
        await api.delete(`/api/users/bookmarks/${ebook._id}`);
        setIsBookmarked(false);
        toast.success('Removed from bookmarks');
      } else {
        await api.post(`/api/users/bookmarks/${ebook._id}`);
        setIsBookmarked(true);
        toast.success('Added to bookmarks');
      }
    } catch (error) {
      console.error('Bookmark error:', error);
      toast.error('Failed to update bookmark');
    }
  };

  // ✅ Purchase handler with Stripe integration
  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      router.push('/login');
      return;
    }

    if (!ebook.isAvailable) {
      toast.error('This ebook is not available');
      return;
    }

    try {
      const response = await api.post('/api/payments/create-checkout', { 
        ebookId: ebook._id 
      });

      if (response.data.success) {
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          toast.error('Checkout URL not available');
        }
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error.response?.data?.message || 'Payment failed');
    }
  };

  // Check bookmark status when user is logged in
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!isAuthenticated || !ebook) return;

      try {
        const response = await api.get(`/api/users/bookmarks/check/${ebook._id}`);
        setIsBookmarked(response.data.data.isBookmarked);
      } catch (error) {
        console.error('Check bookmark error:', error);
      }
    };

    checkBookmarkStatus();
  }, [isAuthenticated, ebook]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-800 rounded-xl" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-800 rounded w-1/2" />
                <div className="h-24 bg-gray-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Error state দেখান (redirect ছাড়া)
  if (error || !ebook) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            {error ? 'Error Loading Ebook' : 'Ebook not found'}
          </h2>
          <p className="text-gray-400 mb-4">{error || 'The ebook you are looking for does not exist.'}</p>
          <Link href="/browse" className="text-violet-400 hover:text-violet-300">
            ← Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors mb-8"
        >
          <FaArrowLeft />
          <span>Back</span>
        </motion.button>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={ebook.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
                alt={ebook.title}
                className="w-full h-full object-cover"
              />
            </div>
            {!ebook.isAvailable && (
              <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Sold Out</span>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {ebook.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-400">
                <FaUser className="text-violet-400" />
                <span>by </span>
                <Link
                  href={`/writers/${ebook.writer?._id}`}
                  className="text-violet-400 hover:text-violet-300 font-medium"
                >
                  {ebook.writer?.name || 'Unknown Writer'}
                </Link>
              </div>
            </div>

            {/* Genre & Stats */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-violet-600/20 text-violet-400 rounded-full text-sm font-medium flex items-center gap-2">
                <FaTag />
                {ebook.genre}
              </span>
              <span className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium flex items-center gap-2">
                <FaStar />
                {ebook.soldCount || 0} sold
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-3xl text-green-400" />
              <span className="text-4xl font-bold text-white">${ebook.price}</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">About this ebook</h3>
              <p className="text-gray-300 leading-relaxed">{ebook.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handlePurchase}
                disabled={!ebook.isAvailable}
                className={`flex-1 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  ebook.isAvailable
                    ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 shadow-lg hover:shadow-violet-500/25'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaShoppingCart />
                {ebook.isAvailable ? 'Purchase Now' : 'Sold Out'}
              </button>

              <button
                onClick={handleBookmark}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isBookmarked
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                }`}
              >
                <FaHeart className={isBookmarked ? 'fill-current' : ''} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>

            {/* Writer Info */}
            {ebook.writer && (
              <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">About the Writer</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                    {ebook.writer.name?.charAt(0) || 'W'}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{ebook.writer.name}</h4>
                    <p className="text-gray-400">{ebook.writer.email}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Ebooks */}
        {relatedEbooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Related Ebooks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedEbooks.map((relatedEbook, index) => (
                <motion.div
                  key={relatedEbook._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
                >
                  <Link href={`/ebooks/${relatedEbook._id}`}>
                    <div className="relative h-64 bg-gray-700">
                      <img
                        src={relatedEbook.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
                        alt={relatedEbook.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${relatedEbook.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                        {relatedEbook.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        by {relatedEbook.writer?.name || 'Unknown'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                          {relatedEbook.genre}
                        </span>
                        <span className="text-xs text-gray-500">
                          {relatedEbook.soldCount || 0} sold
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}