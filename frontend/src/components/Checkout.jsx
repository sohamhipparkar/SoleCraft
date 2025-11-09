import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, Check, ArrowRight, Package, Shield, X, Loader, MapPin, Mail, Phone, User, Calendar, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

// Configure axios
const API_BASE_URL = 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;

// Add token to requests if available
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export default function EnhancedCheckout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState({ items: [], subtotal: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'India',
    phone: '',
    email: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const isAuthenticated = !!localStorage.getItem('token');

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Fetch cart data
  const fetchCart = async () => {
    if (!isAuthenticated) {
      showNotification('Please login to checkout', 'error');
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get('/api/cart');

      if (response.data.success) {
        setCart(response.data.cart);

        if (response.data.cart.items.length === 0) {
          showNotification('Your cart is empty', 'error');
          navigate('/shop');
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      showNotification('Failed to load cart', 'error');
      navigate('/shop');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDeliveryInfoChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleCardInfoChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const validateDeliveryInfo = () => {
    const { firstName, lastName, address, city, zipCode, phone, email } = deliveryInfo;

    if (!firstName || !lastName || !address || !city || !zipCode || !phone || !email) {
      showNotification('Please fill in all delivery information', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return false;
    }

    return true;
  };

  const validatePaymentInfo = () => {
    if (paymentMethod === 'credit-card') {
      const { cardNumber, cardHolder, expiryDate, cvv } = cardInfo;

      if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        showNotification('Please fill in all card information', 'error');
        return false;
      }

      if (cardNumber.replace(/\s/g, '').length !== 16) {
        showNotification('Please enter a valid card number', 'error');
        return false;
      }

      if (cvv.length !== 3 && cvv.length !== 4) {
        showNotification('Please enter a valid CVV', 'error');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateDeliveryInfo()) return;
    } else if (step === 2) {
      if (!validatePaymentInfo()) return;
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Update the handleOrderSubmit function
  const handleOrderSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!cart.items || cart.items.length === 0) {
        showNotification('Your cart is empty', 'error');
        setIsSubmitting(false);
        return;
      }

      const orderData = {
        items: cart.items.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity || 1,
          size: item.size || '',
          color: item.color || ''
        })),
        customerName: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
        customerEmail: deliveryInfo.email,
        customerPhone: deliveryInfo.phone,
        shippingAddress: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.zipCode}, ${deliveryInfo.country}`,
        paymentMethod: paymentMethod,
        notes: ''
      };

      console.log('Sending order data:', orderData); // Debug log

      const response = await axios.post('/api/shop/checkout', orderData);

      if (response.data.success) {
        setIsSubmitting(false);

        // Navigate to confirmation page with complete order data
        navigate('/confirmation', {
          state: {
            orderNumber: response.data.order.orderId, // Use orderId from backend
            total: response.data.order.totalAmount, // Use totalAmount from backend
            itemCount: response.data.order.items.length,
            customerName: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
            customerEmail: deliveryInfo.email,
            items: cart.items // Pass the full cart items with product details
          },
          replace: true // Replace history to prevent back button issues
        });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      console.error('Error response:', error.response?.data); // Detailed error log
      
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to place order';
      showNotification(errorMessage, 'error');
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) {
      return { subtotal: 0, shipping: 0, tax: 0, total: 0 };
    }

    let subtotal = 0;
    if (typeof cart.subtotal === 'number') {
      subtotal = cart.subtotal;
    } else if (Array.isArray(cart.items)) {
      subtotal = cart.items.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return sum + (price * quantity);
      }, 0);
    }

    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return {
      subtotal: Number(subtotal) || 0,
      shipping: Number(shipping) || 0,
      tax: Number(tax) || 0,
      total: Number(total) || 0
    };
  };

  const { subtotal, shipping, tax, total } = calculateTotal();

  if (isLoading) {
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

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <Navbar />

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-24 right-4 z-50 max-w-sm"
          >
            <div
              className={`px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border ${notification.type === 'success'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-400'
                  : 'bg-gradient-to-r from-red-500 to-red-600 border-red-400'
                }`}
            >
              {notification.type === 'success' ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <X className="w-5 h-5 text-white" />
              )}
              <span className="text-white font-medium">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <Link to="/shop" className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-4">
                  <ArrowRight size={20} className="rotate-180 mr-2" />
                  <span className="font-medium">Back to Shop</span>
                </Link>
                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                  Secure Checkout
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "250px" }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-2"
                  />
                </h2>
                <p className="text-gray-400 text-lg mt-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-amber-400" />
                  Complete your order securely
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 rounded-2xl p-6 mb-8 shadow-xl border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Checkout Progress</h3>
                  <span className="text-sm text-gray-400">Step {step} of 3</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>Secure Payment</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative">
                <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                    initial={{ width: '0%' }}
                    animate={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 relative">
                  {
                    [
                      {
                        number: 1,
                        icon: Truck,
                        label: 'Delivery'
                      },
                      {
                        number: 2,
                        icon: CreditCard,
                        label: 'Payment'
                      },
                      {
                        number: 3,
                        icon: Check,
                        label: 'Confirm'
                      }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isActive = step >= item.number;
                      const isCurrent = step === item.number;

                      return (
                        <div key={item.number} className="flex flex-col items-center">
                          <motion.div
                            animate={{ scale: isCurrent ? 1.1 : 1 }}
                            transition={{ duration: 0.3 }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${isActive
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30'
                                : 'bg-gray-700 border-2 border-gray-600'
                              }`}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                          </motion.div>
                          <span className={`text-sm font-medium ${isActive ? 'text-amber-400' : 'text-gray-500'}`}>
                            {item.label}
                          </span>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Delivery Information */}
                {step === 1 && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <MapPin className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Delivery Information</h3>
                        <p className="text-gray-400 text-sm">Where should we deliver your order?</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="group">
                          <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <User className="w-4 h-4 text-amber-400" />
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={deliveryInfo.firstName}
                            onChange={handleDeliveryInfoChange}
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={deliveryInfo.lastName}
                            onChange={handleDeliveryInfoChange}
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-amber-400" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={deliveryInfo.email}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                          placeholder="john.doe@example.com"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-amber-400" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={deliveryInfo.phone}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                          placeholder="+91-9876543210"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-400" />
                          Street Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={deliveryInfo.address}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                          placeholder="123 Main Street, Apt 4B"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={deliveryInfo.city}
                            onChange={handleDeliveryInfoChange}
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                            placeholder="New York"
                            required
                          />
                        </div>
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Zip Code *</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={deliveryInfo.zipCode}
                            onChange={handleDeliveryInfoChange}
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                            placeholder="10001"
                            required
                          />
                        </div>
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Country *</label>
                          <select
                            name="country"
                            value={deliveryInfo.country}
                            onChange={handleDeliveryInfoChange}
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600 appearance-none cursor-pointer"
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Japan">Japan</option>
                            <option value="Singapore">Singapore</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                          </select>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        className="w-full mt-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold text-lg transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <CreditCard className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Payment Method</h3>
                        <p className="text-gray-400 text-sm">Choose your preferred payment option</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      {[
                        {
                          id: 'credit-card',
                          label: 'Credit/Debit Card',
                          icon: CreditCard,
                          badge: 'Popular'
                        },
                        {
                          id: 'paypal',
                          label: 'PayPal',
                          icon: Package,
                          badge: null
                        },
                        {
                          id: 'cod',
                          label: 'Cash on Delivery',
                          icon: Truck,
                          badge: 'Available'
                        }
                      ].map((method) => {
                        const Icon = method.icon;
                        return (
                          <motion.label
                            key={method.id}
                            whileHover={{ scale: 1.01, x: 4 }}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.id
                                ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/20'
                                : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                              }`}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-amber-500 focus:ring-amber-500 w-5 h-5"
                            />
                            <Icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-amber-400' : 'text-gray-400'}`} />
                            <span className={`flex-1 font-medium ${paymentMethod === method.id ? 'text-white' : 'text-gray-300'}`}>
                              {method.label}
                            </span>
                            {method.badge && (
                              <span className="px-2 py-1 text-xs font-semibold bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                                {method.badge}
                              </span>
                            )}
                          </motion.label>
                        );
                      })}
                    </div>

                    {paymentMethod === 'credit-card' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 mb-6 p-4 bg-gray-900/50 rounded-xl border border-gray-700"
                      >
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Card Number *</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardNumber"
                              value={cardInfo.cardNumber}
                              onChange={handleCardInfoChange}
                              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                              placeholder="1234 5678 9012 3456"
                              maxLength="19"
                              required
                            />
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Card Holder Name *</label>
                          <input
                            type="text"
                            name="cardHolder"
                            value={cardInfo.cardHolder}
                            onChange={handleCardInfoChange}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date *</label>
                            <div className="relative">
                              <input
                                type="text"
                                name="expiryDate"
                                value={cardInfo.expiryDate}
                                onChange={handleCardInfoChange}
                                className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                              />
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-300 mb-2">CVV *</label>
                            <div className="relative">
                              <input
                                type="text"
                                name="cvv"
                                value={cardInfo.cvv}
                                onChange={handleCardInfoChange}
                                className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-gray-600"
                                placeholder="123"
                                maxLength="4"
                                required
                              />
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/30 text-center mb-6"
                      >
                        <div className="text-4xl font-bold text-blue-500 mb-2">PayPal</div>
                        <p className="text-gray-300">You will be redirected to PayPal to complete your payment securely.</p>
                      </motion.div>
                    )}

                    {paymentMethod === 'cod' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-green-500/10 rounded-xl border border-green-500/30 text-center mb-6"
                      >
                        <Truck className="w-12 h-12 text-green-400 mx-auto mb-3" />
                        <h4 className="text-lg font-bold text-white mb-2">Cash on Delivery</h4>
                        <p className="text-gray-300 text-sm">Pay when you receive your order. Please keep exact change ready.</p>
                      </motion.div>
                    )}

                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        className="flex-1 py-4 bg-gray-900 text-gray-300 rounded-xl font-bold text-lg border border-gray-700 hover:border-gray-600 transition-all"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold text-lg transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                      >
                        <span>Review Order</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                          <Check className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Review Your Order</h3>
                          <p className="text-gray-400 text-sm">Please verify all details before confirming</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Delivery Info Card */}
                        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-amber-400" />
                              <h4 className="font-bold text-white">Delivery Address</h4>
                            </div>
                            <button
                              onClick={() => setStep(1)}
                              className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="text-gray-300 text-sm space-y-1">
                            <p className="font-medium text-white">{deliveryInfo.firstName} {deliveryInfo.lastName}</p>
                            <p>{deliveryInfo.email}</p>
                            <p>{deliveryInfo.phone}</p>
                            <p>{deliveryInfo.address}</p>
                            <p>{deliveryInfo.city}, {deliveryInfo.zipCode}</p>
                            <p>{deliveryInfo.country}</p>
                          </div>
                        </div>

                        {/* Payment Info Card */}
                        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-5 h-5 text-amber-400" />
                              <h4 className="font-bold text-white">Payment Method</h4>
                            </div>
                            <button
                              onClick={() => setStep(2)}
                              className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="text-gray-300 text-sm">
                            {paymentMethod === 'credit-card' && (
                              <p>Card ending in {cardInfo.cardNumber.slice(-4) || '****'}</p>
                            )}
                            {paymentMethod === 'paypal' && <p>PayPal</p>}
                            {paymentMethod === 'cod' && <p>Cash on Delivery</p>}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleBack}
                          className="flex-1 py-4 bg-gray-900 text-gray-300 rounded-xl font-bold text-lg border border-gray-700 hover:border-gray-600 transition-all"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleOrderSubmit}
                          disabled={isSubmitting}
                          className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${isSubmitting
                              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 shadow-lg shadow-amber-500/30'
                            }`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader className="w-5 h-5" />
                              </motion.div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-5 h-5" />
                              <span>Place Order</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-28"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-400" />
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cart.items && cart.items.length > 0 ? (
                    cart.items.map((item) => (
                      <div key={item._id} className="flex gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                        <img
                          src={`${API_BASE_URL}${item.productId?.image}`}
                          alt={item.productId?.name || 'Product'}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${API_BASE_URL}/images/placeholder.jpg`;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm truncate">{item.productId?.name || 'Product'}</h4>
                          <p className="text-xs text-gray-400">{item.productId?.brand || 'Brand'}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity || 1}</p>
                          <p className="text-amber-400 font-bold text-sm mt-1">
                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-4">No items</p>
                  )}
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal ({cart.itemCount || 0} items)</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-white font-medium'}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax (8%)</span>
                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-amber-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-400">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}