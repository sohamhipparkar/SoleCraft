import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Ruler, 
  Shirt, 
  ShoppingBag, 
  Footprints, 
  User, 
  HelpCircle, 
  MessageSquare, 
  FileText,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  Video,
  Download,
  ArrowRight,
  Package
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

export default function SizeGuideComponent() {
  const [activeCategory, setActiveCategory] = useState('apparel');
  const [activeMeasurementType, setActiveMeasurementType] = useState('us');
  const [openGuideId, setOpenGuideId] = useState(null);

  const sizeGuideData = {
    apparel: {
      title: "Clothing Size Guide",
      description: "Find your perfect fit with our detailed clothing size charts. Measurements are provided in inches and centimeters for international sizing reference.",
      measurementTypes: ["us", "eu", "uk", "intl"],
      guides: [
        {
          id: 'apparel-1',
          title: 'Men\'s Tops & T-Shirts',
          content: {
            headers: ['Size', 'Chest (in)', 'Waist (in)', 'Sleeve (in)'],
            us: [
              ['S', '36-38', '30-32', '32.5'],
              ['M', '39-41', '33-35', '33.5'],
              ['L', '42-44', '36-38', '34.5'],
              ['XL', '45-47', '39-41', '35.5'],
              ['XXL', '48-50', '42-44', '36.5']
            ],
            eu: [
              ['S (46)', '36-38', '30-32', '32.5'],
              ['M (48-50)', '39-41', '33-35', '33.5'],
              ['L (52-54)', '42-44', '36-38', '34.5'],
              ['XL (56)', '45-47', '39-41', '35.5'],
              ['XXL (58)', '48-50', '42-44', '36.5']
            ],
            uk: [
              ['S', '36-38', '30-32', '32.5'],
              ['M', '39-41', '33-35', '33.5'],
              ['L', '42-44', '36-38', '34.5'],
              ['XL', '45-47', '39-41', '35.5'],
              ['XXL', '48-50', '42-44', '36.5']
            ],
            intl: [
              ['S', '91-97', '76-81', '82.5'],
              ['M', '99-104', '84-89', '85'],
              ['L', '107-112', '91-97', '87.5'],
              ['XL', '114-119', '99-104', '90'],
              ['XXL', '122-127', '107-112', '92.5']
            ]
          },
          measurementTips: [
            "Chest: Measure around the fullest part of your chest, keeping the tape measure horizontal.",
            "Waist: Measure around your natural waistline, keeping the tape measure loose enough for comfort.",
            "Sleeve: Measure from the center back of your neck, across your shoulder and down to your wrist."
          ]
        },
        {
          id: 'apparel-2',
          title: 'Men\'s Pants & Bottoms',
          content: {
            headers: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)'],
            us: [
              ['XS (28)', '28', '35', '30'],
              ['S (30)', '30', '37', '30.5'],
              ['M (32)', '32', '39', '31'],
              ['L (34)', '34', '41', '31.5'],
              ['XL (36)', '36', '43', '32'],
              ['XXL (38)', '38', '45', '32.5']
            ],
            eu: [
              ['XS (44)', '28', '35', '30'],
              ['S (46)', '30', '37', '30.5'],
              ['M (48)', '32', '39', '31'],
              ['L (50)', '34', '41', '31.5'],
              ['XL (52)', '36', '43', '32'],
              ['XXL (54)', '38', '45', '32.5']
            ],
            uk: [
              ['XS', '28', '35', '30'],
              ['S', '30', '37', '30.5'],
              ['M', '32', '39', '31'],
              ['L', '34', '41', '31.5'],
              ['XL', '36', '43', '32'],
              ['XXL', '38', '45', '32.5']
            ],
            intl: [
              ['XS', '71', '89', '76'],
              ['S', '76', '94', '77.5'],
              ['M', '81', '99', '79'],
              ['L', '86', '104', '80'],
              ['XL', '91', '109', '81.5'],
              ['XXL', '97', '114', '82.5']
            ]
          },
          measurementTips: [
            "Waist: Measure around your natural waistline, keeping the tape measure loose enough for comfort.",
            "Hip: Measure around the fullest part of your hips, keeping the tape measure horizontal.",
            "Inseam: Measure from the crotch to the bottom of the leg along the inner seam."
          ]
        },
        {
          id: 'apparel-3',
          title: 'Women\'s Tops & Blouses',
          content: {
            headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)'],
            us: [
              ['XS (0-2)', '32-33', '25-26', '35-36'],
              ['S (4-6)', '34-35', '27-28', '37-38'],
              ['M (8-10)', '36-37', '29-30', '39-40'],
              ['L (12-14)', '38-40', '31-33', '41-43'],
              ['XL (16-18)', '41-43', '34-36', '44-46'],
              ['XXL (20-22)', '44-46', '37-39', '47-49']
            ],
            eu: [
              ['XS (32-34)', '32-33', '25-26', '35-36'],
              ['S (36-38)', '34-35', '27-28', '37-38'],
              ['M (40-42)', '36-37', '29-30', '39-40'],
              ['L (44-46)', '38-40', '31-33', '41-43'],
              ['XL (48-50)', '41-43', '34-36', '44-46'],
              ['XXL (52-54)', '44-46', '37-39', '47-49']
            ],
            uk: [
              ['XS (4-6)', '32-33', '25-26', '35-36'],
              ['S (8-10)', '34-35', '27-28', '37-38'],
              ['M (12-14)', '36-37', '29-30', '39-40'],
              ['L (16-18)', '38-40', '31-33', '41-43'],
              ['XL (20-22)', '41-43', '34-36', '44-46'],
              ['XXL (24-26)', '44-46', '37-39', '47-49']
            ],
            intl: [
              ['XS', '81-84', '63-66', '89-91'],
              ['S', '86-89', '68-71', '94-97'],
              ['M', '91-94', '74-76', '99-102'],
              ['L', '97-102', '79-84', '104-109'],
              ['XL', '104-109', '86-91', '112-117'],
              ['XXL', '112-117', '94-99', '119-124']
            ]
          },
          measurementTips: [
            "Bust: Measure around the fullest part of your bust, keeping the tape measure horizontal.",
            "Waist: Measure around your natural waistline, which is the narrowest part of your torso.",
            "Hip: Measure around the fullest part of your hips, keeping the tape measure horizontal."
          ]
        },
        {
          id: 'apparel-4',
          title: 'Women\'s Dresses & Jumpsuits',
          content: {
            headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)'],
            us: [
              ['XS (0-2)', '32-33', '25-26', '35-36'],
              ['S (4-6)', '34-35', '27-28', '37-38'],
              ['M (8-10)', '36-37', '29-30', '39-40'],
              ['L (12-14)', '38-40', '31-33', '41-43'],
              ['XL (16-18)', '41-43', '34-36', '44-46'],
              ['XXL (20-22)', '44-46', '37-39', '47-49']
            ],
            eu: [
              ['XS (32-34)', '32-33', '25-26', '35-36'],
              ['S (36-38)', '34-35', '27-28', '37-38'],
              ['M (40-42)', '36-37', '29-30', '39-40'],
              ['L (44-46)', '38-40', '31-33', '41-43'],
              ['XL (48-50)', '41-43', '34-36', '44-46'],
              ['XXL (52-54)', '44-46', '37-39', '47-49']
            ],
            uk: [
              ['XS (4-6)', '32-33', '25-26', '35-36'],
              ['S (8-10)', '34-35', '27-28', '37-38'],
              ['M (12-14)', '36-37', '29-30', '39-40'],
              ['L (16-18)', '38-40', '31-33', '41-43'],
              ['XL (20-22)', '41-43', '34-36', '44-46'],
              ['XXL (24-26)', '44-46', '37-39', '47-49']
            ],
            intl: [
              ['XS', '81-84', '63-66', '89-91'],
              ['S', '86-89', '68-71', '94-97'],
              ['M', '91-94', '74-76', '99-102'],
              ['L', '97-102', '79-84', '104-109'],
              ['XL', '104-109', '86-91', '112-117'],
              ['XXL', '112-117', '94-99', '119-124']
            ]
          },
          measurementTips: [
            "For dresses, take all measurements while wearing the undergarments you plan to wear with the dress.",
            "If you're between sizes, we recommend sizing up for a more comfortable fit.",
            "For jumpsuits, also consider your height—taller customers may want to size up for proper length."
          ]
        }
      ]
    },
    footwear: {
      title: "Footwear Size Guide",
      description: "Find the right shoe size with our international conversion chart. Measure your foot length for the most accurate sizing.",
      measurementTypes: ["us", "eu", "uk", "cm"],
      guides: [
        {
          id: 'footwear-1',
          title: 'Men\'s Shoes',
          content: {
            headers: ['US Size', 'EU Size', 'UK Size', 'Foot Length (cm)'],
            us: [
              ['7', '40', '6', '25'],
              ['7.5', '40-41', '6.5', '25.5'],
              ['8', '41', '7', '26'],
              ['8.5', '42', '7.5', '26.5'],
              ['9', '42-43', '8', '27'],
              ['9.5', '43', '8.5', '27.5'],
              ['10', '44', '9', '28'],
              ['10.5', '44-45', '9.5', '28.5'],
              ['11', '45', '10', '29'],
              ['11.5', '45-46', '10.5', '29.5'],
              ['12', '46', '11', '30'],
              ['13', '47-48', '12', '31']
            ],
            eu: [
              ['7', '40', '6', '25'],
              ['7.5', '40-41', '6.5', '25.5'],
              ['8', '41', '7', '26'],
              ['8.5', '42', '7.5', '26.5'],
              ['9', '42-43', '8', '27'],
              ['9.5', '43', '8.5', '27.5'],
              ['10', '44', '9', '28'],
              ['10.5', '44-45', '9.5', '28.5'],
              ['11', '45', '10', '29'],
              ['11.5', '45-46', '10.5', '29.5'],
              ['12', '46', '11', '30'],
              ['13', '47-48', '12', '31']
            ],
            uk: [
              ['7', '40', '6', '25'],
              ['7.5', '40-41', '6.5', '25.5'],
              ['8', '41', '7', '26'],
              ['8.5', '42', '7.5', '26.5'],
              ['9', '42-43', '8', '27'],
              ['9.5', '43', '8.5', '27.5'],
              ['10', '44', '9', '28'],
              ['10.5', '44-45', '9.5', '28.5'],
              ['11', '45', '10', '29'],
              ['11.5', '45-46', '10.5', '29.5'],
              ['12', '46', '11', '30'],
              ['13', '47-48', '12', '31']
            ],
            cm: [
              ['7', '40', '6', '25'],
              ['7.5', '40-41', '6.5', '25.5'],
              ['8', '41', '7', '26'],
              ['8.5', '42', '7.5', '26.5'],
              ['9', '42-43', '8', '27'],
              ['9.5', '43', '8.5', '27.5'],
              ['10', '44', '9', '28'],
              ['10.5', '44-45', '9.5', '28.5'],
              ['11', '45', '10', '29'],
              ['11.5', '45-46', '10.5', '29.5'],
              ['12', '46', '11', '30'],
              ['13', '47-48', '12', '31']
            ]
          },
          measurementTips: [
            "To measure your foot, stand on a piece of paper and trace your foot outline.",
            "Measure the length from the heel to the longest toe.",
            "Measure at the end of the day when your foot is at its largest.",
            "If you're between sizes, we recommend sizing up."
          ]
        },
        {
          id: 'footwear-2',
          title: 'Women\'s Shoes',
          content: {
            headers: ['US Size', 'EU Size', 'UK Size', 'Foot Length (cm)'],
            us: [
              ['5', '35-36', '3', '22'],
              ['5.5', '36', '3.5', '22.5'],
              ['6', '36-37', '4', '23'],
              ['6.5', '37', '4.5', '23.5'],
              ['7', '37-38', '5', '24'],
              ['7.5', '38', '5.5', '24.5'],
              ['8', '39', '6', '25'],
              ['8.5', '39-40', '6.5', '25.5'],
              ['9', '40', '7', '26'],
              ['9.5', '40-41', '7.5', '26.5'],
              ['10', '41', '8', '27'],
              ['11', '42', '9', '28']
            ],
            eu: [
              ['5', '35-36', '3', '22'],
              ['5.5', '36', '3.5', '22.5'],
              ['6', '36-37', '4', '23'],
              ['6.5', '37', '4.5', '23.5'],
              ['7', '37-38', '5', '24'],
              ['7.5', '38', '5.5', '24.5'],
              ['8', '39', '6', '25'],
              ['8.5', '39-40', '6.5', '25.5'],
              ['9', '40', '7', '26'],
              ['9.5', '40-41', '7.5', '26.5'],
              ['10', '41', '8', '27'],
              ['11', '42', '9', '28']
            ],
            uk: [
              ['5', '35-36', '3', '22'],
              ['5.5', '36', '3.5', '22.5'],
              ['6', '36-37', '4', '23'],
              ['6.5', '37', '4.5', '23.5'],
              ['7', '37-38', '5', '24'],
              ['7.5', '38', '5.5', '24.5'],
              ['8', '39', '6', '25'],
              ['8.5', '39-40', '6.5', '25.5'],
              ['9', '40', '7', '26'],
              ['9.5', '40-41', '7.5', '26.5'],
              ['10', '41', '8', '27'],
              ['11', '42', '9', '28']
            ],
            cm: [
              ['5', '35-36', '3', '22'],
              ['5.5', '36', '3.5', '22.5'],
              ['6', '36-37', '4', '23'],
              ['6.5', '37', '4.5', '23.5'],
              ['7', '37-38', '5', '24'],
              ['7.5', '38', '5.5', '24.5'],
              ['8', '39', '6', '25'],
              ['8.5', '39-40', '6.5', '25.5'],
              ['9', '40', '7', '26'],
              ['9.5', '40-41', '7.5', '26.5'],
              ['10', '41', '8', '27'],
              ['11', '42', '9', '28']
            ]
          },
          measurementTips: [
            "For heels and dress shoes, you might want to size up half a size for comfort.",
            "If you have wide feet, look for styles marked with 'wide' or consider sizing up.",
            "Most of our women's shoes are medium width (B). Wide options (D) are available for select styles."
          ]
        },
        {
          id: 'footwear-3',
          title: 'Kids\' Shoes',
          content: {
            headers: ['US Size', 'EU Size', 'UK Size', 'Foot Length (cm)'],
            us: [
              ['10C', '27', '9', '16'],
              ['11C', '28', '10', '16.5'],
              ['12C', '30', '11', '17'],
              ['13C', '31', '12', '18'],
              ['1Y', '32', '13', '19'],
              ['2Y', '33', '1', '20'],
              ['3Y', '34', '2', '21'],
              ['4Y', '35', '3', '22'],
              ['5Y', '36', '4', '23'],
              ['6Y', '38', '5', '24']
            ],
            eu: [
              ['10C', '27', '9', '16'],
              ['11C', '28', '10', '16.5'],
              ['12C', '30', '11', '17'],
              ['13C', '31', '12', '18'],
              ['1Y', '32', '13', '19'],
              ['2Y', '33', '1', '20'],
              ['3Y', '34', '2', '21'],
              ['4Y', '35', '3', '22'],
              ['5Y', '36', '4', '23'],
              ['6Y', '38', '5', '24']
            ],
            uk: [
              ['10C', '27', '9', '16'],
              ['11C', '28', '10', '16.5'],
              ['12C', '30', '11', '17'],
              ['13C', '31', '12', '18'],
              ['1Y', '32', '13', '19'],
              ['2Y', '33', '1', '20'],
              ['3Y', '34', '2', '21'],
              ['4Y', '35', '3', '22'],
              ['5Y', '36', '4', '23'],
              ['6Y', '38', '5', '24']
            ],
            cm: [
              ['10C', '27', '9', '16'],
              ['11C', '28', '10', '16.5'],
              ['12C', '30', '11', '17'],
              ['13C', '31', '12', '18'],
              ['1Y', '32', '13', '19'],
              ['2Y', '33', '1', '20'],
              ['3Y', '34', '2', '21'],
              ['4Y', '35', '3', '22'],
              ['5Y', '36', '4', '23'],
              ['6Y', '38', '5', '24']
            ]
          },
          measurementTips: [
            "Children's feet grow quickly—we recommend leaving about 1/2 inch (1.3 cm) of space at the toe.",
            "Measure both feet, as they may be different sizes. Use the larger measurement.",
            "For more accurate measurement, have your child stand while measuring their feet."
          ]
        }
      ]
    },
    accessories: {
      title: "Accessories Size Guide",
      description: "Find the right sizes for belts, hats, gloves, and other accessories with our detailed measurement guides.",
      measurementTypes: ["inches", "cm"],
      guides: [
        {
          id: 'accessories-1',
          title: 'Belts',
          content: {
            headers: ['Size', 'Waist (in)', 'Waist (cm)', 'Belt Length (in)'],
            inches: [
              ['XS', '28-30', '71-76', '32-34'],
              ['S', '32-34', '81-86', '36-38'],
              ['M', '36-38', '91-97', '40-42'],
              ['L', '40-42', '102-107', '44-46'],
              ['XL', '44-46', '112-117', '48-50'],
              ['XXL', '48-50', '122-127', '52-54']
            ],
            cm: [
              ['XS', '28-30', '71-76', '32-34'],
              ['S', '32-34', '81-86', '36-38'],
              ['M', '36-38', '91-97', '40-42'],
              ['L', '40-42', '102-107', '44-46'],
              ['XL', '44-46', '112-117', '48-50'],
              ['XXL', '48-50', '122-127', '52-54']
            ]
          },
          measurementTips: [
            "Measure your waist where you typically wear the belt.",
            "For belts, you generally need to add 2 inches to your waist measurement for proper fit.",
            "If you're between sizes, we recommend sizing up for comfort."
          ]
        },
        {
          id: 'accessories-2',
          title: 'Hats & Caps',
          content: {
            headers: ['Size', 'Head Circumference (in)', 'Head Circumference (cm)'],
            inches: [
              ['XS', '20-20.5', '51-52'],
              ['S', '21-21.5', '53-54.5'],
              ['M', '22-22.5', '56-57'],
              ['L', '23-23.5', '58.5-59.5'],
              ['XL', '24-24.5', '61-62'],
              ['XXL', '25-25.5', '63.5-65']
            ],
            cm: [
              ['XS', '20-20.5', '51-52'],
              ['S', '21-21.5', '53-54.5'],
              ['M', '22-22.5', '56-57'],
              ['L', '23-23.5', '58.5-59.5'],
              ['XL', '24-24.5', '61-62'],
              ['XXL', '25-25.5', '63.5-65']
            ]
          },
          measurementTips: [
            "Use a soft measuring tape to measure around your head about 1/2 inch above your ears.",
            "Most of our caps feature adjustable back closures to accommodate a range of sizes.",
            "For a more comfortable fit, choose a size that allows a small amount of room."
          ]
        },
        {
          id: 'accessories-3',
          title: 'Gloves',
          content: {
            headers: ['Size', 'Hand Circumference (in)', 'Hand Circumference (cm)', 'Hand Length (in)'],
            inches: [
              ['XS', '6.5-7', '16.5-18', '6.5'],
              ['S', '7.5-8', '19-20.5', '7'],
              ['M', '8.5-9', '21.5-23', '7.5'],
              ['L', '9.5-10', '24-25.5', '8'],
              ['XL', '10.5-11', '26.5-28', '8.5'],
              ['XXL', '11.5-12', '29-30.5', '9']
            ],
            cm: [
              ['XS', '6.5-7', '16.5-18', '6.5'],
              ['S', '7.5-8', '19-20.5', '7'],
              ['M', '8.5-9', '21.5-23', '7.5'],
              ['L', '9.5-10', '24-25.5', '8'],
              ['XL', '10.5-11', '26.5-28', '8.5'],
              ['XXL', '11.5-12', '29-30.5', '9']
            ]
          },
          measurementTips: [
            "Measure the circumference of your dominant hand around the knuckles, excluding your thumb.",
            "Hand length is measured from the wrist crease to the tip of your middle finger.",
            "For winter gloves, consider sizing up if you plan to wear liners underneath."
          ]
        }
      ]
    },
    outerwear: {
      title: "Outerwear Size Guide",
      description: "Find your perfect fit for jackets, coats, and other outerwear. For the best fit, measure over the clothes you plan to wear underneath.",
      measurementTypes: ["us", "eu", "uk", "intl"],
      guides: [
        {
          id: 'outerwear-1',
          title: 'Men\'s Jackets & Coats',
          content: {
            headers: ['Size', 'Chest (in)', 'Shoulder (in)', 'Sleeve (in)', 'Length (in)'],
            us: [
              ['S', '38-40', '17-18', '33-34', '27-28'],
              ['M', '42-44', '18-19', '34-35', '28-29'],
              ['L', '46-48', '19-20', '35-36', '29-30'],
              ['XL', '50-52', '20-21', '36-37', '30-31'],
              ['XXL', '54-56', '21-22', '37-38', '31-32']
            ],
            eu: [
              ['S (46-48)', '38-40', '17-18', '33-34', '27-28'],
              ['M (50-52)', '42-44', '18-19', '34-35', '28-29'],
              ['L (54-56)', '46-48', '19-20', '35-36', '29-30'],
              ['XL (58-60)', '50-52', '20-21', '36-37', '30-31'],
              ['XXL (62-64)', '54-56', '21-22', '37-38', '31-32']
            ],
            uk: [
              ['S', '38-40', '17-18', '33-34', '27-28'],
              ['M', '42-44', '18-19', '34-35', '28-29'],
              ['L', '46-48', '19-20', '35-36', '29-30'],
              ['XL', '50-52', '20-21', '36-37', '30-31'],
              ['XXL', '54-56', '21-22', '37-38', '31-32']
            ],
            intl: [
              ['S', '97-102', '43-46', '84-86', '69-71'],
              ['M', '107-112', '46-48', '86-89', '71-74'],
              ['L', '117-122', '48-51', '89-91', '74-76'],
              ['XL', '127-132', '51-53', '91-94', '76-79'],
              ['XXL', '137-142', '53-56', '94-97', '79-81']
            ]
          },
          measurementTips: [
            "Chest: Measure around the fullest part of your chest, keeping the tape measure horizontal.",
            "Shoulders: Measure across your back from one shoulder edge to the other.",
            "Sleeve: Measure from shoulder seam to wrist.",
            "For outerwear, consider the clothing you'll wear underneath—if you plan to layer with sweaters, you may want to size up."
          ]
        },
        {
          id: 'outerwear-2',
          title: 'Women\'s Jackets & Coats',
          content: {
            headers: ['Size', 'Bust (in)', 'Shoulder (in)', 'Sleeve (in)', 'Length (in)'],
            us: [
              ['XS (0-2)', '32-34', '14-15', '30-31', '23-24'],
              ['S (4-6)', '36-38', '15-16', '31-32', '24-25'],
              ['M (8-10)', '40-42', '16-17', '32-33', '25-26'],
              ['L (12-14)', '44-46', '17-18', '33-34', '26-27'],
              ['XL (16-18)', '48-50', '18-19', '34-35', '27-28']
            ],
            eu: [
              ['XS (32-34)', '32-34', '14-15', '30-31', '23-24'],
              ['S (36-38)', '36-38', '15-16', '31-32', '24-25'],
              ['M (40-42)', '40-42', '16-17', '32-33', '25-26'],
              ['L (44-46)', '44-46', '17-18', '33-34', '26-27'],
              ['XL (48-50)', '48-50', '18-19', '34-35', '27-28']
            ],
            uk: [
              ['XS (4-6)', '32-34', '14-15', '30-31', '23-24'],
              ['S (8-10)', '36-38', '15-16', '31-32', '24-25'],
              ['M (12-14)', '40-42', '16-17', '32-33', '25-26'],
              ['L (16-18)', '44-46', '17-18', '33-34', '26-27'],
              ['XL (20-22)', '48-50', '18-19', '34-35', '27-28']
            ],
            intl: [
              ['XS', '81-86', '36-38', '76-79', '58-61'],
              ['S', '91-97', '38-41', '79-81', '61-64'],
              ['M', '102-107', '41-43', '81-84', '64-66'],
              ['L', '112-117', '43-46', '84-86', '66-69'],
              ['XL', '122-127', '46-48', '86-89', '69-71']
            ]
          },
          measurementTips: [
            "Bust: Measure around the fullest part of your bust, keeping the tape measure horizontal.",
            "Shoulders: Measure across your back from one shoulder edge to the other.",
            "Consider the style of the jacket—oversized styles should be purchased in your normal size as they're already designed to fit loosely.",
            "For fitted jackets, sizing up may be necessary if you plan to wear multiple layers underneath."
          ]
        }
      ]
    }
  };

  const categories = [
    { id: 'apparel', icon: Shirt, name: 'Apparel', color: 'blue' },
    { id: 'footwear', icon: Footprints, name: 'Footwear', color: 'purple' },
    { id: 'accessories', icon: ShoppingBag, name: 'Accessories', color: 'green' },
    { id: 'outerwear', icon: User, name: 'Outerwear', color: 'amber' }
  ];

  const measurementTypeLabels = {
    us: 'US Sizes',
    eu: 'EU Sizes',
    uk: 'UK Sizes',
    intl: 'CM (International)',
    inches: 'Inches',
    cm: 'Centimeters'
  };

  const stats = [
    { label: 'Size Satisfaction', value: '95%', icon: Star, color: 'amber' },
    { label: 'Free Exchanges', value: 'Always', icon: CheckCircle, color: 'green' },
    { label: 'Fit Rating', value: '4.8/5', icon: TrendingUp, color: 'blue' },
    { label: 'Size Options', value: '120+', icon: Package, color: 'purple' }
  ];

  const fitGuarantees = [
    {
      icon: Award,
      title: 'Perfect Fit Guarantee',
      description: 'Free exchanges until you find your perfect size',
      color: 'blue'
    },
    {
      icon: Ruler,
      title: 'Accurate Measurements',
      description: 'Detailed size charts for every product',
      color: 'purple'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Consistent sizing across all products',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Quick Exchanges',
      description: 'Fast processing for size exchanges',
      color: 'amber'
    }
  ];

  const toggleGuide = (guideId) => {
    setOpenGuideId(openGuideId === guideId ? null : guideId);
  };

  // Get the current category icon
  const getCurrentCategoryIcon = () => {
    const category = categories.find(c => c.id === activeCategory);
    if (!category) return null;
    const Icon = category.icon;
    return <Icon className="mr-2 text-amber-400" size={24} />;
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
                <Ruler className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Find Your Perfect Fit</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Size Guide
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "160px" }}
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
                Find your perfect fit with our detailed size charts and measurement guides for all product categories.
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

          {/* Fit Guarantees */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {fitGuarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${guarantee.color}-500/50 transition-all shadow-lg text-center group`}
                >
                  <div className={`inline-flex p-3 bg-${guarantee.color}-500/10 rounded-xl mb-4 border border-${guarantee.color}-500/20 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${guarantee.color}-400`} />
                  </div>
                  <h3 className="font-medium text-white text-lg mb-2">{guarantee.title}</h3>
                  <p className="text-gray-400 text-sm">{guarantee.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Category Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mb-6 overflow-x-auto pb-2 scrollbar-hide"
          >
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
          </motion.div>

          {/* Category Header & Measurement Type Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                  {getCurrentCategoryIcon()}
                  {sizeGuideData[activeCategory].title}
                </h3>
                <p className="text-gray-400">{sizeGuideData[activeCategory].description}</p>
              </div>
              
              <div className="bg-gray-900 inline-flex rounded-xl p-1 border border-gray-700">
                {sizeGuideData[activeCategory].measurementTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveMeasurementType(type)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeMeasurementType === type 
                        ? "bg-amber-500 text-gray-900 shadow-lg" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {measurementTypeLabels[type]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Size Charts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 mb-8"
          >
            <AnimatePresence mode="wait">
              {sizeGuideData[activeCategory].guides.map((guide) => (
                <motion.div
                  key={guide.id}
                  variants={itemVariants}
                  className="border border-gray-700 rounded-xl overflow-hidden bg-gray-800 hover:border-amber-500/50 transition-colors"
                >
                  <button
                    onClick={() => toggleGuide(guide.id)}
                    className={`w-full p-5 text-left transition-colors flex justify-between items-center ${
                      openGuideId === guide.id ? "bg-gray-900" : "hover:bg-gray-900"
                    }`}
                  >
                    <span className="font-medium text-white text-lg">{guide.title}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                        openGuideId === guide.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openGuideId === guide.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gray-900 border-t border-gray-700">
                          {/* Size Table */}
                          <div className="overflow-x-auto mb-6">
                            <table className="min-w-full">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  {guide.content.headers.map((header, idx) => (
                                    <th key={idx} className="px-4 py-3 text-left text-amber-400 font-semibold">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-700">
                                {guide.content[activeMeasurementType].map((row, rowIdx) => (
                                  <tr key={rowIdx} className="hover:bg-gray-800 transition-colors">
                                    {row.map((cell, cellIdx) => (
                                      <td 
                                        key={cellIdx} 
                                        className={`px-4 py-3 ${cellIdx === 0 ? 'font-semibold text-white' : 'text-gray-300'}`}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          {/* Measurement Tips */}
                          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                            <div className="flex items-center mb-4">
                              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 mr-3">
                                <Ruler size={18} className="text-amber-400" />
                              </div>
                              <h4 className="font-semibold text-white text-lg">Measurement Tips</h4>
                            </div>
                            <ul className="space-y-3">
                              {guide.measurementTips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-300">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Measurement Guide Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
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

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-gray-900/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Video className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Video Tutorial Available</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Not Sure How to Measure?
                </h3>
                <p className="text-gray-800 text-lg">
                  Watch our step-by-step video guide on how to take accurate body measurements at home.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gray-900 text-amber-400 px-6 py-3 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-gray-800 transition-colors"
                >
                  <Video className="w-5 h-5" />
                  <span>Watch Video</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-white transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-700"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <HelpCircle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Still Unsure About Sizing?
                  </h3>
                  <p className="text-gray-400 text-lg">
                    Our fit specialists can help you find the perfect size for your body type.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 px-6 py-3 rounded-xl font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Contact Expert</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span>Size FAQ</span>
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