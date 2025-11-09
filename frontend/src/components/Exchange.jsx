import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowLeftRight, Heart, ShoppingBag, Star, ChevronRight, RefreshCw, Clock, Check, X, Filter, Search, TrendingUp, Users, Package, Shield, Zap } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AirDriftRunner from '../assets/AirDriftRunner.png';
import UltraboostElite from '../assets/UltraboostElite.png';
import ClassicSuede from '../assets/ClassicSuede.png';
import CloudWalker from '../assets/CloudWalker.webp';
import NeonPulse from '../assets/NeonPulse.jpg';
import TechRunner from '../assets/TechRunner.jpg';
import DynamicWave from '../assets/DynamicWave.png';
import StreetZoom from '../assets/StreetZoom.jpg';
import CosmicHype from '../assets/CosmicHype.jpg';
import FutureGliders from '../assets/FutureGliders.jpg';

const shoesData = [
  {
    id: 1,
    name: "Air Drift Runner",
    brand: "Nike",
    price: 129.99,
    colors: ["bg-red-500", "bg-blue-500", "bg-black"],
    rating: 4.8,
    image: AirDriftRunner,
    size: "US 10",
    condition: "Like New"
  },
  {
    id: 2,
    name: "Ultra Boost Elite",
    brand: "Adidas",
    price: 159.99,
    colors: ["bg-gray-800", "bg-green-500", "bg-white"],
    rating: 4.6,
    image: UltraboostElite,
    size: "US 9.5",
    condition: "Excellent"
  },
  {
    id: 3,
    name: "Classic Suede",
    brand: "Puma",
    price: 89.99,
    colors: ["bg-purple-500", "bg-yellow-500", "bg-blue-800"],
    rating: 4.4,
    image: ClassicSuede,
    size: "US 11",
    condition: "Good"
  },
  {
    id: 4,
    name: "Cloud Walker",
    brand: "New Balance",
    price: 119.99,
    colors: ["bg-teal-500", "bg-gray-500", "bg-orange-500"],
    rating: 4.7,
    image: CloudWalker,
    size: "US 10.5",
    condition: "Like New"
  },
  {
    id: 5,
    name: "Neon Pulse",
    brand: "Vans",
    price: 89.99,
    colors: ["bg-yellow-400", "bg-pink-500", "bg-black"],
    rating: 4.5,
    image: NeonPulse,
    size: "US 9",
    condition: "Excellent"
  },
  {
    id: 6,
    name: "Tech Runner",
    brand: "Under Armour",
    price: 139.99,
    colors: ["bg-blue-700", "bg-gray-400", "bg-white"],
    rating: 4.6,
    image: TechRunner,
    size: "US 10",
    condition: "Like New"
  },
  {
    id: 7,
    name: "Dynamic Wave",
    brand: "Nike",
    price: 159.99,
    colors: ["bg-indigo-600", "bg-teal-400", "bg-gray-700"],
    rating: 4.8,
    image: DynamicWave,
    size: "US 11.5",
    condition: "Excellent"
  },
  {
    id: 8,
    name: "Street Zoom",
    brand: "Reebok",
    price: 99.99,
    colors: ["bg-cyan-500", "bg-black", "bg-white"],
    rating: 4.3,
    image: StreetZoom,
    size: "US 10",
    condition: "Good"
  },
  {
    id: 9,
    name: "Cosmic Hype",
    brand: "Adidas",
    price: 129.99,
    colors: ["bg-pink-600", "bg-purple-500", "bg-black"],
    rating: 4.7,
    image: CosmicHype,
    size: "US 9.5",
    condition: "Like New"
  },
  {
    id: 10,
    name: "Future Gliders",
    brand: "Puma",
    price: 119.99,
    colors: ["bg-lime-500", "bg-gray-600", "bg-white"],
    rating: 4.6,
    image: FutureGliders,
    size: "US 10.5",
    condition: "Excellent"
  }
];

export default function ShoeExchangeComponent() {
  const [selectedShoes, setSelectedShoes] = useState([]);
  const [availableShoes, setAvailableShoes] = useState(shoesData);
  const [isExchanging, setIsExchanging] = useState(false);
  const [exchangeSuccess, setExchangeSuccess] = useState(false);
  const [hoveredShoe, setHoveredShoe] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState([]);
  
  const exchangeRef = useRef(null);
  const successAnimationControls = useAnimation();
  const statsControls = useAnimation();
 
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (scrollY > 300) {
      statsControls.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 }
      }));
    }
  }, [scrollY, statsControls]);

  const selectShoe = (shoe) => {
    if (selectedShoes.length < 2 && !selectedShoes.find(s => s.id === shoe.id)) {
      setSelectedShoes(prev => [...prev, shoe]);
      setAvailableShoes(prev => prev.filter(s => s.id !== shoe.id));
    }
  };

  const removeSelected = (shoe) => {
    setSelectedShoes(prev => prev.filter(s => s.id !== shoe.id));
    setAvailableShoes(prev => [...prev, shoe].sort((a, b) => a.id - b.id));
  };

  const toggleWishlist = (shoeId) => {
    setWishlist(prev => 
      prev.includes(shoeId) 
        ? prev.filter(id => id !== shoeId)
        : [...prev, shoeId]
    );
  };

  const handleExchange = async () => {
    if (selectedShoes.length !== 2) return;
    
    setIsExchanging(true);

    await successAnimationControls.start({
      opacity: 1,
      scale: [1, 1.1, 1],
      transition: { duration: 1.5 }
    });
    
    setExchangeSuccess(true);

    await successAnimationControls.start({
      y: [0, -10, 0],
      transition: { 
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    });

    setTimeout(() => {
      setSelectedShoes([]);
      setAvailableShoes(shoesData);
      setIsExchanging(false);
      setExchangeSuccess(false);
    }, 2000);
  };

  const brands = ['all', ...new Set(shoesData.map(shoe => shoe.brand))];
  
  const filteredShoes = availableShoes
    .filter(shoe => 
      shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedBrand === 'all' || shoe.brand === selectedBrand)
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

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
        type: 'tween',
        duration: 0.3,
        ease: "easeOut"
      }
    }
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                  Shoe Exchange
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "250px" }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-2"
                  />
                </h2>
                <p className="text-gray-400 text-lg mt-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-amber-400" />
                  Join our community of sneaker enthusiasts
                </p>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search shoes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-gray-700 text-white placeholder-gray-500 transition-all"
                  />
                </div>
                
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-gray-700 text-white cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Brand Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {brands.map((brand) => (
                <motion.button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedBrand === brand
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900'
                      : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                  }`}
                >
                  {brand === 'all' ? 'All Brands' : brand}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Enhanced Exchange Section */}
          <motion.div 
            ref={exchangeRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 shadow-2xl border border-gray-700 relative overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-amber-500 opacity-5 blur-3xl"
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0]
                }}
                transition={{ 
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-amber-500 opacity-5 blur-3xl"
              />
            </div>
            
            <div className="relative z-10">
              {/* Header with Progress Indicator */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center mb-2">
                    <RefreshCw className="mr-3 text-amber-400 w-6 h-6" />
                    Exchange Shoes
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className={`${selectedShoes.length >= 1 ? 'text-amber-400' : ''}`}>
                      Step 1: Select your shoe
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className={`${selectedShoes.length >= 2 ? 'text-amber-400' : ''}`}>
                      Step 2: Choose exchange
                    </span>
                  </div>
                </div>
                
                <motion.button 
                  onClick={handleExchange}
                  disabled={selectedShoes.length !== 2 || isExchanging}
                  whileHover={selectedShoes.length === 2 && !isExchanging ? { scale: 1.02 } : {}}
                  whileTap={selectedShoes.length === 2 && !isExchanging ? { scale: 0.98 } : {}}
                  className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 ${
                    selectedShoes.length === 2 && !isExchanging
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 shadow-lg shadow-amber-500/30" 
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isExchanging ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeftRight size={20} />
                      <span>Complete Exchange</span>
                    </>
                  )}
                </motion.button>
              </div>
              
              {/* Exchange Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Left Selection */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: selectedShoes[0] ? 1 : 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold z-10">
                    Your Shoe
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {selectedShoes[0] ? (
                      <motion.div 
                        key="selected-left"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 p-5 rounded-2xl border-2 border-amber-500/50 shadow-xl relative group"
                      >
                        <div className="relative rounded-xl overflow-hidden mb-4">
                          <img 
                            src={selectedShoes[0].image} 
                            alt={selectedShoes[0].name}
                            className="w-full h-56 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                          
                          <motion.button 
                            onClick={() => removeSelected(selectedShoes[0])}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors border border-gray-700"
                          >
                            <X className="w-5 h-5 text-white" />
                          </motion.button>

                          <div className="absolute bottom-3 left-3 flex gap-2">
                            <span className="bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-gray-700">
                              {selectedShoes[0].size}
                            </span>
                            <span className="bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-green-400 border border-green-500/30">
                              {selectedShoes[0].condition}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-xl text-white mb-1">{selectedShoes[0].name}</h4>
                          <p className="text-sm text-gray-400 mb-3">{selectedShoes[0].brand}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-medium">{selectedShoes[0].rating}</span>
                            </div>
                            <span className="text-lg font-bold text-amber-400">${selectedShoes[0].price}</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="empty-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-2 border-dashed border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center text-gray-500 h-[360px] hover:border-amber-500/50 transition-all duration-300 cursor-pointer bg-gray-900/30"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ShoppingBag className="w-16 h-16 mb-4 text-gray-600" />
                        </motion.div>
                        <p className="text-center font-medium">Select your shoe from below</p>
                        <p className="text-sm text-gray-600 mt-2">Click on any available shoe</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Right Selection */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: selectedShoes[1] ? 1 : 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
                    Exchange For
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {selectedShoes[1] ? (
                      <motion.div 
                        key="selected-right"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 p-5 rounded-2xl border-2 border-purple-500/50 shadow-xl relative group"
                      >
                        <div className="relative rounded-xl overflow-hidden mb-4">
                          <img 
                            src={selectedShoes[1].image} 
                            alt={selectedShoes[1].name}
                            className="w-full h-56 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                          
                          <motion.button 
                            onClick={() => removeSelected(selectedShoes[1])}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors border border-gray-700"
                          >
                            <X className="w-5 h-5 text-white" />
                          </motion.button>

                          <div className="absolute bottom-3 left-3 flex gap-2">
                            <span className="bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-gray-700">
                              {selectedShoes[1].size}
                            </span>
                            <span className="bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-green-400 border border-green-500/30">
                              {selectedShoes[1].condition}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-xl text-white mb-1">{selectedShoes[1].name}</h4>
                          <p className="text-sm text-gray-400 mb-3">{selectedShoes[1].brand}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-medium">{selectedShoes[1].rating}</span>
                            </div>
                            <span className="text-lg font-bold text-purple-400">${selectedShoes[1].price}</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="empty-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-2 border-dashed border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center text-gray-500 h-[360px] hover:border-purple-500/50 transition-all duration-300 cursor-pointer bg-gray-900/30"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                          <Package className="w-16 h-16 mb-4 text-gray-600" />
                        </motion.div>
                        <p className="text-center font-medium">Select shoe to exchange</p>
                        <p className="text-sm text-gray-600 mt-2">Choose from available options</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              
              {/* Exchange Value Display */}
              {selectedShoes.length === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-gray-400">Exchange Value Match</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-amber-400 font-bold">${selectedShoes[0].price}</span>
                      <ArrowLeftRight className="w-4 h-4 text-gray-500" />
                      <span className="text-purple-400 font-bold">${selectedShoes[1].price}</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Success overlay */}
              <AnimatePresence>
                {exchangeSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-gray-900/95 backdrop-blur-md z-30 rounded-2xl"
                  >
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-12 h-12 text-gray-900" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">Exchange Successful!</h3>
                      <p className="text-gray-400">Your shoes have been exchanged</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Enhanced Stats Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 rounded-2xl p-6 mb-8 shadow-xl border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { label: 'Total Exchanges', value: '2,547', icon: RefreshCw, color: 'amber' },
                { label: 'Active Users', value: '1,234', icon: Users, color: 'purple' },
                { label: 'Avg Rating', value: '4.7', icon: Star,  color: 'yellow' },
                { label: 'Processing Time', value: '24h', icon: Clock,  color: 'green' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    custom={index}
                    animate={statsControls}
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ y: -3 }}
                    className="text-center"
                  >
                    <div className={`inline-flex p-3 bg-${stat.color}-500/10 rounded-xl mb-3 border border-${stat.color}-500/20`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <div className="flex items-center justify-center text-green-400 text-xs">
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Available Shoes Section */}
          <motion.div 
            className="mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold flex items-center">
                  Available Shoes
                  <span className="ml-3 text-sm font-normal text-gray-400">
                    ({filteredShoes.length} items)
                  </span>
                </h3>
                <p className="text-gray-500 text-sm mt-1">Click to select for exchange</p>
              </div>
              <motion.button 
                whileHover={{ x: 3 }}
                className="text-amber-400 flex items-center text-sm font-medium"
              >
                View all <ChevronRight className="ml-1 w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredShoes.map((shoe) => (
                  <motion.div
                    key={shoe.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredShoe(shoe.id)}
                    onHoverEnd={() => setHoveredShoe(null)}
                    variants={itemVariants}
                    className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg group"
                    onClick={() => selectShoe(shoe)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={shoe.image} 
                        alt={shoe.name} 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                      
                      {/* Wishlist Button */}
                      <motion.button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(shoe.id);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm rounded-full p-2 z-10 border border-gray-700"
                      >
                        <Heart 
                          className={`w-5 h-5 transition-colors ${
                            wishlist.includes(shoe.id) 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </motion.button>

                      {/* Quick Info Badges */}
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium border border-gray-700">
                          {shoe.size}
                        </span>
                        <span className="bg-green-500/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-green-400 border border-green-500/30">
                          {shoe.condition}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                            {shoe.name}
                          </h4>
                          <p className="text-sm text-gray-400">{shoe.brand}</p>
                        </div>
                        <p className="font-bold text-amber-400 text-lg">${shoe.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-1">
                          {shoe.colors.map((color, i) => (
                            <motion.div 
                              key={i} 
                              whileHover={{ scale: 1.3 }}
                              className={`w-5 h-5 rounded-full ${color} border-2 border-gray-700 cursor-pointer`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium">{shoe.rating}</span>
                        </div>
                      </div>
                      
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 bg-gray-900 text-amber-400 border border-gray-700 hover:border-amber-500 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 group"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectShoe(shoe);
                        }}
                      >
                        <span>Select for Exchange</span>
                        <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Enhanced Features Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
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
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Zap className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Premium Feature</span>
                </div>
                <h3 className="font-bold text-3xl mb-3 text-gray-900">
                  Join Exchange Plus
                </h3>
                <p className="text-gray-800 leading-relaxed max-w-2xl">
                  Get priority exchanges, exclusive access to limited editions, and earn 2x loyalty points on every transaction.
                </p>
                <ul className="mt-4 space-y-2 text-gray-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Unlimited exchanges per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Free authentication service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>24/7 priority support</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gray-900 text-amber-400 py-3 px-8 rounded-xl font-semibold flex items-center gap-2 shadow-xl whitespace-nowrap"
                >
                  <span>Upgrade Now</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
                <p className="text-center text-gray-800 text-sm">
                  Starting at $9.99/month
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Recently Exchanged Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mt-12"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-xl font-bold flex items-center mb-6"
            >
              <Clock className="mr-2 text-amber-400" />
              Recently Exchanged
            </motion.h3>
            
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Exchange History Cards */}
              {[1, 2, 3, 4].map((index) => (
                <motion.div
                  key={`exchange-${index}`}
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-md"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-amber-400 text-sm font-medium">Exchange #{index + 20}</span>
                      <span className="text-gray-400 text-xs">1 day ago</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="w-1/2 pr-2 border-r border-gray-700">
                        <div className="relative overflow-hidden rounded-md h-20">
                          <img 
                            src={shoesData[index].image} 
                            alt={shoesData[index].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm mt-2 font-medium text-white truncate">{shoesData[index].name}</p>
                      </div>
                      
                      <div className="flex items-center justify-center w-1/6">
                        <motion.div 
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ArrowLeftRight className="text-amber-400 w-4 h-4" />
                        </motion.div>
                      </div>
                      
                      <div className="w-1/2 pl-2">
                        <div className="relative overflow-hidden rounded-md h-20">
                          <img 
                            src={shoesData[index + 4].image} 
                            alt={shoesData[index + 4].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm mt-2 font-medium text-white truncate">{shoesData[index + 4].name}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-700 flex justify-between items-center">
                      <div className="flex items-center text-gray-400 text-xs">
                        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                          <span className="text-xs">JD</span>
                        </div>
                        User_123
                      </div>
                      <span className="bg-green-900 bg-opacity-30 text-green-400 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Testimonials Slider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-12 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
          >
            <h3 className="text-xl font-bold mb-6 text-center">What Our Community Says</h3>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  name: "Alex Johnson",
                  text: "The exchange process was incredibly smooth. I got my dream shoes within days!",
                  rating: 5
                },
                {
                  name: "Sarah Williams",
                  text: "I've been using this platform for months now. Best shoe exchange community I've found.",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  text: "Great selection of shoes and the verification process makes exchanges feel safe.",
                  rating: 4
                }
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-900 p-4 rounded-lg shadow relative"
                >
                  <div className="absolute -top-3 left-4 bg-amber-500 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 italic mb-4">{testimonial.text}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{testimonial.name}</span>
                    <div className="flex">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}