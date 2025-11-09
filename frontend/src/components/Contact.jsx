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
  FileText
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

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

  const contactCategories = [
    { id: 'general', icon: <MessageSquare />, name: 'General Inquiries' },
    { id: 'orders', icon: <ShoppingBag />, name: 'Order Support' },
    { id: 'returns', icon: <CreditCard />, name: 'Returns & Refunds' },
    { id: 'wholesale', icon: <Users />, name: 'Wholesale' }
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

  const contactInfo = {
    email: 'support@yourfashionbrand.com',
    phone: '+1 (800) 123-4567',
    address: '123 Fashion Avenue, Suite 500, New York, NY 10001',
    hours: 'Monday - Friday: 9 AM - 6 PM ET'
  };

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thanks for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      orderNumber: ''
    });
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
              <MessageSquare size={40} className="text-blue-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
            Contact Us
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-1 left-0 h-1 bg-blue-500 rounded-full"
            ></motion.div>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We're here to help! Reach out to our team with any questions, concerns, or feedback.
          </motion.p>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: <Mail size={24} />, title: "Email Us", content: contactInfo.email, delay: 0 },
            { icon: <Phone size={24} />, title: "Call Us", content: contactInfo.phone, delay: 0.1 },
            { icon: <MapPin size={24} />, title: "Visit Us", content: contactInfo.address, delay: 0.2 },
            { icon: <Clock size={24} />, title: "Hours", content: contactInfo.hours, delay: 0.3 }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + item.delay, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col items-center text-center"
            >
              <div className="bg-gray-750 p-3 rounded-full mb-4 text-blue-400">
                {item.icon}
              </div>
              <h3 className="font-medium text-white text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="lg:col-span-2"
          >
            {/* Category Navigation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6 overflow-x-auto pb-2 hide-scrollbar"
            >
              <div className="flex space-x-2 md:space-x-4">
                {contactCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ y: -3, backgroundColor: "#1f2937" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-3 rounded-lg flex items-center whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category.id 
                        ? "bg-blue-500 text-gray-900 font-medium" 
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <span className={`mr-2 ${activeCategory === category.id ? "text-gray-900" : "text-blue-400"}`}>
                      {category.icon}
                    </span>
                    <span className="text-sm">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
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
                className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-500"
              />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block text-gray-400 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                    placeholder="How can we help you?"
                  />
                </motion.div>

                {activeCategory === 'orders' && (
                  <motion.div variants={itemVariants}>
                    <label htmlFor="orderNumber" className="block text-gray-400 text-sm font-medium mb-2">
                      Order Number (if applicable)
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleInputChange}
                      className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      placeholder="e.g. ORD-12345678"
                    />
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200 resize-none"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="bg-blue-500 text-gray-900 py-3 px-8 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg flex items-center"
                  >
                    <Send size={18} className="mr-2" />
                    Send Message
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            {/* Live Chat Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden"
            >
              {/* Animated gradient overlay */}
              <motion.div 
                animate={{ 
                  x: [-100, 100],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                style={{ backgroundSize: "200% 100%" }}
              />
              
              <div className="relative z-10 text-center md:text-left mb-4 md:mb-0">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="font-bold text-xl mb-2 text-gray-900"
                >
                  Need Immediate Assistance?
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="text-gray-800"
                >
                  Our live chat support is available during business hours for urgent inquiries.
                </motion.p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="bg-gray-900 text-blue-400 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 shadow-lg relative z-10 flex items-center"
              >
                <MessageSquare className="mr-2" size={18} />
                Start Live Chat
              </motion.button>
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center mb-6">
                <HelpCircle size={24} className="text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {faqData[activeCategory].map((faq, index) => (
                    <motion.div 
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                      className="border border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className={`w-full p-4 text-left flex justify-between items-center transition-colors duration-300 ${
                          openFaqId === faq.id ? "bg-gray-750" : "hover:bg-gray-750"
                        }`}
                      >
                        <span className="font-medium text-white text-sm">{faq.question}</span>
                        <motion.span
                          animate={{ rotate: openFaqId === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-blue-400 flex-shrink-0 ml-2"
                        >
                          <ChevronDown size={18} />
                        </motion.span>
                      </button>
                      
                      <AnimatePresence>
                        {openFaqId === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 text-gray-400 text-sm bg-gray-750 border-t border-gray-700">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="mt-6 bg-gray-750 p-4 rounded-lg border border-gray-700"
              >
                <div className="flex items-center mb-3">
                  <FileText size={16} className="text-blue-400 mr-2" />
                  <h4 className="font-medium text-white">Additional Resources</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    "Shipping & Delivery Information",
                    "Return & Exchange Policy",
                    "Size Guides",
                    "Care Instructions"
                  ].map((resource, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + (idx * 0.1), duration: 0.3 }}
                      className="flex items-start"
                    >
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <span className="text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-200">{resource}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Contact Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Response Time", value: "< 24 hrs", delay: 0 },
            { label: "Customer Satisfaction", value: "98%", delay: 0.1 },
            { label: "Support Channels", value: "4", delay: 0.2 },
            { label: "Team Members", value: "24/7", delay: 0.3 }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + stat.delay, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center"
            >
              <motion.p 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.7 + stat.delay, duration: 0.5 }}
                className="text-xl md:text-2xl font-bold text-blue-400"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}