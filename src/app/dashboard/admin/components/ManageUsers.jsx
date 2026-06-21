'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { FaUsers, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/admin/users');
      setUsers(res.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    if (editingUserId === userId) {
      if (!newRole || newRole === currentRole) {
        setEditingUserId(null);
        return;
      }

      try {
        await api.patch(`/api/admin/users/${userId}/role`, { role: newRole });
        toast.success(`Role updated to ${newRole}`);
        fetchUsers();
        setEditingUserId(null);
      } catch (error) {
        console.error('Role update error:', error);
        toast.error(error.response?.data?.message || 'Failed to update role');
      }
    } else {
      setEditingUserId(userId);
      setNewRole(currentRole);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Are you sure you want to delete "${userName}"?`)) {
      return;
    }

    try {
      await api.delete(`/api/admin/users/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user');
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
      <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
      
      {users.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">User</th>
                <th className="text-left py-3 px-4 text-gray-400">Email</th>
                <th className="text-left py-3 px-4 text-gray-400">Role</th>
                <th className="text-left py-3 px-4 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700/50">
                  <td className="py-4 px-4 text-white">{user.name}</td>
                  <td className="py-4 px-4 text-gray-300">{user.email}</td>
                  <td className="py-4 px-4">
                    {editingUserId === user._id ? (
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                      >
                        <option value="user">User</option>
                        <option value="writer">Writer</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs bg-blue-600/20 text-blue-400">
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {editingUserId === user._id ? (
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm mr-2"
                      >
                        Change Role
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Delete
                    </button>
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