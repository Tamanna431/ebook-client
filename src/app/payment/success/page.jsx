'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaCheckCircle, FaBook, FaDownload, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        console.error('❌ No session ID found');
        setStatus('error');
        return;
      }

      try {
        console.log(' Verifying payment session:', sessionId);
        
        // Call backend to verify payment
        const response = await api.post('/api/payments/verify', {
          sessionId,
        });

        if (response.data.success) {
          console.log('✅ Payment verified successfully');
          setTransaction(response.data.data);
          setStatus('success');
          toast.success('Payment successful! Ebook added to your library.');
        } else {
          console.error('❌ Verification failed:', response.data.message);
          setStatus('error');
          toast.error(response.data.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('❌ Verify payment error:', error);
        setStatus('error');
        toast.error('Failed to verify payment');
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <FaSpinner className="text-6xl text-violet-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-white mb-2">Verifying Payment...</h2>
          <p className="text-gray-400">Please wait while we confirm your purchase</p>
        </motion.div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center p-8"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-white mb-4">Payment Issue</h1>
          <p className="text-gray-400 mb-6">
            We couldn't verify your payment. If you were charged, please contact support.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/user"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/browse"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all"
            >
              Continue Browsing
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto text-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <FaCheckCircle className="text-8xl text-green-500 mx-auto mb-6" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-gray-400 text-lg mb-2">
          Thank you for your purchase.
        </p>
        <p className="text-gray-500 mb-8">
          Your ebook is now available in your library.
        </p>

        {transaction && (
          <div className="bg-gray-800 rounded-xl p-4 mb-8 border border-gray-700">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Amount Paid:</span>
              <span className="text-green-400 font-bold">${transaction.amount}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400">{transaction.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Transaction ID:</span>
              <span className="text-gray-300 text-xs">{transaction.transactionId?.substring(0, 20)}...</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Link
            href="/dashboard/user"
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <FaBook /> Go to My Library
          </Link>
          <Link
            href="/browse"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
          >
            <FaDownload /> Continue Browsing
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}