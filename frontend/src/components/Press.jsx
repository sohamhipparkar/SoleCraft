import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, 
  Mail, 
  Globe, 
  Users, 
  Calendar, 
  Send, 
  Download, 
  ChevronDown, 
  Award,
  FileText,
  Camera,
  Bookmark,
  MapPin,
  ExternalLink,
  MessageSquare,
  Image,
  Phone,
  Share2
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Vogue from '../assets/Vogue.webp';

export default function PressComponent() {
  const [activeCategory, setActiveCategory] = useState('pressReleases');
  const [openPressId, setOpenPressId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phoneNumber: '',
    inquiryType: '',
    message: '',
    deadline: ''
  });

  const pressCategories = [
    { id: 'pressReleases', icon: <Newspaper />, name: 'Press Releases' },
    { id: 'mediaCoverage', icon: <Globe />, name: 'Media Coverage' },
    { id: 'pressKits', icon: <FileText />, name: 'Press Kits' },
    { id: 'mediaAssets', icon: <Image />, name: 'Media Assets' }
  ];

  const pressData = {
    pressReleases: [
      {
        id: 'press-1',
        title: 'Solecraft Announces New Sustainable Collection',
        date: 'April 15, 2025',
        location: 'New York, NY',
        excerpt: 'Leading fashion brand Solecraft unveils its groundbreaking eco-friendly collection made from 100% recycled materials.',
        content: `Solecraft, the innovative fashion brand known for pushing boundaries in design and sustainability, today announced the launch of its most eco-conscious collection to date. "Solecraft Earth" features apparel made entirely from recycled materials, including ocean plastic and post-consumer textiles.The collection, which will be available worldwide starting May 1, 2025, includes over 50 pieces ranging from everyday basics to statement pieces, all designed with the brand's signature aesthetic while maintaining a commitment to minimal environmental impact."This collection represents the culmination of years of research and development into sustainable materials and manufacturing processes," said Elena Vega, Creative Director at Solecraft. "We've proven that fashion can be both beautiful and responsible."The company has partnered with environmental organizations to ensure each garment's production offsets its carbon footprint through investment in reforestation and renewable energy projects.`,
        image: '/api/placeholder/600/400',
        tags: ['Sustainability', 'Collection Launch', 'Eco-Fashion']
      },
      {
        id: 'press-2',
        title: 'Solecraft Opens Flagship Store in Milan',
        date: 'March 20, 2025',
        location: 'Milan, Italy',
        excerpt: 'The brand expands its European presence with an innovative retail concept in the heart of Milans fashion district.',
        content: `Solecraft continues its global expansion with the opening of a new flagship store in Milan's prestigious fashion district. The 6,000-square-foot space located on Via Montenapoleone showcases the brand's complete range of products in an immersive retail environment.The store, designed by renowned architect Marco Bianchi, features a revolutionary layout that blends digital and physical shopping experiences. Interactive displays allow customers to explore the brand's full catalog and customize products, while tactile elements throughout the space invite visitors to engage with materials and craftsmanship."Milan represents the perfect intersection of heritage and innovation in fashion," said Carlos Rodriguez, Global Retail Director at Solecraft. "Our new flagship store honors that tradition while introducing a retail concept that points toward the future of shopping."The Milan location joins the brand's growing portfolio of international stores, including locations in New York, Tokyo, London, and Paris. To celebrate the opening, Solecraft has created an exclusive "Milano Collection" available only at the new location.`,
        image: '/api/placeholder/600/400',
        tags: ['Retail Expansion', 'Milan', 'Flagship Store']
      },
      {
        id: 'press-3',
        title: 'Solecraft Announces Collaboration with Renowned Artist Wei Zhang',
        date: 'February 5, 2025',
        location: 'Paris, France',
        excerpt: 'The limited-edition collection fuses high fashion with contemporary art in a groundbreaking partnership.',
        content: `Solecraft is proud to announce an exclusive collaboration with celebrated contemporary artist Wei Zhang. The collection, titled "Metamorphosis," combines Zhang's distinctive visual language with Solecraft's innovative approach to fashion design.The limited-edition capsule collection features 15 unique pieces that blur the line between wearable art and high fashion. Each item incorporates Zhang's signature abstract patterns and vibrant color palette, transformed through various textile techniques including digital printing, embroidery, and jacquard weaving."Working with Solecraft has been an exciting journey of translating my artistic vision into a new medium," said Wei Zhang. "Together, we've created pieces that maintain their artistic integrity while functioning as beautifully crafted garments."The collaboration will launch with an exhibition at the Centre Pompidou in Paris on March 1, 2025, where the collection will be displayed alongside Zhang's original artworks that inspired the designs. Following the exhibition, the collection will be available for purchase at select Solecraft locations worldwide and through the brand's website.`,
        image: '/api/placeholder/600/400',
        tags: ['Artist Collaboration', 'Limited Edition', 'Art and Fashion']
      }
    ],
    mediaCoverage: [
      {
        id: 'media-1',
        title: 'Solecraft Featured in Vogues "Brands Defining the Future of Fashion"',
        publication: 'Vogue',
        date: 'April 10, 2025',
        excerpt: 'The prestigious fashion magazine highlights Solecrafts innovative approach to sustainable luxury.',
        link: '#',
        image: Vogue,
        quote: '"What sets Solecraft apart is their unwavering commitment to innovation without compromising on aesthetics or ethics. They are proving that the future of fashion is both beautiful and responsible."'
      },
      {
        id: 'media-2',
        title: 'How Solecraft is Revolutionizing Fashion Supply Chains',
        publication: 'Business of Fashion',
        date: 'March 15, 2025',
        excerpt: 'An in-depth analysis of the brands transparent approach to manufacturing and distribution.',
        link: '#',
        image: '/api/placeholder/600/400',
        quote: '"Through blockchain-verified sourcing and an open-book approach to production, Solecraft has created a new standard for transparency in the fashion industry. Their supply chain innovations are already influencing practices across the sector."'
      },
      {
        id: 'media-3',
        title: 'Solecrafts CEO Named Among "40 Under 40" Business Leaders',
        publication: 'Fortune',
        date: 'February 22, 2025',
        excerpt: 'The business magazine recognizes Julia Chens transformative leadership and vision.',
        link: '#',
        image: '/api/placeholder/600/400',
        quote: '"Chen has successfully positioned Solecraft at the intersection of technology, sustainability, and high fashion – creating a brand that resonates deeply with conscious consumers while delivering impressive financial results."'
      }
    ],
    pressKits: [
      {
        id: 'kit-1',
        title: 'Solecraft Brand Media Kit',
        description: 'Comprehensive information about our brand, including mission statement, history, leadership profiles, and high-resolution logos.',
        fileSize: '15.2 MB',
        lastUpdated: 'April 2025',
        thumbnails: [
          '/api/placeholder/120/120',
          '/api/placeholder/120/120',
          '/api/placeholder/120/120'
        ]
      },
      {
        id: 'kit-2',
        title: 'Solecraft Earth Collection Press Kit',
        description: 'Details on our sustainable collection including product information, sustainability metrics, manufacturing process, and campaign imagery.',
        fileSize: '22.8 MB',
        lastUpdated: 'April 2025',
        thumbnails: [
          '/api/placeholder/120/120',
          '/api/placeholder/120/120',
          '/api/placeholder/120/120'
        ]
      },
      {
        id: 'kit-3',
        title: 'Milan Flagship Store Press Kit',
        description: 'Information about our new retail concept, store design, exclusive products, and high-resolution photography of the location.',
        fileSize: '18.4 MB',
        lastUpdated: 'March 2025',
        thumbnails: [
          '/api/placeholder/120/120',
          '/api/placeholder/120/120',
          '/api/placeholder/120/120'
        ]
      }
    ],
    mediaAssets: [
      {
        id: 'asset-1',
        title: 'Solecraft Logo Package',
        type: 'Vector & Raster Logos',
        description: 'Official logo files in various formats (PNG, SVG, EPS) with guidelines for proper usage.',
        fileSize: '8.5 MB',
        thumbnails: [
          '/api/placeholder/120/120',
          '/api/placeholder/120/120'
        ]
      },
      {
        id: 'asset-2',
        title: 'Product Photography - Earth Collection',
        type: 'High-Resolution Images',
        description: 'Studio and lifestyle photography of key pieces from our sustainable collection.',
        fileSize: '45.2 MB',
        thumbnails: [
          '/api/placeholder/120/120',
          '/api/placeholder/120/120',
          '/api/placeholder/120/120'
        ]
      },
      {
        id: 'asset-3',
        title: 'Leadership Team Headshots',
        type: 'Professional Photographs',
        description: 'Official portraits of Solecrafts executive team for media usage.',
        fileSize: '12.7 MB',
        thumbnails: [
          '/api/placeholder/120/120',
          '/api/placeholder/120/120'
        ]
      },
      {
        id: 'asset-4',
        title: 'B-Roll Footage - Manufacturing Process',
        type: 'HD Video',
        description: 'Behind-the-scenes footage of our sustainable manufacturing facilities and processes.',
        fileSize: '250 MB',
        thumbnails: [
          '/api/placeholder/120/120'
        ]
      }
    ]
  };

  const pressContacts = {
    general: {
      name: 'Sarah Johnson',
      title: 'Head of Communications',
      email: 'press@solecraft.com',
      phone: '+1 (212) 555-0123'
    },
    europe: {
      name: 'Marco Rossi',
      title: 'European Press Relations',
      email: 'europe@solecraft.com',
      phone: '+39 02 1234 5678'
    },
    asia: {
      name: 'Min-Ji Park',
      title: 'APAC Media Director',
      email: 'asia@solecraft.com',
      phone: '+81 3 1234 5678'
    }
  };

  const coverageHighlights = [
    { 
      logo: '/api/placeholder/120/60', 
      publication: 'Vogue', 
      title: '"Redefining Sustainable Luxury"'
    },
    { 
      logo: '/api/placeholder/120/60', 
      publication: 'New York Times', 
      title: '"The Brand Changing Fashions Environmental Impact"'
    },
    { 
      logo: '/api/placeholder/120/60', 
      publication: 'Fast Company', 
      title: '"Most Innovative Fashion Companies 2025"'
    },
    { 
      logo: '/api/placeholder/120/60', 
      publication: 'WWD', 
      title: '"Breaking New Ground in Fashion Tech"'
    }
  ];

  const togglePress = (pressId) => {
    setOpenPressId(openPressId === pressId ? null : pressId);
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
    console.log('Inquiry submitted:', formData);
    alert('Thanks for your inquiry! Our press team will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      organization: '',
      phoneNumber: '',
      inquiryType: '',
      message: '',
      deadline: ''
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
              <Newspaper size={40} className="text-blue-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
            Press & Media
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
            Latest news, media resources, and information for journalists and media professionals.
          </motion.p>
        </motion.div>

        {/* Press Contact Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {Object.entries(pressContacts).map(([region, contact], index) => (
            <motion.div
              key={region}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col"
            >
              <div className="bg-gray-750 p-3 rounded-full mb-4 text-blue-400 w-12 h-12 flex items-center justify-center">
                {region === "general" ? <Mail size={20} /> : 
                 region === "europe" ? <Globe size={20} /> : 
                 <Users size={20} />}
              </div>
              <h3 className="font-medium text-white text-lg mb-1">{contact.name}</h3>
              <p className="text-gray-400 text-sm mb-1">{contact.title}</p>
              <div className="mt-3 space-y-2">
                <a href={`mailto:${contact.email}`} className="flex items-center text-blue-400 hover:text-blue-300 text-sm">
                  <Mail size={14} className="mr-2" />
                  {contact.email}
                </a>
                <a href={`tel:${contact.phone}`} className="flex items-center text-blue-400 hover:text-blue-300 text-sm">
                  <Phone size={14} className="mr-2" />
                  {contact.phone}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coverage Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-2xl font-bold text-white inline-block relative"
            >
              Coverage Highlights
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-1 left-0 right-0 mx-auto h-1 bg-blue-500 rounded-full"
              ></motion.div>
            </motion.h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coverageHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-blue-500 transition-all duration-300 flex flex-col items-center"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                  className="mb-4"
                >
                  <img src={highlight.logo} alt={highlight.publication} className="h-10 object-contain" />
                </motion.div>
                <h4 className="text-white font-medium text-sm">{highlight.publication}</h4>
                <p className="text-gray-400 text-xs mt-2 italic">{highlight.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Press Content Section */}
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
                {pressCategories.map((category) => (
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

            {/* Press Content Display */}
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

              <div className="relative z-10">
                <motion.h3 
                  variants={itemVariants}
                  className="text-xl font-bold text-white mb-6 flex items-center"
                >
                  {activeCategory === 'pressReleases' && <Newspaper className="mr-2 text-blue-400" size={20} />}
                  {activeCategory === 'mediaCoverage' && <Globe className="mr-2 text-blue-400" size={20} />}
                  {activeCategory === 'pressKits' && <FileText className="mr-2 text-blue-400" size={20} />}
                  {activeCategory === 'mediaAssets' && <Image className="mr-2 text-blue-400" size={20} />}
                  {activeCategory === 'pressReleases' ? 'Press Releases' : 
                   activeCategory === 'mediaCoverage' ? 'Media Coverage' : 
                   activeCategory === 'pressKits' ? 'Press Kits' : 'Media Assets'}
                </motion.h3>

                {/* Press Releases Content */}
                {activeCategory === 'pressReleases' && (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {pressData[activeCategory].map((press) => (
                        <motion.div
                          key={press.id}
                          variants={itemVariants}
                          className="border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-300"
                        >
                          <button
                            onClick={() => togglePress(press.id)}
                            className={`w-full p-4 md:p-5 text-left transition-colors duration-300 ${
                              openPressId === press.id ? "bg-gray-750" : "hover:bg-gray-750"
                            }`}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <h4 className="font-medium text-white text-lg">{press.title}</h4>
                                <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mt-2 md:space-x-4">
                                  <span className="flex items-center mb-1 md:mb-0">
                                    <Calendar size={14} className="mr-1 text-blue-400" /> {press.date}
                                  </span>
                                  <span className="flex items-center mb-1 md:mb-0">
                                    <MapPin size={14} className="mr-1 text-blue-400" /> {press.location}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm mt-2">{press.excerpt}</p>
                              </div>
                              <motion.span
                                animate={{ rotate: openPressId === press.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-blue-400 flex-shrink-0 hidden md:block"
                              >
                                <ChevronDown size={18} />
                              </motion.span>
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {openPressId === press.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 md:p-5 text-gray-300 bg-gray-750 border-t border-gray-700">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div className="md:col-span-2">
                                      <p className="whitespace-pre-line mb-4">{press.content}</p>
                                      <div className="flex flex-wrap gap-2 mt-4">
                                        {press.tags.map((tag, idx) => (
                                          <span key={idx} className="bg-gray-700 text-blue-400 text-xs px-3 py-1 rounded-full">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="md:col-span-1">
                                      <img 
                                        src={press.image} 
                                        alt={press.title} 
                                        className="w-full h-auto rounded-lg mb-4" 
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-3 mt-6">
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.97 }}
                                      className="bg-blue-500 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg flex items-center text-sm"
                                    >
                                      <Download size={16} className="mr-2" />
                                      Download PDF
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.97 }}
                                      className="bg-gray-700 text-gray-200 py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300 shadow-lg flex items-center text-sm"
                                    >
                                      <Share2 size={16} className="mr-2" />
                                      Share
                                    </motion.button>
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

                {/* Media Coverage Content */}
                {activeCategory === 'mediaCoverage' && (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {pressData[activeCategory].map((item) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          className="border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-300"
                        >
                          <button
                            onClick={() => togglePress(item.id)}
                            className={`w-full p-4 md:p-5 text-left transition-colors duration-300 ${
                              openPressId === item.id ? "bg-gray-750" : "hover:bg-gray-750"
                            }`}
                          >
                            <div className="flex flex-col md:flex-row justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-white text-lg">{item.title}</h4>
                                <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mt-2 md:space-x-4">
                                  <span className="flex items-center mb-1 md:mb-0">
                                    <Globe size={14} className="mr-1 text-blue-400" /> {item.publication}
                                  </span>
                                  <span className="flex items-center mb-1 md:mb-0">
                                    <Calendar size={14} className="mr-1 text-blue-400" /> {item.date}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm mt-2">{item.excerpt}</p>
<motion.span
                                animate={{ rotate: openPressId === item.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-blue-400 flex-shrink-0 hidden md:block"
                              >
                                <ChevronDown size={18} />
                              </motion.span>
                            </div>
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {openPressId === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 md:p-5 text-gray-300 bg-gray-750 border-t border-gray-500">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div className="md:col-span-2">
                                      <div className="bg-gray-900 p-4 rounded-lg mb-4">
                                        <p className="text-lg text-gray-200 italic mb-2">
                                          {item.quote}
                                        </p>
                                      </div>
                                      <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm"
                                      >
                                        <ExternalLink size={16} className="mr-2" />
                                        Read the full article
                                      </a>
                                    </div>
                                    <div className="md:col-span-1">
                                      <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-auto rounded-lg mb-4" 
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-3 mt-6">
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.97 }}
                                      className="bg-gray-700 text-gray-200 py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300 shadow-lg flex items-center text-sm"
                                    >
                                      <Bookmark size={16} className="mr-2" />
                                      Save for later
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.97 }}
                                      className="bg-gray-700 text-gray-200 py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300 shadow-lg flex items-center text-sm"
                                    >
                                      <Share2 size={16} className="mr-2" />
                                      Share
                                    </motion.button>
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

                {/* Press Kits Content */}
                {activeCategory === 'pressKits' && (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {pressData[activeCategory].map((kit) => (
                        <motion.div
                          key={kit.id}
                          variants={itemVariants}
                          className="border border-gray-700 rounded-lg overflow-hidden p-4 md:p-5 hover:border-blue-500 transition-colors duration-300"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-lg mb-2">{kit.title}</h4>
                              <p className="text-gray-300 text-sm mb-3">{kit.description}</p>
                              <div className="flex items-center text-sm text-gray-400 mb-4">
                                <span className="flex items-center mr-4">
                                  <FileText size={14} className="mr-1 text-blue-400" /> {kit.fileSize}
                                </span>
                                <span className="flex items-center">
                                  <Calendar size={14} className="mr-1 text-blue-400" /> Last updated: {kit.lastUpdated}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {kit.thumbnails.map((thumb, idx) => (
                                  <img key={idx} src={thumb} alt="Preview" className="w-16 h-16 rounded-md object-cover" />
                                ))}
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-blue-500 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg flex items-center text-sm"
                              >
                                <Download size={16} className="mr-2" />
                                Download Press Kit
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Media Assets Content */}
                {activeCategory === 'mediaAssets' && (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {pressData[activeCategory].map((asset) => (
                        <motion.div
                          key={asset.id}
                          variants={itemVariants}
                          className="border border-gray-700 rounded-lg overflow-hidden p-4 md:p-5 hover:border-blue-500 transition-colors duration-300"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-lg">{asset.title}</h4>
                              <p className="text-gray-400 text-sm mb-2">{asset.type}</p>
                              <p className="text-gray-300 text-sm mb-3">{asset.description}</p>
                              <div className="flex items-center text-sm text-gray-400 mb-4">
                                <span className="flex items-center">
                                  <FileText size={14} className="mr-1 text-blue-400" /> {asset.fileSize}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {asset.thumbnails.map((thumb, idx) => (
                                  <img key={idx} src={thumb} alt="Preview" className="w-16 h-16 rounded-md object-cover" />
                                ))}
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-blue-500 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg flex items-center text-sm"
                              >
                                <Download size={16} className="mr-2" />
                                Download Assets
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Press Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500"
              />
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gray-750 p-3 rounded-full text-blue-400 mb-3">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Press Inquiry</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Get in touch with our press team
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-1">Organization</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-1">Inquiry Type</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="interview">Interview Request</option>
                      <option value="information">Information Request</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">Deadline (if applicable)</label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full bg-blue-500 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg flex items-center justify-center text-sm"
                  >
                    <Send size={16} className="mr-2" />
                    Submit Inquiry
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}