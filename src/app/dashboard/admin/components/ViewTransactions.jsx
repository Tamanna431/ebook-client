'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { FaShoppingCart, FaSpinner, FaCalendar } from 'react-icons/fa';

export default function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/api/admin/transactions');
      setTransactions(res.data.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
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
          <FaShoppingCart className="text-yellow-400" />
          All Transactions
        </h2>
        <span className="text-gray-400 text-sm">Total: {transactions.length}</span>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <FaShoppingCart className="text-6xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No transactions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Transaction ID</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">User Email</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-4 px-4 text-gray-300 text-sm font-mono">
                    {txn.transactionId?.substring(0, 15)}...
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      txn.type === 'purchase'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-blue-600/20 text-blue-400'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{txn.user?.email || 'N/A'}</td>
                  <td className="py-4 px-4 text-green-400 font-semibold">${txn.amount}</td>
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
  );
}