import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Navigation, Filter, Search, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '12px'
};

const puneCenter = {
  lat: 18.5204,
  lng: 73.8567
};

// Sample cobbler data
const cobblersData = [
  {
    id: 1,
    name: "Quick Fix Cobblers",
    position: { lat: 18.5204, lng: 73.8567 },
    rating: 4.8,
    reviews: 250,
    phone: "+91 98765 43210",
    hours: "9:00 AM - 8:00 PM",
    services: ["Repair", "Polish", "Custom"],
    distance: "0.5 km"
  },
  {
    id: 2,
    name: "Master Shoe Repair",
    position: { lat: 18.5314, lng: 73.8446 },
    rating: 4.6,
    reviews: 180,
    phone: "+91 98765 43211",
    hours: "10:00 AM - 7:00 PM",
    services: ["Repair", "Restoration"],
    distance: "2.1 km"
  },
  {
    id: 3,
    name: "Premium Sole Care",
    position: { lat: 18.5089, lng: 73.8553 },
    rating: 4.9,
    reviews: 320,
    phone: "+91 98765 43212",
    hours: "8:00 AM - 9:00 PM",
    services: ["Repair", "Polish", "Custom", "Exchange"],
    distance: "1.3 km"
  },
  {
    id: 4,
    name: "City Cobblers Hub",
    position: { lat: 18.5287, lng: 73.8740 },
    rating: 4.5,
    reviews: 145,
    phone: "+91 98765 43213",
    hours: "9:30 AM - 7:30 PM",
    services: ["Repair", "Polish"],
    distance: "3.2 km"
  }
];

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
    transition: { type: "spring", stiffness: 100 }
  }
};

const FindCobbler = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState(null);
  const [selectedCobbler, setSelectedCobbler] = useState(null);
  const [hoveredCobbler, setHoveredCobbler] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const filteredCobblers = cobblersData.filter(cobbler => {
    const matchesSearch = cobbler.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesServices = selectedServices.length === 0 || 
      selectedServices.every(service => cobbler.services.includes(service));
    return matchesSearch && matchesServices;
  });

  if (!isLoaded) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <Navbar />
      <div className="pt-24 md:pt-28">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Header section with parallax effect */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ y: scrollY * -0.1 }}
            className="flex flex-col md:flex-row md:justify-between md:items-center mb-8"
          >
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-1 text-white relative inline-block">
                Find Cobblers Near You
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-1 left-0 h-1 bg-amber-500 rounded-full"
                ></motion.div>
              </h2>
              <p className="text-gray-400 text-lg">Discover trusted shoe repair services in Pune</p>
            </div>
          </motion.div>

          {/* Quick Stats Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-5 mb-8 shadow-lg border border-gray-700 overflow-hidden relative"
          >
            <motion.div 
              animate={{ 
                x: [0, 10, 0], 
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500 blur-3xl -mr-32 -mt-32"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-amber-500 bg-opacity-20 rounded-lg">
                  <MapPin className="text-amber-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Locations</p>
                  <p className="text-xl font-bold">{cobblersData.length}</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-amber-500 bg-opacity-20 rounded-lg">
                  <Star className="text-amber-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg Rating</p>
                  <p className="text-xl font-bold">4.7</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-amber-500 bg-opacity-20 rounded-lg">
                  <Phone className="text-amber-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Reviews</p>
                  <p className="text-xl font-bold">895+</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-amber-500 bg-opacity-20 rounded-lg">
                  <Navigation className="text-amber-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Coverage Area</p>
                  <p className="text-xl font-bold">15 km</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by cobbler name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>

            {/* Filter Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <motion.div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
                whileHover={{ backgroundColor: "rgba(255, 193, 7, 0.05)" }}
              >
                <div className="flex items-center">
                  <Filter size={20} className="mr-2 text-amber-400" />
                  <span className="font-medium text-white">Filter by Services</span>
                </div>
                <motion.div
                  animate={{ rotate: filterOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight size={20} className="text-amber-400" />
                </motion.div>
              </motion.div>
              
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-700"
                  >
                    <div className="p-4 flex flex-wrap gap-2">
                      {["Repair", "Polish", "Custom", "Exchange", "Restoration"].map(service => (
                        <motion.button
                          key={service}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleService(service)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedServices.includes(service)
                              ? "bg-amber-500 text-gray-900"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                        >
                          {service}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Map and Cobbler List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cobbler List */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
            >
              {filteredCobblers.map((cobbler) => (
                <motion.div
                  key={cobbler.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onHoverStart={() => setHoveredCobbler(cobbler)}
                  onHoverEnd={() => setHoveredCobbler(null)}
                  onClick={() => {
                    setSelectedCobbler(cobbler);
                    map?.panTo(cobbler.position);
                    map?.setZoom(15);
                  }}
                  className={`bg-gray-800 rounded-xl p-4 border cursor-pointer transition-all ${
                    selectedCobbler?.id === cobbler.id
                      ? "border-amber-500 shadow-lg shadow-amber-500/20"
                      : "border-gray-700 hover:border-amber-500/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white">{cobbler.name}</h3>
                    <span className="text-amber-400 text-sm font-medium">{cobbler.distance}</span>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                    <span className="text-sm font-medium mr-2">{cobbler.rating}</span>
                    <span className="text-sm text-gray-400">({cobbler.reviews} reviews)</span>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-3 h-3 mr-2" />
                      {cobbler.hours}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Phone className="w-3 h-3 mr-2" />
                      {cobbler.phone}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {cobbler.services.map(service => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-amber-500 bg-opacity-20 text-amber-400 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-2 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg"
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={puneCenter}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  styles: [
                    { elementType: "geometry", stylers: [{ color: "#1f2937" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#1f2937" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
                  ]
                }}
              >
                {filteredCobblers.map((cobbler) => (
                  <Marker
                    key={cobbler.id}
                    position={cobbler.position}
                    onClick={() => setSelectedCobbler(cobbler)}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: hoveredCobbler?.id === cobbler.id ? 12 : 10,
                      fillColor: selectedCobbler?.id === cobbler.id ? "#fbbf24" : "#f59e0b",
                      fillOpacity: 1,
                      strokeColor: "#ffffff",
                      strokeWeight: 2,
                    }}
                  />
                ))}

                {selectedCobbler && (
                  <InfoWindow
                    position={selectedCobbler.position}
                    onCloseClick={() => setSelectedCobbler(null)}
                  >
                    <div className="p-2 bg-gray-900 text-white rounded-lg">
                      <h3 className="font-bold mb-1">{selectedCobbler.name}</h3>
                      <div className="flex items-center mb-1">
                        <Star className="w-3 h-3 text-amber-400 fill-current mr-1" />
                        <span className="text-sm">{selectedCobbler.rating} ({selectedCobbler.reviews})</span>
                      </div>
                      <p className="text-xs text-gray-400">{selectedCobbler.phone}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 px-3 py-1 bg-amber-500 text-gray-900 rounded-md text-xs font-medium"
                      >
                        Get Directions
                      </motion.button>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fbbf24;
        }
      `}</style>
    </div>
  );
};

export default FindCobbler;