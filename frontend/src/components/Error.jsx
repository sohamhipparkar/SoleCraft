import { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Home, 
  Search,
  ArrowLeft,
  MessageCircle,
  ShoppingBag,
  AlertCircle,
  Compass,
  Map,
  Phone,
  Mail,
  TrendingUp,
  Star,
  Zap,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Users,
  Tag,
  Footprints
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
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

export default function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [attemptedPath, setAttemptedPath] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Creative messages that rotate
  const creativeMessages = [
    {
      emoji: "👟",
      text: "Looks like this page walked off without us!",
      subtext: "Don't worry, we'll help you find your way."
    },
    {
      emoji: "🔍",
      text: "We've searched high and low...",
      subtext: "But this page seems to have tied its laces and run away."
    },
    {
      emoji: "🏃",
      text: "This page is moving faster than our bestsellers!",
      subtext: "Let's get you back on track to find what you need."
    },
    {
      emoji: "🎯",
      text: "You've stepped into uncharted territory!",
      subtext: "No worries - we'll guide you back to familiar ground."
    },
    {
      emoji: "📦",
      text: "This page is out of stock... permanently!",
      subtext: "But we have plenty of other great options for you."
    },
    {
      emoji: "🗺️",
      text: "Wrong turn at the sneaker junction!",
      subtext: "Let's navigate you back to where you want to be."
    },
    {
      emoji: "✨",
      text: "This page vanished like limited edition drops!",
      subtext: "But don't worry, we've got plenty more in stock."
    },
    {
      emoji: "🎨",
      text: "Even the best designs have their off days...",
      subtext: "This page is taking a creativity break."
    }
  ];

  useEffect(() => {
    // Random initial message
    setCurrentMessageIndex(Math.floor(Math.random() * creativeMessages.length));
    
    // Rotate messages every 5 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % creativeMessages.length);
    }, 5000);

    setAttemptedPath(location.pathname);
    
    // Generate smart suggestions based on the attempted path
    const path = location.pathname.toLowerCase();
    const smartSuggestions = [];

    if (path.includes('product') || path.includes('shoe') || path.includes('sneaker')) {
      smartSuggestions.push({ text: 'Browse All Products', path: '/shop', icon: ShoppingBag });
    }
    if (path.includes('cart') || path.includes('checkout')) {
      smartSuggestions.push({ text: 'View Your Cart', path: '/cart', icon: ShoppingBag });
    }
    if (path.includes('account') || path.includes('profile') || path.includes('login')) {
      smartSuggestions.push({ text: 'Go to Login', path: '/login', icon: Users });
    }
    if (path.includes('contact') || path.includes('help') || path.includes('support')) {
      smartSuggestions.push({ text: 'Contact Support', path: '/contact', icon: MessageCircle });
    }
    if (path.includes('about') || path.includes('info')) {
      smartSuggestions.push({ text: 'About Us', path: '/about', icon: BookOpen });
    }

    // Always add these default suggestions
    if (smartSuggestions.length === 0) {
      smartSuggestions.push(
        { text: 'Shop New Arrivals', path: '/shop?filter=new', icon: Tag },
        { text: 'Browse All Products', path: '/shop', icon: ShoppingBag }
      );
    }

    setSuggestions(smartSuggestions);
    
    return () => {
      clearInterval(messageInterval);
    };
  }, [location]);

  const helpfulTips = [
    {
      icon: Search,
      title: "Search for what you need",
      description: "Use the search bar below to find products, brands, or categories"
    },
    {
      icon: Home,
      title: "Start from home",
      description: "Return to our homepage and navigate from there"
    },
    {
      icon: Map,
      title: "Check the site map",
      description: "View all available pages and navigate directly to them"
    },
    {
      icon: MessageCircle,
      title: "Ask for help",
      description: "Our support team is ready to assist you"
    }
  ];

  const quickLinks = [
    { 
      name: 'Home', 
      path: '/', 
      icon: Home, 
      color: 'blue',
      description: 'Return to homepage'
    },
    { 
      name: 'Shop All', 
      path: '/shop', 
      icon: ShoppingBag, 
      color: 'purple',
      description: 'Browse products'
    },
    { 
      name: 'New Arrivals', 
      path: '/shop?filter=new', 
      icon: Star, 
      color: 'amber',
      description: 'Latest releases'
    },
    { 
      name: 'Contact Us', 
      path: '/contact', 
      icon: Mail, 
      color: 'green',
      description: 'Get support'
    }
  ];

  const popularCategories = [
    { name: 'Men\'s Shoes', path: '/shop?category=men', icon: ShoppingBag },
    { name: 'Women\'s Shoes', path: '/shop?category=women', icon: ShoppingBag },
    { name: 'Sale Items', path: '/shop?filter=sale', icon: Tag },
    { name: 'Help Center', path: '/contact', icon: HelpCircle }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const currentMessage = creativeMessages[currentMessageIndex];

  return (
    <div 
      className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col"
    >
      <Navbar />

      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Error Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 pt-24 md:pt-28 pb-16 relative z-10">
        <motion.div 
          className="max-w-6xl w-full mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Main Error Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl border border-gray-700 relative overflow-hidden mb-6"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5" />
            
            <div className="relative z-10">
              {/* Error Badge */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm font-semibold">Page Not Found</span>
                </div>
              </div>

              {/* Creative Rotating Message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-6"
                >
                  <div className="mb-3">
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1
                      }}
                      className="text-6xl md:text-7xl inline-block"
                    >
                      {currentMessage.emoji}
                    </motion.span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {currentMessage.text}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    {currentMessage.subtext}
                  </p>
                  
                  {/* Rotation indicator dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {creativeMessages.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentMessageIndex 
                            ? 'bg-amber-500 w-8' 
                            : 'bg-gray-600'
                        }`}
                        animate={{
                          scale: index === currentMessageIndex ? 1.2 : 1
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Error Code */}
              <div className="text-center mb-6">
                <motion.h1 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.2
                  }}
                  className="text-7xl md:text-8xl font-bold mb-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent"
                >
                  404
                </motion.h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-4 rounded-full"
                />
              </div>

              {/* Friendly Message */}
              <div className="text-center mb-6">
                <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-2">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                {attemptedPath && attemptedPath !== '/' && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-500 text-sm"
                  >
                    You tried to access: <code className="text-amber-400 bg-gray-900 px-2 py-1 rounded">{attemptedPath}</code>
                  </motion.p>
                )}
              </div>

              {/* Fun Footprints Trail */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex justify-center gap-3 mb-6"
              >
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ delay: 0.7 + (i * 0.1) }}
                  >
                    <Footprints 
                      className="w-6 h-6 text-amber-500" 
                      style={{ 
                        transform: `rotate(${i % 2 === 0 ? '20deg' : '-20deg'})` 
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Smart Suggestions */}
              {suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <p className="text-blue-300 font-semibold text-sm">Were you looking for:</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(suggestion.path)}
                          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 border border-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        >
                          <Icon className="w-4 h-4 text-amber-400" />
                          <span>{suggestion.text}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Search Bar - More Prominent */}
              <motion.form 
                onSubmit={handleSearch}
                variants={itemVariants}
                className="mb-6"
              >
                <label className="block text-sm font-medium text-gray-400 mb-2 text-center">
                  Search for products, brands, or categories
                </label>
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Try 'Nike Air Max', 'running shoes', 'men's sneakers'..." 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 pl-12 pr-12 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 hover:bg-amber-400 text-gray-900 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Search
                  </button>
                </div>
              </motion.form>

              {/* Primary Action Buttons */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-amber-500/20"
                  onClick={() => navigate('/')}
                >
                  <Home className="mr-2 w-5 h-5" />
                  Go to Homepage
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-900 hover:bg-gray-700 border border-gray-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all"
                  onClick={() => navigate('/shop')}
                >
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  Browse Products
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <h3 className="text-lg font-bold text-white mb-3 text-center">Quick Navigation</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(link.path)}
                    className={`bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-${link.color}-500/50 rounded-xl p-4 transition-all text-left group`}
                  >
                    <div className={`inline-flex p-2.5 bg-${link.color}-500/10 rounded-lg mb-2 border border-${link.color}-500/20 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 text-${link.color}-400`} />
                    </div>
                    <p className="text-white font-semibold text-sm mb-0.5">{link.name}</p>
                    <p className="text-gray-500 text-xs">{link.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Popular Categories */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <TrendingUp className="mr-2 text-amber-400" size={20} />
              Popular Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(category.path)}
                    className="bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 transition-all text-center group"
                  >
                    <Icon className="w-5 h-5 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white text-sm font-medium">{category.name}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Helpful Tips */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <HelpCircle className="mr-2 text-amber-400" size={20} />
              How Can We Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {helpfulTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gray-900 rounded-lg p-4"
                  >
                    <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 flex-shrink-0">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{tip.title}</h4>
                      <p className="text-gray-400 text-xs">{tip.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Additional Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              onClick={handleGoBack}
            >
              <ArrowLeft className="mr-1.5 w-4 h-4 text-amber-400" />
              <span>Go Back</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              onClick={() => navigate('/contact')}
            >
              <MessageCircle className="mr-1.5 w-4 h-4 text-amber-400" />
              <span>Contact Support</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              onClick={() => navigate('/about')}
            >
              <BookOpen className="mr-1.5 w-4 h-4 text-amber-400" />
              <span>About Us</span>
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-center bg-gray-800 rounded-xl p-5 border border-gray-700"
          >
            <p className="text-gray-400 text-sm mb-3 font-medium">Need immediate assistance?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a 
                href="mailto:support@solecraft.com" 
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                <Mail className="w-4 h-4" />
                support@solecraft.com
              </a>
              <span className="text-gray-700">|</span>
              <a 
                href="tel:+91-9168495030" 
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                +91-9168495030
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}