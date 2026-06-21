'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { FaPlus, FaUpload, FaImage, FaSpinner, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const GENRES = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror', 'Biography', 'Self-Help', 'Other'];

export default function CreateEbook({ onSuccess, editData, onClearEdit }) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    genre: 'Fiction',
    coverImage: '',
    pdfUrl: '',
  });

  // ✅ Edit data থাকলে form পূরণ করুন
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        description: editData.description || '',
        price: editData.price || '',
        genre: editData.genre || 'Fiction',
        coverImage: editData.coverImage || '',
        pdfUrl: editData.pdfUrl || '',
      });
    } else {
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        genre: 'Fiction',
        coverImage: '',
        pdfUrl: '',
      });
    }
  }, [editData]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result.split(',')[1];
          const response = await api.post('/api/upload', { image: base64Image });

          if (response.data.success) {
            setFormData({ ...formData, coverImage: response.data.data.url });
            toast.success('Image uploaded successfully');
          }
        } catch (error) {
          console.error('Upload error:', error);
          toast.error('Failed to upload image');
        } finally {
          setUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File read error:', error);
      toast.error('Failed to read file');
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || formData.title.trim().length < 3) {
      toast.error('Title must be at least 3 characters');
      return;
    }

    if (!formData.description || formData.description.trim().length < 10) {
      toast.error('Description must be at least 10 characters');
      return;
    }

    if (!formData.price || formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      const ebookData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      let response;
      if (editData) {
        // ✅ Update existing ebook
        response = await api.put(`/api/ebooks/${editData._id}`, ebookData);
        toast.success('Ebook updated successfully!');
      } else {
        // ✅ Create new ebook
        response = await api.post('/api/ebooks', ebookData);
        toast.success('Ebook created successfully!');
      }

      if (response.data.success) {
        setFormData({
          title: '',
          description: '',
          price: '',
          genre: 'Fiction',
          coverImage: '',
          pdfUrl: '',
        });
        
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.message || 'Failed to save ebook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        {editData ? (
          <>
            <FaEdit className="text-blue-400" />
            Edit Ebook
          </>
        ) : (
          <>
            <FaPlus className="text-violet-400" />
            Create New Ebook
          </>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
            placeholder="Enter ebook title (min 3 characters)"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="5"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
            placeholder="Describe your ebook (min 10 characters)..."
          />
        </div>

        {/* Genre & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Genre <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-violet-500"
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Price ($) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Cover Image
          </label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            {formData.coverImage ? (
              <div className="relative inline-block">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-48 h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, coverImage: '' })}
                  className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <FaImage className="text-4xl text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400 mb-3">Upload a cover image (max 5MB)</p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg cursor-pointer hover:bg-violet-700 transition-all">
                  {uploadingImage ? <FaSpinner className="animate-spin" /> : <FaUpload />}
                  <span>{uploadingImage ? 'Uploading...' : 'Choose Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* PDF URL (Optional) */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            PDF File URL (Optional)
          </label>
          <input
            type="text"
            value={formData.pdfUrl}
            onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
            placeholder="https://drive.google.com/... (optional)"
          />
          <p className="text-xs text-gray-500 mt-2">
            Upload PDF to Google Drive and paste the link here
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || uploadingImage}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
            loading || uploadingImage
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : editData
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                : 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700'
          }`}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> {editData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>{editData ? 'Update Ebook' : 'Create Ebook'}</>
          )}
        </button>
      </form>
    </div>
  );
}