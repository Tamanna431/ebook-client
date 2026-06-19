'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBook, FaCalendar, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users/me/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchases(response.data.data || []);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaShoppingCart className="text-violet-400" />
        Purchase History
      </h2>

      {purchases.length === 0 ? (
        <div className="text-center py-12">
          <FaBook className="text-6xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No purchases yet</p>
          <Link
            href="/browse"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
          >
            Browse Ebooks
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Ebook</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Writer</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-4 px-4">
                    <Link
                      href={`/ebooks/${purchase.ebook?._id}`}
                      className="text-violet-400 hover:text-violet-300 font-medium"
                    >
                      {purchase.ebook?.title || 'Unknown Ebook'}
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {purchase.ebook?.writer?.name || 'Unknown'}
                  </td>
                  <td className="py-4 px-4 text-green-400 font-medium">
                    <FaDollarSign className="inline mr-1" />
                    {purchase.amount}
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    <FaCalendar className="inline mr-2" />
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                      {purchase.status}
                    </span>
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