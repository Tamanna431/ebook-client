'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';  // ✅ Custom api instance
import { FaChartLine, FaDollarSign, FaCalendar, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function SalesHistory() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ 
    totalSales: 0, 
    totalRevenue: 0, 
    totalEbooks: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // ✅ দুটি API call parallel এ
        const [salesRes, ebooksRes] = await Promise.all([
          api.get('/api/payments/writer-sales'),      // ✅ সঠিক endpoint
          api.get('/api/ebooks/my-ebooks'),            // ✅ নিজের বই
        ]);

        const txns = salesRes.data.data || [];
        const ebooks = ebooksRes.data.data || [];

        // ✅ Stats backend থেকে নিচ্ছি
        const backendStats = salesRes.data.stats || {};

        setTransactions(txns);
        setStats({
          totalSales: backendStats.totalSales || txns.length,
          totalRevenue: backendStats.totalEarnings || 0,
          totalEbooks: ebooks.length,
        });

        console.log('✅ Sales data fetched:', txns.length, 'transactions');
        console.log('💰 Total revenue:', backendStats.totalEarnings);
      } catch (error) {
        console.error('❌ Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl h-32 animate-pulse" />
          ))}
        </div>
        <div className="bg-gray-800 rounded-xl h-96 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaChartLine className="text-violet-400" />
        Sales History
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl p-6"
        >
          <h3 className="text-gray-200 text-sm mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-white">
            ${stats.totalRevenue.toFixed(2)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-gray-400 text-sm mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-white">{stats.totalSales}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-gray-400 text-sm mb-2">Published Ebooks</h3>
          <p className="text-3xl font-bold text-white">{stats.totalEbooks}</p>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>

        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <FaDollarSign className="text-6xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No sales yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Ebook</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-4 px-4 text-white">
                      {txn.ebook?.title || 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      {txn.user?.name || 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-green-400 font-medium">
                      <FaDollarSign className="inline mr-1" />
                      {txn.amount?.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-gray-400">
                      <FaCalendar className="inline mr-2" />
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}