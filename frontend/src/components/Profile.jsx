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
  CreditCard,
  ChevronRight,
  Eye,
  Lock,
  Bell,
  Shield,
  Zap,
  Gift,
  FileText,
  UserCircle
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
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 15
    }
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
    { label: 'Total Orders', value: '24', icon: ShoppingBag, color: 'blue' },
    { label: 'Wishlist Items', value: '8', icon: Heart, color: 'purple' },
    { label: 'Pending Services', value: '2', icon: Clock, color: 'amber'},
    { label: 'Reward Points', value: '1,250', icon: Award, color: 'green' }
  ];

  const recentOrders = [
    { 
      id: 'ORD-001', 
      service: 'Cleaning & Polishing', 
      date: 'Nov 5, 2025', 
      status: 'Completed',
      price: '$35',
      icon: Package
    },
    { 
      id: 'ORD-002', 
      service: 'Custom Modifications', 
      date: 'Nov 2, 2025', 
      status: 'In Progress',
      price: '$60',
      icon: Settings
    },
    { 
      id: 'ORD-003', 
      service: 'Repair & Restoration', 
      date: 'Oct 28, 2025', 
      status: 'Completed',
      price: '$45',
      icon: Package
    }
  ];

  const savedAddresses = [
    { type: 'Home', address: '123 Main St, New York, NY 10001', isDefault: true },
    { type: 'Work', address: '456 Office Ave, New York, NY 10002', isDefault: false }
  ];

  const tabs = [
    { id: 'overview', icon: UserCircle, name: 'Overview' },
    { id: 'orders', icon: ShoppingBag, name: 'Orders' },
    { id: 'settings', icon: Settings, name: 'Settings' }
  ];

  const quickActions = [
    { icon: ShoppingBag, label: 'Browse Shop', color: 'blue', link: '/shop' },
    { icon: Package, label: 'Track Order', color: 'purple', link: '/track' },
    { icon: Heart, label: 'My Wishlist', color: 'red', link: '/wishlist' },
    { icon: Gift, label: 'Rewards', color: 'amber', link: '/rewards' }
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
            className="fixed top-24 right-4 z-50 bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-xl shadow-2xl flex items-center backdrop-blur-md"
          >
            <CheckCircle className="mr-3 w-5 h-5" />
            <span className="font-medium">Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 md:pt-28">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-4 border border-amber-500/20"
            >
              <UserCircle className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold">Account Dashboard</span>
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              My Profile
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "190px" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-2 mx-auto"
              />
            </h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto mt-4"
            >
              Manage your account, orders, and preferences in one place
            </motion.p>
          </div>
        </motion.div>

        {/* Profile Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 rounded-2xl p-6 mb-8 shadow-xl border border-gray-700 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -3 }}
                  className="text-center"
                >
                  <div className={`inline-flex p-3 bg-${stat.color}-500/10 rounded-xl mb-3 border border-${stat.color}-500/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-green-400">{stat.change}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(action.link)}
                className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${action.color}-500/50 transition-all shadow-lg text-center group`}
              >
                <div className={`inline-flex p-3 bg-${action.color}-500/10 rounded-xl mb-3 border border-${action.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 text-${action.color}-400`} />
                </div>
                <p className="text-white text-sm font-medium">{action.label}</p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-6 overflow-x-auto pb-2 scrollbar-hide"
        >
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30'
                      : 'bg-gray-800 text-gray-300 hover:text-white border border-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </motion.button>
              );
            })}
          </div>
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
                className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
                variants={itemVariants}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <UserCircle className="mr-2 text-amber-400" />
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEdit}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-amber-500/20"
                    >
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </motion.button>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-600 transition-colors disabled:opacity-50 shadow-lg"
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
                        className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-600 transition-colors"
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
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-700">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-4xl font-bold text-white overflow-hidden shadow-xl">
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
                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl cursor-pointer shadow-lg border-2 border-gray-800"
                      >
                        <Camera size={18} className="text-gray-900" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </motion.label>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{userData.name || 'User'}</h3>
                    <p className="text-gray-400 mb-3">{userData.email}</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="inline-flex items-center gap-2 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                        <Star className="text-amber-400 w-4 h-4" />
                        <span className="text-amber-400 text-sm font-medium">Premium Member</span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                        <Shield className="text-green-400 w-4 h-4" />
                        <span className="text-green-400 text-sm font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
                        <User size={16} className="inline mr-2 text-amber-400" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
                        <Mail size={16} className="inline mr-2 text-amber-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled={true}
                        className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl border border-gray-700 opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
                        <Phone size={16} className="inline mr-2 text-amber-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="+91-9876543210"
                        className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
                        <MapPin size={16} className="inline mr-2 text-amber-400" />
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Your address"
                        className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
                      <FileText size={16} className="inline mr-2 text-amber-400" />
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed resize-none transition-all"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div className="space-y-6" variants={containerVariants}>
                {/* Recent Activity */}
                <motion.div 
                  className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-lg mb-5 flex items-center text-white">
                    <Clock className="mr-2 text-amber-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentOrders.slice(0, 3).map((order) => {
                      const Icon = order.icon;
                      return (
                        <motion.div 
                          key={order.id} 
                          whileHover={{ x: 3 }}
                          className="flex items-start gap-3 p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all cursor-pointer"
                        >
                          <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                            <Icon className="w-5 h-5 text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{order.service}</p>
                            <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${
                            order.status === 'Completed' 
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {order.status}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                  <motion.button
                    whileHover={{ x: 3 }}
                    className="w-full mt-4 py-2.5 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    View all activity
                    <ChevronRight size={16} />
                  </motion.button>
                </motion.div>

                {/* Membership Card */}
                <motion.div 
                  className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0">
                    <motion.div 
                      animate={{ 
                        x: [-100, 100, -100],
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{ 
                        duration: 10, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="text-gray-900 w-8 h-8" />
                      <span className="text-xs font-bold text-gray-900 bg-white/90 px-3 py-1 rounded-full">PREMIUM</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">1,250 Points</h3>
                    <p className="text-sm text-gray-800 mb-4">750 points to next reward</p>
                    <div className="w-full bg-gray-900/30 rounded-full h-2.5 mb-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '62%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-gray-900 h-2.5 rounded-full"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 bg-gray-900 text-amber-400 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <Gift size={18} />
                      View Rewards
                    </motion.button>
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
              className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <ShoppingBag className="mr-2 text-amber-400" />
                Order History
              </h2>
              <div className="space-y-4">
                {recentOrders.map((order) => {
                  const Icon = order.icon;
                  return (
                    <motion.div
                      key={order.id}
                      whileHover={{ x: 5 }}
                      className="p-5 bg-gray-900 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                          <Icon className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white mb-1">{order.service}</p>
                          <p className="text-sm text-gray-400">{order.id} • {order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-amber-400 text-lg">{order.price}</span>
                        <span className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap ${
                          order.status === 'Completed' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {order.status}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-amber-400 transition-colors"
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
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
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MapPin className="mr-2 text-amber-400" />
                  Saved Addresses
                </h2>
                <div className="space-y-4">
                  {savedAddresses.map((addr, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="p-5 bg-gray-900 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all flex items-start justify-between"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <MapPin className="text-amber-400" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium text-white">{addr.type}</p>
                            {addr.isDefault && (
                              <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{addr.address}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <Edit size={18} />
                      </motion.button>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-amber-500/50 hover:text-amber-400 transition-all font-medium"
                  >
                    + Add New Address
                  </motion.button>
                </div>
              </motion.div>

              {/* Security Settings */}
              <motion.div 
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Shield className="mr-2 text-amber-400" />
                  Security & Privacy
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: Lock, label: 'Change Password', color: 'blue' },
                    { icon: Bell, label: 'Notification Preferences', color: 'purple' },
                    { icon: Eye, label: 'Privacy Settings', color: 'green' },
                    { icon: Shield, label: 'Two-Factor Authentication', color: 'amber' }
                  ].map((setting, index) => {
                    const Icon = setting.icon;
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ x: 5 }}
                        className={`w-full p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-${setting.color}-500/50 transition-all text-left flex items-center justify-between group`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 bg-${setting.color}-500/10 rounded-lg border border-${setting.color}-500/20`}>
                            <Icon className={`w-5 h-5 text-${setting.color}-400`} />
                          </div>
                          <span className="text-white font-medium">{setting.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transition-colors" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Account Actions */}
              <motion.div 
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Account Actions</h2>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full py-4 px-5 text-left text-red-400 hover:text-red-300 rounded-xl transition-all flex items-center gap-3 bg-red-500/5 border border-red-500/20 hover:border-red-500/40 font-medium"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full py-4 px-5 text-left text-red-400 hover:text-red-300 rounded-xl transition-all flex items-center gap-3 bg-red-500/5 border border-red-500/20 hover:border-red-500/40 font-medium"
                  >
                    <AlertCircle size={20} />
                    <span>Delete Account</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Referral Banner */}
        <motion.div 
          className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-8 shadow-2xl mt-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                x: [-100, 100, -100],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Gift className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Referral Program</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Refer a Friend, Get Rewards!
              </h3>
              <p className="text-gray-800 text-lg">
                Share your referral code and earn 500 points for each friend who makes their first purchase.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-amber-400 px-8 py-4 rounded-xl font-bold shadow-xl flex items-center gap-3 whitespace-nowrap hover:bg-gray-800 transition-colors"
            >
              <span>Share Now</span>
            </motion.button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;