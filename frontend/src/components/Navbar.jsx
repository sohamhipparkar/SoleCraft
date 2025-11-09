import { useState, useEffect, useRef } from 'react';
import { Menu, X, RefreshCw, Palette, Wrench, DollarSign, ShoppingBag, MapPin, LogOut, User, ChevronDown, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Configure axios base URL
const API_BASE_URL = 'http://localhost:5000';

export default function CobblersNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);

  // Helper function to check if route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };
  
  useEffect(() => {
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    gsapScript.async = true;
    document.body.appendChild(gsapScript);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
 
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(gsapScript);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper function to get first name
  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };

  // Check if user is logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      
      if (token) {
        try {
          // Verify token with backend
          const response = await axios.post(
            `${API_BASE_URL}/api/auth/verify`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          
          if (response.data.success) {
            setIsLoggedIn(true);
            
            // Get user data and extract first name
            if (userString) {
              const user = JSON.parse(userString);
              const fullName = user.name || user.email;
              setUserName(getFirstName(fullName));
            }
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          handleLogout();
        }
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUserName('');
    setShowUserDropdown(false);
    
    // Close mobile menu if open
    setIsOpen(false);
    
    // Redirect to home page
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowUserDropdown(false);
    navigate('/profile');
  };

  const handleOrdersClick = () => {
    setShowUserDropdown(false);
    setIsOpen(false);
    navigate('/orders');
  };

  const generateSparkle = (e) => {
    if (!e) return;
    
    const newSparkle = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 60 + 250}, 100%, 70%)`,
    };
    
    setSparkles(prev => [...prev, newSparkle]);

    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1000);
  };

  // Navigate to find cobblers route
  const findNearbyCobblers = () => {
    navigate('/find-cobblers');
  };

  useEffect(() => {
    if (window.gsap) {
      window.gsap.fromTo(navbarRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
      );

      window.gsap.to(".navbar-logo", {
        duration: 2,
        boxShadow: "0 0 30px rgba(139, 92, 246, 0.7)",
        repeat: -1,
        yoyo: true
      });

      window.gsap.to(".cta-button", {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  useEffect(() => {
    if (window.gsap && isOpen && mobileMenuRef.current) {
      const tl = window.gsap.timeline();

      tl.fromTo(mobileMenuRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "100vh", duration: 0.3, ease: "power2.out" }
      );
      
      const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
      tl.fromTo(menuItems,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: "back.out(1.7)" }
      );

      window.gsap.to(".mobile-menu-item", {
        boxShadow: "0px 0px 10px rgba(139, 92, 246, 0.3)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      });
    }
  }, [isOpen]);

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "backOut" 
      }
    },
    hover: { 
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.08,
      boxShadow: "0px 8px 20px rgba(139, 92, 246, 0.5)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };
  
  const mobileMenuVariants = {
    closed: { 
      x: "100%",
      opacity: 0,
      transition: { 
        type: "tween",
        duration: 0.3,
        ease: "easeIn"
      }
    },
    open: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 0.95,
      transition: { 
        duration: 0.2
      }
    }
  };

  const iconAnimations = {
    exchange: {
      animate: { 
        rotate: activeHover === "exchange" ? 180 : 0,
        scale: activeHover === "exchange" ? 1.2 : 1
      },
      transition: { type: "spring", duration: 0.5 }
    },
    customize: {
      animate: { 
        scale: activeHover === "customize" ? 1.3 : 1,
        rotate: activeHover === "customize" ? 15 : 0
      },
      transition: { type: "spring", duration: 0.5 }
    },
    service: {
      animate: { 
        rotate: activeHover === "service" ? 45 : 0,
        scale: activeHover === "service" ? 1.2 : 1
      },
      transition: { type: "spring", duration: 0.5 }
    },
    resell: {
      animate: { 
        scale: activeHover === "resell" ? 1.3 : 1, 
        y: activeHover === "resell" ? -5 : 0
      },
      transition: { type: "spring", duration: 0.5 }
    },
    shop: {
      animate: { 
        y: activeHover === "shop" ? 3 : 0,
        scale: activeHover === "shop" ? 1.2 : 1
      },
      transition: { type: "spring", duration: 0.5 }
    }
  };

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 }
  };

  return (
    <>
      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              borderRadius: '50%',
              boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            }}
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6 }}
          />
        ))}
      </AnimatePresence>

      <motion.nav
        ref={navbarRef}
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-r from-slate-950/95 via-purple-950/95 to-slate-950/95 backdrop-blur-md shadow-lg shadow-purple-900/20 border-b border-purple-800/30' 
            : 'bg-transparent'
        }`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.a 
              href="/"
              className="flex items-center space-x-3"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.a 
                  href="/"
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/40"
                  transition={{ duration: 0.6 }}
                  onMouseMove={(e) => generateSparkle(e)}
                >
                  <ShoppingBag className="text-white" size={24} />
                </motion.a>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                SoleCraft
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1 items-center">
              {/* Exchange Nav Item */}
              <motion.a
                href="/exchange"
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group relative ${
                  isActiveRoute('/exchange')
                    ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                    : 'text-gray-200 hover:bg-purple-900/30'
                }`}
                variants={itemVariants}
                whileHover="hover"
                onMouseEnter={() => setActiveHover("exchange")}
                onMouseLeave={() => setActiveHover(null)}
              >
                <motion.div {...iconAnimations.exchange}>
                  <RefreshCw size={18} className={isActiveRoute('/exchange') ? 'text-purple-300' : 'text-purple-400 group-hover:text-purple-300'} />
                </motion.div>
                <span className="font-medium group-hover:text-purple-300">Exchange</span>
                {isActiveRoute('/exchange') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-300"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>

              {/* Customize Nav Item */}
              <motion.a
                href="/customize"
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group relative ${
                  isActiveRoute('/customize')
                    ? 'bg-purple-900/50 text-pink-300 border border-pink-700/50'
                    : 'text-gray-200 hover:bg-purple-900/30'
                }`}
                variants={itemVariants}
                whileHover="hover"
                onMouseEnter={() => setActiveHover("customize")}
                onMouseLeave={() => setActiveHover(null)}
              >
                <motion.div {...iconAnimations.customize}>
                  <Palette size={18} className={isActiveRoute('/customize') ? 'text-pink-300' : 'text-pink-400 group-hover:text-pink-300'} />
                </motion.div>
                <span className="font-medium group-hover:text-pink-300">Customize</span>
                {isActiveRoute('/customize') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-pink-300"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>

              {/* Service Nav Item */}
              <motion.a
                href="/service"
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group relative ${
                  isActiveRoute('/service')
                    ? 'bg-purple-900/50 text-blue-300 border border-blue-700/50'
                    : 'text-gray-200 hover:bg-purple-900/30'
                }`}
                variants={itemVariants}
                whileHover="hover"
                onMouseEnter={() => setActiveHover("service")}
                onMouseLeave={() => setActiveHover(null)}
              >
                <motion.div {...iconAnimations.service}>
                  <Wrench size={18} className={isActiveRoute('/service') ? 'text-blue-300' : 'text-blue-400 group-hover:text-blue-300'} />
                </motion.div>
                <span className="font-medium group-hover:text-blue-300">Service</span>
                {isActiveRoute('/service') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>

              {/* Resell Nav Item */}
              <motion.a
                href="/resell"
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group relative ${
                  isActiveRoute('/resell')
                    ? 'bg-purple-900/50 text-green-300 border border-green-700/50'
                    : 'text-gray-200 hover:bg-purple-900/30'
                }`}
                variants={itemVariants}
                whileHover="hover"
                onMouseEnter={() => setActiveHover("resell")}
                onMouseLeave={() => setActiveHover(null)}
              >
                <motion.div {...iconAnimations.resell}>
                  <DollarSign size={18} className={isActiveRoute('/resell') ? 'text-green-300' : 'text-green-400 group-hover:text-green-300'} />
                </motion.div>
                <span className="font-medium group-hover:text-green-300">Resell</span>
                {isActiveRoute('/resell') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-green-300"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>

              {/* Shop Nav Item */}
              <motion.a
                href="/shop"
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group relative ${
                  isActiveRoute('/shop')
                    ? 'bg-purple-900/50 text-yellow-300 border border-yellow-700/50'
                    : 'text-gray-200 hover:bg-purple-900/30'
                }`}
                variants={itemVariants}
                whileHover="hover"
                onMouseEnter={() => setActiveHover("shop")}
                onMouseLeave={() => setActiveHover(null)}
              >
                <motion.div {...iconAnimations.shop}>
                  <ShoppingBag size={18} className={isActiveRoute('/shop') ? 'text-yellow-300' : 'text-yellow-400 group-hover:text-yellow-300'} />
                </motion.div>
                <span className="font-medium group-hover:text-yellow-300">Shop</span>
                {isActiveRoute('/shop') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>
            </div>

            {/* Auth Buttons + Find Cobblers */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {/* User Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex items-center space-x-2 text-gray-200 bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-700/30 hover:bg-purple-900/30 transition-all"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <User size={16} className="text-purple-400" />
                      <span className="font-medium text-sm">Hi, {userName}</span>
                      <motion.div
                        animate={{ rotate: showUserDropdown ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={16} className="text-purple-400" />
                      </motion.div>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showUserDropdown && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-purple-700/30 rounded-lg shadow-xl shadow-purple-900/20 overflow-hidden"
                        >
                          <motion.button
                            onClick={handleProfileClick}
                            className="w-full px-4 py-3 text-left text-gray-200 hover:bg-purple-900/30 transition-colors flex items-center space-x-3"
                            whileHover={{ x: 5 }}
                          >
                            <User size={16} className="text-purple-400" />
                            <span className="font-medium">Profile</span>
                          </motion.button>
                          
                          <motion.button
                            onClick={handleOrdersClick}
                            className="w-full px-4 py-3 text-left text-gray-200 hover:bg-purple-900/30 transition-colors flex items-center space-x-3"
                            whileHover={{ x: 5 }}
                          >
                            <Package size={16} className="text-amber-400" />
                            <span className="font-medium">My Orders</span>
                          </motion.button>
                          
                          <div className="h-px bg-purple-800/30" />
                          
                          <motion.button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-left text-red-300 hover:bg-red-900/20 transition-colors flex items-center space-x-3"
                            whileHover={{ x: 5 }}
                          >
                            <LogOut size={16} className="text-red-400" />
                            <span className="font-medium">Logout</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <motion.a 
                  href="/login" 
                  className="text-gray-200 hover:text-purple-400 transition-colors relative"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0px 0px 8px rgb(167, 139, 250, 0.5)"
                  }}
                >
                  <span className="font-medium">Login</span>
                  
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 w-0"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              )}

              {/* Find Nearby Cobblers button (desktop) */}
              <motion.button
                onClick={findNearbyCobblers}
                className="bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 shadow-lg shadow-purple-900/30 border border-purple-500/20"
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin size={16} className="text-yellow-300" />
                <span className="font-medium">Find Cobblers</span>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-gray-200 hover:text-purple-400 transition-colors p-2"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-30"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                ref={mobileMenuRef}
                className="fixed top-20 right-0 bottom-0 w-80 bg-gradient-to-br from-slate-950/98 via-purple-950/98 to-slate-950/98 backdrop-blur-xl shadow-2xl border-l border-purple-800/30 md:hidden z-40 overflow-y-auto"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="p-6 space-y-4">
                  <motion.a
                    href="/exchange"
                    className={`py-3 px-4 rounded-lg transition-all duration-300 flex items-center space-x-3 mobile-menu-item ${
                      isActiveRoute('/exchange')
                        ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                        : 'text-gray-200 hover:bg-purple-900/30'
                    }`}
                    variants={mobileItemVariants}
                    whileHover={{ x: 10, backgroundColor: "rgba(88, 28, 135, 0.3)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <RefreshCw size={20} className={isActiveRoute('/exchange') ? 'text-purple-300' : 'text-purple-400'} />
                    <span className="font-medium">Exchange</span>
                    {isActiveRoute('/exchange') && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-purple-400 rounded-full"
                        layoutId="activeMobileTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.a>

                  <motion.a
                    href="/customize"
                    className={`mobile-menu-item py-3 px-4 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                      isActiveRoute('/customize')
                        ? 'bg-purple-900/50 text-pink-300 border border-pink-700/50'
                        : 'text-gray-200 hover:bg-purple-900/30'
                    }`}
                    variants={mobileItemVariants}
                    whileHover={{ x: 10, backgroundColor: "rgba(88, 28, 135, 0.3)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Palette size={20} className={isActiveRoute('/customize') ? 'text-pink-300' : 'text-pink-400'} />
                    <span className="font-medium">Customize</span>
                    {isActiveRoute('/customize') && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-pink-400 rounded-full"
                        layoutId="activeMobileTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.a>

                  <motion.a
                    href="/service"
                    className={`mobile-menu-item py-3 px-4 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                      isActiveRoute('/service')
                        ? 'bg-purple-900/50 text-blue-300 border border-blue-700/50'
                        : 'text-gray-200 hover:bg-purple-900/30'
                    }`}
                    variants={mobileItemVariants}
                    whileHover={{ x: 10, backgroundColor: "rgba(88, 28, 135, 0.3)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Wrench size={20} className={isActiveRoute('/service') ? 'text-blue-300' : 'text-blue-400'} />
                    <span className="font-medium">Service</span>
                    {isActiveRoute('/service') && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-blue-400 rounded-full"
                        layoutId="activeMobileTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.a>

                  <motion.a
                    href="/resell"
                    className={`mobile-menu-item py-3 px-4 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                      isActiveRoute('/resell')
                        ? 'bg-purple-900/50 text-green-300 border border-green-700/50'
                        : 'text-gray-200 hover:bg-purple-900/30'
                    }`}
                    variants={mobileItemVariants}
                    whileHover={{ x: 10, backgroundColor: "rgba(88, 28, 135, 0.3)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <DollarSign size={20} className={isActiveRoute('/resell') ? 'text-green-300' : 'text-green-400'} />
                    <span className="font-medium">Resell</span>
                    {isActiveRoute('/resell') && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                        layoutId="activeMobileTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.a>

                  <motion.a
                    href="/shop"
                    className={`mobile-menu-item py-3 px-4 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                      isActiveRoute('/shop')
                        ? 'bg-purple-900/50 text-yellow-300 border border-yellow-700/50'
                        : 'text-gray-200 hover:bg-purple-900/30'
                    }`}
                    variants={mobileItemVariants}
                    whileHover={{ x: 10, backgroundColor: "rgba(88, 28, 135, 0.3)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBag size={20} className={isActiveRoute('/shop') ? 'text-yellow-300' : 'text-yellow-400'} />
                    <span className="font-medium">Shop</span>
                    {isActiveRoute('/shop') && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-yellow-400 rounded-full"
                        layoutId="activeMobileTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.a>

                  {/* Mobile Auth Buttons */}
                  <motion.div 
                    className="pt-8 flex flex-col space-y-5"
                    variants={mobileItemVariants}
                  >
                    {/* Find Nearby Cobblers button (mobile) */}
                    <motion.button
                      onClick={() => {
                        findNearbyCobblers();
                        setIsOpen(false);
                      }}
                      className="mobile-menu-item w-full text-center bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-purple-900/30 border border-purple-500/20"
                      whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(139, 92, 246, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MapPin size={18} className="text-yellow-300" />
                      <span className="font-medium">Find Cobblers Nearby</span>
                    </motion.button>

                    {isLoggedIn ? (
                      <>
                        {/* User Name Display (Mobile) */}
                        <motion.div
                          className="mobile-menu-item flex items-center justify-center space-x-2 text-gray-200 bg-purple-900/20 px-4 py-3 rounded-lg border border-purple-700/30"
                          variants={mobileItemVariants}
                        >
                          <User size={18} className="text-purple-400" />
                          <span className="font-medium">Hi, {userName}</span>
                        </motion.div>

                        {/* Profile Button (Mobile) */}
                        <motion.button
                          onClick={() => {
                            handleProfileClick();
                            setIsOpen(false);
                          }}
                          className="mobile-menu-item w-full text-center text-purple-300 hover:text-purple-200 transition-colors py-3 border border-purple-800/30 rounded-lg hover:bg-purple-900/20 flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.3)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <User size={18} />
                          <span className="font-medium">Profile</span>
                        </motion.button>

                        {/* Orders Button (Mobile) */}
                        <motion.button
                          onClick={handleOrdersClick}
                          className="mobile-menu-item w-full text-center text-amber-300 hover:text-amber-200 transition-colors py-3 border border-amber-800/30 rounded-lg hover:bg-amber-900/20 flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(251, 191, 36, 0.3)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Package size={18} />
                          <span className="font-medium">My Orders</span>
                        </motion.button>

                        {/* Logout Button (Mobile) */}
                        <motion.button
                          onClick={handleLogout}
                          className="mobile-menu-item w-full text-center text-red-300 hover:text-red-200 transition-colors py-3 border border-red-800/30 rounded-lg hover:bg-red-900/20 flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(248, 113, 113, 0.3)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </motion.button>
                      </>
                    ) : (
                      <motion.a 
                        href="/login" 
                        className="mobile-menu-item text-center text-gray-200 hover:text-purple-400 transition-colors py-3 border border-purple-800/30 rounded-lg"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.2)" }}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium">Login</span>
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}