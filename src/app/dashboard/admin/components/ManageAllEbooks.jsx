'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { FaBook, FaTrash, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function ManageAllEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      const res = await api.get('/api/admin/ebooks');
      setEbooks(res.data.data);
    } catch (error) {
      console.error('Error fetching ebooks:', error);
      toast.error('Failed to load ebooks');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await api.patch(`/api/ebooks/${id}/publish`);
      toast.success(currentStatus ? 'Ebook unpublished' : 'Ebook published');
      fetchEbooks();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      await api.delete(`/api/admin/ebooks/${id}`);
      toast.success('Ebook deleted');
      fetchEbooks();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <FaSpinner className="animate-spin text-4xl text-violet-500 mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaBook className="text-green-400" />
          Manage All Ebooks
        </h2>
        <span className="text-gray-400 text-sm">Total: {ebooks.length} ebooks</span>
      </div>

      {ebooks.length === 0 ? (
        <div className="text-center py-12">
          <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No ebooks found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Cover</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Writer</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.map((ebook) => (
                <tr key={ebook._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-4 px-4">
                    <img
                      src={ebook.coverImage || 'https://via.placeholder.com/60x80'}
                      alt={ebook.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-4 text-white font-medium">{ebook.title}</td>
                  <td className="py-4 px-4 text-gray-300">{ebook.writer?.name || 'Unknown'}</td>
                  <td className="py-4 px-4 text-green-400 font-semibold">${ebook.price}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ebook.isPublished
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {ebook.isPublished ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTogglePublish(ebook._id, ebook.isPublished)}
                        className={`p-2 rounded-lg transition-colors ${
                          ebook.isPublished
                            ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/40'
                            : 'bg-green-600/20 text-green-400 hover:bg-green-600/40'
                        }`}
                        title={ebook.isPublished ? 'Unpublish' : 'Publish'}
                      >
                        {ebook.isPublished ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        onClick={() => handleDelete(ebook._id, ebook.title)}
                        className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}