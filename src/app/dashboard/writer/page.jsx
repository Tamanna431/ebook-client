'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBook, 
  FaPlus, 
  FaChartLine, 
  FaDollarSign,
  FaBars,
  FaTimes,
  FaEdit,
  FaHeart,
  FaHome
} from 'react-icons/fa';
import toast from 'react-hot-toast';

import MyEbooks from './components/MyEbooks';
import CreateEbook from './components/CreateEbook';
import ManageEbooks from './components/ManageEbooks';
import SalesHistory from './components/SalesHistory';
import PublishingFee from './components/PublishingFee';
import WriterBookmarks from './components/WriterBookmarks';

const menuItems = [
  { id: 'my-ebooks', label: 'My Ebooks', icon: FaHome },
  { id: 'create', label: 'Create Ebook', icon: FaPlus },
  { id: 'manage', label: 'Manage Ebooks', icon: FaEdit },
  { id: 'bookmarks', label: 'Bookmarks', icon: FaHeart },
  { id: 'sales', label: 'Sales History', icon: FaChartLine },
  { id: 'publishing-fee', label: 'Publishing Fee', icon: FaDollarSign },
];

export default function WriterDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('my-ebooks');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingEbook, setEditingEbook] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (user && !loading) {
      console.log('👤 Current user:', user);
      console.log('👤 User role:', user.role);
      
      if (user.role !== 'writer' && user.role !== 'admin') {
        toast.error('You must be a writer to access this page');
        router.push('/dashboard/user');
      }
    }
  }, [isAuthenticated, loading, router, user]);

  // ✅ Debug log
  useEffect(() => {
    console.log('📑 Active tab changed to:', activeTab);
  }, [activeTab]);

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

  if (!isAuthenticated || !user) return null;

  const renderContent = () => {
    console.log('🎨 Rendering content for tab:', activeTab);
    
    switch (activeTab) {
      case 'my-ebooks':
        console.log('📚 Rendering MyEbooks component');
        return <MyEbooks />;
      case 'create':
        console.log('➕ Rendering CreateEbook component');
        return (
          <CreateEbook 
            editData={editingEbook}
            onSuccess={() => {
              setEditingEbook(null);
              setActiveTab('manage');
            }}
            onClearEdit={() => setEditingEbook(null)}
          />
        );
      case 'manage':
        console.log('📝 Rendering ManageEbooks component');
        return (
          <ManageEbooks 
            onEdit={(ebook) => {
              setEditingEbook(ebook);
              setActiveTab('create');
            }}
          />
        );
      case 'bookmarks':
        console.log('❤️ Rendering WriterBookmarks component');
        return <WriterBookmarks />;
      case 'sales':
        console.log('📊 Rendering SalesHistory component');
        return <SalesHistory />;
      case 'publishing-fee':
        console.log('💰 Rendering PublishingFee component');
        return <PublishingFee />;
      default:
        console.log('📚 Rendering default MyEbooks component');
        return <MyEbooks />;
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
            Writer Dashboard
          </h1>
          <p className="text-gray-400">Welcome back, {user.name}! Manage your ebooks.</p>
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
                    console.log('🖱️ Button clicked:', item.id);
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
                  {user.name?.charAt(0) || 'W'}
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm capitalize">{user.role}</p>
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
};