'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { FaBook } from 'react-icons/fa';

export default function MyEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEbooks = async () => {
      try {
        console.log('📚 Fetching my ebooks...');
        const res = await api.get('/api/ebooks/my-ebooks');
        console.log('✅ Ebooks fetched:', res.data.data);
        console.log('📊 Total ebooks:', res.data.data?.length || 0);
        setEbooks(res.data.data || []);
      } catch (error) {
        console.error('❌ Error fetching ebooks:', error);
        console.error('❌ Error response:', error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEbooks();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading your ebooks...</p>
      </div>
    );
  }

  console.log('🎨 Rendering MyEbooks with', ebooks.length, 'ebooks');

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaBook className="text-violet-400" />
        My Ebooks
      </h2>

      {ebooks.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-4">No ebooks yet</p>
          <p className="text-gray-500 text-sm">Create your first ebook to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook) => (
            <div key={ebook._id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <div className="h-64 bg-gray-700">
                <img
                  src={ebook.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
                  alt={ebook.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Cover';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 truncate">{ebook.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{ebook.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-violet-400 font-semibold">${ebook.price}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    ebook.isPublished ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {ebook.isPublished ? 'Published' : 'Unpublished'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};