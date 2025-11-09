  import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Truck, 
  Package, 
  RefreshCw, 
  CreditCard, 
  Clock, 
  MapPin, 
  HelpCircle, 
  MessageSquare,
  Globe,
  AlertCircle,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Search,
  ArrowRight
} from 'lucide-react';
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

export default function ShippingReturnsComponent() {
  const [activeCategory, setActiveCategory] = useState('shipping');
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  const shippingReturnsData = {
    shipping: [
      {
        id: 'shipping-1',
        question: 'What shipping options do you offer?',
        answer: 'We offer several shipping options to meet your needs: Standard (5-7 business days), Expedited (2-3 business days), and Overnight (next business day if ordered before 2pm EST). International shipping is available to select countries with delivery times of 7-14 business days.'
      },
      {
        id: 'shipping-2',
        question: 'How much does shipping cost?',
        answer: 'Standard shipping is free on all orders over $75. Orders under $75 have a flat rate of $7.95. Expedited shipping costs $14.95, and Overnight delivery is $24.95. International shipping rates vary by destination and start at $19.95.'
      },
      {
        id: 'shipping-3',
        question: 'Do you ship to PO boxes or APO/FPO addresses?',
        answer: 'Yes, we ship to PO boxes using USPS, but only with Standard shipping. We also ship to APO/FPO addresses but delivery times may be extended. Overnight and Expedited options are not available for these address types.'
      },
      {
        id: 'shipping-4',
        question: 'Can I track my order?',
        answer: 'Absolutely! Once your order ships, you will receive a confirmation email with tracking information. You can also view your order status and tracking details by logging into your account on our website or using the tracking link in your shipping confirmation email.'
      }
    ],
    delivery: [
      {
        id: 'delivery-1',
        question: 'How long will it take to receive my order?',
        answer: 'Processing typically takes 1-2 business days before shipping. After that, delivery times depend on your chosen shipping method: Standard (5-7 days), Expedited (2-3 days), or Overnight (next business day). Custom or pre-order items may require additional processing time.'
      },
      {
        id: 'delivery-2',
        question: 'Do you deliver on weekends?',
        answer: 'Weekend delivery is available in select areas for Overnight shipping. Standard and Expedited shipments are typically delivered Monday through Friday. Please note that orders placed after Friday at 2pm EST will begin processing on the following business day.'
      },
      {
        id: 'delivery-3',
        question: 'What if I am not home for delivery?',
        answer: 'Delivery procedures vary by carrier. Most packages not requiring a signature will be left at your door. For packages requiring signatures, carriers will usually leave a notice and attempt delivery the next business day, or you can arrange pickup at their facility.'
      },
      {
        id: 'delivery-4',
        question: 'Do you offer same-day delivery?',
        answer: 'We offer same-day delivery in select major cities for orders placed before 11am local time. This service has a $19.95 fee and is limited to in-stock items. You can check eligibility by entering your zip code during checkout.'
      }
    ],
    returns: [
      {
        id: 'returns-1',
        question: 'What is your return policy?',
        answer: 'We accept returns of unworn, unwashed items in original packaging within 30 days of delivery. Sale items and custom orders are final sale. Before initiating a return, please review our condition requirements in your account dashboard or on the packing slip included with your order.'
      },
      {
        id: 'returns-2',
        question: 'How do I start a return?',
        answer: 'To initiate a return, log into your account and select the order containing the item(s) you wish to return. Follow the prompts to generate a return label and packing slip. Alternatively, contact our customer service team and they can assist you with the return process.'
      },
      {
        id: 'returns-3',
        question: 'Is there a fee for returns?',
        answer: 'Returns for exchange or store credit are free of charge. Returns for refunds to your original payment method incur a $7.95 return shipping and restocking fee, which is deducted from your refund amount. This fee is waived if the return is due to a mistake on our part.'
      },
      {
        id: 'returns-4',
        question: 'How long does the return process take?',
        answer: 'Once we receive your return, it takes 2-3 business days to inspect and process. Refunds typically appear in your account within 5-10 business days after processing, depending on your financial institution. Exchanges are shipped within 1-2 business days after processing.'
      }
    ],
    refunds: [
      {
        id: 'refunds-1',
        question: 'How are refunds processed?',
        answer: 'Refunds are processed to your original payment method unless you request store credit. The full purchase price minus any return fees (if applicable) will be refunded. Original shipping charges are non-refundable unless the return is due to our error.'
      },
      {
        id: 'refunds-2',
        question: 'How long until I receive my refund?',
        answer: 'After we process your return, refunds to credit cards typically appear within 5-7 business days. Debit card and PayPal refunds usually take 3-5 business days. Bank transfers may take 7-10 business days. Store credit is applied immediately after processing.'
      },
      {
        id: 'refunds-3',
        question: 'Can I exchange instead of refund?',
        answer: 'Yes, we are happy to exchange your items. During the return process, simply select "Exchange" and choose the new item you want. If there is a price difference, we will either charge or refund the difference. Exchanges ship free of charge after we receive and process your returned item.'
      },
      {
        id: 'refunds-4',
        question: 'What if I received a damaged or incorrect item?',
        answer: 'If you receive a damaged or incorrect item, please contact us within 48 hours of delivery. Send photos of the issue to our support team, and we will provide a prepaid return label. Once verified, we will ship a replacement immediately or process a full refund including original shipping charges.'
      }
    ],
    international: [
      {
        id: 'international-1',
        question: 'Which countries do you ship to?',
        answer: 'We currently ship to over 40 countries including Canada, Mexico, the UK, most EU countries, Australia, New Zealand, Japan, and South Korea. For a complete list of countries and shipping rates, please visit our International Shipping page.'
      },
      {
        id: 'international-2',
        question: 'Are there additional fees for international orders?',
        answer: 'International orders may be subject to import duties, customs fees, and taxes imposed by the destination country. These fees are the responsibility of the recipient and are not included in our shipping charges. Please check your local customs regulations before ordering.'
      },
      {
        id: 'international-3',
        question: 'How long do international deliveries take?',
        answer: 'International Standard shipping typically takes 7-14 business days, while International Express takes 3-5 business days. These timeframes do not include potential customs delays, which can add 2-5 additional days depending on the country and current processing volumes.'
      },
      {
        id: 'international-4',
        question: 'How do international returns work?',
        answer: 'International returns must be initiated within 30 days of delivery. After approval, you will receive a return authorization and instructions. Return shipping costs are the customer\'s responsibility unless the return is due to our error. International returns typically take 10-20 days to process after receipt.'
      }
    ]
  };

  const categories = [
    { id: 'shipping', icon: Truck, name: 'Shipping Options', color: 'blue' },
    { id: 'delivery', icon: Clock, name: 'Delivery Times', color: 'purple' },
    { id: 'returns', icon: RefreshCw, name: 'Returns Process', color: 'green' },
    { id: 'refunds', icon: CreditCard, name: 'Refund Policy', color: 'amber' },
    { id: 'international', icon: Globe, name: 'International', color: 'red' }
  ];

  const shippingOptions = [
    {
      icon: Truck,
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      price: 'Free over $75',
      color: 'blue',
      features: ['Order tracking', 'Signature not required', 'Most economical']
    },
    {
      icon: Zap,
      name: 'Expedited Shipping',
      time: '2-3 Business Days',
      price: '$14.95',
      color: 'purple',
      features: ['Priority handling', 'Order tracking', 'Signature optional']
    },
    {
      icon: Package,
      name: 'Overnight Delivery',
      time: 'Next Business Day',
      price: '$24.95',
      color: 'amber',
      features: ['Order by 2pm EST', 'Signature required', 'Fastest option']
    },
    {
      icon: Globe,
      name: 'International',
      time: '7-14 Business Days',
      price: 'From $19.95',
      color: 'green',
      features: ['40+ countries', 'Customs included', 'Full tracking']
    }
  ];

  const stats = [
    { label: 'Avg. Shipping Time', value: '3.2 days', icon: Clock, color: 'blue' },
    { label: 'Orders Processed', value: '1,500+', icon: Package, color: 'purple' },
    { label: 'Return Satisfaction', value: '99%', icon: Star, color: 'green' },
    { label: 'Countries Served', value: '40+', icon: Globe, color: 'amber' }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: 'Secure Packaging',
      description: 'All orders carefully packed and protected',
      color: 'blue'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Every item inspected before shipping',
      color: 'green'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day hassle-free return policy',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Customer Service',
      description: '24/7 support for all shipping inquiries',
      color: 'amber'
    }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestionId(openQuestionId === questionId ? null : questionId);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    // Implement tracking logic here
    console.log('Tracking order:', trackingNumber);
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
                <Package className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Delivery Information</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Shipping & Returns
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "330px" }}
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
                Fast, reliable shipping with easy returns. Everything you need to know about our delivery and return policies.
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

          {/* Shipping Options Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {shippingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${option.color}-500/50 transition-all shadow-lg group`}
                >
                  <div className={`inline-flex p-3 bg-${option.color}-500/10 rounded-xl mb-4 border border-${option.color}-500/20 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${option.color}-400`} />
                  </div>
                  <h3 className="font-medium text-white text-lg mb-2">{option.name}</h3>
                  <p className={`text-${option.color}-400 text-sm font-medium mb-1`}>{option.time}</p>
                  <p className="text-gray-500 text-xs mb-4">{option.price}</p>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400 text-xs">
                        <CheckCircle className={`w-3 h-3 text-${option.color}-400 mr-2`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Order Tracking Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden"
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

            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Search className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Track Your Order</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Where's My Package?
                </h3>
                <p className="text-gray-800">
                  Enter your tracking or order number to check real-time status
                </p>
              </div>

              <form onSubmit={handleTrackOrder} className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking or order number"
                      className="w-full bg-white/95 backdrop-blur-sm border-2 border-gray-900/10 rounded-xl px-6 py-4 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 outline-none transition-all text-lg"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="bg-gray-900 text-amber-400 px-8 py-4 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-gray-800 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                    <span>Track Order</span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Guarantees Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center">
                <Award className="mr-2 text-amber-400" />
                Our Shipping Guarantees
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Committed to providing the best shipping experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((guarantee, index) => {
                const Icon = guarantee.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className={`bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-${guarantee.color}-500/50 transition-all text-center group`}
                  >
                    <div className={`inline-flex p-3 bg-${guarantee.color}-500/10 rounded-xl mb-4 border border-${guarantee.color}-500/20 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${guarantee.color}-400`} />
                    </div>
                    <h4 className="text-white font-medium text-lg mb-2">{guarantee.title}</h4>
                    <p className="text-gray-400 text-sm">{guarantee.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Category Navigation */}
              <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                          activeCategory === category.id 
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30' 
                            : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{category.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Questions & Answers */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-amber-400" size={20} />
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {shippingReturnsData[activeCategory]?.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                      >
                        <button
                          onClick={() => toggleQuestion(item.id)}
                          className={`w-full p-5 text-left transition-colors flex justify-between items-center ${
                            openQuestionId === item.id ? "bg-gray-900" : "hover:bg-gray-900"
                          }`}
                        >
                          <span className="font-medium text-white pr-4">{item.question}</span>
                          <ChevronDown 
                            className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                              openQuestionId === item.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {openQuestionId === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 bg-gray-900 border-t border-gray-700">
                                <p className="text-gray-300 leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Help & Support Sidebar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-24">
                <div className="text-center mb-6">
                  <div className="inline-flex p-3 bg-amber-500/10 rounded-xl mb-3 border border-amber-500/20">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
                  <p className="text-gray-400 text-sm">
                    Our support team is here 24/7
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <motion.a
                    href="/contact"
                    whileHover={{ x: 3 }}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Live Chat</p>
                        <p className="text-gray-500 text-xs">Available now</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
                  </motion.a>

                  <motion.a
                    href="mailto:support@solecraft.com"
                    whileHover={{ x: 3 }}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Email Us</p>
                        <p className="text-gray-500 text-xs">Reply within 24h</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
                  </motion.a>

                  <motion.a
                    href="tel:+91-9876543210"
                    whileHover={{ x: 3 }}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                        <MessageSquare className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Call Us</p>
                        <p className="text-gray-500 text-xs">Mon-Fri 9AM-6PM</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
                  </motion.a>
                </div>

                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-4 h-4 text-amber-400 mr-2" />
                    <h4 className="font-medium text-white text-sm">Popular Resources</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                        {[
                          "Size & Fit Guide",
                          "Shipping Calculator",
                          "Return Portal",
                          "Track My Order"
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