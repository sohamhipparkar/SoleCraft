import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Repeat, 
  Settings, 
  RefreshCw, 
  Store, 
  User, 
  Bell, 
  Search, 
  ChevronRight,
  Clock,
  Star,
  Wrench,
  Plus,
  Calendar,
  TrendingUp,
  Heart,
  ShoppingCart,
  ArrowRight,
  Bookmark,
  Sparkles,
  Award,
  Zap,
  X,
  Filter,
  CheckCircle2,
  ExternalLink,
  Package,
  CreditCard,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ShoeRepair from '../assets/ShoeRepair.webp';
import CustomDesign from '../assets/CustomDesign.avif';
import RepairRestoration from '../assets/RepairRestoration.jpg';
import Exchange from '../assets/Exchange.webp';
import Navbar from './Navbar';
import Footer from './Footer';

export default function EnhancedCobblerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Custom design ready!', details: 'Your custom leather boots are ready for pickup.', type: 'success' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2000);
    
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    const statsTimer = setTimeout(() => {
      setAnimateStats(true);
    }, 800);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(loadTimer);
      clearTimeout(statsTimer);
    };
  }, []);

  const serviceCards = [
    { 
      id: 1, 
      title: 'Exchange Program', 
      description: 'Trade your old pairs for store credit towards new ones', 
      price: 'Varies', 
      icon: <Repeat className="text-amber-400" />,
      bgImage: Exchange,
      popularCount: '75+ exchanges',
      rating: 4.7,
      duration: 'Instant',
      category: 'exchange',
      route: '/exchange'
    },
    { 
      id: 2, 
      title: 'Custom Design', 
      description: 'Personalize your footwear with expert craftsmanship', 
      price: '$75', 
      icon: <Settings className="text-amber-400" />,
      bgImage: CustomDesign,
      popularCount: '120+ designs',
      rating: 5.0,
      duration: '5-7 days',
      category: 'custom',
      route: '/customize'
    },
    { 
      id: 3, 
      title: 'Shoe Repair', 
      description: 'Professional repair for worn shoes', 
      price: '$35', 
      icon: <Wrench className="text-amber-400" />,
      bgImage: ShoeRepair,
      popularCount: '250+ orders',
      rating: 4.9,
      duration: '2-3 days',
      category: 'repair',
      route: '/services'
    },
    { 
      id: 4, 
      title: 'Resell Marketplace', 
      description: 'Buy and sell premium pre-owned footwear with confidence', 
      price: 'Market Price', 
      icon: <ShoppingBag className="text-amber-400" />,
      bgImage: RepairRestoration,
      popularCount: '500+ listings',
      rating: 4.8,
      duration: 'Instant',
      category: 'resell',
      route: '/resell'
    }
  ];

  const recentActivity = [
    { 
      id: 1, 
      action: 'Shoe repair completed', 
      time: '2 hours ago',
      status: 'Ready for pickup',
      icon: <CheckCircle2 className="w-5 h-5" />,
      details: 'Black leather oxfords',
      color: 'green'
    },
    { 
      id: 2, 
      action: 'Custom design request', 
      time: '1 day ago',
      status: 'In progress',
      icon: <Package className="w-5 h-5" />,
      details: 'Personalized sneakers',
      color: 'blue'
    },
    { 
      id: 3, 
      action: 'Exchange processed', 
      time: '3 days ago',
      status: 'Completed',
      icon: <CheckCircle2 className="w-5 h-5" />,
      details: 'Hiking boots for store credit',
      color: 'green'
    },
    { 
      id: 4, 
      action: 'New appointment scheduled', 
      time: '5 days ago',
      status: 'Upcoming',
      icon: <Calendar className="w-5 h-5" />,
      details: 'May 5th at 2:00 PM',
      color: 'purple'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      service: 'Shoe Measurement',
      date: 'Tomorrow',
      time: '2:00 PM',
      notes: 'Bring both pairs',
      type: 'consultation'
    },
    {
      id: 2,
      service: 'Custom Design Consultation',
      date: 'May 7',
      time: '11:30 AM',
      notes: 'Design sketches ready',
      type: 'design'
    }
  ];

  const quickStats = [
    { label: 'Repair Orders', value: 12, icon: <Wrench className="w-5 h-5" />, change: '+3', color: 'amber' },
    { label: 'Custom Designs', value: 3, icon: <Settings className="w-5 h-5" />, change: '+1', color: 'purple' },
    { label: 'Loyalty Points', value: 1250, icon: <Star className="w-5 h-5" />, change: '+250', color: 'yellow' },
    { label: 'Total Saved', value: '$840', icon: <CreditCard className="w-5 h-5" />, change: '+$120', color: 'green' }
  ];

  const trendingStyles = [
    { name: 'Vintage Patina', popularity: 94, change: '+12%' },
    { name: 'Vibram Soles', popularity: 87, change: '+8%' },
    { name: 'Hand-Stitched Details', popularity: 82, change: '+15%' },
    { name: 'Sustainable Materials', popularity: 79, change: '+20%' }
  ];

  const filterCategories = [
    { id: 'all', label: 'All Services', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'repair', label: 'Repair', icon: <Wrench className="w-4 h-4" /> },
    { id: 'custom', label: 'Custom', icon: <Settings className="w-4 h-4" /> },
    { id: 'exchange', label: 'Exchange', icon: <Repeat className="w-4 h-4" /> },
    { id: 'resell', label: 'Resell', icon: <ShoppingBag className="w-4 h-4" /> }
  ];

  const filteredServices = activeTab === 'all' 
    ? serviceCards 
    : serviceCards.filter(card => card.category === activeTab);

  // Simplified animation variants
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
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleServiceClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-100 min-h-screen font-sans overflow-x-hidden">
      {/* Navbar Component */}
      <Navbar />
      
      {/* Enhanced Notifications */}
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-24 right-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-xl shadow-2xl max-w-sm z-50 border border-gray-700"
            style={{
              backdropFilter: 'blur(10px)',
              top: `${96 + index * 100}px`
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{notification.message}</p>
                  <p className="text-sm text-gray-400 mt-1">{notification.details}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dismissNotification(notification.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="pt-24 md:pt-28">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Enhanced Header */}
          <motion.div 
            className="flex flex-col md:flex-row md:justify-between md:items-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mb-4 md:mb-0">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Dashboard
              </h2>
              <p className="text-gray-400 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                Welcome back to your cobbler services hub
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Always Expanded Search Bar */}
              <motion.div 
                className="relative w-full md:w-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800/50 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-500 transition-all"
                />
              </motion.div>

              {/* Filter Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all backdrop-blur-sm"
              >
                <Filter className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Quick Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl relative overflow-hidden group cursor-pointer"
              >
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <div className="flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span>{stat.change} this month</span>
                    </div>
                  </div>
                  <div className={`p-3 bg-${stat.color}-500/20 rounded-xl`}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div 
            className="flex items-center space-x-3 mb-6 overflow-x-auto pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {filterCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-amber-500/50'
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Service Cards */}
          <motion.div 
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold flex items-center">
                Our Services
                <span className="ml-3 text-sm font-normal text-gray-400">
                  ({filteredServices.length} available)
                </span>
              </h3>
              <motion.button 
                className="text-amber-400 flex items-center text-sm font-medium group"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate('/services')}
              >
                View all 
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filteredServices.map((card, index) => (
                  <motion.div 
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 shadow-xl relative group cursor-pointer"
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleServiceClick(card.route)}
                  >
                    {/* Image */}
                    <div className="h-40 bg-gray-700 relative overflow-hidden">
                      <img 
                        src={card.bgImage} 
                        alt={card.title} 
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                      
                      {/* Floating badge */}
                      <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1 border border-gray-700">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold">{card.rating}</span>
                      </div>

                      {/* Popular tag */}
                      <div className="absolute bottom-3 left-3 flex items-center text-xs text-gray-200 bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700">
                        <Heart className="w-3 h-3 mr-1 text-red-400" />
                        {card.popularCount}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 relative">
                      {/* Glowing accent */}
                      <div 
                        className={`absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-amber-500 rounded-full opacity-0 blur-2xl transition-opacity duration-500 ${hoveredCard === card.id ? 'opacity-20' : ''}`}
                      ></div>
                    
                      <div className="flex justify-between items-start mb-4 relative">
                        <div className="p-3 bg-gray-900 rounded-lg relative overflow-hidden group">
                          {card.icon}
                        </div>
                        <div className="text-right">
                          <span className="text-amber-400 font-bold text-lg">{card.price}</span>
                          <p className="text-gray-500 text-xs mt-0.5 flex items-center justify-end">
                            <Clock className="w-3 h-3 mr-1" />
                            {card.duration}
                          </p>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                      <p className="text-gray-400 text-sm">{card.description}</p>
                      <button 
                        className="mt-4 text-amber-400 text-sm font-medium flex items-center group relative overflow-hidden"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(card.route);
                        }}
                      >
                        <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Learn more</span>
                        <ChevronRight className="ml-1 w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300 opacity-60"></span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Activity and Appointments Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activity */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-xl flex items-center">
                    <Clock className="mr-2 text-amber-400 w-5 h-5" />
                    Recent Activity
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    View All
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                      whileHover={{ x: 3, transition: { duration: 0.2 } }}
                      className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-between group cursor-pointer border border-gray-800 hover:border-gray-700 transition-all"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`p-2.5 bg-${activity.color}-500/20 rounded-lg border border-${activity.color}-500/30`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm group-hover:text-amber-400 transition-colors">
                            {activity.action}
                          </p>
                          <div className="flex items-center mt-1">
                            <p className="text-gray-400 text-xs">{activity.time}</p>
                            <span className="mx-2 text-gray-700">•</span>
                            <p className="text-gray-500 text-xs">{activity.details}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs px-3 py-1.5 rounded-full bg-${activity.color}-900/30 text-${activity.color}-400 border border-${activity.color}-500/30`}>
                          {activity.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="space-y-6"
            >
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl relative overflow-hidden">
                <h3 className="font-bold text-lg mb-6 flex items-center">
                  <Star className="mr-2 text-amber-400 w-5 h-5" />
                  Your Progress
                </h3>
                
                <div className="space-y-4">
                  {[
                    { label: 'Services Used', value: 12, max: 16, color: 'amber' },
                    { label: 'Saved Pairs', value: 8, max: 16, color: 'green' },
                    { label: 'Custom Designs', value: 3, max: 12, color: 'purple' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">{stat.label}</span>
                        <span className="font-semibold">{stat.value}/{stat.max}</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden border border-gray-700">
                        <motion.div 
                          className={`h-full bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Loyalty Badge */}
                <motion.div 
                  className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl border border-amber-500/20"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Loyalty Points</p>
                      <p className="text-2xl font-bold">1,250</p>
                      <p className="text-xs text-green-400 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +250 this month
                      </p>
                    </div>
                    <div className="p-3 bg-amber-500/20 rounded-full">
                      <Gift className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Appointments Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl relative overflow-hidden">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Calendar className="mr-2 text-amber-400 w-5 h-5" />
                  Upcoming
                </h3>
                
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                      className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-amber-500/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm group-hover:text-amber-400 transition-colors">
                            {appointment.service}
                          </p>
                          <div className="flex items-center mt-2 space-x-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{appointment.date}</span>
                            <Clock className="w-3 h-3 ml-2" />
                            <span>{appointment.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2 flex items-center">
                            <Bookmark className="w-3 h-3 mr-1" />
                            {appointment.notes}
                          </p>
                        </div>
                        <div className={`p-2 ${appointment.type === 'consultation' ? 'bg-blue-500/20' : 'bg-purple-500/20'} rounded-lg`}>
                          {appointment.type === 'consultation' ? (
                            <User className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Settings className="w-4 h-4 text-purple-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Appointment</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Trending & Promo Section */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {/* Trending Styles */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl relative overflow-hidden">
              <h3 className="font-bold text-lg mb-6 flex items-center">
                <TrendingUp className="mr-2 text-amber-400 w-5 h-5" />
                Trending Now
              </h3>
              
              <div className="space-y-4">
                {trendingStyles.map((style, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium group-hover:text-amber-400 transition-colors">
                        {style.name}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-32 bg-gray-700/50 rounded-full h-2 mr-3 overflow-hidden border border-gray-700">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${style.popularity}%` }}
                            transition={{ duration: 0.8, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">{style.popularity}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-xs text-green-400 font-medium">{style.change}</span>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Special Promo */}
            <motion.div 
              className="col-span-2 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-xl p-8 shadow-2xl relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-semibold">Limited Offer</span>
                    </div>
                    <h3 className="font-bold text-3xl mb-3 text-gray-900">Spring Collection</h3>
                    <p className="text-gray-800 max-w-md leading-relaxed">
                      Schedule a custom design consultation this week and receive 20% off your next repair service.
                    </p>
                  </div>
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gray-900 text-amber-400 py-3 px-8 rounded-xl font-semibold flex items-center space-x-2 shadow-xl"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  
                  <div className="flex items-center space-x-2 text-gray-900 font-semibold bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
                    <Clock className="w-5 h-5" />
                    <span>Ends in 5 days</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
}