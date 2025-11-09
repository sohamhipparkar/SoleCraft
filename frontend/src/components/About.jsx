import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Award, 
  History, 
  MapPin, 
  Globe, 
  Briefcase,
  ChevronDown,
  ExternalLink,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Star,
  ShoppingBag
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Male from '../assets/male.png';
import Female from '../assets/female.png';
import Portland from '../assets/Portland.webp';
import Chicago from '../assets/Chicago.jpg';
import NewYork from '../assets/NewYork.jpg';   

export default function AboutUsComponent() {
  const [activeTab, setActiveTab] = useState('story');
  const [openAccordionId, setOpenAccordionId] = useState('team-1');

  const timelineData = [
    {
      year: '2010',
      title: 'The Garage Start',
      description: 'Founded in a small garage by two sneaker enthusiasts with a dream to create the ultimate sneaker destination.',
      icon: <History size={24} className="text-green-400" />
    },
    {
      year: '2013',
      title: 'First Flagship Store',
      description: 'Opened our first physical retail location in downtown Portland, becoming an instant hit in the local sneaker community.',
      icon: <MapPin size={24} className="text-green-400" />
    },
    {
      year: '2016',
      title: 'Going Global',
      description: 'Expanded our reach internationally with our e-commerce platform, shipping limited edition sneakers worldwide.',
      icon: <Globe size={24} className="text-green-400" />
    },
    {
      year: '2019',
      title: 'Sustainable Initiative',
      description: 'Launched our "Step Lightly" program focusing on sustainable materials and reduced carbon footprint in sneaker production.',
      icon: <Award size={24} className="text-green-400" />
    },
    {
      year: '2023',
      title: 'Community Impact',
      description: 'Created the SoleCraft Foundation to support urban youth through sports and arts programs in underserved communities.',
      icon: <Users size={24} className="text-green-400" />
    }
  ];

  const teamData = [
    {
      id: 'team-1',
      name: 'Heyaa Nawale',
      role: 'ADT23SOCB0435',
      image: Female
    },
    {
      id: 'team-2',
      name: 'Rohit Sharma',
      role: 'ADT23SOCB0878',
      image: Male,
    },
    {
      id: 'team-3',
      name: 'Shubham Shinde',
      role: 'ADT23SOCB1100',
      image: Male
    },
    {
      id: 'team-4',
      name: 'Soham Hipparkar',
      role: 'ADT23SOCB1135',
      image: Male
    },
    {
      id: 'team-5',
      name: 'Tanisha Sayil',
      role: 'ADT23SOCB1399',
      image: Female
    },
    {
      id: 'team-6',
      name: 'Tanishq Sayil',
      role: 'ADT23SOCB1400',
      image: Male
    },
{
      id: 'team-7',
      name: 'Valerie George',
      role: 'ADT23SOCB1410',
      image: Female
    }
  ];

  const valuesData = [
    {
      icon: <Star size={32} className="text-green-400" />,
      title: 'Authenticity',
      description: 'We guarantee 100% authentic products. Our rigorous verification process ensures every sneaker we sell is the real deal.'
    },
    {
      icon: <Users size={32} className="text-green-400" />,
      title: 'Community',
      description: 'We believe in the power of sneaker culture to bring people together across backgrounds, ages, and interests.'
    },
    {
      icon: <Award size={32} className="text-green-400" />,
      title: 'Sustainability',
      description: 'Our commitment to the planet means seeking eco-friendly materials, reducing waste, and offsetting our carbon footprint.'
    },
    {
      icon: <Globe size={32} className="text-green-400" />,
      title: 'Diversity',
      description: 'We celebrate the rich diversity of sneaker culture and strive to create an inclusive space for all enthusiasts.'
    }
  ];

  const locationData = [
    {
      city: 'Portland',
      address: '123 Sneaker Ave, Portland, OR 97205',
      hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm',
      phone: '(503) 555-1234',
      image: Portland
    },
    {
      city: 'Chicago',
      address: '456 Kicks Street, Chicago, IL 60611',
      hours: 'Mon-Sat: 10am-9pm, Sun: 11am-7pm',
      phone: '(312) 555-6789',
      image: Chicago
    },
    {
      city: 'New York',
      address: '789 Lace Lane, Brooklyn, NY 11201',
      hours: 'Mon-Sun: 10am-10pm',
      phone: '(718) 555-9012',
      image: NewYork
    }
  ];

  const toggleAccordion = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
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
          className="mb-16 text-center"
        >
          <div className="inline-block mb-5">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-800 p-4 rounded-full"
            >
              <Users size={40} className="text-green-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
            About SoleCraft
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-1 left-0 h-1 bg-green-500 rounded-full"
            ></motion.div>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            More than just a sneaker store. We're a community of collectors, athletes, artists, and enthusiasts united by our passion for sneaker culture.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-800 rounded-lg p-1">
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'story' ? "" : "#374151" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('story')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'story' 
                  ? "bg-green-500 text-gray-900" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="flex items-center">
                <History size={18} className="mr-2" />
                Our Story
              </div>
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'team' ? "" : "#374151" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('team')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'team' 
                  ? "bg-green-500 text-gray-900" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="flex items-center">
                <Users size={18} className="mr-2" />
                Our Team
              </div>
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'locations' ? "" : "#374151" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('locations')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'locations' 
                  ? "bg-green-500 text-gray-900" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                Locations
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div
              key="story-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main Story Content */}
              <div className="lg:col-span-2">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg mb-8"
                >
                  <motion.h3 
                    variants={itemVariants}
                    className="text-2xl font-bold text-white mb-6 flex items-center"
                  >
                    <History size={24} className="text-green-400 mr-3" />
                    Our Journey
                  </motion.h3>

                  <motion.div 
                    variants={itemVariants}
                    className="prose prose-invert max-w-none"
                  >
                    <p className="text-gray-300 mb-4">
                      Founded in 2010, SoleCraft began as a passion project between two friends who shared an obsession with sneaker culture. What started in a small garage in Portland has grown into a global community of sneaker enthusiasts.
                    </p>
                    <p className="text-gray-300 mb-4">
                      Our mission has always remained the same: to celebrate sneaker culture in all its forms and create a space where enthusiasts can find rare, authentic footwear while connecting with a like-minded community.
                    </p>
                    <p className="text-gray-300">
                      Today, SoleCraft operates flagship stores in major cities across the US and ships limited edition, carefully authenticated sneakers to collectors worldwide. We've built partnerships with major brands and independent designers alike, always staying true to our roots in street culture, sports, and artistic expression.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-white mb-8">Our Timeline</h3>

                  <div className="space-y-8">
                    {timelineData.map((item, index) => (
                      <motion.div 
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                        className="flex"
                      >
                        {/* Timeline connector */}
                        <div className="flex flex-col items-center mr-4">
                          <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
                            {item.icon}
                          </div>
                          {index < timelineData.length - 1 && (
                            <div className="h-24 w-0.5 bg-gray-700 mt-2"></div>
                          )}
                        </div>

                        <div className="pt-2">
                          <div className="flex items-baseline mb-2">
                            <h4 className="text-xl font-bold text-white">{item.title}</h4>
                            <span className="ml-3 px-3 py-1 bg-gray-700 rounded-full text-sm text-green-400">{item.year}</span>
                          </div>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Values Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Our Values</h3>

                  <div className="space-y-6">
                    {valuesData.map((value, index) => (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                        className="bg-gray-750 p-4 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center mb-3">
                          <div className="mr-3">
                            {value.icon}
                          </div>
                          <h4 className="text-lg font-medium text-white">{value.title}</h4>
                        </div>
                        <p className="text-gray-400 text-sm">{value.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-6">By The Numbers</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="bg-gray-750 p-4 rounded-lg text-center border border-gray-700"
                    >
                      <span className="block text-3xl font-bold text-green-400 mb-1">15+</span>
                      <span className="text-sm text-gray-400">Years in Business</span>
                    </motion.div>

                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="bg-gray-750 p-4 rounded-lg text-center border border-gray-700"
                    >
                      <span className="block text-3xl font-bold text-green-400 mb-1">250K+</span>
                      <span className="text-sm text-gray-400">Sneakers Sold</span>
                    </motion.div>

                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="bg-gray-750 p-4 rounded-lg text-center border border-gray-700"
                    >
                      <span className="block text-3xl font-bold text-green-400 mb-1">50+</span>
                      <span className="text-sm text-gray-400">Brand Partners</span>
                    </motion.div>

                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="bg-gray-750 p-4 rounded-lg text-center border border-gray-700"
                    >
                      <span className="block text-3xl font-bold text-green-400 mb-1">12</span>
                      <span className="text-sm text-gray-400">Countries Served</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              key="team-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg mb-8"
              >
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-10"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">Meet Our Team</h3>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    The passionate individuals behind SoleCraft who share a common love for sneaker culture and community building.
                  </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3">
                  {teamData.map((member, index) => (
                    <motion.div
                      key={member.id}
                      variants={itemVariants}
                      className="bg-gray-750 rounded-xl border border-gray-700 overflow-hidden"
                    >
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-64 object-cover" 
                      />
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                        <p className="text-green-400 text-sm mb-4">{member.role}</p>                     
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Careers Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gradient-to-r from-gray-800 to-gray-850 rounded-xl p-8 border border-gray-700 shadow-lg relative overflow-hidden"
              >
                {/* Decorative elements */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.03 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-green-500"
                />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.03 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-green-500"
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <div className="flex items-center mb-3">
                      <Briefcase size={24} className="text-green-400 mr-3" />
                      <h3 className="text-2xl font-bold text-white">Join Our Team</h3>
                    </div>
                    <p className="text-gray-400 mb-4 max-w-lg">
                      Passionate about sneakers and want to be part of our community? We're always looking for talented individuals to join our growing team.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-green-500 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 shadow-lg flex items-center"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      View Open Positions
                    </motion.button>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <ShoppingBag size={100} className="text-gray-700" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'locations' && (
            <motion.div
              key="locations-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg mb-8"
              >
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-10"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">Our Flagship Stores</h3>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Visit one of our retail locations to explore our curated collection of sneakers, apparel, and accessories.
                  </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3">
                  {locationData.map((location, index) => (
                    <motion.div
                      key={location.city}
                      variants={itemVariants}
                      className="bg-gray-750 rounded-xl border border-gray-700 overflow-hidden"
                    >
                      <img 
                        src={location.image} 
                        alt={`${location.city} Store`} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                          <MapPin size={18} className="text-green-400 mr-2" />
                          {location.city}
                        </h4>
                        
                        <div className="space-y-2 text-gray-400 text-sm mb-4">
                          <p>{location.address}</p>
                          <p>{location.hours}</p>
                          <p>{location.phone}</p>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full bg-gray-700 hover:bg-gray-650 text-white py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                        >
                          <MapPin size={16} className="mr-2" />
                          Get Directions
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Global Presence */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Globe size={24} className="text-green-400 mr-3" />
                  Global Presence
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-750 p-6 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-medium text-white mb-4">International Shipping</h4>
                    <p className="text-gray-400 mb-4">
                      Can't visit us in person? We ship to over 100 countries worldwide with expedited options available for serious collectors.
                    </p>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-green-400 mr-2" />
                        Fast international shipping
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-green-400 mr-2" />
                        Fully insured packages
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-green-400 mr-2" />
                        Real-time tracking
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-750 p-6 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-medium text-white mb-4">Pop-Up Events</h4>
                    <p className="text-gray-400 mb-4">
                      We regularly host pop-up shops and events in major cities around the world. Follow our social media to stay updated.
                    </p>
                    <div className="flex space-x-3 mt-6">
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                        <Twitter size={20} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                        <Facebook size={20} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                        <Youtube size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Contact CTA */}
                <div className="mt-8 bg-gray-750 border border-gray-700 p-6 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h4 className="text-lg font-medium text-white mb-2">Have Questions?</h4>
                      <p className="text-gray-400">
                        Our team is here to help with any questions about our locations or services.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-green-500 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 shadow-lg flex items-center"
                    >
                      <Mail size={18} className="mr-2" />
                      Contact Us
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

const CheckCircle = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  )
}