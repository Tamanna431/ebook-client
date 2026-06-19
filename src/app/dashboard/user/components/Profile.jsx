'use client';

import { useAuth } from '@/context/AuthContext';
import { FaUser, FaEnvelope, FaCalendar } from 'react-icons/fa';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaUser className="text-violet-400" />
        Profile Information
      </h2>

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{user.name}</h3>
            <p className="text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-700">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <FaUser className="inline mr-2" />
              Full Name
            </label>
            <p className="text-white text-lg">{user.name}</p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <FaEnvelope className="inline mr-2" />
              Email Address
            </label>
            <p className="text-white text-lg">{user.email}</p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              <FaCalendar className="inline mr-2" />
              Member Since
            </label>
            <p className="text-white text-lg">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Account Status</label>
            <span className="inline-block px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}