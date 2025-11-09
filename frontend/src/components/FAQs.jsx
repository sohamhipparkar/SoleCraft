import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, PlusCircle, HelpCircle, MessageSquare, ShoppingBag, Brush, Scissors, DollarSign } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function FAQComponent() {

  const [activeCategory, setActiveCategory] = useState('exchange');
  const [openQuestionId, setOpenQuestionId] = useState(null);

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
        answer: 'While customizations may void the original manufacturers warranty, we offer our own 90-day warranty on all customization work. This covers any defects in our customization but does not cover normal wear and tear.'
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
      }
    ]
  };

  const categories = [
    { id: 'exchange', icon: <ShoppingBag />, name: 'Exchange Shoes' },
    { id: 'customize', icon: <Brush />, name: 'Customize Shoes' },
    { id: 'service', icon: <Scissors />, name: 'Service Shoes' },
    { id: 'resell', icon: <DollarSign />, name: 'Resell Shoes' },
    { id: 'shop', icon: <ShoppingBag />, name: 'Shop Shoes' }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestionId(openQuestionId === questionId ? null : questionId);
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
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content - with proper spacing */}
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* FAQ Header */}
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
                <HelpCircle size={40} className="text-amber-400" />
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
              Frequently Asked Questions
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-1 left-0 h-1 bg-amber-500 rounded-full"
              ></motion.div>
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Find answers to common questions about our services. Can't find what you're looking for? Contact our support team.
            </motion.p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-10 overflow-x-auto pb-2 hide-scrollbar"
          >
            <div className="flex space-x-2 md:space-x-4 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ y: -3, backgroundColor: "#1f2937" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-3 rounded-lg flex items-center whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id 
                      ? "bg-amber-500 text-gray-900 font-medium" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className={`mr-2 ${activeCategory === category.id ? "text-gray-900" : "text-amber-400"}`}>
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Questions & Answers */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg relative overflow-hidden"
          >
            {/* Decorative elements */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-500"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-amber-500"
            />

            <div className="relative z-10 space-y-4">
              {faqData[activeCategory]?.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="border border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className={`w-full p-4 text-left flex justify-between items-center transition-colors duration-300 ${
                      openQuestionId === item.id ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-750"
                    }`}
                  >
                    <span className="font-medium text-white">{item.question}</span>
                    <motion.span
                      animate={{ rotate: openQuestionId === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-amber-400 flex-shrink-0 ml-2"
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
                        <div className="p-4 pt-0 bg-gray-800 border-t border-gray-700">
                          <motion.p 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-gray-300"
                          >
                            {item.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-12 bg-gradient-to-r from-amber-500 to-amber-700 rounded-xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden"
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
                transition={{ delay: 0.6, duration: 0.5 }}
                className="font-bold text-xl mb-2 text-gray-900"
              >
                Still Have Questions?
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-gray-800"
              >
                Our support team is here to help with any questions about our services.
              </motion.p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-gray-900 text-amber-400 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 shadow-lg relative z-10 flex items-center"
            >
              <MessageSquare className="mr-2" size={18} />
              Contact Support
            </motion.button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Questions Answered", value: "1,200+", delay: 0 },
              { label: "Support Response Time", value: "< 2 hours", delay: 0.1 },
              { label: "Customer Satisfaction", value: "97%", delay: 0.2 },
              { label: "Knowledge Base Articles", value: "350+", delay: 0.3 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + stat.delay, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center"
              >
                <motion.p 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + stat.delay, duration: 0.5 }}
                  className="text-xl md:text-2xl font-bold text-amber-400"
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}