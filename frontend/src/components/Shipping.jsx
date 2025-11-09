import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Truck, Package, RefreshCw, CreditCard, Clock, MapPin, HelpCircle, MessageSquare } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ShippingReturnsComponent() {
  const [activeCategory, setActiveCategory] = useState('shipping');
  const [openQuestionId, setOpenQuestionId] = useState(null);
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
        question: 'What if I amm not home for delivery?',
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
        answer: 'International returns must be initiated within 30 days of delivery. After approval, you will receive a return authorization and instructions. Return shipping costs are the customer is responsibility unless the return is due to our error. International returns typically take 10-20 days to process after receipt.'
      }
    ]
  };

  const categories = [
    { id: 'shipping', icon: <Truck />, name: 'Shipping Options' },
    { id: 'delivery', icon: <Clock />, name: 'Delivery Times' },
    { id: 'returns', icon: <RefreshCw />, name: 'Returns Process' },
    { id: 'refunds', icon: <CreditCard />, name: 'Refund Policy' },
    { id: 'international', icon: <MapPin />, name: 'International' }
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
              <Package size={40} className="text-blue-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
            Shipping & Returns
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
            Everything you need to know about shipping options, delivery times, and our hassle-free return process.
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
                    ? "bg-blue-500 text-gray-900 font-medium" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className={`mr-2 ${activeCategory === category.id ? "text-gray-900" : "text-blue-400"}`}>
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Questions & Answers */}
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
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-500"
          />

          <div className="relative z-10 space-y-4">
            {shippingReturnsData[activeCategory]?.map((item, index) => (
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
                    className="text-blue-400 flex-shrink-0 ml-2"
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

        {/* Shipping Status Checker */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden"
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
              Need to Track Your Order?
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-gray-800"
            >
              Enter your order or tracking number to check the real-time status of your shipment.
            </motion.p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-gray-900 text-blue-400 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 shadow-lg relative z-10 flex items-center"
          >
            <Truck className="mr-2" size={18} />
            Track Order
          </motion.button>
        </motion.div>

        {/* Contact Help Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-8 bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center border border-gray-700"
        >
          <div className="relative z-10 text-center md:text-left mb-4 md:mb-0 flex items-center">
            <HelpCircle size={24} className="text-blue-400 mr-3 hidden md:block" />
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="font-bold text-xl mb-2 text-white"
              >
                Still Have Questions?
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-gray-400"
              >
                Our shipping specialists are available 24/7 to assist you.
              </motion.p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="bg-blue-500 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg relative z-10 flex items-center"
          >
            <MessageSquare className="mr-2" size={18} />
            Contact Support
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Average Shipping Time", value: "3.2 days", delay: 0 },
            { label: "Orders Processed Daily", value: "1,500+", delay: 0.1 },
            { label: "Return Satisfaction", value: "99%", delay: 0.2 },
            { label: "Countries Served", value: "40+", delay: 0.3 }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + stat.delay, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center"
            >
              <motion.p 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + stat.delay, duration: 0.5 }}
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