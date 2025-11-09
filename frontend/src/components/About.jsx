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
  ShoppingBag,
  TrendingUp,
  Clock,
  Phone,
  CheckCircle,
  Target,
  Zap,
  Heart,
  Shield,
  Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Male from '../assets/male.png';
import Female from '../assets/female.png';
import Portland from '../assets/Portland.webp';
import Chicago from '../assets/Chicago.jpg';
import NewYork from '../assets/NewYork.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function AboutUsComponent() {
  const [activeTab, setActiveTab] = useState('story');

  const timelineData = [
    {
      year: '2010',
      title: 'The Garage Start',
      description: 'Founded in a small garage by two sneaker enthusiasts with a dream to create the ultimate sneaker destination.',
      icon: History,
      color: 'green'
    },
    {
      year: '2013',
      title: 'First Flagship Store',
      description: 'Opened our first physical retail location in downtown Portland, becoming an instant hit in the local sneaker community.',
      icon: MapPin,
      color: 'blue'
    },
    {
      year: '2016',
      title: 'Going Global',
      description: 'Expanded our reach internationally with our e-commerce platform, shipping limited edition sneakers worldwide.',
      icon: Globe,
      color: 'purple'
    },
    {
      year: '2019',
      title: 'Sustainable Initiative',
      description: 'Launched our "Step Lightly" program focusing on sustainable materials and reduced carbon footprint in sneaker production.',
      icon: Award,
      color: 'amber'
    },
    {
      year: '2023',
      title: 'Community Impact',
      description: 'Created the SoleCraft Foundation to support urban youth through sports and arts programs in underserved communities.',
      icon: Users,
      color: 'pink'
    }
  ];

  const teamData = [
    {
      id: 'team-1',
      name: 'Soham Hipparkar',
      role: 'ADT23SOCB1135',
      image: Male,
      specialty: 'Full Stack Development'
    },
    {
      id: 'team-2',
      name: 'Tanisha Sayil',
      role: 'ADT23SOCB1399',
      image: Female,
      specialty: 'UI/UX Design'
    },
    {
      id: 'team-3',
      name: 'Tanishq Sayil',
      role: 'ADT23SOCB1400',
      image: Male,
      specialty: 'Backend Development'
    },
    {
      id: 'team-4',
      name: 'Prathamesh Chakankar',
      role: 'ADT23SOCB0777',
      image: Male,
      specialty: 'Database Management'
    }
  ];

  const valuesData = [
    {
      icon: Star,
      title: 'Authenticity',
      description: 'We guarantee 100% authentic products. Our rigorous verification process ensures every sneaker we sell is the real deal.',
      color: 'amber'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of sneaker culture to bring people together across backgrounds, ages, and interests.',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Sustainability',
      description: 'Our commitment to the planet means seeking eco-friendly materials, reducing waste, and offsetting our carbon footprint.',
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Diversity',
      description: 'We celebrate the rich diversity of sneaker culture and strive to create an inclusive space for all enthusiasts.',
      color: 'blue'
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

  const stats = [
    { label: 'Years in Business', value: '15+', icon: Clock, color: 'amber' },
    { label: 'Sneakers Sold', value: '250K+', icon: ShoppingBag, color: 'purple' },
    { label: 'Brand Partners', value: '50+', icon: Award, color: 'green' },
    { label: 'Countries Served', value: '12', icon: Globe, color: 'blue' }
  ];

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
                <Users className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Our Story</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                About SoleCraft
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "280px" }}
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
                More than just a sneaker store. We're a community of collectors, athletes, artists, and enthusiasts united by our passion for sneaker culture.
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

          {/* Enhanced Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: 'story', label: 'Our Story', icon: History },
                { id: 'team', label: 'Our Team', icon: Users },
                { id: 'locations', label: 'Locations', icon: MapPin }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30'
                        : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
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
                transition={{ duration: 0.3 }}
                variants={containerVariants}
              >
                {/* Main Story */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <motion.div 
                    variants={itemVariants}
                    className="lg:col-span-2 bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl"
                  >
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <History className="mr-3 text-amber-400" />
                      Our Journey
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <p>
                        Founded in 2010, SoleCraft began as a passion project between two friends who shared an obsession with sneaker culture. What started in a small garage in Portland has grown into a global community of sneaker enthusiasts.
                      </p>
                      <p>
                        Our mission has always remained the same: to celebrate sneaker culture in all its forms and create a space where enthusiasts can find rare, authentic footwear while connecting with a like-minded community.
                      </p>
                      <p>
                        Today, SoleCraft operates flagship stores in major cities across the US and ships limited edition, carefully authenticated sneakers to collectors worldwide. We've built partnerships with major brands and independent designers alike, always staying true to our roots in street culture, sports, and artistic expression.
                      </p>
                    </div>
                  </motion.div>

                  {/* Values Sidebar */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Core Values</h3>
                    <div className="space-y-4">
                      {valuesData.map((value, index) => {
                        const Icon = value.icon;
                        return (
                          <motion.div
                            key={index}
                            whileHover={{ x: 3 }}
                            className={`p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-${value.color}-500/50 transition-all`}
                          >
                            <div className={`inline-flex p-2 bg-${value.color}-500/10 rounded-lg mb-3 border border-${value.color}-500/20`}>
                              <Icon className={`w-5 h-5 text-${value.color}-400`} />
                            </div>
                            <h4 className="font-semibold text-white mb-2">{value.title}</h4>
                            <p className="text-sm text-gray-400">{value.description}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <Clock className="mr-3 text-amber-400" />
                    Our Timeline
                  </h3>

                  <div className="space-y-8">
                    {timelineData.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div 
                          key={item.year}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div className={`bg-${item.color}-500/10 rounded-xl p-3 border border-${item.color}-500/20`}>
                              <Icon className={`w-6 h-6 text-${item.color}-400`} />
                            </div>
                            {index < timelineData.length - 1 && (
                              <div className="h-full w-0.5 bg-gray-700 mt-2"></div>
                            )}
                          </div>

                          <div className="flex-1 pb-8">
                            <div className="flex items-baseline gap-3 mb-2">
                              <h4 className="text-xl font-bold text-white">{item.title}</h4>
                              <span className={`px-3 py-1 bg-${item.color}-500/10 rounded-full text-sm text-${item.color}-400 border border-${item.color}-500/20`}>
                                {item.year}
                              </span>
                            </div>
                            <p className="text-gray-400">{item.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                key="team-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-3">Meet Our Team</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      The passionate individuals behind SoleCraft who share a common love for sneaker culture and community building.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamData.map((member, index) => (
                      <motion.div
                        key={member.id}
                        variants={itemVariants}
                        whileHover={{ y: -8 }}
                        className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden hover:border-amber-500/50 transition-all shadow-lg group"
                      >
                        <div className="relative overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                          
                          <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 bg-amber-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-amber-400 border border-amber-500/30">
                              {member.specialty}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-amber-400 text-sm mb-3">{member.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Careers CTA */}
                <motion.div
                  variants={itemVariants}
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
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                        <Briefcase className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-semibold">Join Us</span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        Join Our Team
                      </h3>
                      <p className="text-gray-800 leading-relaxed max-w-2xl mb-4">
                        Passionate about sneakers and want to be part of our community? We're always looking for talented individuals to join our growing team.
                      </p>
                      <ul className="space-y-2 text-gray-800">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>Unlimited exchanges per month</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>Free authentication service</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>24/7 priority support</span>
                        </li>
                      </ul>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gray-900 text-amber-400 px-8 py-4 rounded-xl font-bold shadow-xl flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>View Positions</span>
                      <ExternalLink className="w-5 h-5" />
                    </motion.button>
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
                transition={{ duration: 0.3 }}
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-3">Our Flagship Stores</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      Visit one of our retail locations to explore our curated collection of sneakers, apparel, and accessories.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {locationData.map((location, index) => (
                      <motion.div
                        key={location.city}
                        variants={itemVariants}
                        whileHover={{ y: -8 }}
                        className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all shadow-lg group"
                      >
                        <div className="relative overflow-hidden">
                          <img 
                            src={location.image} 
                            alt={`${location.city} Store`} 
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                          
                          <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-purple-400 border border-purple-500/30 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {location.city}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="space-y-3 mb-4">
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{location.address}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                              <Clock className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{location.hours}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                              <Phone className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{location.phone}</span>
                            </div>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2.5 bg-gray-800 text-purple-400 hover:text-white border border-gray-700 hover:border-purple-500/50 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            <span>Get Directions</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Global Presence */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Globe className="mr-3 text-amber-400" />
                    Global Presence
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="bg-gray-900 p-6 rounded-xl border border-gray-700"
                    >
                      <div className="inline-flex p-3 bg-blue-500/10 rounded-xl mb-4 border border-blue-500/20">
                        <Globe className="w-6 h-6 text-blue-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-3">International Shipping</h4>
                      <p className="text-gray-400 mb-4 text-sm">
                        Can't visit us in person? We ship to over 100 countries worldwide with expedited options available for serious collectors.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          Fast international shipping
                        </li>
                        <li className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          Fully insured packages
                        </li>
                        <li className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          Real-time tracking
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="bg-gray-900 p-6 rounded-xl border border-gray-700"
                    >
                      <div className="inline-flex p-3 bg-purple-500/10 rounded-xl mb-4 border border-purple-500/20">
                        <Sparkles className="w-6 h-6 text-purple-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-3">Pop-Up Events</h4>
                      <p className="text-gray-400 mb-4 text-sm">
                        We regularly host pop-up shops and events in major cities around the world. Follow our social media to stay updated.
                      </p>
                      <div className="flex gap-3 mt-6">
                        {[Instagram, Twitter, Facebook, Youtube].map((Icon, idx) => (
                          <motion.a
                            key={idx}
                            href="#"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-all border border-gray-700"
                          >
                            <Icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                  variants={itemVariants}
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
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                        <Mail className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-semibold">Get in Touch</span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">Have Questions?</h3>
                      <p className="text-gray-800 leading-relaxed max-w-2xl">
                        Our team is here to help with any questions about our locations or services.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gray-900 text-amber-400 px-8 py-4 rounded-xl font-bold shadow-xl flex items-center gap-2 whitespace-nowrap"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Contact Us</span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}