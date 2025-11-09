import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search, 
  ShoppingBag, 
  Calendar, 
  MapPin,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  RotateCw,
  Star,
  Award,
  TrendingUp,
  Mail,
  MessageSquare,
  Phone,
  Globe,
  Shield,
  Zap,
  RefreshCw
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function OrderTrackingComponent() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('track');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setRecentOrders([
        {
          id: 'SNK-789456',
          date: 'April 25, 2025',
          product: 'Air Zoom Pegasus 40',
          status: 'delivered',
          statusText: 'Delivered',
          image: '/api/placeholder/100/100',
          progress: 100,
          tracking: 'TRK-123456789',
          lastUpdate: '2 days ago'
        },
        {
          id: 'SNK-654321',
          date: 'April 28, 2025',
          product: 'Ultra Boost 5.0',
          status: 'shipped',
          statusText: 'In Transit',
          image: '/api/placeholder/100/100',
          progress: 60,
          tracking: 'TRK-987654321',
          lastUpdate: '12 hours ago'
        },
        {
          id: 'SNK-123789',
          date: 'April 30, 2025',
          product: 'Classic Chuck Taylor',
          status: 'processing',
          statusText: 'Processing',
          image: '/api/placeholder/100/100',
          progress: 20,
          tracking: 'Processing',
          lastUpdate: '1 hour ago'
        }
      ]);
    }
  }, [isLoggedIn]);

  const trackingStatuses = {
    preparing: "Order Received",
    processing: "Processing",
    shipped: "Shipped",
    intransit: "In Transit",
    outfordelivery: "Out for Delivery",
    delivered: "Delivered",
    delayed: "Delayed"
  };

  const mockTrackingData = {
    orderNumber: "SNK-452789",
    customerName: "Alex Johnson",
    orderDate: "April 20, 2025",
    estimatedDelivery: "May 3, 2025",
    currentStatus: "intransit",
    lastUpdated: "April 29, 2025 - 14:32",
    carrier: "FedEx Express",
    item: {
      name: "Nike Dunk Low Retro",
      color: "Black/White",
      size: "US 10",
      quantity: 1,
      price: "$120.00",
      image: "/api/placeholder/150/150"
    },
    trackingHistory: [
      {
        status: "Order Received",
        location: "Online",
        date: "April 20, 2025",
        time: "09:45 AM",
        completed: true
      },
      {
        status: "Processing",
        location: "Distribution Center, Portland OR",
        date: "April 22, 2025",
        time: "10:30 AM",
        completed: true
      },
      {
        status: "Shipped",
        location: "Portland, OR",
        date: "April 25, 2025",
        time: "02:15 PM",
        completed: true
      },
      {
        status: "In Transit",
        location: "Denver, CO",
        date: "April 28, 2025",
        time: "06:20 AM",
        completed: true
      },
      {
        status: "Out for Delivery",
        location: "Your City",
        date: "Est. May 2, 2025",
        time: "",
        completed: false
      },
      {
        status: "Delivered",
        location: "Your Address",
        date: "Est. May 3, 2025",
        time: "",
        completed: false
      }
    ],
    shippingAddress: {
      street: "123 Sneakerhead Ave",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "United States"
    }
  };

  const stats = [
    { label: 'Orders Tracked', value: '50K+', icon: Package, color: 'blue' },
    { label: 'Avg. Delivery', value: '3.5 days', icon: Clock, color: 'purple' },
    { label: 'Customer Rating', value: '4.9/5', icon: Star, color: 'amber' },
    { label: 'Countries', value: '40+', icon: Globe, color: 'green' }
  ];

  const trackingFeatures = [
    {
      icon: Shield,
      title: 'Secure Tracking',
      description: 'Real-time updates with verified information',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Get notified at every delivery milestone',
      color: 'amber'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: 'Hassle-free return process with tracking',
      color: 'green'
    },
    {
      icon: MessageSquare,
      title: '24/7 Support',
      description: 'Our team is always here to help',
      color: 'purple'
    }
  ];

  const faqData = [
    {
      id: 'faq-1',
      question: 'How do I track my order?',
      answer: 'You can track your order by entering your order number and email in the tracking form. If you have an account, you can also view all your orders in your order history.'
    },
    {
      id: 'faq-2',
      question: 'Why is my order status not updating?',
      answer: 'Order statuses typically update every 24-48 hours. If your status hasn\'t changed in 3+ days, please contact our customer support team for assistance.'
    },
    {
      id: 'faq-3',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 5-7 business days. Express shipping takes 2-3 business days. International shipping can take 7-14 business days, depending on your location.'
    },
    {
      id: 'faq-4',
      question: 'Can I change my shipping address after placing an order?',
      answer: 'Address changes can only be made within 2 hours of placing your order, and only if the order hasn\'t entered the processing stage. Please contact customer service immediately if you need to change your address.'
    },
    {
      id: 'faq-5',
      question: 'What if I\'m not home when my package arrives?',
      answer: 'For most deliveries, the carrier will leave the package at your door. If a signature is required, they will leave a note with instructions for rescheduling delivery or picking up from a local facility.'
    }
  ];

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const calculateProgress = (status) => {
    const statuses = ['preparing', 'processing', 'shipped', 'intransit', 'outfordelivery', 'delivered'];
    const currentIndex = statuses.indexOf(status);
    return ((currentIndex + 1) / statuses.length) * 100;
  };

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    if (!trackingNumber || !email) {
      return;
    }
    
    setIsLoading(true);

    setTimeout(() => {
      setTrackingResult(mockTrackingData);
      setIsLoading(false);
    }, 1500);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <Navbar />
      
      <div className="pt-24 md:pt-28">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
                <Package className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Order Tracking</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Track Your Order
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "280px" }}
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
                Stay updated with real-time tracking information for your orders. Enter your details below to get started.
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Banner */}
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
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Tracking Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {trackingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${feature.color}-500/50 transition-all shadow-lg text-center group`}
                >
                  <div className={`inline-flex p-3 bg-${feature.color}-500/10 rounded-xl mb-4 border border-${feature.color}-500/20 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="font-medium text-white text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Tracking Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mb-6 overflow-x-auto pb-2 scrollbar-hide"
          >
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab('track')}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'track' 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30' 
                    : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Track Order</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => activeTab === 'recent' ? null : handleLogin()}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'recent' 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30' 
                    : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm">Recent Orders</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <AnimatePresence mode="wait">
                {activeTab === 'track' ? (
                  <motion.div
                    key="tracking-form"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    {!trackingResult ? (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
                      >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                          <Search className="mr-2 text-amber-400" size={20} />
                          Enter Tracking Details
                        </h3>

                        <form onSubmit={handleTrackingSubmit} className="space-y-5">
                          <motion.div variants={itemVariants}>
                            <label htmlFor="trackingNumber" className="block text-gray-400 text-sm font-medium mb-2">
                              Order Number or Tracking Number
                            </label>
                            <input
                              type="text"
                              id="trackingNumber"
                              value={trackingNumber}
                              onChange={(e) => setTrackingNumber(e.target.value)}
                              required
                              className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                              placeholder="e.g. SNK-123456 or TRK-789012"
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                              placeholder="The email used for your order"
                            />
                          </motion.div>

                          <motion.div 
                            variants={itemVariants}
                            className="flex justify-end"
                          >
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              type="submit"
                              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 py-3 px-8 rounded-xl font-bold shadow-lg shadow-amber-500/30 flex items-center gap-2 transition-colors"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <RotateCw size={18} className="animate-spin" />
                                  Tracking...
                                </>
                              ) : (
                                <>
                                  <Search size={18} />
                                  Track Order
                                </>
                              )}
                            </motion.button>
                          </motion.div>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        {/* Order Progress Overview */}
                        <motion.div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                          <div className="flex justify-between items-center mb-6">
                            <div>
                              <p className="text-gray-400 text-sm">Order #{trackingResult.orderNumber}</p>
                              <h3 className="text-xl font-bold text-white">
                                {trackingStatuses[trackingResult.currentStatus]}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">Last updated: {trackingResult.lastUpdated}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setTrackingResult(null)}
                              className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                            >
                              <Search size={16} />
                              Track Another
                            </motion.button>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-8">
                            <div className="relative">
                              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-700">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${calculateProgress(trackingResult.currentStatus)}%` }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-amber-500 to-amber-600"
                                ></motion.div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-400">
                                <span>Ordered</span>
                                <span>Processing</span>
                                <span>Shipped</span>
                                <span>Delivered</span>
                              </div>
                            </div>
                          </div>

                          {/* Delivery Info */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {[
                            {
                              icon: Calendar,
                              label: 'Order Date',
                              value: trackingResult.orderDate,
                              color: 'blue'
                            },
                            {
                              icon: Truck,
                              label: 'Carrier',
                              value: trackingResult.carrier,
                              color: 'purple'
                            },
                            {
                              icon: Clock,
                              label: 'Est. Delivery',
                              value: trackingResult.estimatedDelivery,
                              color: 'green'
                            }
                          ].map((info, index) => {
                              const Icon = info.icon;
                              return (
                                <motion.div 
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                                  className="bg-gray-900 p-4 rounded-xl border border-gray-700"
                                >
                                  <div className="flex items-center mb-2">
                                    <div className={`p-2 bg-${info.color}-500/10 rounded-lg border border-${info.color}-500/20 mr-2`}>
                                      <Icon size={16} className={`text-${info.color}-400`} />
                                    </div>
                                    <h4 className="text-white font-medium text-sm">{info.label}</h4>
                                  </div>
                                  <p className="text-gray-400 text-sm">{info.value}</p>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Item Details */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex items-center p-4 bg-gray-900 rounded-xl border border-gray-700"
                          >
                            <div className="flex-shrink-0">
                              <img src={trackingResult.item.image} alt="Product" className="w-16 h-16 object-cover rounded-lg border-2 border-amber-400" />
                            </div>
                            <div className="ml-4 flex-grow">
                              <h4 className="text-white font-medium">{trackingResult.item.name}</h4>
                              <div className="flex text-sm text-gray-400 space-x-4 mt-1">
                                <span>Size: {trackingResult.item.size}</span>
                                <span>Color: {trackingResult.item.color}</span>
                                <span>Qty: {trackingResult.item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-amber-400 font-bold text-lg">{trackingResult.item.price}</p>
                            </div>
                          </motion.div>
                        </motion.div>

                        {/* Tracking Timeline */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl"
                        >
                          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                            <Package className="mr-2 text-amber-400" size={20} />
                            Tracking History
                          </h3>
                          
                          <div className="relative">
                            {trackingResult.trackingHistory.map((step, index) => (
                              <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                                className="mb-6 relative pl-8 last:mb-0"
                              >
                                {/* Timeline line */}
                                {index < trackingResult.trackingHistory.length - 1 && (
                                  <div className="absolute left-3 top-3 h-full w-0.5 bg-gray-700"></div>
                                )}
                                
                                {/* Status circle */}
                                <div className={`absolute left-0 top-0 rounded-full w-6 h-6 flex items-center justify-center border-2 ${
                                  step.completed 
                                    ? "bg-amber-500 border-amber-500 text-gray-900" 
                                    : "bg-gray-800 border-gray-600 text-gray-400"
                                }`}>
                                  {step.completed ? <CheckCircle size={14} /> : <Clock size={14} />}
                                </div>
                                
                                <div>
                                  <h4 className={`font-medium ${step.completed ? "text-white" : "text-gray-400"}`}>{step.status}</h4>
                                  <p className="text-sm text-gray-400">{step.location}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {step.date} {step.time && `• ${step.time}`}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Shipping Address */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                          className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl"
                        >
                          <div className="flex items-center mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20 mr-3">
                              <MapPin size={20} className="text-green-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Shipping Address</h3>
                          </div>
                          
                          <div className="text-gray-300 space-y-1">
                            <p className="font-medium">{trackingResult.customerName}</p>
                            <p>{trackingResult.shippingAddress.street}</p>
                            <p>{trackingResult.shippingAddress.city}, {trackingResult.shippingAddress.state} {trackingResult.shippingAddress.zip}</p>
                            <p>{trackingResult.shippingAddress.country}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="recent-orders"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <ShoppingBag className="mr-2 text-amber-400" size={20} />
                      Your Recent Orders
                    </h3>
                    
                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                          <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                            whileHover={{ y: -3 }}
                            className="bg-gray-900 rounded-xl p-4 border border-gray-700 hover:border-amber-500/50 transition-all cursor-pointer"
                          >
                            <div className="flex items-center mb-3">
                              <div className="flex-shrink-0">
                                <img src={order.image} alt={order.product} className="w-16 h-16 object-cover rounded-lg border-2 border-amber-400" />
                              </div>
                              <div className="ml-4 flex-grow">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium text-white">{order.product}</h4>
                                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    order.status === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                    order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  }`}>
                                    {order.statusText}
                                  </div>
                                </div>
                                <div className="mt-1 text-sm text-gray-400">
                                  <span>Order #{order.id}</span>
                                  <span className="mx-2">•</span>
                                  <span>{order.date}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${order.progress}%` }}
                                  transition={{ duration: 1 }}
                                  className={`h-full rounded-full ${
                                    order.status === 'delivered' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                    order.status === 'shipped' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                    'bg-gradient-to-r from-amber-500 to-amber-600'
                                  }`}
                                ></motion.div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500">Last update: {order.lastUpdate}</span>
                              <div className="flex items-center text-amber-400 hover:text-amber-300 transition-colors">
                                <span>Track Order</span>
                                <ArrowRight size={16} className="ml-1" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-4 border border-gray-700"
                        >
                          <ShoppingBag size={32} className="text-gray-500" />
                        </motion.div>
                        <h4 className="text-lg font-medium text-white mb-2">No Recent Orders</h4>
                        <p className="text-gray-400 mb-6">When you place orders, they will appear here for easy tracking.</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-colors"
                        >
                          Start Shopping
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-24 space-y-6">
                {/* FAQ Section */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <HelpCircle className="mr-2 text-amber-400" size={20} />
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-3">
                    {faqData.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                      >
                        <button 
                          onClick={() => toggleFaq(faq.id)}
                          className={`flex justify-between items-center w-full text-left p-4 transition-colors ${
                            openFaqId === faq.id ? "bg-gray-900" : "hover:bg-gray-900"
                          }`}
                        >
                          <span className="font-medium text-white text-sm pr-2">{faq.question}</span>
                          <ChevronDown 
                            size={18} 
                            className={`text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                              openFaqId === faq.id ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {openFaqId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-400 text-sm p-4 pt-0 bg-gray-900 border-t border-gray-700">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help & Support */}
                <div className="pt-6 border-t border-gray-700">
                  <div className="text-center mb-4">
                    <div className="inline-flex p-3 bg-amber-500/10 rounded-xl mb-3 border border-amber-500/20">
                      <MessageSquare className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
                    <p className="text-gray-400 text-sm">
                      Our support team is available 24/7
                    </p>
                  </div>

                  <div className="space-y-3">
                  {[
                    {
                      icon: Mail,
                      label: 'Email Support',
                      value: 'support@solecraft.com',
                      color: 'blue'
                    },
                    {
                      icon: Phone,
                      label: 'Call Us',
                      value: '+91-7705481060',
                      color: 'green'
                    },
                    {
                      icon: MessageSquare,
                      label: 'Live Chat',
                      value: 'Available now',
                      color: 'purple'
                    }
                  ].map((contact, index) => {
                      const Icon = contact.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ x: 3 }}
                          className={`flex items-center gap-3 p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-${contact.color}-500/50 transition-all cursor-pointer`}
                        >
                          <div className={`p-2 bg-${contact.color}-500/10 rounded-lg border border-${contact.color}-500/20`}>
                            <Icon className={`w-4 h-4 text-${contact.color}-400`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium">{contact.label}</p>
                            <p className="text-gray-500 text-xs truncate">{contact.value}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Help Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
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
                  <AlertCircle className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Need Assistance?</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Having Trouble with Your Order?
                </h3>
                <p className="text-gray-800 text-lg">
                  Contact our support team and we'll help you track your package.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gray-900 text-amber-400 px-6 py-3 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-gray-800 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Live Chat</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}