'use client';

import { motion } from 'framer-motion';
import { FaTimesCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-gray-800 rounded-2xl p-8 text-center border border-gray-700"
      >
        <FaTimesCircle className="text-6xl text-red-400 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-white mb-2">Payment Cancelled</h1>
        <p className="text-gray-400 mb-6">
          Your payment was cancelled. You can try again anytime.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="block w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
          >
            Try Again
          </button>

          <Link
            href="/browse"
            className="block w-full py-3 border border-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-all"
          >
            Back to Browse
          </Link>
        </div>
      </motion.div>
    </div>
  );
}