'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';  // ✅
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBook, FaDownload } from 'react-icons/fa';

export default function PurchasedEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await api.get('/api/users/me/purchased-ebooks');  // ✅
        setEbooks(response.data.data || []);
      } catch (error) {
        console.error('Error fetching purchased ebooks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaBook className="text-violet-400" />
        My Ebooks
      </h2>

      {ebooks.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No purchased ebooks yet</p>
          <Link
            href="/browse"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
          >
            Start Reading
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook, index) => (
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
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Purchased
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{ebook.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">by {ebook.writer?.name || 'Unknown'}</p>
                  <button className="w-full py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2">
                    <FaDownload /> Read Now
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};