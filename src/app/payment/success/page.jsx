'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBook } from 'react-icons/fa';
import Link from 'next/link';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-gray-800 rounded-2xl p-8 text-center border border-gray-700"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-4" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-gray-400 mb-6">
          Thank you for your purchase. Your ebook is now available in your library.
        </p>

        <div className="space-y-3">
          <Link
            href="/dashboard/user"
            className="block w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
          >
            Go to My Ebooks
          </Link>

          <Link
            href="/browse"
            className="block w-full py-3 border border-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-all"
          >
            Continue Browsing
          </Link>
        </div>
      </motion.div>
    </div>
  );
}