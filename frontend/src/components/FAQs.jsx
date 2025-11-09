import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  ShoppingBag, 
  Brush, 
  Scissors, 
  DollarSign,
  Mail,
  Phone,
  Search,
  CheckCircle,
  ArrowRight,
  Zap,
  Clock,
  Shield,
  TrendingUp,
  Star,
  Users,
  Globe,
  ExternalLink
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

export default function FAQComponent() {
  const [activeCategory, setActiveCategory] = useState('exchange');
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = {
    exchange: [
      {
        id: 'exchange-1',
        question: 'How does the shoe exchange process work?',
        answer: 'Our exchange process is simple! Select the shoes you want to exchange, choose the shoes you want in return, and submit your request. Once approved, ship your shoes to us using our prepaid label. We will verify their condition and send out your new shoes within 48 hours.'
      },
      {
        id: 'exchange-2',
        question: 'What condition do my shoes need to be in for an exchange?',
        answer: 'We accept shoes in good to excellent condition. This means minimal wear on the soles, no significant scratches or discoloration, and clean interiors. We have a detailed condition guide in your dashboard to help you determine if your shoes qualify.'
      },
      {
        id: 'exchange-3',
        question: 'How long does the exchange process typically take?',
        answer: 'The entire process usually takes 7-10 business days from submission to delivery. This includes 1-2 days for approval, 2-3 days for shipping to our facility, 1-2 days for verification, and 2-3 days for shipping to you.'
      },
      {
        id: 'exchange-4',
        question: 'Can I exchange multiple pairs at once?',
        answer: 'Yes! You can exchange up to 5 pairs in a single transaction. This helps save on shipping and processing time. Each pair will be evaluated individually according to our condition guidelines.'
      },
      {
        id: 'exchange-5',
        question: 'What if the shoes I want are not available?',
        answer: 'If your desired shoes are currently unavailable, you can add them to your wishlist and we\'ll notify you when they become available. Alternatively, you can browse similar options or receive store credit to use later.'
      },
      {
        id: 'exchange-6',
        question: 'Is there a fee for exchanging shoes?',
        answer: 'We charge a small processing fee of $15 per exchange to cover authentication, inspection, and shipping costs. However, if you have a premium membership, exchanges are completely free with no additional charges.'
      }
    ],
    customize: [
      {
        id: 'customize-1',
        question: 'What customization options do you offer?',
        answer: 'We offer a wide range of customization options including custom colors, patterns, embroidery, painted designs, personalized text, and even structural modifications for certain shoe models. You can preview your designs in our 3D customizer tool.'
      },
      {
        id: 'customize-2',
        question: 'How long does customization take?',
        answer: 'Standard customizations take 5-7 business days to complete. More complex designs involving hand-painting or structural modifications may take 10-14 business days. Rush options are available for an additional fee.'
      },
      {
        id: 'customize-3',
        question: 'Can I customize shoes I already own?',
        answer: 'Absolutely! You can send us your existing shoes for customization. We will evaluate them first to ensure they are suitable for your requested modifications, then proceed with your approved design.'
      },
      {
        id: 'customize-4',
        question: 'Do customizations affect the warranty of my shoes?',
        answer: 'While customizations may void the original manufacturer\'s warranty, we offer our own 90-day warranty on all customization work. This covers any defects in our customization but does not cover normal wear and tear.'
      },
      {
        id: 'customize-5',
        question: 'Can I request a specific design or artwork?',
        answer: 'Yes! You can upload your own designs or work with our design team to create custom artwork. We support various file formats and can help bring your vision to life. Our designers will provide mockups before starting the work.'
      },
      {
        id: 'customize-6',
        question: 'What materials do you use for customization?',
        answer: 'We use premium, industry-standard materials including Angelus leather paints, high-quality dyes, weather-resistant finishes, and durable thread for stitching. All materials are tested for longevity and color fastness.'
      }
    ],
    service: [
      {
        id: 'service-1',
        question: 'What repair and maintenance services do you provide?',
        answer: 'We offer comprehensive services including sole replacement, cleaning and sanitizing, color restoration, stitch repair, insole replacement, waterproofing, and minor structural repairs. Each service can be booked individually or as part of a package.'
      },
      {
        id: 'service-2',
        question: 'How do I know if my shoes can be repaired?',
        answer: 'Most shoes can be repaired or restored to some degree. You can submit photos through our evaluation tool, and our technicians will assess if your shoes are candidates for our services. This preliminary evaluation is free of charge.'
      },
      {
        id: 'service-3',
        question: 'What is the turnaround time for repairs?',
        answer: 'Standard repairs take 3-5 business days plus shipping time. Complex repairs may take 7-10 business days. We offer expedited service options that can reduce these timeframes by up to 50% for an additional fee.'
      },
      {
        id: 'service-4',
        question: 'How much do repair services cost?',
        answer: 'Our repair services start at $15 for basic cleaning and go up to $85 for comprehensive restoration. You will receive a detailed quote after we evaluate your shoes, and you can approve or decline before any work begins.'
      },
      {
        id: 'service-5',
        question: 'Do you offer warranties on repair work?',
        answer: 'Yes, all our repair services come with a 60-day warranty covering workmanship and materials. If you experience any issues with our work within this period, we\'ll fix it at no additional cost.'
      },
      {
        id: 'service-6',
        question: 'Can you repair luxury or designer shoes?',
        answer: 'Absolutely! We specialize in working with luxury brands and designer footwear. Our technicians are trained in handling premium materials and use specialized techniques appropriate for high-end shoes.'
      }
    ],
    resell: [
      {
        id: 'resell-1',
        question: 'How does your reselling platform work?',
        answer: 'Our reselling platform connects sellers with verified buyers. You submit your shoes for authentication, we list them with professional photos and description, handle the transaction securely, and ship to the buyer once sold. You receive payment after the buyer confirms receipt.'
      },
      {
        id: 'resell-2',
        question: 'What fees are associated with reselling?',
        answer: 'We charge a 10% commission on successful sales, plus a $5 authentication fee per pair. Premium listings with enhanced visibility have additional fees starting at $10. There are no fees to list your shoes initially.'
      },
      {
        id: 'resell-3',
        question: 'How do you determine the value of my shoes?',
        answer: 'We use market analytics comparing recent sales of similar items, condition assessment, rarity, and current demand. You can set your own price or use our suggested pricing. Our experts will help you price competitively for the fastest sale.'
      },
      {
        id: 'resell-4',
        question: 'How long does it typically take to sell shoes?',
        answer: 'Popular models in good condition typically sell within 1-2 weeks. Limited edition or rare shoes may sell faster, sometimes within hours of listing. Less common sizes or styles may take 3-4 weeks. Our analytics dashboard shows average selling times for comparable items.'
      },
      {
        id: 'resell-5',
        question: 'What happens if my shoes don\'t sell?',
        answer: 'You can choose to keep your listing active indefinitely, adjust your price based on market feedback, or request your shoes back at any time. We provide regular market insights to help you make informed pricing decisions.'
      },
      {
        id: 'resell-6',
        question: 'How do you verify authenticity?',
        answer: 'Our authentication team uses a multi-point verification process including physical inspection, UV light testing, material analysis, and comparison with manufacturer specifications. Only authenticated shoes are listed on our platform.'
      }
    ],
    shop: [
      {
        id: 'shop-1',
        question: 'What brands do you carry in your shop?',
        answer: 'We carry all major athletic and fashion footwear brands including Nike, Adidas, New Balance, Puma, Jordan, Yeezy, Converse, Vans, and many boutique and luxury brands. Our inventory changes daily with new arrivals and special releases.'
      },
      {
        id: 'shop-2',
        question: 'How do you ensure authenticity of your products?',
        answer: 'Every pair in our shop undergoes rigorous authentication by certified experts using physical inspection, UV verification, material analysis, and packaging validation. We guarantee 100% authenticity or your money back.'
      },
      {
        id: 'shop-3',
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship to over 40 countries worldwide. International shipping typically takes 7-14 business days depending on the destination. Customs fees and import duties are the responsibility of the buyer and are not included in our shipping costs.'
      },
      {
        id: 'shop-4',
        question: 'What is your return policy?',
        answer: 'We offer a 14-day return policy for unworn shoes in original packaging. Custom orders, special releases, and sale items are final sale. Return shipping is free for exchanges but paid by the customer for refunds unless the item is defective.'
      },
      {
        id: 'shop-5',
        question: 'Do you offer price matching?',
        answer: 'Yes, we offer price matching for identical products from authorized retailers. Submit a price match request with proof of the lower price within 7 days of your purchase, and we\'ll refund the difference.'
      },
      {
        id: 'shop-6',
        question: 'How often do you restock popular items?',
        answer: 'Restock frequency varies by product and availability from manufacturers. You can enable restock notifications for specific items, and we\'ll alert you immediately when they become available again.'
      }
    ]
  };

  const categories = [
    { id: 'exchange', icon: ShoppingBag, name: 'Exchange', color: 'blue' },
    { id: 'customize', icon: Brush, name: 'Customize', color: 'purple' },
    { id: 'service', icon: Scissors, name: 'Service', color: 'green' },
    { id: 'resell', icon: DollarSign, name: 'Resell', color: 'amber' },
    { id: 'shop', icon: ShoppingBag, name: 'Shop', color: 'red' }
  ];

  const stats = [
    { label: 'Questions Answered', value: '1,200+', icon: HelpCircle, color: 'blue' },
    { label: 'Avg Response Time', value: '< 2hrs', icon: Clock, color: 'purple' },
    { label: 'Customer Satisfaction', value: '97%', icon: Star, color: 'amber' },
    { label: 'Support Articles', value: '350+', icon: MessageSquare, color: 'green' }
  ];

  const supportFeatures = [
    {
      icon: Shield,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your queries',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Quick Answers',
      description: 'Get instant help with our comprehensive FAQ',
      color: 'amber'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Knowledgeable staff ready to assist you',
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Support available in multiple languages',
      color: 'purple'
    }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestionId(openQuestionId === questionId ? null : questionId);
  };

  // Filter FAQs based on search query
  const getFilteredFAQs = () => {
    if (!searchQuery.trim()) {
      return faqData[activeCategory];
    }

    const query = searchQuery.toLowerCase();
    return faqData[activeCategory].filter(
      faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  };

  const filteredFAQs = getFilteredFAQs();

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
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Help Center</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Frequently Asked Questions
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "320px" }}
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
                Find answers to common questions about our services. Can't find what you're looking for? Contact our support team.
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

          {/* Support Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {supportFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${feature.color}-500/50 transition-all shadow-lg text-center group`}
                >
                  <div className={`inline-flex p-3 bg-${feature.color}-500/10 rounded-xl mb-4 border border-${feature.color}-500/20 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="font-medium text-white text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main FAQ Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  />
                </div>
              </div>

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
                        onClick={() => {
                          setActiveCategory(category.id);
                          setSearchQuery('');
                        }}
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

              {/* FAQ Questions */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-amber-400" size={20} />
                  {categories.find(cat => cat.id === activeCategory)?.name} Questions
                  {searchQuery && (
                    <span className="ml-auto text-sm text-gray-400">
                      {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </h3>

                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-4 border border-gray-700"
                    >
                      <Search size={32} className="text-gray-500" />
                    </motion.div>
                    <h4 className="text-lg font-medium text-white mb-2">No results found</h4>
                    <p className="text-gray-400 mb-6">Try adjusting your search or browse by category</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchQuery('')}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-colors"
                    >
                      Clear Search
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      {filteredFAQs.map((item, index) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                          className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                        >
                          <button
                            onClick={() => toggleQuestion(item.id)}
                            className={`w-full p-5 text-left flex justify-between items-center transition-colors ${
                              openQuestionId === item.id ? "bg-gray-900" : "hover:bg-gray-900"
                            }`}
                          >
                            <span className="font-medium text-white pr-4">{item.question}</span>
                            <motion.span
                              animate={{ rotate: openQuestionId === item.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-amber-400 flex-shrink-0"
                            >
                              <ChevronDown size={20} />
                            </motion.span>
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
                                  <motion.p 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="text-gray-300 leading-relaxed"
                                  >
                                    {item.answer}
                                  </motion.p>
                                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-700">
                                    <button className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1">
                                      <CheckCircle size={14} />
                                      Helpful
                                    </button>
                                    <button className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1">
                                      <MessageSquare size={14} />
                                      Contact Support
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-24 space-y-6">
                {/* Contact Support */}
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-amber-500/10 rounded-xl mb-3 border border-amber-500/20">
                      <MessageSquare className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Need More Help?</h3>
                    <p className="text-gray-400 text-sm">
                      Our support team is here to assist you
                    </p>
                  </div>

                  <div className="space-y-3">
                  {[
                    {
                      icon: Mail,
                      label: 'Email Support',
                      value: 'support@solecraft.com',
                      color: 'blue'
                    },
                    {
                      icon: Phone,
                      label: 'Call Us',
                      value: '+91-7705481059',
                      color: 'green'
                    },
                    {
                      icon: MessageSquare,
                      label: 'Live Chat',
                      value: 'Available 24/7',
                      color: 'purple'
                    }
                  ].map((contact, index) => {
                      const Icon = contact.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ x: 3 }}
                          className={`flex items-center gap-3 p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-${contact.color}-500/50 transition-all cursor-pointer`}
                        >
                          <div className={`p-2 bg-${contact.color}-500/10 rounded-lg border border-${contact.color}-500/20`}>
                            <Icon className={`w-4 h-4 text-${contact.color}-400`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium">{contact.label}</p>
                            <p className="text-gray-500 text-xs truncate">{contact.value}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="pt-6 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <ExternalLink size={16} className="mr-2 text-amber-400" />
                    Quick Links
                  </h4>
                  <div className="space-y-2">
                    {[
                      'Shipping Information',
                      'Return Policy',
                      'Payment Methods',
                      'Track Order',
                      'Terms of Service',
                      'Privacy Policy'
                    ].map((link, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ x: 3 }}
                        className="w-full text-left text-sm text-gray-400 hover:text-amber-400 transition-colors py-2 flex items-center"
                      >
                        <ArrowRight size={14} className="mr-2" />
                        {link}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Help Banner */}
                <div className="pt-6 border-t border-gray-700">
                  <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-xl p-4 border border-amber-500/20">
                    <h4 className="font-medium text-white mb-2 text-sm flex items-center">
                      <TrendingUp size={16} className="mr-2 text-amber-400" />
                      Popular Topics
                    </h4>
                    <p className="text-gray-400 text-xs mb-4">
                      Browse our most searched questions
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 py-2 px-4 rounded-xl font-medium transition-colors w-full flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <Search size={16} />
                      Browse Topics
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-8 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
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

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Still Have Questions?</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Our Team Is Here to Help
                </h3>
                <p className="text-gray-800 text-lg">
                  Get personalized assistance from our support experts.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gray-900 text-amber-400 px-6 py-3 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-gray-800 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Live Chat</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}