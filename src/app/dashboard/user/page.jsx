'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBook, 
  FaHeart, 
  FaUser, 
  FaShoppingCart,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import PurchaseHistory from './components/PurchaseHistory';
import PurchasedEbooks from './components/PurchasedEbooks';
import Bookmarks from './components/Bookmarks';
import Profile from './components/Profile';

const menuItems = [
  { id: 'purchases', label: 'Purchase History', icon: FaShoppingCart },
  { id: 'ebooks', label: 'My Ebooks', icon: FaBook },
  { id: 'bookmarks', label: 'Bookmarks', icon: FaHeart },
  { id: 'profile', label: 'Profile', icon: FaUser },
];

export default function UserDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('purchases');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'purchases':
        return <PurchaseHistory />;
      case 'ebooks':
        return <PurchasedEbooks />;
      case 'bookmarks':
        return <Bookmarks />;
      case 'profile':
        return <Profile />;
      default:
        return <PurchaseHistory />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-400">Manage your ebooks and purchases</p>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-24 right-4 z-50 p-3 bg-violet-600 text-white rounded-lg shadow-lg"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`md:w-64 bg-gray-800 rounded-xl p-6 border border-gray-700 ${
              sidebarOpen ? 'block' : 'hidden md:block'
            }`}
          >
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Info */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}