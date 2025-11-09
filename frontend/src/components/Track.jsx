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
  RotateCw
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
        <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-40">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <div className="inline-block mb-5">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-800 p-4 rounded-full"
            >
              <Package size={40} className="text-green-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
            Track Your Order
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-1 left-0 h-1 bg-green-500 rounded-full"
            ></motion.div>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Keep tabs on your sneakers from order to delivery. Enter your details below to get real-time tracking information.
          </motion.p>
        </motion.div>

        {/* Tracking Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-gray-800 rounded-lg p-1">
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'track' ? "" : "#374151" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('track')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'track' 
                  ? "bg-green-500 text-gray-900" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="flex items-center">
                <Search size={18} className="mr-2" />
                Track Order
              </div>
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'recent' ? "" : "#374151" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => activeTab === 'recent' ? null : handleLogin()}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'recent' 
                  ? "bg-green-500 text-gray-900" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                Recent Orders
              </div>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
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
                      className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg relative overflow-hidden"
                    >
                      {/* Decorative elements */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.03 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-green-500"
                      />
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.03 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-green-500"
                      />

                      <form onSubmit={handleTrackingSubmit} className="relative z-10 space-y-5">
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
                            className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all duration-200"
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
                            className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all duration-200"
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
                            className="bg-green-500 text-gray-900 py-3 px-8 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 shadow-lg flex items-center"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <RotateCw size={18} className="mr-2 animate-spin" />
                                Tracking...
                              </>
                            ) : (
                              <>
                                <Search size={18} className="mr-2" />
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
                      <motion.div 
                        className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                      >
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
                            className="text-sm text-green-400 hover:text-green-500 flex items-center"
                          >
                            <Search size={16} className="mr-1" />
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
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              ></motion.div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>Order Placed</span>
                              <span>Processing</span>
                              <span>Shipped</span>
                              <span>Delivered</span>
                            </div>
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="bg-gray-750 p-4 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-center mb-2">
                              <Calendar size={16} className="text-green-400 mr-2" />
                              <h4 className="text-white font-medium">Order Date</h4>
                            </div>
                            <p className="text-gray-400 text-sm">{trackingResult.orderDate}</p>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="bg-gray-750 p-4 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-center mb-2">
                              <Truck size={16} className="text-green-400 mr-2" />
                              <h4 className="text-white font-medium">Carrier</h4>
                            </div>
                            <p className="text-gray-400 text-sm">{trackingResult.carrier}</p>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="bg-gray-750 p-4 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-center mb-2">
                              <Clock size={16} className="text-green-400 mr-2" />
                              <h4 className="text-white font-medium">Estimated Delivery</h4>
                            </div>
                            <p className="text-gray-400 text-sm">{trackingResult.estimatedDelivery}</p>
                          </motion.div>
                        </div>

                        {/* Item Details */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="flex items-center p-4 bg-gray-750 rounded-lg border border-gray-700"
                        >
                          <div className="flex-shrink-0">
                            <img src={trackingResult.item.image} alt="Product" className="w-16 h-16 object-cover rounded-md" />
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
                            <p className="text-white font-medium">{trackingResult.item.price}</p>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Tracking Timeline */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                      >
                        <h3 className="text-lg font-bold text-white mb-6">Tracking History</h3>
                        
                        <div className="relative">
                          {trackingResult.trackingHistory.map((step, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                              className="mb-6 relative pl-8"
                            >
                              {/* Timeline line */}
                              {index < trackingResult.trackingHistory.length - 1 && (
                                <div className="absolute left-3 top-3 h-full w-0.5 bg-gray-700"></div>
                              )}
                              
                              {/* Status circle */}
                              <div className={`absolute left-0 top-0 rounded-full w-6 h-6 flex items-center justify-center ${
                                step.completed 
                                  ? "bg-green-500 text-gray-900" 
                                  : "bg-gray-700 text-gray-400"
                              }`}>
                                {step.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
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
                        className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                      >
                        <div className="flex items-center mb-4">
                          <MapPin size={20} className="text-green-400 mr-2" />
                          <h3 className="text-lg font-bold text-white">Shipping Address</h3>
                        </div>
                        
                        <div className="text-gray-400">
                          <p>{trackingResult.customerName}</p>
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
                  className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Your Recent Orders</h3>
                  
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                          className="bg-gray-750 rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-colors duration-300 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <img src={order.image} alt={order.product} className="w-16 h-16 object-cover rounded-md" />
                            </div>
                            <div className="ml-4 flex-grow">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-white">{order.product}</h4>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                                  order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                                  'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {order.statusText}
                                </div>
                              </div>
                              <div className="mt-1 text-sm text-gray-400">
                                <span>Order #{order.id}</span>
                                <span className="mx-2">•</span>
                                <span>{order.date}</span>
                              </div>
                              <div className="mt-2">
                                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${order.progress}%` }}
                                    transition={{ duration: 1 }}
                                    className={`h-full rounded-full ${
                                      order.status === 'delivered' ? 'bg-green-500' :
                                      order.status === 'shipped' ? 'bg-blue-500' :
                                      'bg-yellow-500'
                                    }`}
                                  ></motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-between items-center text-sm">
                            <span className="text-gray-500">Last update: {order.lastUpdate}</span>
                            <div className="flex items-center text-green-400 hover:text-green-300 transition-colors duration-200">
                              <span>Track Order</span>
                              <ArrowRight size={16} className="ml-1" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gray-750 rounded-full mb-4"
                      >
                        <ShoppingBag size={32} className="text-gray-500" />
                      </motion.div>
                      <h4 className="text-lg font-medium text-white mb-2">No Recent Orders</h4>
                      <p className="text-gray-400">When you place orders, they will appear here for easy tracking.</p>
                    </div>
                  )}
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="lg:col-span-1"
          >
            {/* Help & FAQ Section */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg mb-6">
              <div className="flex items-center mb-6">
                <HelpCircle size={20} className="text-green-400 mr-2" />
                <h3 className="text-lg font-bold text-white">Help & FAQ</h3>
              </div>

              <div className="space-y-3">
                {faqData.map((faq, index) => (
                  <motion.div 
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                    className="border-b border-gray-700 pb-3 last:border-0 last:pb-0"
                  >
                    <button 
                      onClick={() => toggleFaq(faq.id)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-400 transition-transform duration-300 ${
                          openFaqId === faq.id ? 'transform rotate-180' : ''
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
                          <p className="text-gray-400 text-sm pt-3">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Truck size={20} className="text-green-400 mr-2" />
                <h3 className="text-lg font-bold text-white">Shipping Info</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Standard Shipping</h4>
                  <p className="text-sm text-gray-400">5-7 business days</p>
                  <p className="text-sm text-gray-400">Free for orders over $100</p>
                </div>
                
                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Express Shipping</h4>
                  <p className="text-sm text-gray-400">2-3 business days</p>
                  <p className="text-sm text-gray-400">$15 flat rate</p>
                </div>

                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-400 mb-3">Having issues with your order?</p>
                  <button className="flex items-center text-green-400 hover:text-green-300 transition-colors duration-200 text-sm">
                    <AlertCircle size={16} className="mr-1" />
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}