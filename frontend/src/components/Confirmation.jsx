import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Package, ArrowRight, Truck, Star, Gift, ShoppingBag, MapPin, Mail, Calendar, Download, Share2, Home, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const API_BASE_URL = 'http://localhost:5000';

// Confetti component
const Confetti = () => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    createConfettiBurst();
    
    const intervalId = setInterval(() => {
      createConfettiWave();
    }, 2000);
    
    return () => {
      clearInterval(intervalId);
      setParticles([]);
    };
  }, [dimensions]);
  
  const createConfettiBurst = () => {
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#EF4444', '#06B6D4', '#F97316', '#FFD700', '#C0C0C0'];
    const shapes = ['square', 'circle', 'triangle', 'star'];
    const newParticles = [];
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2 - 200; 

    for (let i = 0; i < 150; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = shape === 'triangle' ? 8 + Math.random() * 8 : 4 + Math.random() * 7;
      const angle = Math.random() * Math.PI * 2;
      const force = 5 + Math.random() * 15;
      const vx = Math.cos(angle) * force;
      const vy = Math.sin(angle) * force - 10;
      
      newParticles.push({
        id: `burst-${Date.now()}-${i}`,
        x: centerX,
        y: centerY,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape,
        rotation: Math.random() * 360,
        velocity: { x: vx, y: vy },
        gravity: 0.5 + Math.random() * 0.2,
        drag: 0.98,
        wobble: Math.random() * 0.1,
        opacity: 0.8 + Math.random() * 0.2,
        lastX: centerX,
        lastY: centerY,
        lifespan: 2 + Math.random() * 2,
        age: 0
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
  };
  
  const createConfettiWave = () => {
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#FFD700', '#C0C0C0'];
    const shapes = ['square', 'circle', 'star'];
    const newWaveParticles = [];

    const side = Math.random() > 0.5 ? 'left' : 'right';
    const startX = side === 'left' ? -20 : dimensions.width + 20;
    const targetX = dimensions.width / 2;
    
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * dimensions.height / 2;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 3 + Math.random() * 5;

      const angle = Math.atan2(dimensions.height/2 - y, targetX - startX);
      const speed = 5 + Math.random() * 3;
      const vx = Math.cos(angle) * speed * (side === 'left' ? 1 : -1);
      const vy = Math.sin(angle) * speed * 0.5;
      
      newWaveParticles.push({
        id: `wave-${Date.now()}-${i}`,
        x: startX,
        y: y,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape,
        rotation: Math.random() * 360,
        velocity: { x: vx, y: vy },
        gravity: 0.1 + Math.random() * 0.1,
        drag: 0.98,
        opacity: 0.7 + Math.random() * 0.3,
        lastX: startX,
        lastY: y,
        lifespan: 4 + Math.random() * 2,
        age: 0
      });
    }
    
    setParticles(prev => [...prev, ...newWaveParticles].slice(-300));
  };

  useEffect(() => {
    if (particles.length === 0) return;
    
    let animationFrameId;
    let lastTime = Date.now();
    
    const updateParticles = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      setParticles(prevParticles => {
        return prevParticles
          .map(p => {
            const nextVX = p.velocity.x * p.drag;
            const nextVY = p.velocity.y * p.drag + p.gravity;
            const nextX = p.x + nextVX;
            const nextY = p.y + nextVY;

            const wobbleX = p.wobble ? Math.sin(currentTime / 200) * 2 : 0;

            const age = (p.age || 0) + deltaTime;
            
            return {
              ...p,
              x: nextX + wobbleX,
              y: nextY,
              lastX: p.x,
              lastY: p.y,
              velocity: { x: nextVX, y: nextVY },
              age: age,
              opacity: p.opacity * (1 - age / p.lifespan)
            };
          })
          .filter(p => 
            p.y < dimensions.height + 100 && 
            p.x > -100 && 
            p.x < dimensions.width + 100 && 
            p.age < p.lifespan
          );
      });
      
      animationFrameId = requestAnimationFrame(updateParticles);
    };
    
    animationFrameId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, [particles, dimensions]);
  
  const renderParticle = (particle) => {
    const style = {
      position: 'absolute',
      left: `${particle.x}px`,
      top: `${particle.y}px`,
      opacity: particle.opacity,
      transform: `rotate(${particle.rotation}deg)`,
      zIndex: 50,
      pointerEvents: 'none',
      filter: Math.random() > 0.7 ? 'brightness(1.2)' : 'none'
    };
    
    if (particle.shape === 'triangle') {
      return (
        <div
          key={particle.id}
          style={{
            ...style,
            width: 0,
            height: 0,
            borderLeft: `${particle.size/2}px solid transparent`,
            borderRight: `${particle.size/2}px solid transparent`,
            borderBottom: `${particle.size}px solid ${particle.color}`
          }}
        />
      );
    } else if (particle.shape === 'star') {
      return (
        <div key={particle.id} style={style}>
          <div style={{ color: particle.color, fontSize: particle.size * 1.5 }}>★</div>
        </div>
      );
    } else {
      return (
        <div
          key={particle.id}
          style={{
            ...style,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: particle.shape === 'circle' ? '50%' : '0',
            boxShadow: particle.size > 8 ? `0 0 4px ${particle.color}` : 'none'
          }}
        />
      );
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-10"
    >
      {particles.map(renderParticle)}
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function OrderConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  
  // Get order data from navigation state
  const orderData = location.state;

  // Redirect to shop if no order data
  useEffect(() => {
    if (!orderData || !orderData.orderNumber) {
      console.log('No order data found, redirecting to shop');
      navigate('/shop', { replace: true });
    }
  }, [orderData, navigate]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  // If no order data, show loading
  if (!orderData || !orderData.orderNumber) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Extract order details with fallbacks
  const {
    orderNumber,
    total = 0,
    itemCount = 0,
    customerName = 'Valued Customer',
    customerEmail = '',
    items = []
  } = orderData;
  
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <Navbar />
      
      {/* Confetti effect */}
      {showConfetti && <Confetti />}

      <div className="pt-24 md:pt-28">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-lg shadow-green-500/30"
            >
              <Check size={40} strokeWidth={3} className="text-white" />
            </motion.div>

            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              Order Confirmed! 🎉
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "280px" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-2 mx-auto"
              />
            </h2>
            <p className="text-gray-400 text-lg mt-3">
              Thank you for your purchase, {customerName}!
            </p>
          </motion.div>

          {/* Order Number Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 rounded-2xl p-6 mb-8 shadow-xl border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-green-500/5" />
            
            <div className="relative z-10 text-center">
              <p className="text-gray-400 text-sm mb-2">Order Number</p>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-amber-400 mb-4"
              >
                {orderNumber}
              </motion.p>
              
              {customerEmail && (
                <div className="items-center justify-center gap-2 text-sm text-gray-400 bg-gray-900/50 rounded-lg px-4 py-2 inline-flex">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Confirmation sent to <span className="text-amber-400 font-medium">{customerEmail}</span></span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details - Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Order Items */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <Package className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Order Items</h3>
                    <p className="text-gray-400 text-sm">{itemCount} item{itemCount !== 1 ? 's' : ''} in your order</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {items && items.length > 0 ? (
                    items.map((item, index) => (
                      <motion.div
                        key={item._id || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all"
                      >
                        <img
                          src={`${API_BASE_URL}${item.productId?.image}`}
                          alt={item.productId?.name || 'Product'}
                          className="w-20 h-20 object-cover rounded-lg border-2 border-amber-400/30"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${API_BASE_URL}/images/placeholder.jpg`;
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-1">{item.productId?.name || 'Product'}</h4>
                          <p className="text-sm text-gray-400 mb-2">{item.productId?.brand || 'Brand'}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            {item.size && <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">Size: {item.size}</span>}
                            {item.color && <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">Color: {item.color}</span>}
                            <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">Qty: {item.quantity || 1}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Price</p>
                          <p className="text-xl font-bold text-amber-400">
                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-8">No items to display</p>
                  )}
                </div>
              </div>

              {/* Delivery Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Truck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Delivery Information</h3>
                    <p className="text-gray-400 text-sm">Estimated delivery time</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-gray-400">Delivery Time</span>
                    </div>
                    <p className="text-lg font-bold text-white">5-7 Business Days</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-gray-400">Rewards Earned</span>
                    </div>
                    <p className="text-lg font-bold text-green-400">+{itemCount * 50} Points</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Order Confirmed</p>
                      <p className="text-sm text-gray-300">
                        Your order has been confirmed and is being processed. You will receive tracking information once your order ships.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Order Summary Sidebar - Right Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-28">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm pb-4 border-b border-gray-700">
                    <span className="text-gray-400">Items ({itemCount})</span>
                    <span className="text-white font-medium">${Number(total).toFixed(2)}</span>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-white">Total Paid</span>
                      <span className="text-2xl font-bold text-amber-400">${Number(total).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500">Including all taxes and fees</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link to="/orders" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                    >
                      <Package className="w-5 h-5" />
                      <span>Track Order</span>
                    </motion.button>
                  </Link>

                  <Link to="/shop" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gray-900 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Continue Shopping</span>
                    </motion.button>
                  </Link>

                  <Link to="/" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gray-900 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Home className="w-5 h-5" />
                      <span>Back to Home</span>
                    </motion.button>
                  </Link>
                </div>

                {/* Share Options */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share your purchase
                  </p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 bg-gray-900 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all text-sm"
                    >
                      📱 Social
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 bg-gray-900 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all text-sm flex items-center justify-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Invoice
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}