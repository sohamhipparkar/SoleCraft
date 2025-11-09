import { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Home, 
  Search,
  ArrowLeft,
  MessageCircle,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ErrorPage() {
  const [isRotating, setIsRotating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showTip, setShowTip] = useState(false);

  const handleRotateClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const bounds = document.getElementById('error-container')?.getBoundingClientRect();
    if (!bounds) return;
    
    const x = (e.clientX - bounds.left - bounds.width / 2) / 20;
    const y = (e.clientY - bounds.top - bounds.height / 2) / 20;
    
    setPosition({ x, y });
  };

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
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const shoeAnimationVariants = {
    idle: { 
      rotate: 0,
      transition: { duration: 0.5 }
    },
    rotating: { 
      rotate: [0, 20, -20, 10, -10, 0], 
      transition: { 
        duration: 2, 
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut" 
      }
    }
  };

  const tips = [
    "Try checking your footwear for the correct URL path",
    "Our cobbler is resoling this page at the moment",
    "Even the best shoes get lost sometimes",
    "This page has walked off somewhere",
    "These boots weren't made for walking to this page"
  ];
  
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div 
      id="error-container"
      className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col "
      onMouseMove={handleMouseMove}
    >
        <Navbar />
      {/* Header */}

      {/* Main Error Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 pt-24 md:pt-28">
        <motion.div 
          className="max-w-3xl w-full mx-auto bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Background elements */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-amber-500 opacity-5 rounded-full blur-xl"></div>
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-500 opacity-5 rounded-full blur-xl"></div>
          
          {/* Error message */}
          <motion.div
            variants={itemVariants}
            className="mb-8 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-2 text-amber-400">404</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-gray-400 max-w-lg mx-auto">We couldn't find the page you're looking for. It seems this path has walked off somewhere else.</p>
          </motion.div>

          {/* Interactive shoe animation */}
          <motion.div 
            className="flex justify-center mb-8 relative"
            variants={itemVariants}
          >
            <motion.div
              animate={isRotating ? "rotating" : "idle"}
              variants={shoeAnimationVariants}
              className="relative"
              style={{
                filter: `drop-shadow(${position.x}px ${position.y}px 10px rgba(245, 158, 11, 0.5))`,
                transform: `perspective(1000px) rotateX(${position.y * -1}deg) rotateY(${position.x}deg)`
              }}
            >
              {/* SVG Shoe */}
              <svg 
                width="180" 
                height="180" 
                viewBox="0 0 300 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={handleRotateClick}
              >
                <g>
                  {/* Sole */}
                  <path d="M40 180 L220 180 Q260 180 260 220 L40 220 Q20 220 20 200 L20 200 Q20 180 40 180 Z" fill="#8B5E34" />
                  <path d="M40 220 L260 220 L240 230 Q220 240 200 240 L60 240 Q40 240 30 230 L40 220 Z" fill="#5D4037" />
                  
                  {/* Upper */}
                  <path d="M40 180 Q40 160 60 150 L180 150 Q210 150 220 180 L40 180 Z" fill="#D7CCC8" />
                  
                  {/* Toe Cap */}
                  <path d="M60 150 Q60 130 70 120 L140 120 Q165 120 180 150 L60 150 Z" fill="#BCAAA4" />
                  
                  {/* Laces */}
                  <path d="M100 150 L100 130 M120 150 L120 125 M140 150 L140 130" stroke="#795548" strokeWidth="5" strokeLinecap="round" />
                  
                  {/* Lace Holes */}
                  <circle cx="100" cy="130" r="3" fill="#3E2723" />
                  <circle cx="120" cy="125" r="3" fill="#3E2723" />
                  <circle cx="140" cy="130" r="3" fill="#3E2723" />
                  <circle cx="100" cy="145" r="3" fill="#3E2723" />
                  <circle cx="120" cy="145" r="3" fill="#3E2723" />
                  <circle cx="140" cy="145" r="3" fill="#3E2723" />
                  
                  {/* Details */}
                  <path d="M40 200 L20 200" stroke="#8B5E34" strokeWidth="2" />
                  <path d="M60 240 L200 240" stroke="#3E2723" strokeWidth="2" />
                  <path d="M240 230 L240 220" stroke="#5D4037" strokeWidth="2" />
                </g>
              </svg>

              {/* Click me indicator */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold"
              >
                Click me!
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animated tip */}
          <AnimatePresence>
            {showTip && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-700 p-4 rounded-lg mb-8 border-l-4 border-amber-400"
              >
                <p className="text-amber-300 font-medium">Cobbler's Tip</p>
                <p className="text-gray-300 text-sm">{randomTip}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation and Search */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4"
            variants={itemVariants}
          >
            <button 
              className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-medium py-3 px-6 rounded-lg flex-1 flex items-center justify-center transition-colors duration-300"
              onClick={() => window.location.href = '/'}
            >
              <Home className="mr-2 w-5 h-5" />
              Back to Homepage
            </button>
            
            <motion.div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search for shoes..." 
                className="w-full bg-gray-700 rounded-lg py-3 px-6 pr-10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-3 text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional help options */}
        <motion.div 
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors duration-300">
            <ArrowLeft className="mr-2 w-4 h-4 text-amber-400" />
            Go Back
          </button>
          
          <button className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors duration-300">
            <RefreshCw className="mr-2 w-4 h-4 text-amber-400" />
            Refresh Page
          </button>
          
          <button className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors duration-300">
            <MessageCircle className="mr-2 w-4 h-4 text-amber-400" />
            Contact Support
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}