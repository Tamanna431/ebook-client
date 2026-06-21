'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, 
  FaBook, 
  FaShoppingCart, 
  FaDollarSign,
  FaUserShield,
  FaBars,
  FaTimes,
  FaChartLine,
  FaTachometerAlt
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import api from '@/lib/axios';
import ManageUsers from './components/ManageUsers';
import ManageAllEbooks from './components/ManageAllEbooks';
import ViewTransactions from './components/ViewTransactions';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: FaTachometerAlt },
  { id: 'users', label: 'Manage Users', icon: FaUsers },
  { id: 'ebooks', label: 'Manage Ebooks', icon: FaBook },
  { id: 'transactions', label: 'Transactions', icon: FaShoppingCart },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWriters: 0,
    totalEbooks: 0,
    totalRevenue: 0,
  });
  
  const [monthlySales, setMonthlySales] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentEbooks, setRecentEbooks] = useState([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
    if (!loading && user && user.role !== 'admin') {
      router.push('/dashboard/user');
    }
  }, [isAuthenticated, loading, router, user]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      const [statsRes, salesRes, genreRes, usersRes, ebooksRes] = await Promise.all([
        api.get('/api/admin/stats/overview'),
        api.get('/api/admin/stats/monthly-sales'),
        api.get('/api/admin/stats/ebooks-by-genre'),
        api.get('/api/admin/users/recent'),
        api.get('/api/admin/ebooks/recent'),
      ]);

      setStats(statsRes.data.data);
      setMonthlySales(salesRes.data.data);
      setGenreData(genreRes.data.data);
      setRecentUsers(usersRes.data.data);
      setRecentEbooks(ebooksRes.data.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  if (loading || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewContent 
            stats={stats}
            monthlySales={monthlySales}
            genreData={genreData}
            recentUsers={recentUsers}
            recentEbooks={recentEbooks}
          />
        );
      case 'users':
        return <ManageUsers />;
      case 'ebooks':
        return <ManageAllEbooks />;
      case 'transactions':
        return <ViewTransactions />;
      default:
        return <OverviewContent stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Welcome, {user.name}! Manage your entire platform.</p>
        </motion.div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-24 right-4 z-50 p-3 bg-violet-600 text-white rounded-lg shadow-lg"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="flex flex-col md:flex-row gap-6">
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

            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white">
                  {user.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </motion.aside>

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

// Overview Content Component with Charts
function OverviewContent({ stats, monthlySales, genreData, recentUsers, recentEbooks }) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon={FaUsers}
          color="from-blue-500 to-blue-700"
        />
        <StatCard
          title="Total Writers"
          value={stats.totalWriters || 0}
          icon={FaUserShield}
          color="from-purple-500 to-purple-700"
        />
        <StatCard
          title="Total Ebooks"
          value={stats.totalEbooks || 0}
          icon={FaBook}
          color="from-green-500 to-green-700"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(stats.totalRevenue || 0).toFixed(2)}`}
          icon={FaDollarSign}
          color="from-yellow-500 to-yellow-700"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaChartLine className="text-green-400" />
            Monthly Sales
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Sales"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Ebooks by Genre Pie Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaBook className="text-blue-400" />
            Ebooks by Genre
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Users and Ebooks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaUsers className="text-blue-400" />
            Recent Users
          </h2>
          <div className="space-y-3">
            {recentUsers?.slice(0, 5).map((userItem) => (
              <div key={userItem._id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {userItem.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-white font-medium">{userItem.name}</p>
                    <p className="text-gray-400 text-sm">{userItem.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  userItem.role === 'admin' ? 'bg-red-600/20 text-red-400' :
                  userItem.role === 'writer' ? 'bg-purple-600/20 text-purple-400' :
                  'bg-blue-600/20 text-blue-400'
                }`}>
                  {userItem.role}
                </span>
              </div>
            ))}
            {(!recentUsers || recentUsers.length === 0) && (
              <p className="text-gray-400 text-center py-4">No users found</p>
            )}
          </div>
        </div>

        {/* Recent Ebooks */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaBook className="text-green-400" />
            Recent Ebooks
          </h2>
          <div className="space-y-3">
            {recentEbooks?.slice(0, 5).map((ebook) => (
              <div key={ebook._id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={ebook.coverImage || 'https://via.placeholder.com/40x60'}
                    alt={ebook.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="text-white font-medium truncate max-w-xs">{ebook.title}</p>
                    <p className="text-gray-400 text-sm">${ebook.price}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  ebook.isPublished ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                }`}>
                  {ebook.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
            {(!recentEbooks || recentEbooks.length === 0) && (
              <p className="text-gray-400 text-center py-4">No ebooks found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${color} rounded-xl p-6`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <Icon className="text-4xl text-white/50" />
      </div>
    </motion.div>
  );
}