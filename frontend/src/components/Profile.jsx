import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera,
  ShoppingBag,
  Heart,
  Clock,
  Settings,
  LogOut,
  Check,
  AlertCircle,
  Package,
  TrendingUp,
  Star,
  Award,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

// Configure axios base URL
const API_BASE_URL = 'http://localhost:5000';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    avatar: null
  });
  const [originalData, setOriginalData] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const user = response.data.user;
          const profileData = {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            bio: user.bio || '',
            avatar: user.avatar || null
          };
          setUserData(profileData);
          setOriginalData(profileData);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserData(originalData);
    setError('');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setOriginalData(userData);
        setIsEditing(false);
        setShowSuccess(true);
        
        // Update localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));

        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: 'Total Orders', value: '24', icon: <ShoppingBag className="text-amber-400" />, change: '+12%' },
    { label: 'Wishlist Items', value: '8', icon: <Heart className="text-amber-400" />, change: '+3' },
    { label: 'Pending Services', value: '2', icon: <Clock className="text-amber-400" />, change: 'In Progress' },
    { label: 'Reward Points', value: '1,250', icon: <Award className="text-amber-400" />, change: '+150' }
  ];

  const recentOrders = [
    { 
      id: 'ORD-001', 
      service: 'Cleaning & Polishing', 
      date: 'Nov 5, 2025', 
      status: 'Completed',
      price: '$35',
      icon: <Package className="text-amber-400" />
    },
    { 
      id: 'ORD-002', 
      service: 'Custom Modifications', 
      date: 'Nov 2, 2025', 
      status: 'In Progress',
      price: '$60',
      icon: <Settings className="text-amber-400" />
    },
    { 
      id: 'ORD-003', 
      service: 'Repair & Restoration', 
      date: 'Oct 28, 2025', 
      status: 'Completed',
      price: '$45',
      icon: <Package className="text-amber-400" />
    }
  ];

  const savedAddresses = [
    { type: 'Home', address: '123 Main St, New York, NY 10001', isDefault: true },
    { type: 'Work', address: '456 Office Ave, New York, NY 10002', isDefault: false }
  ];

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <Navbar />
      
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-24 right-4 z-50 bg-green-500 text-gray-900 px-6 py-4 rounded-lg shadow-lg flex items-center"
          >
            <Check className="mr-2" />
            <span className="font-medium">Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 md:pt-28">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:justify-between md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-white relative inline-block">
              My Profile
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-1 left-0 h-1 bg-amber-500 rounded-full"
              />
            </h1>
            <p className="text-gray-400 mt-2">Manage your account and preferences</p>
          </div>
        </motion.div>

        {/* Profile Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-5 mb-10 shadow-lg border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-amber-500 bg-opacity-20 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-amber-400">{stat.change}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex space-x-2 mb-6 overflow-x-auto"
        >
          {['overview', 'orders', 'settings'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Profile Card */}
              <motion.div 
                className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                variants={itemVariants}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEdit}
                      className="flex items-center space-x-2 bg-amber-500 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </motion.button>
                  ) : (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        {isSaving ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Save size={16} />
                        )}
                        <span>{isSaving ? 'Saving...' : 'Save'}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-200 rounded-lg flex items-center"
                    >
                      <AlertCircle className="mr-2" size={20} />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Avatar */}
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
                      {userData.avatar ? (
                        <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        userData.name?.charAt(0).toUpperCase() || 'U'
                      )}
                    </div>
                    {isEditing && (
                      <motion.label
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute bottom-0 right-0 bg-amber-500 p-2 rounded-full cursor-pointer shadow-lg"
                      >
                        <Camera size={16} className="text-gray-900" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </motion.label>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{userData.name || 'User'}</h3>
                    <p className="text-gray-400">{userData.email}</p>
                    <div className="flex items-center mt-2">
                      <Star className="text-amber-400 w-4 h-4" />
                      <span className="ml-1 text-sm text-gray-400">Premium Member</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <User size={16} className="inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled={true}
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500 opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="+91-9876543210"
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <MapPin size={16} className="inline mr-2" />
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Your address"
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                      rows="3"
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div className="space-y-6" variants={containerVariants}>
                {/* Recent Activity */}
                <motion.div 
                  className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Clock className="mr-2 text-amber-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-start space-x-3 p-3 bg-gray-900 rounded-lg">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          {order.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{order.service}</p>
                          <p className="text-xs text-gray-400">{order.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Completed' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-blue-900 text-blue-300'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Membership Card */}
                <motion.div 
                  className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl p-5 shadow-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Award className="text-gray-900 w-8 h-8" />
                    <span className="text-xs font-bold text-gray-900 bg-white px-2 py-1 rounded-full">PREMIUM</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">1,250 Points</h3>
                  <p className="text-sm text-gray-900 mb-4">750 points to next reward</p>
                  <div className="w-full bg-gray-900 bg-opacity-30 rounded-full h-2">
                    <div className="bg-gray-900 h-2 rounded-full" style={{ width: '62%' }} />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ x: 5, backgroundColor: "rgba(255, 193, 7, 0.05)" }}
                    className="p-4 bg-gray-900 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-800 rounded-lg">
                        {order.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white">{order.service}</p>
                        <p className="text-sm text-gray-400">{order.id} • {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-amber-400">{order.price}</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        order.status === 'Completed' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-blue-900 text-blue-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Saved Addresses */}
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Saved Addresses</h2>
                <div className="space-y-4">
                  {savedAddresses.map((addr, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="p-4 bg-gray-900 rounded-lg flex items-start justify-between"
                    >
                      <div className="flex items-start space-x-3">
                        <MapPin className="text-amber-400 mt-1" size={20} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-white">{addr.type}</p>
                            {addr.isDefault && (
                              <span className="text-xs bg-amber-500 text-gray-900 px-2 py-0.5 rounded-full">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{addr.address}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-amber-400 hover:text-amber-300"
                      >
                        <Edit size={18} />
                      </motion.button>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:border-amber-500 hover:text-amber-400 transition-colors"
                  >
                    + Add New Address
                  </motion.button>
                </div>
              </motion.div>

              {/* Payment Methods */}
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-gray-900 rounded-lg font-medium hover:from-amber-600 hover:to-amber-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Add Payment Method</span>
                </motion.button>
              </motion.div>

              {/* Account Actions */}
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Account Actions</h2>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ x: 5, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                    className="w-full py-3 px-4 text-left text-red-400 hover:text-red-300 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 5, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                    className="w-full py-3 px-4 text-left text-red-400 hover:text-red-300 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <AlertCircle size={18} />
                    <span>Delete Account</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Promo Banner */}
        <motion.div 
          className="bg-gradient-to-r from-amber-500 to-amber-700 rounded-xl p-6 shadow-lg mt-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-between flex-col md:flex-row">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Refer a Friend, Get Rewards!</h3>
              <p className="text-gray-900 text-sm">Share your referral code and earn 500 points for each friend who makes their first purchase.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 md:mt-0 bg-gray-900 text-amber-400 px-6 py-3 rounded-lg font-bold shadow flex items-center space-x-2"
            >
              <span>Share Now</span>
              <TrendingUp size={20} />
            </motion.button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;