import { useState, useEffect } from 'react';
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
  Share2,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Loader,
  Quote,
  Zap,
  Eye
} from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Vogue from '../assets/Vogue.webp';

// Configure axios
const API_BASE_URL = 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  // Data states
  const [pressReleases, setPressReleases] = useState([]);
  const [mediaCoverage, setMediaCoverage] = useState([]);
  const [pressKits, setPressKits] = useState([]);
  const [mediaAssets, setMediaAssets] = useState([]);
  const [pressContacts, setPressContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState('');

  const pressCategories = [
    { id: 'pressReleases', icon: Newspaper, name: 'Press Releases', color: 'blue' },
    { id: 'mediaCoverage', icon: Globe, name: 'Media Coverage', color: 'purple' },
    { id: 'pressKits', icon: FileText, name: 'Press Kits', color: 'green' },
    { id: 'mediaAssets', icon: Image, name: 'Media Assets', color: 'amber' }
  ];

  // Fetch all press data on component mount
  useEffect(() => {
    fetchPressData();
  }, []);

  const fetchPressData = async () => {
    setIsLoading(true);
    setDataError('');

    try {
      // Fetch all data in parallel
      const [releasesRes, coverageRes, kitsRes, assetsRes, contactsRes] = await Promise.all([
        axios.get('/api/press/releases?limit=50'),
        axios.get('/api/press/coverage?limit=50'),
        axios.get('/api/press/kits'),
        axios.get('/api/press/assets'),
        axios.get('/api/press/contacts')
      ]);

      if (releasesRes.data.success) {
        setPressReleases(releasesRes.data.releases);
      }

      if (coverageRes.data.success) {
        setMediaCoverage(coverageRes.data.coverage);
      }

      if (kitsRes.data.success) {
        setPressKits(kitsRes.data.kits);
      }

      if (assetsRes.data.success) {
        setMediaAssets(assetsRes.data.assets);
      }

      if (contactsRes.data.success) {
        setPressContacts(contactsRes.data.contacts);
      }

      // Calculate stats
      const calculatedStats = [
        { 
          label: 'Press Releases', 
          value: `${releasesRes.data.releases.length}+`, 
          icon: Newspaper, 
          color: 'blue' 
        },
        { 
          label: 'Media Features', 
          value: `${coverageRes.data.coverage.length}+`, 
          icon: Star, 
          color: 'amber' 
        },
        { 
          label: 'Downloads', 
          value: `${releasesRes.data.releases.reduce((acc, r) => acc + (r.downloads || 0), 0)}+`, 
          icon: Download, 
          color: 'green' 
        },
        { 
          label: 'Media Reach', 
          value: '10M+', 
          icon: TrendingUp, 
          color: 'purple' 
        }
      ];
      setStats(calculatedStats);

    } catch (error) {
      console.error('Error fetching press data:', error);
      setDataError('Failed to load press content. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const coverageHighlights = mediaCoverage.slice(0, 4).map(item => ({
    logo: item.publicationLogo || '/api/placeholder/120/60',
    publication: item.publication,
    title: item.excerpt.substring(0, 50) + '...'
  }));

  const togglePress = (pressId) => {
    setOpenPressId(openPressId === pressId ? null : pressId);
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

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.organization || !formData.inquiryType || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Submit to API
      const response = await axios.post('/api/press/inquiries', formData);

      if (response.data.success) {
        setSubmitSuccess(true);
        setInquiryId(response.data.inquiry.inquiryId);
        setFormData({
          name: '',
          email: '',
          organization: '',
          phoneNumber: '',
          inquiryType: '',
          message: '',
          deadline: ''
        });

        // Scroll to success message
        setTimeout(() => {
          document.getElementById('success-message')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);

        // Clear success message after 10 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setInquiryId('');
        }, 10000);
      }

    } catch (error) {
      console.error('Press inquiry submission error:', error);
      setSubmitError(
        error.response?.data?.message || 
        error.message || 
        'Failed to submit inquiry. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPressRelease = async (releaseId) => {
    try {
      // Record download
      await axios.post(`/api/press/releases/${releaseId}/download`);
      
      // In a real app, this would trigger a PDF download
      console.log(`Downloading press release: ${releaseId}`);
      
      // Refresh data to update download count
      fetchPressData();
    } catch (error) {
      console.error('Error downloading press release:', error);
    }
  };

  const handleDownloadPressKit = async (kitId) => {
    try {
      const response = await axios.post(`/api/press/kits/${kitId}/download`);
      
      if (response.data.success) {
        // In a real app, this would trigger the actual download
        window.open(response.data.downloadUrl, '_blank');
        
        // Refresh data to update download count
        fetchPressData();
      }
    } catch (error) {
      console.error('Error downloading press kit:', error);
    }
  };

  const handleDownloadMediaAsset = async (assetId) => {
    try {
      const response = await axios.post(`/api/press/assets/${assetId}/download`);
      
      if (response.data.success) {
        // In a real app, this would trigger the actual download
        window.open(response.data.downloadUrl, '_blank');
        
        // Refresh data to update download count
        fetchPressData();
      }
    } catch (error) {
      console.error('Error downloading media asset:', error);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format number helper
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading press content...</p>
        </div>
      </div>
    );
  }

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
                <Newspaper className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Media Center</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Press & Media
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "240px" }}
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
                Latest news, media resources, and information for journalists and media professionals.
              </motion.p>
            </div>
          </motion.div>

          {/* Error Message */}
          {dataError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400">{dataError}</p>
            </motion.div>
          )}

          {/* Stats Banner */}
          {stats && (
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
          )}

          {/* Press Contact Cards */}
          {pressContacts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {pressContacts.map((contact, index) => (
                <motion.div
                  key={contact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${contact.color}-500/50 transition-all shadow-lg group`}
                >
                  <div className={`inline-flex p-3 bg-${contact.color}-500/10 rounded-xl mb-4 border border-${contact.color}-500/20 group-hover:scale-110 transition-transform`}>
                    <Mail className={`w-5 h-5 text-${contact.color}-400`} />
                  </div>
                  <h3 className="font-medium text-white text-lg mb-1">{contact.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{contact.title}</p>
                  <div className="space-y-2">
                    <a href={`mailto:${contact.email}`} className={`flex items-center text-${contact.color}-400 hover:text-${contact.color}-300 text-sm transition-colors`}>
                      <Mail size={14} className="mr-2" />
                      {contact.email}
                    </a>
                    <a href={`tel:${contact.phone}`} className={`flex items-center text-${contact.color}-400 hover:text-${contact.color}-300 text-sm transition-colors`}>
                      <Phone size={14} className="mr-2" />
                      {contact.phone}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Coverage Highlights */}
          {coverageHighlights.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center">
                  <Award className="mr-2 text-amber-400" />
                  Coverage Highlights
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Featured in leading publications worldwide
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {coverageHighlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all text-center group"
                  >
                    <div className="mb-4 h-10 flex items-center justify-center">
                      <img src={highlight.logo} alt={highlight.publication} className="h-full object-contain" />
                    </div>
                    <h4 className="text-white font-medium text-sm mb-2">{highlight.publication}</h4>
                    <p className="text-gray-400 text-xs italic">{highlight.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Press Content Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Category Navigation */}
              <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2">
                  {pressCategories.map((category) => {
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

              {/* Press Content Display */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  {activeCategory === 'pressReleases' && <Newspaper className="mr-2 text-amber-400" size={20} />}
                  {activeCategory === 'mediaCoverage' && <Globe className="mr-2 text-amber-400" size={20} />}
                  {activeCategory === 'pressKits' && <FileText className="mr-2 text-amber-400" size={20} />}
                  {activeCategory === 'mediaAssets' && <Image className="mr-2 text-amber-400" size={20} />}
                  {activeCategory === 'pressReleases' ? 'Press Releases' : 
                   activeCategory === 'mediaCoverage' ? 'Media Coverage' : 
                   activeCategory === 'pressKits' ? 'Press Kits' : 'Media Assets'}
                </h3>

                {/* Press Releases Content */}
                {activeCategory === 'pressReleases' && (
                  <div className="space-y-4">
                    {pressReleases.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No press releases available at this time.</p>
                    ) : (
                      <AnimatePresence mode="wait">
                        {pressReleases.map((press) => (
                          <motion.div
                            key={press._id}
                            variants={itemVariants}
                            className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                          >
                            <button
                              onClick={() => togglePress(press._id)}
                              className={`w-full p-5 text-left transition-colors ${
                                openPressId === press._id ? "bg-gray-900" : "hover:bg-gray-900"
                              }`}
                            >
                              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="font-medium text-white text-lg mb-2">{press.title}</h4>
                                  <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                                    <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                                      <Calendar size={14} className="text-blue-400" /> {formatDate(press.date)}
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                                      <MapPin size={14} className="text-purple-400" /> {press.location}
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                                      <Eye size={14} className="text-green-400" /> {formatNumber(press.views)}
                                    </span>
                                  </div>
                                  <p className="text-gray-300 text-sm">{press.excerpt}</p>
                                </div>
                                <ChevronDown 
                                  className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                                    openPressId === press._id ? 'rotate-180' : ''
                                  }`}
                                />
                              </div>
                            </button>
                            
                            <AnimatePresence>
                              {openPressId === press._id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-5 bg-gray-900 border-t border-gray-700">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                      <div className="md:col-span-2">
                                        <div className="prose prose-invert max-w-none">
                                          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{press.content}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-6">
                                          {press.tags.map((tag, idx) => (
                                            <span key={idx} className="bg-amber-500/10 text-amber-400 text-xs px-3 py-1.5 rounded-full border border-amber-500/20">
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="md:col-span-1">
                                        {press.image && (
                                          <img 
                                            src={press.image} 
                                            alt={press.title} 
                                            className="w-full rounded-xl mb-4 border border-gray-700" 
                                          />
                                        )}
                                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                                          <h5 className="text-white font-medium text-sm mb-3">Statistics</h5>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center">
                                              <span className="text-gray-400">Views</span>
                                              <span className="text-white font-medium">{formatNumber(press.views)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <span className="text-gray-400">Downloads</span>
                                              <span className="text-white font-medium">{press.downloads}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                      <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleDownloadPressRelease(press.releaseId)}
                                        className="py-2.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-medium transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2"
                                      >
                                        <Download size={16} />
                                        Download PDF
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="py-2.5 px-5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                                      >
                                        <Share2 size={16} />
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
                    )}
                  </div>
                )}

                {/* Media Coverage Content */}
                {activeCategory === 'mediaCoverage' && (
                  <div className="space-y-4">
                    {mediaCoverage.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No media coverage available at this time.</p>
                    ) : (
                      <AnimatePresence mode="wait">
                        {mediaCoverage.map((item) => (
                          <motion.div
                            key={item._id}
                            variants={itemVariants}
                            className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                          >
                            <button
                              onClick={() => togglePress(item._id)}
                              className={`w-full p-5 text-left transition-colors ${
                                openPressId === item._id ? "bg-gray-900" : "hover:bg-gray-900"
                              }`}
                            >
                              <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="font-medium text-white text-lg mb-2">{item.title}</h4>
                                  <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                                    <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                                      <Globe size={14} className="text-purple-400" /> {item.publication}
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                                      <Calendar size={14} className="text-blue-400" /> {formatDate(item.date)}
                                    </span>
                                  </div>
                                  <p className="text-gray-300 text-sm">{item.excerpt}</p>
                                </div>
                                <ChevronDown 
                                  className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                                    openPressId === item._id ? 'rotate-180' : ''
                                  }`}
                                />
                              </div>
                            </button>
                            
                            <AnimatePresence>
                              {openPressId === item._id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-5 bg-gray-900 border-t border-gray-700">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                      <div className="md:col-span-2">
                                        {item.quote && (
                                          <div className="bg-gray-800 rounded-xl p-5 mb-4 border border-gray-700 relative">
                                            <Quote className="absolute top-4 left-4 w-8 h-8 text-amber-500/20" />
                                            <p className="text-lg text-gray-200 italic pl-8 leading-relaxed">
                                              {item.quote}
                                            </p>
                                            {item.author && (
                                              <p className="text-amber-400 text-sm mt-3 pl-8">— {item.author}</p>
                                            )}
                                          </div>
                                        )}
                                        <a 
                                          href={item.link} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                                        >
                                          <ExternalLink size={16} />
                                          Read the full article
                                        </a>
                                      </div>
                                      <div className="md:col-span-1">
                                        {item.image && (
                                          <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full rounded-xl border border-gray-700" 
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                      <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="py-2.5 px-5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                                      >
                                        <Bookmark size={16} />
                                        Save for later
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="py-2.5 px-5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                                      >
                                        <Share2 size={16} />
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
                    )}
                  </div>
                )}

                {/* Press Kits Content */}
                {activeCategory === 'pressKits' && (
                  <div className="space-y-4">
                    {pressKits.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No press kits available at this time.</p>
                    ) : (
                      <AnimatePresence mode="wait">
                        {pressKits.map((kit) => (
                          <motion.div
                            key={kit._id}
                            variants={itemVariants}
                            whileHover={{ y: -3 }}
                            className="border border-gray-700 rounded-xl overflow-hidden p-5 hover:border-amber-500/50 transition-all bg-gray-900"
                          >
                            <div className="flex flex-col md:flex-row gap-6">
                              <div className="flex-1">
                                <h4 className="font-medium text-white text-lg mb-2">{kit.title}</h4>
                                <p className="text-gray-300 text-sm mb-4">{kit.description}</p>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                                  <span className="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded-full">
                                    <FileText size={14} className="text-blue-400" /> {kit.fileSize}
                                  </span>
                                  <span className="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded-full">
                                    <FileText size={14} className="text-purple-400" /> {kit.fileCount}
                                  </span>
                                  <span className="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded-full">
                                    <Download size={14} className="text-green-400" /> {kit.downloads} downloads
                                  </span>
                                </div>
                                {kit.thumbnails && kit.thumbnails.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {kit.thumbnails.map((thumb, idx) => (
                                      <img key={idx} src={thumb} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gray-700" />
                                    ))}
                                  </div>
                                )}
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleDownloadPressKit(kit.kitId)}
                                  className="py-2.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-medium transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2"
                                >
                                  <Download size={16} />
                                  Download Press Kit
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                )}

                {/* Media Assets Content */}
                {activeCategory === 'mediaAssets' && (
                  <div className="space-y-4">
                    {mediaAssets.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No media assets available at this time.</p>
                    ) : (
                      <AnimatePresence mode="wait">
                        {mediaAssets.map((asset) => (
                          <motion.div
                            key={asset._id}
                            variants={itemVariants}
                            whileHover={{ y: -3 }}
                            className="border border-gray-700 rounded-xl overflow-hidden p-5 hover:border-amber-500/50 transition-all bg-gray-900"
                          >
                            <div className="flex flex-col md:flex-row gap-6">
                              <div className="flex-1">
                                <h4 className="font-medium text-white text-lg mb-1">{asset.title}</h4>
                                <p className="text-amber-400 text-sm mb-3">{asset.type}</p>
                                <p className="text-gray-300 text-sm mb-4">{asset.description}</p>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                                  <span className="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded-full">
                                    <FileText size={14} className="text-blue-400" /> {asset.fileSize}
                                  </span>
                                  <span className="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded-full">
                                    <FileText size={14} className="text-purple-400" /> {asset.fileCount}
                                  </span>
                                  <span className="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded-full">
                                    <Download size={14} className="text-green-400" /> {asset.downloads} downloads
                                  </span>
                                </div>
                                {asset.thumbnails && asset.thumbnails.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {asset.thumbnails.map((thumb, idx) => (
                                      <img key={idx} src={thumb} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gray-700" />
                                    ))}
                                  </div>
                                )}
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleDownloadMediaAsset(asset.assetId)}
                                  className="py-2.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-medium transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2"
                                >
                                  <Download size={16} />
                                  Download Assets
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Press Inquiry Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-24">
                {/* Success Message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      id="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-green-400 font-bold text-sm mb-1">Inquiry Submitted!</h4>
                          <p className="text-gray-300 text-xs mb-2">
                            Your inquiry ID: <span className="font-mono font-bold">{inquiryId}</span>
                          </p>
                          <p className="text-gray-400 text-xs">
                            We'll get back to you soon.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center mb-6">
                  <div className="inline-flex p-3 bg-amber-500/10 rounded-xl mb-3 border border-amber-500/20">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Press Inquiry</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Get in touch with our press team
                  </p>
                </div>
                
                {/* Error Message */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-xs">{submitError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-400 mb-1.5">
                      Organization *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all disabled:opacity-50"
                      placeholder="Publication name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
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
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all disabled:opacity-50"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all disabled:opacity-50"
                      placeholder="+91-9876543210"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-400 mb-1.5">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all disabled:opacity-50"
                    >
                      <option value="">Select an option</option>
                      <option value="interview">Interview Request</option>
                      <option value="information">Information Request</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="review">Product Review</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-400 mb-1.5">
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none disabled:opacity-50"
                      placeholder="Tell us about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span className="text-sm">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span className="text-sm">Submit Inquiry</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}