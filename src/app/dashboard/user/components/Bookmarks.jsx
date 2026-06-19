'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/me/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (ebookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/users/bookmarks/${ebookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks(bookmarks.filter((ebook) => ebook._id !== ebookId));
      toast.success('Bookmark removed');
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast.error('Failed to remove bookmark');
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaHeart className="text-red-400" />
        Bookmarks
      </h2>

      {bookmarks.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <FaHeart className="text-6xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No bookmarks yet</p>
          <Link
            href="/browse"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
          >
            Discover Ebooks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((ebook, index) => (
            <motion.div
              key={ebook._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              <Link href={`/ebooks/${ebook._id}`}>
                <div className="relative h-64 bg-gray-700">
                  <img
                    src={ebook.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    <FaHeart className="inline" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{ebook.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">by {ebook.writer?.name || 'Unknown'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-semibold">${ebook.price}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeBookmark(ebook._id);
                      }}
                      className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}