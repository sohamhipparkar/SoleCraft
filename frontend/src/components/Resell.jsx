import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Filter,
  ChevronRight,
  ChevronLeft,
  Star,
  Mail,
  Calendar,
  Bell,
  BarChart2,
  TrendingUp,
  Users,
  Package,
  Shield,
  Zap,
  Check,
  ArrowRight,
  X,
  ArrowLeftRight
} from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

// Configure axios base URL
const API_BASE_URL = 'http://localhost:5000';

const shoesData = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High OG",
    brand: "Nike",
    colorway: "Chicago",
    condition: "9.5/10",
    retailPrice: 170,
    resellPrice: 550,
    image: "http://localhost:5000/images/AirJordan1.jpeg",
    size: "US 10",
    rating: 4.9
  },
  {
    id: 2,
    name: "Nike Dunk Low",
    brand: "Nike",
    colorway: "Panda",
    condition: "DS (Deadstock)",
    retailPrice: 110,
    resellPrice: 210,
    image: "http://localhost:5000/images/DunkLow.avif",
    size: "US 9.5",
    rating: 4.7
  },
  {
    id: 3,
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    colorway: "Zebra",
    condition: "8/10",
    retailPrice: 220,
    resellPrice: 320,
    image: "http://localhost:5000/images/YeezyBoost.webp",
    size: "US 11",
    rating: 4.8
  },
  {
    id: 4,
    name: "New Balance 550",
    brand: "New Balance",
    colorway: "White Green",
    condition: "DS (Deadstock)",
    retailPrice: 120,
    resellPrice: 180,
    image: "http://localhost:5000/images/NewBalance550.jpg",
    size: "US 10.5",
    rating: 4.6
  },
  {
    id: 5,
    name: "Travis Scott x Air Jordan 1 Low",
    brand: "Nike",
    colorway: "Reverse Mocha",
    condition: "DS (Deadstock)",
    retailPrice: 150,
    resellPrice: 950,
    image: "http://localhost:5000/images/Jordan1Retro.webp",
    size: "US 10",
    rating: 5.0
  },
  {
    id: 6,
    name: "Nike Air Max 97",
    brand: "Nike",
    colorway: "Silver Bullet",
    condition: "8.5/10",
    retailPrice: 175,
    resellPrice: 250,
    image: "http://localhost:5000/images/AirMax.webp",
    size: "US 9.5",
    rating: 4.5
  },
  {
    id: 7,
    name: "Puma RS-X",
    brand: "Puma",
    colorway: "Triple Black",
    condition: "DS (Deadstock)",
    retailPrice: 110,
    resellPrice: 130,
    image: "http://localhost:5000/images/RSX.avif",
    size: "US 10",
    rating: 4.4
  },
  {
    id: 8,
    name: "Adidas Campus 00s",
    brand: "Adidas",
    colorway: "Core Black/White",
    condition: "DS (Deadstock)",
    retailPrice: 100,
    resellPrice: 150,
    image: "http://localhost:5000/images/Campus00s.jpg",
    size: "US 10",
    rating: 4.7
  },
  {
    id: 9,
    name: "Salomon XT-6",
    brand: "Salomon",
    colorway: "Safari/Black/White",
    condition: "9/10",
    retailPrice: 190,
    resellPrice: 250,
    image: "http://localhost:5000/images/XT6.jpg",
    size: "US 11",
    rating: 4.8
  },
  {
    id: 10,
    name: "MSCHF Big Red Boot",
    brand: "MSCHF",
    colorway: "Red",
    condition: "DS (Deadstock)",
    retailPrice: 350,
    resellPrice: 750,
    image: "http://localhost:5000/images/BigRedBoot.webp",
    size: "US 10",
    rating: 4.3
  },
  {
    id: 11,
    name: "Nike Zoom Vomero 5",
    brand: "Nike",
    colorway: "Photon Dust",
    condition: "9/10",
    retailPrice: 160,
    resellPrice: 220,
    image: "http://localhost:5000/images/ZoomVomero5.avif",
    size: "US 9.5",
    rating: 4.6
  },
  {
    id: 12,
    name: "Crocs Pollex Clog",
    brand: "Crocs",
    colorway: "Sasquatch",
    condition: "DS (Deadstock)",
    retailPrice: 85,
    resellPrice: 200,
    image: "http://localhost:5000/images/PollexClog.webp",
    size: "US 11",
    rating: 4.5
  }
];

const trendingShoes = [
  { name: 'Nike Dunk Low Panda', priceChange: '+12%', trend: 'up' },
  { name: 'New Balance 550', priceChange: '+8%', trend: 'up' },
  { name: 'Jordan 4 Retro', priceChange: '-3%', trend: 'down' },
  { name: 'Adidas Samba', priceChange: '+15%', trend: 'up' }
];

const upcomingReleases = [
  { name: 'Off-White x Nike Air Force 1', date: 'May 15, 2025', image: `${API_BASE_URL}/images/AirJordan1.jpeg` },
  { name: 'Jordan 1 High Reimagined', date: 'June 2, 2025', image: `${API_BASE_URL}/images/Jordan1Retro.webp` },
  { name: 'Yeezy 700 V3 Azareth', date: 'May 28, 2025', image: `${API_BASE_URL}/images/YeezyBoost.webp` }
];

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

export default function ShoeResell() {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [favorites, setFavorites] = useState([]);
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("trending");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [scrollY, setScrollY] = useState(0);
  const statsControls = useAnimation();
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  
  // Add state for trending and upcoming releases
  const [trendingShoes, setTrendingShoes] = useState([]);
  const [upcomingReleases, setUpcomingReleases] = useState([
    { name: 'Off-White x Nike Air Force 1', date: 'May 15, 2025', image: `${API_BASE_URL}/images/AirJordan1.jpeg` },
    { name: 'Jordan 1 High Reimagined', date: 'June 2, 2025', image: `${API_BASE_URL}/images/Jordan1Retro.webp` },
    { name: 'Yeezy 700 V3 Azareth', date: 'May 28, 2025', image: `${API_BASE_URL}/images/YeezyBoost.webp` }
  ]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Start animation immediately on mount
    statsControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    }));
  }, [statsControls]);

  // Fetch shoes from backend
  useEffect(() => {
    fetchShoes();
  }, [searchQuery, selectedBrand, sortBy, selectedSize, priceRange]);

  const fetchShoes = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();

      if (searchQuery) params.append('search', searchQuery);
      if (selectedBrand !== 'all') params.append('brand', selectedBrand);
      if (sortBy !== 'featured') params.append('sortBy', sortBy);
      if (selectedSize) params.append('size', selectedSize);
      if (priceRange[0] > 0) params.append('minPrice', priceRange[0]);
      if (priceRange[1] < 1000) params.append('maxPrice', priceRange[1]);

      const response = await axios.get(`${API_BASE_URL}/api/shoes?${params.toString()}`);

      if (response.data.success) {
        setShoes(response.data.shoes);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching shoes:', err);
      setError('Failed to load shoes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user's wishlist if logged in
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const favoriteIds = response.data.favorites.map(shoe => shoe._id);
          setFavorites(favoriteIds);
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      }
    };

    fetchWishlist();
  }, []);

  // Fetch trending shoes
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/trending`);
        if (response.data.success) {
          setTrendingShoes(response.data.trending);
        }
      } catch (err) {
        console.error('Error fetching trending shoes:', err);
      }
    };

    fetchTrending();
  }, []);

  const toggleFavorite = async (id) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to add favorites');
      return;
    }

    try {
      if (favorites.includes(id)) {
        // Remove from wishlist
        await axios.delete(`${API_BASE_URL}/api/wishlist/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFavorites(favorites.filter(favId => favId !== id));
      } else {
        // Add to wishlist
        await axios.post(`${API_BASE_URL}/api/wishlist/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFavorites([...favorites, id]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert(err.response?.data?.message || 'Failed to update favorites');
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to make a purchase');
      return;
    }

    setIsPurchasing(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/orders`,
        {
          shoeId: selectedShoe._id,
          buyerName,
          buyerEmail,
          buyerPhone,
          shippingAddress: buyerAddress,
          paymentMethod
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setIsPurchasing(false);
        setPurchaseComplete(true);

        // Refresh shoes list to update availability
        fetchShoes();

        // Auto close after 3 seconds
        setTimeout(() => {
          closeBuyModal();
        }, 3000);
      }
    } catch (err) {
      console.error('Purchase error:', err);
      setIsPurchasing(false);
      alert(err.response?.data?.message || 'Failed to complete purchase. Please try again.');
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/subscribe`, {
        email
      });

      if (response.data.success) {
        alert(`Thanks for subscribing! You'll receive updates on new drops and price alerts.`);
        setEmail("");
      }
    } catch (err) {
      console.error('Subscribe error:', err);
      alert(err.response?.data?.message || 'Failed to subscribe. Please try again.');
    }
  };

  const filterShoes = () => {
    // Since filtering is now done on backend, just return the shoes
    return shoes;
  };

  const brands = ['all', ...new Set(shoes.map(shoe => shoe.brand))];

  // Add these new functions before the return statement
  const handleBuyNow = (shoe) => {
    setSelectedShoe(shoe);
    setPurchaseComplete(false);
  };

  const closeBuyModal = () => {
    setSelectedShoe(null);
    setBuyerName('');
    setBuyerEmail('');
    setBuyerAddress('');
    setBuyerPhone('');
    setPaymentMethod('credit-card');
    setPurchaseComplete(false);
  };

  const calculateTotal = () => {
    if (!selectedShoe) return 0;
    const shipping = 15;
    const tax = selectedShoe.resellPrice * 0.08;
    return (selectedShoe.resellPrice + shipping + tax).toFixed(2);
  };

  // Add helper function to handle price range changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value);
    
    if (name === 'min') {
      setPriceRange([numValue, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], numValue]);
    }
  };

  // Add carousel navigation functions
  const nextRelease = () => {
    setCarouselIdx((prev) => (prev + 1) % upcomingReleases.length);
  };

  const prevRelease = () => {
    setCarouselIdx((prev) => (prev - 1 + upcomingReleases.length) % upcomingReleases.length);
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
                  Resell Marketplace
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "320px" }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-2"
                  />
                </h2>
                <p className="text-gray-400 text-lg mt-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-amber-400" />
                  Buy and sell premium pre-owned footwear
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
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${selectedBrand === brand
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900'
                      : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                    }`}
                >
                  {brand === 'all' ? 'All Brands' : brand}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 rounded-2xl p-6 mb-8 shadow-xl border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
      { label: 'Active Listings', value: '780', icon: Package, colorClass: 'amber' },
      { label: 'Transactions', value: '1,420', icon: ShoppingBag, colorClass: 'purple' },
      { label: 'Avg Rating', value: '4.8', icon: Star, colorClass: 'yellow' },
      { label: 'Active Users', value: '5,600', icon: Users, colorClass: 'green' }
    ].map((stat, index) => {
      const Icon = stat.icon;
      
      // Define color styles based on colorClass
      const colorStyles = {
        amber: {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          text: 'text-amber-400'
        },
        purple: {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20',
          text: 'text-purple-400'
        },
        yellow: {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
          text: 'text-yellow-400'
        },
        green: {
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
          text: 'text-green-400'
        }
      };

      const colors = colorStyles[stat.colorClass] || colorStyles.amber;

      return (
        <motion.div
          key={index}
          custom={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="text-center"
        >
          <div className={`inline-flex p-3 ${colors.bg} rounded-xl mb-3 border ${colors.border}`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
          <p className="text-2xl font-bold mb-1 text-white">{stat.value}+</p>
        </motion.div>
      );
    })}
  </div>
</motion.div>

          {/* Enhanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-xl shadow-lg cursor-pointer border border-gray-700"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <div className="flex items-center">
                <Filter className="w-5 h-5 mr-2 text-amber-400" />
                <span className="font-medium text-white">Advanced Filters</span>
              </div>
              <motion.div
                animate={{ rotate: filterOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-amber-400" />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-gray-800 rounded-b-xl border-x border-b border-gray-700 mt-2"
                >
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-white flex items-center">
                        <Package className="w-4 h-4 mr-2 text-amber-400" />
                        Size Selection
                      </h3>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {["US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 11.5", "US 12"].map(size => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`py-2.5 rounded-lg text-sm font-medium transition-all ${selectedSize === size
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30"
                                : "bg-gray-900 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600"
                              }`}
                            onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                          >
                            {size}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-white flex items-center">
                        <ShoppingBag className="w-4 h-4 mr-2 text-amber-400" />
                        Price Range
                      </h3>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-sm text-gray-400 mb-1 block">Min Price</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">$</span>
                            <input
                              type="number"
                              name="min"
                              placeholder="0"
                              value={priceRange[0]}
                              onChange={handlePriceChange}
                              className="w-full pl-8 pr-4 py-2.5 border border-gray-700 bg-gray-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="text-sm text-gray-400 mb-1 block">Max Price</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">$</span>
                            <input
                              type="number"
                              name="max"
                              placeholder="1000"
                              value={priceRange[1]}
                              onChange={handlePriceChange}
                              className="w-full pl-8 pr-4 py-2.5 border border-gray-700 bg-gray-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedSize("");
                        setPriceRange([0, 1000]);
                        setSearchQuery("");
                        setSelectedBrand("all");
                      }}
                      className="w-full py-2.5 bg-gray-900 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reset Filters
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Shoes Grid */}
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
                    ({filterShoes().length} items)
                  </span>
                </h3>
                <p className="text-gray-500 text-sm mt-1">Verified and authenticated listings</p>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
                />
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-xl font-medium"
                  onClick={fetchShoes}
                >
                  Try Again
                </motion.button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filterShoes().map((shoe) => (
                    <motion.div
                      key={shoe._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -8 }}
                      variants={itemVariants}
                      className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all shadow-lg group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${API_BASE_URL}/images/placeholder.jpg`;
                          }}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(shoe._id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm rounded-full p-2 z-10 border border-gray-700"
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${favorites.includes(shoe._id)
                                ? 'text-red-500 fill-red-500'
                                : 'text-gray-400'
                              }`}
                          />
                        </motion.button>

                        <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700 flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-semibold">{shoe.rating}</span>
                        </div>

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
                        <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                          {shoe.name}
                        </h4>
                        <p className="text-sm text-gray-400 mb-3">{shoe.colorway} • {shoe.brand}</p>

                        <div className="flex justify-between items-end mb-3">
                          <div>
                            <p className="text-xs text-gray-500 line-through">Retail: ${shoe.retailPrice}</p>
                            <p className="font-bold text-amber-400 text-lg">${shoe.resellPrice}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-400">
                              +{Math.round((shoe.resellPrice - shoe.retailPrice) / shoe.retailPrice * 100)}%
                            </p>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => handleBuyNow(shoe)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl text-sm font-medium transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                        >
                          <span>Buy Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!isLoading && !error && filterShoes().length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center"
              >
                <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg mb-4">No shoes match your filters.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-xl font-medium hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/30"
                  onClick={() => {
                    setSelectedSize("");
                    setPriceRange([0, 1000]);
                    setSearchQuery("");
                    setSelectedBrand("all");
                  }}
                >
                  Reset All Filters
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Market Insights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Market Insights</h3>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "trending"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900"
                      : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
                    }`}
                  onClick={() => setActiveTab("trending")}
                >
                  Trending
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "upcoming"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900"
                      : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
                    }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </motion.button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "trending" && (
                <motion.div
                  key="trending"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {trendingShoes.slice(0, 4).map((trend, idx) => (
                    <motion.div
                      key={trend._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-amber-500/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                        <span className={`text-sm font-bold px-2 py-1 rounded-full ${trend.trend === "up"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                          }`}>
                          {trend.priceChange}
                        </span>
                      </div>
                      <p className="font-semibold text-white">{trend.name}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "upcoming" && (
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIdx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={upcomingReleases[carouselIdx].image}
                        alt={upcomingReleases[carouselIdx].name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${API_BASE_URL}/images/placeholder.jpg`;
                        }}
                        className="w-32 h-32 object-cover rounded-xl mb-4 border-2 border-amber-400"
                      />
                      <h4 className="text-lg font-bold text-white mb-2 text-center">
                        {upcomingReleases[carouselIdx].name}
                      </h4>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {upcomingReleases[carouselIdx].date}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevRelease}
                      className="p-2 bg-gray-900 rounded-lg border border-gray-700 hover:border-amber-500 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-amber-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextRelease}
                      className="p-2 bg-gray-900 rounded-lg border border-gray-700 hover:border-amber-500 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-amber-400" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Subscription Banner */}
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
                  <Bell className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Stay Updated</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Get Price Drop Alerts!</h3>
                <p className="text-gray-800 leading-relaxed max-w-2xl">
                  Subscribe for new drops, price alerts, and exclusive resell opportunities.
                </p>
                <ul className="mt-4 space-y-2 text-gray-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Real-time price notifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Early access to rare drops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Market trend analysis</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 w-full md:w-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl border-2 border-gray-900/20 bg-white/90 backdrop-blur-sm text-gray-900 focus:outline-none focus:border-gray-900 placeholder-gray-600 md:w-80"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-6 py-3 bg-gray-900 text-amber-400 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <span>Subscribe Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Buy Now Modal */}
      <AnimatePresence>
        {selectedShoe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeBuyModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {!purchaseComplete ? (
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Complete Your Purchase</h2>
                      <p className="text-gray-400 text-sm">Secure checkout powered by SoleCraft</p>
                    </div>
                    <button
                      onClick={closeBuyModal}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Product Details */}
                    <div className="space-y-6">
                      {/* Product Card */}
                      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                        <div className="flex gap-4">
                          <img
                            src={selectedShoe.image}
                            alt={selectedShoe.name}
                            className="w-24 h-24 object-cover rounded-lg border-2 border-amber-400"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-white mb-1">{selectedShoe.name}</h3>
                            <p className="text-sm text-gray-400 mb-2">{selectedShoe.colorway}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-gray-800 px-2 py-1 rounded text-xs border border-gray-700">
                                {selectedShoe.size}
                              </span>
                              <span className="bg-green-500/20 px-2 py-1 rounded text-xs text-green-400 border border-green-500/30">
                                {selectedShoe.condition}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-semibold">{selectedShoe.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                        <h3 className="font-bold text-white mb-4 flex items-center">
                          <ShoppingBag className="w-5 h-5 mr-2 text-amber-400" />
                          Order Summary
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Item Price</span>
                            <span className="text-white font-medium">${selectedShoe.resellPrice}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Shipping</span>
                            <span className="text-white font-medium">$15.00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Tax (8%)</span>
                            <span className="text-white font-medium">${(selectedShoe.resellPrice * 0.08).toFixed(2)}</span>
                          </div>
                          <div className="border-t border-gray-700 pt-3 mt-3">
                            <div className="flex justify-between">
                              <span className="font-bold text-white">Total</span>
                              <span className="font-bold text-amber-400 text-xl">${calculateTotal()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Security Badge */}
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-500/20 p-2 rounded-lg">
                            <Shield className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">100% Authentic Guarantee</p>
                            <p className="text-xs text-gray-400 mt-1">Every item is verified by our experts</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Checkout Form */}
                    <div>
                      <form onSubmit={handlePurchase} className="space-y-4">
                        {/* Contact Information */}
                        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                          <h3 className="font-bold text-white mb-4">Contact Information</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm text-gray-400 mb-1 block">Full Name *</label>
                              <input
                                type="text"
                                required
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500"
                              />
                            </div>
                            <div>
                              <label className="text-sm text-gray-400 mb-1 block">Email Address *</label>
                              <input
                                type="email"
                                required
                                value={buyerEmail}
                                onChange={(e) => setBuyerEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500"
                              />
                            </div>
                            <div>
                              <label className="text-sm text-gray-400 mb-1 block">Phone Number *</label>
                              <input
                                type="tel"
                                required
                                value={buyerPhone}
                                onChange={(e) => setBuyerPhone(e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                          <h3 className="font-bold text-white mb-4">Shipping Address</h3>
                          <div>
                            <label className="text-sm text-gray-400 mb-1 block">Full Address *</label>
                            <textarea
                              required
                              rows={3}
                              value={buyerAddress}
                              onChange={(e) => setBuyerAddress(e.target.value)}
                              placeholder="123 Main St, Apt 4B, New York, NY 10001"
                              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500 resize-none"
                            />
                          </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                          <h3 className="font-bold text-white mb-4">Payment Method</h3>
                          <div className="space-y-2">
                            {[
                              { id: 'credit-card', label: 'Credit/Debit Card', icon: '💳' },
                              { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                              { id: 'apple-pay', label: 'Apple Pay', icon: '🍎' },
                              { id: 'google-pay', label: 'Google Pay', icon: '🔵' }
                            ].map((method) => (
                              <label
                                key={method.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === method.id
                                    ? 'bg-amber-500/10 border-amber-500'
                                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                  }`}
                              >
                                <input
                                  type="radio"
                                  name="payment"
                                  value={method.id}
                                  checked={paymentMethod === method.id}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="text-amber-500 focus:ring-amber-500"
                                />
                                <span className="text-xl">{method.icon}</span>
                                <span className="text-white font-medium">{method.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isPurchasing}
                          whileHover={!isPurchasing ? { scale: 1.02 } : {}}
                          whileTap={!isPurchasing ? { scale: 0.98 } : {}}
                          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isPurchasing
                              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 shadow-lg shadow-amber-500/30'
                            }`}
                        >
                          {isPurchasing ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Shield className="w-5 h-5" />
                              </motion.div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-5 h-5" />
                              Complete Purchase - ${calculateTotal()}
                            </>
                          )}
                        </motion.button>

                        <p className="text-xs text-center text-gray-500 mt-2">
                          By completing this purchase, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                // Success Screen
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="bg-green-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-500"
                  >
                    <Check className="w-12 h-12 text-green-400" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-3">Purchase Successful!</h2>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Your order has been confirmed. We'll send you a confirmation email shortly with tracking details.
                  </p>

                  <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 max-w-md mx-auto mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={selectedShoe.image}
                        alt={selectedShoe.name}
                        className="w-20 h-20 object-cover rounded-lg border-2 border-amber-400"
                      />
                      <div className="text-left">
                        <h3 className="font-bold text-white">{selectedShoe.name}</h3>
                        <p className="text-sm text-gray-400">{selectedShoe.colorway}</p>
                        <p className="text-amber-400 font-bold mt-1">${selectedShoe.resellPrice}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Order ID:</span>
                        <span className="text-white font-mono">#SC{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Estimated Delivery:</span>
                        <span className="text-white">3-5 business days</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeBuyModal}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/30"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}