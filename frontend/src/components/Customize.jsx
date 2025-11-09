import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useAnimation } from 'framer-motion';
import { Brush, Palette, Save, ShoppingBag, ChevronRight, Camera, Download, Layers, Heart, Star, Undo2, Redo2, RotateCcw, Upload, Eye, Share2, ChevronLeft, X, MessageSquare, TrendingUp, Sparkles, Grid3x3 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhiteShoes from '../assets/WhiteShoes.png'; 
import UrbanRunner from '../assets/UrbanRunner.webp';
import ClassicElegance from '../assets/ClassicElegance.jpeg';
import BoldStatement from '../assets/BoldStatement.webp';

const baseShoe = {
  id: 1,
  name: "Drift Runner Custom",
  brand: "Nike",
  basePrice: 129.99,
  rating: 4.8,
  image: WhiteShoes
};

const customizationOptions = {
  baseColors: [
    { name: "Core Black", color: "bg-black", price: 0 },
    { name: "Snow White", color: "bg-white", price: 0 },
    { name: "Navy Blue", color: "bg-blue-800", price: 0 },
    { name: "Crimson Red", color: "bg-red-600", price: 5 },
    { name: "Forest Green", color: "bg-green-700", price: 5 },
    { name: "Royal Purple", color: "bg-purple-700", price: 10 }
  ],
  accentColors: [
    { name: "Gold", color: "bg-amber-400", price: 15 },
    { name: "Silver", color: "bg-gray-300", price: 10 },
    { name: "Neon Green", color: "bg-green-400", price: 15 },
    { name: "Hot Pink", color: "bg-pink-500", price: 15 },
    { name: "Electric Blue", color: "bg-blue-400", price: 15 }
  ],
  materials: [
    { name: "Canvas", price: 0 },
    { name: "Mesh", price: 10 },
    { name: "Suede", price: 25 },
    { name: "Leather", price: 40 },
    { name: "Premium Leather", price: 60 }
  ],
  soleTypes: [
    { name: "Standard", price: 0 },
    { name: "Cushioned", price: 20 },
    { name: "Air Pocket", price: 35 },
    { name: "Boost", price: 45 }
  ],
  addOns: [
    { name: "Custom Laces", price: 8 },
    { name: "Custom Insole", price: 15 },
    { name: "Waterproof Coating", price: 25 },
    { name: "Personalized Tag", price: 12 },
    { name: "Reflective Elements", price: 18 }
  ]
};

const previousDesigns = [
  {
    id: 1,
    name: "Urban Runner",
    baseColor: { name: "Core Black", color: "bg-black" },
    accentColor: { name: "Neon Green", color: "bg-green-400" },
    material: "Mesh",
    soleType: "Air Pocket",
    addOns: ["Custom Laces", "Reflective Elements"],
    price: 187.99,
    image: UrbanRunner,
    rating: 4.5,
    comments: [
      { id: 1, user: "Alice", text: "Love the neon accents!", rating: 5 },
      { id: 2, user: "Bob", text: "Very comfortable mesh material.", rating: 4 }
    ]
  },
  {
    id: 2,
    name: "Classic Elegance",
    baseColor: { name: "Snow White", color: "bg-white" },
    accentColor: { name: "Gold", color: "bg-amber-400" },
    material: "Premium Leather",
    soleType: "Cushioned",
    addOns: ["Personalized Tag"],
    price: 204.99,
    image: ClassicElegance,
    rating: 4.8,
    comments: [
      { id: 1, user: "Cathy", text: "Elegant and stylish!", rating: 5 }
    ]
  },
  {
    id: 3,
    name: "Bold Statement",
    baseColor: { name: "Crimson Red", color: "bg-red-600" },
    accentColor: { name: "Silver", color: "bg-gray-300" },
    material: "Suede",
    soleType: "Boost",
    addOns: ["Custom Insole", "Waterproof Coating"],
    price: 228.99,
    image: BoldStatement,
    rating: 4.3,
    comments: []
  }
];

export default function ShoeCustomizerComponent() {
  const [selectedBaseColor, setSelectedBaseColor] = useState(customizationOptions.baseColors[0]);
  const [selectedAccentColor, setSelectedAccentColor] = useState(customizationOptions.accentColors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(customizationOptions.materials[0]);
  const [selectedSole, setSelectedSole] = useState(customizationOptions.soleTypes[0]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [customName, setCustomName] = useState("");
  const [currentView, setCurrentView] = useState("front");
  const [totalPrice, setTotalPrice] = useState(baseShoe.basePrice);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [patternImage, setPatternImage] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentRating, setCommentRating] = useState(5);
  const [selectedDesignForComments, setSelectedDesignForComments] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('baseColor');
  const [showGuide, setShowGuide] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const exchangeRef = useRef(null);
  const priceMotion = useMotionValue(baseShoe.basePrice);
  const statsControls = useAnimation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY > 300) {
      statsControls.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 }
      }));
    }
  }, [scrollY, statsControls]);

  // Calculate customization progress
  useEffect(() => {
    let completed = 0;
    if (selectedBaseColor.name !== "Core Black") completed += 20;
    if (selectedAccentColor.price > 0) completed += 20;
    if (selectedMaterial.price > 0) completed += 20;
    if (selectedSole.price > 0) completed += 20;
    if (selectedAddOns.length > 0) completed += 20;
    setProgress(completed);
  }, [selectedBaseColor, selectedAccentColor, selectedMaterial, selectedSole, selectedAddOns]);

  // Auto-hide guide when any customization is made
  useEffect(() => {
    if (
      selectedBaseColor.name !== "Core Black" ||
      selectedAccentColor.name !== "Gold" ||
      selectedMaterial.name !== "Canvas" ||
      selectedSole.name !== "Standard" ||
      selectedAddOns.length > 0 ||
      customName.trim() !== "" ||
      patternImage !== null
    ) {
      setShowGuide(false);
    }
  }, [selectedBaseColor, selectedAccentColor, selectedMaterial, selectedSole, selectedAddOns, customName, patternImage]);

  const saveStateToUndo = () => {
    const state = {
      selectedBaseColor,
      selectedAccentColor,
      selectedMaterial,
      selectedSole,
      selectedAddOns,
      customName,
      patternImage
    };
    setUndoStack(prev => [...prev, state]);
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const prevState = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    setRedoStack(prev => [...prev, {
      selectedBaseColor,
      selectedAccentColor,
      selectedMaterial,
      selectedSole,
      selectedAddOns,
      customName,
      patternImage
    }]);
    setSelectedBaseColor(prevState.selectedBaseColor);
    setSelectedAccentColor(prevState.selectedAccentColor);
    setSelectedMaterial(prevState.selectedMaterial);
    setSelectedSole(prevState.selectedSole);
    setSelectedAddOns(prevState.selectedAddOns);
    setCustomName(prevState.customName);
    setPatternImage(prevState.patternImage);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setUndoStack(prev => [...prev, {
      selectedBaseColor,
      selectedAccentColor,
      selectedMaterial,
      selectedSole,
      selectedAddOns,
      customName,
      patternImage
    }]);
    setSelectedBaseColor(nextState.selectedBaseColor);
    setSelectedAccentColor(nextState.selectedAccentColor);
    setSelectedMaterial(nextState.selectedMaterial);
    setSelectedSole(nextState.selectedSole);
    setSelectedAddOns(nextState.selectedAddOns);
    setCustomName(nextState.customName);
    setPatternImage(nextState.patternImage);
  };

  const resetCustomization = () => {
    saveStateToUndo();
    setSelectedBaseColor(customizationOptions.baseColors[0]);
    setSelectedAccentColor(customizationOptions.accentColors[0]);
    setSelectedMaterial(customizationOptions.materials[0]);
    setSelectedSole(customizationOptions.soleTypes[0]);
    setSelectedAddOns([]);
    setCustomName("");
    setPatternImage(null);
    setShowGuide(true); // Show guide again on reset
  };

  useEffect(() => {
    let price = baseShoe.basePrice;
    price += selectedBaseColor.price || 0;
    price += selectedAccentColor.price || 0;
    price += selectedMaterial.price || 0;
    price += selectedSole.price || 0;
    selectedAddOns.forEach(addon => {
      const addonObj = customizationOptions.addOns.find(a => a.name === addon);
      if (addonObj) price += addonObj.price;
    });
    setTotalPrice(price);
    animate(priceMotion, price, { duration: 0.5, ease: "easeInOut" });
  }, [selectedBaseColor, selectedAccentColor, selectedMaterial, selectedSole, selectedAddOns]);

  const toggleAddOn = (addonName) => {
    saveStateToUndo();
    if (selectedAddOns.includes(addonName)) {
      setSelectedAddOns(selectedAddOns.filter(name => name !== addonName));
    } else {
      setSelectedAddOns([...selectedAddOns, addonName]);
    }
  };

  const saveDesign = () => {
    const newDesign = {
      id: savedDesigns.length + 1,
      name: customName || `Custom Design ${savedDesigns.length + 1}`,
      baseColor: selectedBaseColor,
      accentColor: selectedAccentColor,
      material: selectedMaterial.name,
      soleType: selectedSole.name,
      addOns: [...selectedAddOns],
      price: totalPrice,
      image: baseShoe.image,
      rating: 0,
      comments: []
    };
    setSavedDesigns([...savedDesigns, newDesign]);
    setCustomName("");
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const loadDesign = (design) => {
    saveStateToUndo();
    setSelectedBaseColor(design.baseColor);
    setSelectedAccentColor(design.accentColor);
    setSelectedMaterial(customizationOptions.materials.find(m => m.name === design.material));
    setSelectedSole(customizationOptions.soleTypes.find(s => s.name === design.soleType));
    setSelectedAddOns(design.addOns);
    setCustomName(design.name);
    setPatternImage(null);
  };

  const handlePatternUpload = (e) => {
    saveStateToUndo();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPatternImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFavorite = (designId) => {
    setFavorites(prev => 
      prev.includes(designId) ? prev.filter(id => id !== designId) : [...prev, designId]
    );
  };

  const addComment = () => {
    if (!selectedDesignForComments || !commentText.trim()) return;
    const updatedDesigns = savedDesigns.map(design => {
      if (design.id === selectedDesignForComments.id) {
        const newComment = {
          id: design.comments.length + 1,
          user: "Anonymous",
          text: commentText.trim(),
          rating: commentRating
        };
        const newComments = [...design.comments, newComment];
        const avgRating = newComments.reduce((acc, c) => acc + c.rating, 0) / newComments.length;
        return { ...design, comments: newComments, rating: avgRating };
      }
      return design;
    });
    setSavedDesigns(updatedDesigns);
    setCommentText("");
    setCommentRating(5);
  };

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

  const viewImages = {
    front: baseShoe.image,
    side: baseShoe.image,
    back: baseShoe.image
  };

  const shareOnSocial = (platform) => {
    alert(`Sharing on ${platform} is not implemented in this demo.`);
  };

  const sections = [
    { id: 'baseColor', label: 'Base Color', icon: Palette },
    { id: 'accentColor', label: 'Accent', icon: Brush },
    { id: 'material', label: 'Material', icon: Layers },
    { id: 'sole', label: 'Sole', icon: Grid3x3 },
    { id: 'addOns', label: 'Add-ons', icon: Sparkles }
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <Navbar />
      
      <div className="pt-24 md:pt-28">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Welcome Guide */}
          <AnimatePresence>
            {showGuide && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden"
              >
                <button
                  onClick={() => setShowGuide(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500 rounded-full p-3">
                    <Sparkles className="w-6 h-6 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Welcome to Custom Shoe Designer!</h3>
                    <p className="text-gray-300 mb-4">
                      Follow these simple steps to create your perfect pair:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      {[
                        { step: 1, label: 'Choose Base Color', icon: Palette },
                        { step: 2, label: 'Add Accent', icon: Brush },
                        { step: 3, label: 'Select Material', icon: Layers },
                        { step: 4, label: 'Pick Sole Type', icon: Grid3x3 },
                        { step: 5, label: 'Add Extras', icon: Sparkles }
                      ].map(({ step, label, icon: Icon }) => (
                        <div key={step} className="flex items-center gap-2 bg-gray-900/50 rounded-lg p-3">
                          <div className="bg-amber-500/20 rounded-full p-2">
                            <Icon className="w-4 h-4 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Step {step}</p>
                            <p className="text-sm font-medium text-white">{label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Header with Progress */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div className="mb-4 md:mb-0 flex-1">
                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                  Custom Shoe Designer
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-2 max-w-md"
                  />
                </h2>
                <div className="flex items-center gap-4 mt-3">
                  <p className="text-gray-400 text-lg flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-amber-400" />
                    {progress === 100 
                      ? "Your design is complete! 🎉" 
                      : `Design ${progress}% complete`
                    }
                  </p>
                  {progress > 0 && progress < 100 && (
                    <span className="text-sm text-amber-400 animate-pulse">
                      Keep going!
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.button 
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  whileHover={undoStack.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={undoStack.length > 0 ? { scale: 0.95 } : {}}
                  className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    undoStack.length > 0 
                      ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white' 
                      : 'bg-gray-800 cursor-not-allowed text-gray-600 border border-gray-700'
                  }`}
                  title="Undo last action"
                >
                  <Undo2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Undo</span>
                </motion.button>

                <motion.button 
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  whileHover={redoStack.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={redoStack.length > 0 ? { scale: 0.95 } : {}}
                  className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    redoStack.length > 0 
                      ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white' 
                      : 'bg-gray-800 cursor-not-allowed text-gray-600 border border-gray-700'
                  }`}
                  title="Redo last action"
                >
                  <Redo2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Redo</span>
                </motion.button>

                <motion.button
                  onClick={resetCustomization}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center gap-2 border border-gray-700 transition-all duration-300"
                  title="Reset all customizations"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Customization Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Preview Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 shadow-2xl border border-gray-700 overflow-hidden sticky top-28">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0]
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-amber-500 opacity-5 blur-3xl"
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Eye className="mr-3 text-amber-400 w-6 h-6" />
                      Live Preview
                    </h3>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-gray-900 rounded-lg border border-gray-700 hover:border-amber-500 transition-colors"
                        title="Rotate view"
                      >
                        <RotateCcw className="w-4 h-4 text-amber-400" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Shoe Preview with better interactivity */}
                  <div className="relative h-80 bg-gray-900 rounded-2xl mb-6 overflow-hidden border-2 border-gray-700 flex items-center justify-center group">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentView}
                        src={viewImages[currentView]}
                        alt="Shoe Preview"
                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-contain p-8"
                      />
                    </AnimatePresence>

                    {/* Interactive color indicators with tooltips */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <motion.div 
                        whileHover={{ scale: 1.3 }}
                        onHoverStart={() => setActiveTooltip('base')}
                        onHoverEnd={() => setActiveTooltip(null)}
                        className={`w-8 h-8 rounded-full ${selectedBaseColor.color} border-2 border-gray-600 shadow-lg cursor-pointer relative`}
                      >
                        <AnimatePresence>
                          {activeTooltip === 'base' && (
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="absolute right-10 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-gray-700"
                            >
                              Base: {selectedBaseColor.name}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.3 }}
                        onHoverStart={() => setActiveTooltip('accent')}
                        onHoverEnd={() => setActiveTooltip(null)}
                        className={`w-8 h-8 rounded-full ${selectedAccentColor.color} border-2 border-gray-600 shadow-lg cursor-pointer relative`}
                      >
                        <AnimatePresence>
                          {activeTooltip === 'accent' && (
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="absolute right-10 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-gray-700"
                            >
                              Accent: {selectedAccentColor.name}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Pattern Overlay */}
                    {patternImage && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <img
                          src={patternImage}
                          alt="Pattern overlay"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </motion.div>
                    )}

                    {/* Hover hint */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <p className="text-xs text-gray-400">Click views below to rotate</p>
                    </motion.div>
                  </div>

                  {/* Enhanced View Controls */}
                  <div className="flex justify-center gap-2 mb-6">
                    {[
                      { view: "front", label: "Front"},
                      { view: "side", label: "Side"},
                      { view: "back", label: "Back" }
                    ].map(({ view, label }) => (
                      <motion.button
                        key={view}
                        onClick={() => setCurrentView(view)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                          currentView === view
                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30"
                            : "bg-gray-900 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <span>{label}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Pattern Upload with better UX */}
                  <div className="mb-6 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-dashed border-gray-700 hover:border-amber-500 transition-colors group">
                    <label className="cursor-pointer block">
                      <div className="flex items-center gap-3 mb-2">
                        <Upload className="w-5 h-5 text-amber-400 group-hover:animate-bounce" />
                        <span className="text-gray-400 group-hover:text-white transition-colors">
                          Upload Custom Pattern
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePatternUpload}
                        className="hidden"
                      />
                      <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                        {patternImage ? "✓ Pattern uploaded" : "Click to browse or drag & drop"}
                      </div>
                    </label>
                    {patternImage && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => {
                          saveStateToUndo();
                          setPatternImage(null);
                        }}
                        className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Remove pattern
                      </motion.button>
                    )}
                  </div>

                  {/* Custom Name with character count */}
                  <div className="mb-6">
                    <label className="text-gray-400 text-sm mb-2 flex items-center justify-between">
                      <span>Design Name (Optional)</span>
                      <span className="text-xs text-gray-500">{customName.length}/50</span>
                    </label>
                    <input 
                      type="text" 
                      value={customName}
                      maxLength={50}
                      onChange={(e) => {
                        saveStateToUndo();
                        setCustomName(e.target.value);
                      }}
                      placeholder="e.g., My Awesome Sneakers"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500 transition-all"
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <motion.button
                      onClick={saveDesign}
                      disabled={!customName.trim() && progress === 0}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${
                        customName.trim() || progress > 0
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 shadow-lg shadow-amber-500/30"
                          : "bg-gray-800 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      <Save className="w-5 h-5" />
                      <span>Save</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-3 bg-gray-900 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-xl flex items-center justify-center gap-2 font-medium transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </motion.button>
                  </div>

                  {/* Enhanced Price Breakdown */}
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 border border-gray-700">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2 text-amber-400" />
                      Price Summary
                    </h4>
                    <div className="space-y-2.5 text-sm mb-4">
                      <div className="flex justify-between text-gray-400 pb-2 border-b border-gray-700">
                        <span>Base Price:</span>
                        <span className="font-medium text-white">${baseShoe.basePrice.toFixed(2)}</span>
                      </div>
                      
                      {selectedBaseColor.price > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between text-gray-400"
                        >
                          <span className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${selectedBaseColor.color}`} />
                            {selectedBaseColor.name}:
                          </span>
                          <span className="font-medium text-amber-400">+${selectedBaseColor.price.toFixed(2)}</span>
                        </motion.div>
                      )}
                      
                      {selectedAccentColor.price > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between text-gray-400"
                        >
                          <span className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${selectedAccentColor.color}`} />
                            {selectedAccentColor.name}:
                          </span>
                          <span className="font-medium text-amber-400">+${selectedAccentColor.price.toFixed(2)}</span>
                        </motion.div>
                      )}
                      
                      {selectedMaterial.price > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between text-gray-400"
                        >
                          <span>{selectedMaterial.name}:</span>
                          <span className="font-medium text-amber-400">+${selectedMaterial.price.toFixed(2)}</span>
                        </motion.div>
                      )}
                      
                      {selectedSole.price > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between text-gray-400"
                        >
                          <span>{selectedSole.name} Sole:</span>
                          <span className="font-medium text-amber-400">+${selectedSole.price.toFixed(2)}</span>
                        </motion.div>
                      )}
                      
                      {selectedAddOns.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between text-gray-400"
                        >
                          <span>Add-ons ({selectedAddOns.length}):</span>
                          <span className="font-medium text-amber-400">
                            +${selectedAddOns.reduce((acc, name) => {
                              const addon = customizationOptions.addOns.find(a => a.name === name);
                              return acc + (addon?.price || 0);
                            }, 0).toFixed(2)}
                          </span>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="border-t-2 border-gray-700 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-white">Total Price:</span>
                        <motion.span
                          key={totalPrice}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold text-amber-400"
                        >
                          ${totalPrice.toFixed(2)}
                        </motion.span>
                      </div>
                      {totalPrice > baseShoe.basePrice && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-green-400 text-right mt-1"
                        >
                          +${(totalPrice - baseShoe.basePrice).toFixed(2)} in customizations
                        </motion.p>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </motion.button>

                    {/* Estimated Delivery */}
                    <div className="mt-4 p-3 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-green-400" />
                          <span className="text-gray-400">Delivery:</span>
                        </div>
                        <span className="text-white font-medium">5-7 Business Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Customization Options - Right Side */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 shadow-2xl border border-gray-700">
                {/* Section Navigation with indicators */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    const isCompleted = 
                      (section.id === 'baseColor' && selectedBaseColor.name !== "Core Black") ||
                      (section.id === 'accentColor' && selectedAccentColor.price > 0) ||
                      (section.id === 'material' && selectedMaterial.price > 0) ||
                      (section.id === 'sole' && selectedSole.price > 0) ||
                      (section.id === 'addOns' && selectedAddOns.length > 0);
                    
                    return (
                      <motion.button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 relative ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30'
                            : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{section.label}</span>
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                              activeSection === section.id ? 'bg-gray-900' : 'bg-green-500'
                            }`}
                          >
                            <Star className={`w-2.5 h-2.5 ${activeSection === section.id ? 'text-amber-400' : 'text-white'} fill-current`} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Customization sections with better helper text */}
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Base Color Section */}
                  {activeSection === 'baseColor' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center mb-2">
                            <Palette className="mr-2 text-amber-400" />
                            Base Color Selection
                          </h3>
                          <p className="text-sm text-gray-400">
                            Choose the main color of your shoe
                          </p>
                        </div>
                        <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                          {customizationOptions.baseColors.length} options
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {customizationOptions.baseColors.map(colorOption => (
                          <motion.button
                            key={colorOption.name}
                            onClick={() => {
                              saveStateToUndo();
                              setSelectedBaseColor(colorOption);
                            }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-5 rounded-xl flex flex-col items-center space-y-3 border-2 transition-all relative ${
                              selectedBaseColor.name === colorOption.name
                                ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                                : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                            }`}
                          >
                            <div className={`w-20 h-20 rounded-full ${colorOption.color} border-4 border-gray-700 shadow-lg transition-transform ${
                              selectedBaseColor.name === colorOption.name ? 'scale-110' : ''
                            }`} />
                            <div className="text-center">
                              <p className="text-sm font-medium text-white">{colorOption.name}</p>
                              {colorOption.price > 0 ? (
                                <p className="text-xs text-amber-400 mt-1">+${colorOption.price}</p>
                              ) : (
                                <p className="text-xs text-green-400 mt-1">✓ Included</p>
                              )}
                            </div>
                            {selectedBaseColor.name === colorOption.name && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1.5 shadow-lg"
                              >
                                <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accent Color Section */}
                  {activeSection === 'accentColor' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center mb-2">
                            <Brush className="mr-2 text-amber-400" />
                            Accent Color Selection
                          </h3>
                          <p className="text-sm text-gray-400">
                            Add a pop of color to stand out
                          </p>
                        </div>
                        <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                          {customizationOptions.accentColors.length} options
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {customizationOptions.accentColors.map(colorOption => (
                          <motion.button
                            key={colorOption.name}
                            onClick={() => {
                              saveStateToUndo();
                              setSelectedAccentColor(colorOption);
                            }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-5 rounded-xl flex flex-col items-center space-y-3 border-2 transition-all relative ${
                              selectedAccentColor.name === colorOption.name
                                ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                                : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                            }`}
                          >
                            <div className={`w-20 h-20 rounded-full ${colorOption.color} border-4 border-gray-700 shadow-lg transition-transform ${
                              selectedAccentColor.name === colorOption.name ? 'scale-110' : ''
                            }`} />
                            <div className="text-center">
                              <p className="text-sm font-medium text-white">{colorOption.name}</p>
                              <p className="text-xs text-amber-400 mt-1">+${colorOption.price}</p>
                            </div>
                            {selectedAccentColor.name === colorOption.name && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1.5 shadow-lg"
                              >
                                <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Material Section */}
                  {activeSection === 'material' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center mb-2">
                            <Layers className="mr-2 text-amber-400" />
                            Material Selection
                          </h3>
                          <p className="text-sm text-gray-400">
                            Choose the material for your shoe
                          </p>
                        </div>
                        <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                          {customizationOptions.materials.length} options
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {customizationOptions.materials.map(material => (
                          <motion.button
                            key={material.name}
                            onClick={() => {
                              saveStateToUndo();
                              setSelectedMaterial(material);
                            }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-5 rounded-xl border-2 transition-all text-left relative ${
                              selectedMaterial.name === material.name
                                ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                                : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-base font-semibold text-white mb-1">{material.name}</p>
                                {material.price > 0 ? (
                                  <p className="text-sm text-amber-400">+${material.price}</p>
                                ) : (
                                  <p className="text-sm text-green-400">Included</p>
                                )}
                              </div>
                              {selectedMaterial.name === material.name && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-amber-500 rounded-full p-2"
                                >
                                  <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sole Section */}
                  {activeSection === 'sole' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center mb-2">
                            <Grid3x3 className="mr-2 text-amber-400" />
                            Sole Type Selection
                          </h3>
                          <p className="text-sm text-gray-400">
                            Select the sole type for your shoe
                          </p>
                        </div>
                        <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                          {customizationOptions.soleTypes.length} options
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {customizationOptions.soleTypes.map(sole => (
                          <motion.button
                            key={sole.name}
                            onClick={() => {
                              saveStateToUndo();
                              setSelectedSole(sole);
                            }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-5 rounded-xl border-2 transition-all text-left relative ${
                              selectedSole.name === sole.name
                                ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                                : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-base font-semibold text-white mb-1">{sole.name}</p>
                                {sole.price > 0 ? (
                                  <p className="text-sm text-amber-400">+${sole.price}</p>
                                ) : (
                                  <p className="text-sm text-green-400">Standard</p>
                                )}
                              </div>
                              {selectedSole.name === sole.name && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-amber-500 rounded-full p-2"
                                >
                                  <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add-ons Section */}
                  {activeSection === 'addOns' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center mb-2">
                            <Sparkles className="mr-2 text-amber-400" />
                            Premium Add-ons
                          </h3>
                          <p className="text-sm text-gray-400">
                            Enhance your shoes with these options
                          </p>
                        </div>
                        <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                          {selectedAddOns.length} selected
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {customizationOptions.addOns.map(addon => (
                          <motion.button
                            key={addon.name}
                            onClick={() => toggleAddOn(addon.name)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-5 rounded-xl border-2 transition-all text-left relative ${
                              selectedAddOns.includes(addon.name)
                                ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                                : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="text-base font-semibold text-white mb-1">{addon.name}</p>
                                <p className="text-sm text-amber-400">+${addon.price}</p>
                              </div>
                              <motion.div
                                initial={false}
                                animate={{ 
                                  scale: selectedAddOns.includes(addon.name) ? 1 : 0,
                                  rotate: selectedAddOns.includes(addon.name) ? 0 : 180
                                }}
                                className="bg-amber-500 rounded-full p-2"
                              >
                                <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                              </motion.div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Save Success Notification */}
          <AnimatePresence>
            {showSaveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Star className="w-6 h-6 fill-white" />
                </motion.div>
                <div>
                  <p className="font-semibold">Design Saved!</p>
                  <p className="text-sm text-green-100">Your custom design has been saved successfully</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Saved Designs Section */}
          {savedDesigns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold flex items-center">
                    <Save className="mr-2 text-amber-400" />
                    My Designs
                    <span className="ml-3 text-sm font-normal text-gray-400">
                      ({savedDesigns.length} saved)
                    </span>
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Your custom creations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {savedDesigns.map((design) => (
                    <motion.div
                      key={design.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -8 }}
                      className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all shadow-lg group"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={design.image} 
                          alt={design.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                        
                        <motion.button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(design.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm rounded-full p-2 z-10 border border-gray-700"
                        >
                          <Heart 
                            className={`w-5 h-5 transition-colors ${
                              favorites.includes(design.id) 
                                ? 'text-red-500 fill-red-500' 
                                : 'text-gray-400'
                            }`} 
                          />
                        </motion.button>

                        {design.rating > 0 && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-700">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-medium">{design.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h4 className="font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                          {design.name}
                        </h4>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-4 h-4 rounded-full ${design.baseColor.color} border border-gray-600`} />
                          <div className={`w-4 h-4 rounded-full ${design.accentColor.color} border border-gray-600`} />
                          <span className="text-xs text-gray-400">{design.material}</span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-400">{design.addOns.length} add-ons</span>
                          <span className="font-bold text-amber-400 text-lg">${design.price.toFixed(2)}</span>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => loadDesign(design)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 rounded-lg text-sm font-medium transition-all"
                          >
                            Load
                          </motion.button>
                          <motion.button
                            onClick={() => setSelectedDesignForComments(design)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-2 bg-gray-900 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-all"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Inspiration Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold flex items-center">
                  <Layers className="mr-2 text-amber-400" />
                  Inspiration Gallery
                  <span className="ml-3 text-sm font-normal text-gray-400">
                    ({previousDesigns.length} templates)
                  </span>
                </h3>
                <p className="text-gray-500 text-sm mt-1">Get inspired by popular designs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousDesigns.map((design) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  onClick={() => loadDesign(design)}
                  className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all cursor-pointer shadow-lg group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={design.image} 
                      alt={design.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-purple-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-500/30">
                      <span className="text-purple-300 text-xs font-medium">Template</span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-700">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium">{design.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-bold text-white mb-2 text-lg group-hover:text-purple-400 transition-colors">
                      {design.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-5 h-5 rounded-full ${design.baseColor.color} border-2 border-gray-600`} />
                      <div className={`w-5 h-5 rounded-full ${design.accentColor.color} border-2 border-gray-600`} />
                      <span className="text-sm text-gray-400">{design.material}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">{design.comments.length} reviews</span>
                      <span className="font-bold text-purple-400 text-lg">${design.price.toFixed(2)}</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <span>Use Template</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Share Section - FIXED VERSION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden mb-12"
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
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                    <Share2 className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-semibold">Share Your Creation</span>
                  </div>
                  <h3 className="font-bold text-3xl mb-3 text-gray-900">
                    Show Off Your Design
                  </h3>
                  <p className="text-gray-800 leading-relaxed max-w-2xl">
                    Share your custom shoe design on social media and inspire others with your creativity!
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Facebook", icon: Share2, color: "bg-blue-600" },
                    { label: "Twitter", icon: Share2, color: "bg-sky-500" },
                    { label: "Instagram", icon: Share2, color: "bg-pink-600" },
                    { label: "Download", icon: Download, color: "bg-gray-900" }
                  ].map(({ label, icon: Icon, color }) => (
                    <motion.button
                      key={label}
                      onClick={() => {
                        if (label === "Download") {
                          alert("Download functionality not implemented in this demo.");
                        } else {
                          shareOnSocial(label);
                        }
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${color} text-white px-5 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="hidden sm:inline">{label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comments Modal - SINGLE VERSION */}
          <AnimatePresence>
            {selectedDesignForComments && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedDesignForComments(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gray-800 rounded-2xl max-w-lg w-full p-6 border border-gray-700 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">
                      Comments for {selectedDesignForComments.name}
                    </h2>
                    <button
                      onClick={() => setSelectedDesignForComments(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Close comments modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="max-h-64 overflow-y-auto mb-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                    {selectedDesignForComments.comments.length === 0 && (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                        <p className="text-gray-400">No comments yet. Be the first!</p>
                      </div>
                    )}
                    {selectedDesignForComments.comments.map(c => (
                      <motion.div 
                        key={c.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-700/50 p-4 rounded-xl border border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-amber-400">{c.user}</span>
                          <span className="flex items-center gap-1">
                            {[...Array(c.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </span>
                        </div>
                        <p className="text-gray-300">{c.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="comment-text" className="block mb-2 text-gray-400 font-medium">
                      Add a comment
                    </label>
                    <textarea
                      id="comment-text"
                      rows={3}
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="Share your thoughts about this design..."
                      className="w-full rounded-xl p-3 bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500 transition-all resize-none"
                      aria-label="Add your comment"
                    />
                  </div>

                  <div className="mb-6 flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-700">
                    <label htmlFor="comment-rating" className="text-gray-400 font-medium">
                      Your Rating:
                    </label>
                    <div className="flex items-center gap-3">
                      {[5, 4, 3, 2, 1].map(r => (
                        <button
                          key={r}
                          onClick={() => setCommentRating(r)}
                          className="group"
                        >
                          <div className="flex items-center gap-1">
                            {[...Array(r)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 transition-colors ${
                                  commentRating === r 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-600 group-hover:text-yellow-400'
                                }`}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => setSelectedDesignForComments(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium transition-all"
                      aria-label="Close comments modal"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        if (commentText.trim()) {
                          addComment();
                          setSelectedDesignForComments(null);
                        }
                      }}
                      disabled={!commentText.trim()}
                      whileHover={commentText.trim() ? { scale: 1.02 } : {}}
                      whileTap={commentText.trim() ? { scale: 0.98 } : {}}
                      className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                        commentText.trim()
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 shadow-lg shadow-amber-500/30'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                      aria-label="Submit comment"
                    >
                      Submit Comment
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
