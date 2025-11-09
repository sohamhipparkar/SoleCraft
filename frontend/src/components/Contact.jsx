import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  HelpCircle, 
  ChevronDown, 
  Users, 
  ShoppingBag, 
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader,
  Headphones,
  Package,
  RefreshCw,
  Star,
  TrendingUp,
  Zap
} from 'lucide-react';
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
      staggerChildren: 0.05,
      delayChildren: 0
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

export default function ContactUsComponent() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [messageId, setMessageId] = useState('');

  const contactCategories = [
    { id: 'general', icon: MessageSquare, name: 'General Inquiries', color: 'blue' },
    { id: 'orders', icon: ShoppingBag, name: 'Order Support', color: 'purple' },
    { id: 'returns', icon: RefreshCw, name: 'Returns & Refunds', color: 'green' },
    { id: 'wholesale', icon: Users, name: 'Wholesale', color: 'amber' }
  ];

  const faqData = {
    general: [
      {
        id: 'faq-1',
        question: 'What are your business hours?',
        answer: 'Our customer service team is available Monday through Friday from 9 AM to 6 PM Eastern Time. During weekends, we offer limited support via email only.'
      },
      {
        id: 'faq-2',
        question: 'Do you have physical store locations?',
        answer: 'Yes, we currently have flagship stores in New York, Los Angeles, Chicago, and Miami. You can find detailed information about each location on our Stores page.'
      },
      {
        id: 'faq-3',
        question: 'How can I track my order?',
        answer: 'You can track your order by logging into your account and visiting the Order History section. Alternatively, you can use the tracking number provided in your shipping confirmation email.'
      }
    ],
    orders: [
      {
        id: 'faq-4',
        question: 'What is your processing time for orders?',
        answer: 'Most orders are processed within 1-2 business days. During peak seasons or promotional periods, processing may take up to 3 business days.'
      },
      {
        id: 'faq-5',
        question: 'Can I modify or cancel my order?',
        answer: 'You can request modifications or cancellations within 2 hours of placing your order. Please contact our customer service team immediately with your order number.'
      },
      {
        id: 'faq-6',
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. You can calculate shipping costs at checkout.'
      }
    ],
    returns: [
      {
        id: 'faq-7',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free for domestic orders, and you can initiate the process through your account dashboard.'
      },
      {
        id: 'faq-8',
        question: 'How long does it take to process refunds?',
        answer: 'Once we receive your return, refunds typically take 3-5 business days to process and an additional 5-10 business days to appear on your statement, depending on your payment provider.'
      },
      {
        id: 'faq-9',
        question: 'Can I exchange an item for a different size or color?',
        answer: 'Yes, exchanges can be requested through our Exchange Portal in your account. If your preferred size or color is available, we will process the exchange as soon as we receive your original item.'
      }
    ],
    wholesale: [
      {
        id: 'faq-10', 
        question: 'How do I apply for a wholesale account?',
        answer: 'To apply for a wholesale account, please fill out the Wholesale Application form on our website. You will need to provide your business information, tax ID, and references. We review applications within 3-5 business days.'
      },
      {
        id: 'faq-11',
        question: 'What are your minimum order requirements?',
        answer: 'Our minimum opening order is $1,000, with subsequent minimums of $500. We offer tiered pricing discounts for larger orders.'
      },
      {
        id: 'faq-12',
        question: 'Do you offer wholesale pricing for international retailers?',
        answer: 'Yes, we work with international retailers. International orders may have different minimum requirements and shipping terms. Please contact our wholesale department for specific information.'
      }
    ]
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@solecraft.com',
      subtext: 'We reply within 24 hours',
      color: 'blue',
      action: 'mailto:support@solecraft.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91-9168495030',
      subtext: 'Mon-Fri: 9 AM - 6 PM ET',
      color: 'green',
      action: 'tel:+18001234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Sneaker Ave, NY 10001',
      subtext: 'View all locations',
      color: 'purple',
      action: '/about#locations'
    },
    {
      icon: Headphones,
      title: 'Live Chat',
      content: 'Chat with our team',
      subtext: 'Available during business hours',
      color: 'amber',
      action: '#live-chat'
    }
  ];

  const stats = [
    { label: 'Response Time', value: '< 24h', icon: Clock, color: 'blue' },
    { label: 'Satisfaction', value: '98%', icon: Star, color: 'amber' },
    { label: 'Support Channels', value: '4', icon: Headphones, color: 'green' },
    { label: 'Tickets Resolved', value: '50K+', icon: CheckCircle, color: 'purple' }
  ];

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    setMessageId('');

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please provide a valid email address');
      }

      // Validate message length
      if (formData.message.length < 10) {
        throw new Error('Message must be at least 10 characters long');
      }

      // Submit to API
      const response = await axios.post('/api/contact/submit', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        category: activeCategory,
        orderNumber: formData.orderNumber
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        setMessageId(response.data.data.messageId);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          orderNumber: ''
        });

        // Scroll to success message
        setTimeout(() => {
          document.getElementById('success-message')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);

        // Clear success message after 15 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setMessageId('');
        }, 15000);
      }

    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitError(
        error.response?.data?.message || 
        error.message || 
        'Failed to submit message. Please try again.'
      );

      // Scroll to error message
      setTimeout(() => {
        document.getElementById('error-message')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    } finally {
      setIsSubmitting(false);
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
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-4 border border-amber-500/20"
              >
                <MessageSquare className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Get In Touch</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Contact Us
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
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
                We're here to help! Reach out to our team with any questions, concerns, or feedback.
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

          {/* Contact Information Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={index}
                  href={item.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${item.color}-500/50 transition-all shadow-lg group cursor-pointer`}
                >
                  <div className={`inline-flex p-3 bg-${item.color}-500/10 rounded-xl mb-4 border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${item.color}-400`} />
                  </div>
                  <h3 className="font-medium text-white text-lg mb-2">{item.title}</h3>
                  <p className={`text-${item.color}-400 text-sm font-medium mb-1`}>{item.content}</p>
                  <p className="text-gray-500 text-xs">{item.subtext}</p>
                </motion.a>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Success Message */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    id="success-message"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-green-400 font-bold text-lg mb-2">Message Sent Successfully!</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Thank you for contacting us. Our support team will review your message and get back to you within 24 hours.
                        </p>
                        {messageId && (
                          <div className="bg-gray-900 rounded-lg p-3 border border-green-500/20">
                            <p className="text-gray-400 text-xs mb-1">Your Message ID:</p>
                            <p className="text-green-400 font-mono text-sm font-bold">{messageId}</p>
                            <p className="text-gray-500 text-xs mt-2">
                              Save this ID to track your message status or reference it in future communications.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Category Navigation */}
              <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2">
                  {contactCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                          activeCategory === category.id 
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30' 
                            : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Form */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Send className="mr-2 text-amber-400" size={20} />
                  Send Us a Message
                </h3>

                {/* Error Message */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      id="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm">{submitError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your@email.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="subject" className="block text-gray-400 text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="How can we help you?"
                    />
                  </motion.div>

                  {activeCategory === 'orders' && (
                    <motion.div 
                      variants={itemVariants}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label htmlFor="orderNumber" className="block text-gray-400 text-sm font-medium mb-2">
                        Order Number (Optional)
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="e.g. SC-123456 or SO-789012"
                      />
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      disabled={isSubmitting}
                      className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Please provide details about your inquiry..."
                      minLength={10}
                      maxLength={5000}
                    ></textarea>
                    <div className="mt-1 text-right">
                      <span className={`text-xs ${formData.message.length > 4900 ? 'text-amber-400' : 'text-gray-500'}`}>
                        {formData.message.length} / 5000
                      </span>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="flex justify-end pt-4"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Live Chat CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
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
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                      <Zap className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-semibold">Need Immediate Help?</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      Start a Live Chat
                    </h3>
                    <p className="text-gray-800 leading-relaxed">
                      Our support team is available during business hours for urgent inquiries and real-time assistance.
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gray-900 text-amber-400 px-8 py-4 rounded-xl font-bold shadow-xl flex items-center gap-2 whitespace-nowrap"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Start Chat</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-amber-400" size={20} />
                  Frequently Asked Questions
                </h3>

                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {faqData[activeCategory].map((faq, index) => (
                      <motion.div 
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + (index * 0.1), duration: 0.3 }}
                        className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className={`w-full p-4 text-left transition-colors flex justify-between items-center ${
                            openFaqId === faq.id ? "bg-gray-900" : "hover:bg-gray-900"
                          }`}
                        >
                          <span className="font-medium text-white text-sm pr-2">{faq.question}</span>
                          <ChevronDown 
                            className={`w-4 h-4 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                              openFaqId === faq.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {openFaqId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 text-gray-400 text-sm bg-gray-900 border-t border-gray-700">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-center mb-3">
                    <FileText className="w-4 h-4 text-amber-400 mr-2" />
                    <h4 className="font-medium text-white text-sm">Additional Resources</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Shipping & Delivery Info",
                      "Return & Exchange Policy",
                      "Size Guides",
                      "Care Instructions"
                    ].map((resource, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start"
                      >
                        <span className="text-amber-400 mr-2 mt-0.5">•</span>
                        <span className="text-gray-300 hover:text-amber-400 cursor-pointer transition-colors">{resource}</span>
                      </li>
                    ))}
                  </ul>
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