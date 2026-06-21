'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaDollarSign, FaCreditCard } from 'react-icons/fa';
import toast from 'react-hot-toast';
import stripePromise from '@/utils/stripe';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const PUBLISHING_FEE = 50; // $50 publishing fee

export default function PublishingFee() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayPublishingFee = async () => {
    if (!user?._id) {
      toast.error('User not found');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      // Create checkout session for publishing fee
      const response = await axios.post(
        `${API_URL}/api/payments/create-publishing-fee-checkout`,
        { userId: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (error) {
          console.error('Stripe redirect error:', error);
          toast.error('Payment failed');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaDollarSign className="text-violet-400" />
        Publishing Fee
      </h2>

      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">One-Time Publishing Fee</h3>
          <p className="text-gray-400 mb-6">
            Pay a one-time fee of <span className="text-3xl font-bold text-violet-400">${PUBLISHING_FEE}</span> to publish unlimited ebooks on our platform.
          </p>

          <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
            <h4 className="text-white font-semibold mb-3">What you get:</h4>
            <ul className="text-gray-300 space-y-2 text-left">
              <li>✓ Publish unlimited ebooks</li>
              <li>✓ Access to sales analytics</li>
              <li>✓ 70% revenue share</li>
              <li>✓ 24/7 writer support</li>
            </ul>
          </div>

          <button
            onClick={handlePayPublishingFee}
            disabled={loading}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
              loading
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700'
            }`}
          >
            <FaCreditCard />
            {loading ? 'Processing...' : `Pay $${PUBLISHING_FEE} Now`}
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}