import { useState, useEffect } from 'react';
import { Instagram, Twitter, Facebook, Youtube, MessageSquare } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    // Appear animation when component mounts
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const stats = [
    { value: "1,200+", label: "Questions Answered" },
    { value: "< 2 hours", label: "Support Response Time" },
    { value: "97%", label: "Customer Satisfaction" },
    { value: "350+", label: "Knowledge Base Articles" }
  ];

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Exchange Shoes", path: "/exchange" },
        { name: "Customize Shoes", path: "/customize" },
        { name: "Service Shoes", path: "/service" },
        { name: "Resell Shoes", path: "/resell" },
        { name: "Shop Shoes", path: "/shop" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", path: "/faqs" },
        { name: "Shipping & Returns", path: "/shipping" },
        { name: "Size Guide", path: "/size-guide" },
        { name: "Contact Us", path: "/contact" },
        { name: "Track Order", path: "/track" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" }
      ]
    }
  ];

  const socialIcons = [
    { icon: <Instagram size={20} />, label: "Instagram" },
    { icon: <Twitter size={20} />, label: "Twitter" },
    { icon: <Facebook size={20} />, label: "Facebook" },
    { icon: <Youtube size={20} />, label: "YouTube" }
  ];

  return (
    <div 
      className={`bg-gray-900 text-white transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Main Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description with fade-in animation */}
          <div className={`transform transition duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex items-center mb-4 group">
              <div className="bg-amber-500 rounded p-2 mr-2 transition-all duration-300 group-hover:rotate-12">
                <span className="text-gray-900 font-bold">✕</span>
              </div>
              <span className="text-white font-bold text-xl relative overflow-hidden">
                SoleCraft
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-500 group-hover:w-full"></span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              The premier destination for sneaker enthusiasts to buy, sell, and discover the most coveted footwear from around the world.
            </p>
          </div>

          {/* Navigation links with staggered animation */}
          {footerLinks.map((section, idx) => (
            <div 
              key={idx}
              className={`transform transition duration-700 delay-${idx * 100} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              onMouseEnter={() => setHoveredSection(idx)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h3 className="text-white font-medium mb-4 pb-2 border-b border-amber-500 inline-block transition-all duration-300 hover:pl-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.slice(0, 5).map((link, linkIdx) => (
                  <li 
                    key={linkIdx}
                    className={`transform transition-all duration-300 ${
                      hoveredSection === idx ? 'translate-x-2' : 'translate-x-0'
                    } delay-${linkIdx * 50}`}
                  >
                    <a
                      href={link.path}
                      className="text-gray-400 hover:text-amber-500 transition-colors duration-300 relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with fade-up animation */}
        <div 
          className={`mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center transform transition duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialIcons.map((item, index) => (
              <a
                key={index}
                href="#"
                className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SoleCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;