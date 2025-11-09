import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Mail, 
  MapPin, 
  Users, 
  Clock, 
  Send, 
  HelpCircle, 
  ChevronDown, 
  Award,
  Building,
  Laptop,
  Heart,
  FileText,
  Upload,
  Code,
  PieChart,
  Coffee,
  Book
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function CareersComponent() {
  const [activeCategory, setActiveCategory] = useState('technology');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [openJobId, setOpenJobId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resumeFile: null
  });
  const [fileUploaded, setFileUploaded] = useState(false);
  const jobCategories = [
    { id: 'technology', icon: <Code />, name: 'Technology' },
    { id: 'design', icon: <Laptop />, name: 'Design' },
    { id: 'marketing', icon: <PieChart />, name: 'Marketing' },
    { id: 'operations', icon: <Building />, name: 'Operations' }
  ];

  const jobsData = {
    technology: [
      {
        id: 'job-1',
        title: 'Senior Frontend Developer',
        location: 'New York, NY (Hybrid)',
        type: 'Full-time',
        salary: '$120,000 - $150,000',
        description: 'We are seeking an experienced Frontend Developer to join our product team. You will be responsible for developing and implementing user interface components using React.js and other frontend technologies.',
        requirements: [
          'Minimum 5 years of experience with modern JavaScript frameworks, particularly React',
          'Strong understanding of responsive design and CSS frameworks',
          'Experience with state management libraries like Redux or Context API',
          'Knowledge of modern frontend build pipelines and tools',
          'Excellent problem-solving and communication skills'
        ]
      },
      {
        id: 'job-2',
        title: 'Full Stack Engineer',
        location: 'Remote (US)',
        type: 'Full-time',
        salary: '$130,000 - $160,000',
        description: 'Join our engineering team to develop scalable web applications. You will work on both frontend and backend systems, collaborating closely with product managers and designers.',
        requirements: [
          'Strong proficiency in JavaScript/TypeScript, Node.js, and React',
          'Experience building RESTful APIs and working with databases',
          'Familiarity with cloud services (AWS, Azure, or GCP)',
          'Understanding of CI/CD pipelines and DevOps practices',
          'Ability to work independently and in an agile team environment'
        ]
      },
      {
        id: 'job-3',
        title: 'DevOps Engineer',
        location: 'Chicago, IL (On-site)',
        type: 'Full-time',
        salary: '$125,000 - $155,000',
        description: 'Help build and maintain our infrastructure, deployment pipelines, and monitoring systems. You will work closely with the development teams to optimize our systems for performance and reliability.',
        requirements: [
          'Experience with containerization technologies (Docker, Kubernetes)',
          'Strong knowledge of cloud platforms, especially AWS services',
          'Proficiency in infrastructure as code (Terraform, CloudFormation)',
          'Experience with monitoring tools and logging systems',
          'Understanding of security best practices in cloud environments'
        ]
      }
    ],
    design: [
      {
        id: 'job-4',
        title: 'UI/UX Designer',
        location: 'Los Angeles, CA (Hybrid)',
        type: 'Full-time',
        salary: '$95,000 - $120,000',
        description: 'Create beautiful, intuitive interfaces for our web and mobile applications. Work closely with product managers and developers to design seamless user experiences.',
        requirements: [
          'Portfolio demonstrating strong UI/UX design skills',
          'Proficiency in design tools like Figma, Sketch, or Adobe XD',
          'Understanding of user-centered design principles',
          'Experience with prototyping and user testing',
          'Ability to translate business requirements into design solutions'
        ]
      },
      {
        id: 'job-5',
        title: 'Product Designer',
        location: 'Remote (Worldwide)',
        type: 'Full-time',
        salary: '$100,000 - $130,000',
        description: 'Lead the design process from concept to implementation for new product features. Collaborate with cross-functional teams to create cohesive user experiences.',
        requirements: [
          'Minimum 3 years of experience in product design',
          'Strong visual design skills with attention to detail',
          'Experience conducting user research and usability testing',
          'Ability to create wireframes, prototypes, and high-fidelity designs',
          'Excellent communication and presentation skills'
        ]
      }
    ],
    marketing: [
      {
        id: 'job-6',
        title: 'Content Marketing Manager',
        location: 'Miami, FL (Hybrid)',
        type: 'Full-time',
        salary: '$85,000 - $110,000',
        description: 'Develop and execute our content strategy across various channels. Create compelling content that drives engagement and supports business objectives.',
        requirements: [
          'Proven experience in content marketing and strategy development',
          'Excellent writing and editing skills',
          'Familiarity with SEO practices and analytics tools',
          'Experience managing editorial calendars and content production',
          'Understanding of different content formats and channels'
        ]
      },
      {
        id: 'job-7',
        title: 'Digital Marketing Specialist',
        location: 'Remote (US)',
        type: 'Full-time',
        salary: '$75,000 - $95,000',
        description: 'Plan and execute digital marketing campaigns across multiple platforms. Analyze performance data and optimize campaigns to improve results.',
        requirements: [
          'Experience with paid social media advertising and Google Ads',
          'Understanding of marketing analytics and attribution',
          'Knowledge of email marketing platforms and strategies',
          'Familiarity with marketing automation tools',
          'Data-driven approach to campaign optimization'
        ]
      }
    ],
    operations: [
      {
        id: 'job-8',
        title: 'Supply Chain Manager',
        location: 'New York, NY (On-site)',
        type: 'Full-time',
        salary: '$110,000 - $140,000',
        description: 'Oversee our supply chain operations, including inventory management, vendor relationships, and logistics. Develop strategies to improve efficiency and reduce costs.',
        requirements: [
          'Minimum 5 years of experience in supply chain management',
          'Knowledge of inventory management systems and practices',
          'Experience with vendor negotiation and management',
          'Understanding of logistics and distribution networks',
          'Strong analytical and problem-solving skills'
        ]
      },
      {
        id: 'job-9',
        title: 'Retail Operations Coordinator',
        location: 'Multiple Locations',
        type: 'Full-time',
        salary: '$65,000 - $80,000',
        description: 'Support our retail locations by coordinating with store managers, processing orders, and managing inventory. Help implement operational improvements across our retail network.',
        requirements: [
          'Experience in retail operations or management',
          'Strong organizational and communication skills',
          'Familiarity with retail management systems',
          'Ability to analyze operational data and identify improvement opportunities',
          'Customer-focused approach to problem-solving'
        ]
      }
    ]
  };

  const faqData = [
    {
      id: 'faq-1',
      question: 'What is your hiring process like?',
      answer: 'Our hiring process typically includes an initial application review, a phone screening, 1-2 rounds of interviews (which may include technical assessments for relevant roles), and a final decision. The entire process usually takes 2-3 weeks, depending on the position and team availability.'
    },
    {
      id: 'faq-2',
      question: 'Do you offer relocation assistance?',
      answer: 'Yes, we offer relocation assistance for certain roles, typically at the senior level or for specialized positions. The specifics of the relocation package are discussed during the final stages of the interview process and vary based on the role and location.'
    },
    {
      id: 'faq-3',
      question: 'What benefits do you offer?',
      answer: 'We offer a comprehensive benefits package including health, dental, and vision insurance, 401(k) matching, flexible PTO, parental leave, professional development stipends, wellness programs, and remote work options for many positions.'
    },
    {
      id: 'faq-4',
      question: 'Do you hire international candidates?',
      answer: 'Yes, we hire international candidates for both remote positions and roles that require relocation to the US. We provide visa sponsorship for eligible positions and candidates. Please note that visa processes can extend the hiring timeline.'
    },
    {
      id: 'faq-5',
      question: 'How often do you post new job openings?',
      answer: 'We update our careers page with new positions weekly. We encourage candidates to check back regularly or sign up for job alerts to be notified when positions matching their skills and interests become available.'
    }
  ];

  const benefitsData = [
    { icon: <Heart />, title: 'Health & Wellness', description: 'Comprehensive insurance, mental health support, and wellness programs.' },
    { icon: <Coffee />, title: 'Work-Life Balance', description: 'Flexible schedules, remote options, and generous PTO policy.' },
    { icon: <Award />, title: 'Career Growth', description: 'Professional development budget, mentorship, and clear advancement paths.' },
    { icon: <Book />, title: 'Continuous Learning', description: 'Learning stipends, workshops, and knowledge sharing sessions.' }
  ];

  const companyInfo = {
    email: 'careers@solecraft.com',
    locations: 'New York, Los Angeles, Chicago, Miami, and Remote',
    team: 'Over 500 talented professionals worldwide',
    culture: 'Innovative, inclusive, and collaborative'
  };

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const toggleJob = (jobId) => {
    setOpenJobId(openJobId === jobId ? null : jobId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resumeFile: file
      });
      setFileUploaded(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    alert('Thanks for your application! We\'ll review it and get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      coverLetter: '',
      resumeFile: null
    });
    setFileUploaded(false);
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
              <Briefcase size={40} className="text-blue-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
            Join Our Team
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
            Discover exciting opportunities to grow your career and make an impact in the fashion industry.
          </motion.p>
        </motion.div>

        {/* Company Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: <Mail size={24} />, title: "Contact", content: companyInfo.email, delay: 0 },
            { icon: <MapPin size={24} />, title: "Locations", content: companyInfo.locations, delay: 0.1 },
            { icon: <Users size={24} />, title: "Our Team", content: companyInfo.team, delay: 0.2 },
            { icon: <Heart size={24} />, title: "Culture", content: companyInfo.culture, delay: 0.3 }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + item.delay, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col items-center text-center"
            >
              <div className="bg-gray-750 p-3 rounded-full mb-4 text-blue-400">
                {item.icon}
              </div>
              <h3 className="font-medium text-white text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
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
              Why Join Us
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-1 left-0 right-0 mx-auto h-1 bg-blue-500 rounded-full"
              ></motion.div>
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsData.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-blue-500 transition-all duration-300"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                  className="bg-blue-500 bg-opacity-10 p-3 rounded-full mx-auto mb-4 inline-block"
                >
                  <span className="text-blue-400">
                    {benefit.icon}
                  </span>
                </motion.div>
                <h4 className="text-white font-medium text-lg mb-2">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Open Positions Section */}
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
                {jobCategories.map((category) => (
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

            {/* Job Listings */}
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
                  <Briefcase className="mr-2 text-blue-400" size={20} />
                  Open Positions: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                </motion.h3>

                <div className="space-y-4">
                  <AnimatePresence>
                    {jobsData[activeCategory].map((job, index) => (
                      <motion.div
                        key={job.id}
                        variants={itemVariants}
                        className="border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-300"
                      >
                        <button
                          onClick={() => toggleJob(job.id)}
                          className={`w-full p-4 md:p-5 text-left transition-colors duration-300 ${
                            openJobId === job.id ? "bg-gray-750" : "hover:bg-gray-750"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h4 className="font-medium text-white text-lg">{job.title}</h4>
                              <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mt-2 md:space-x-4">
                                <span className="flex items-center mb-1 md:mb-0">
                                  <MapPin size={14} className="mr-1 text-blue-400" /> {job.location}
                                </span>
                                <span className="flex items-center mb-1 md:mb-0">
                                  <Clock size={14} className="mr-1 text-blue-400" /> {job.type}
                                </span>
                                <span className="flex items-center">
                                  <Award size={14} className="mr-1 text-blue-400" /> {job.salary}
                                </span>
                              </div>
                            </div>
                            <motion.span
                              animate={{ rotate: openJobId === job.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-blue-400 flex-shrink-0 hidden md:block"
                            >
                              <ChevronDown size={18} />
                            </motion.span>
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {openJobId === job.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 md:p-5 text-gray-300 bg-gray-750 border-t border-gray-700">
                                <p className="mb-4">{job.description}</p>
                                <h5 className="font-medium text-white mb-2">Requirements:</h5>
                                <ul className="space-y-2 mb-4">
                                  {job.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                      <span className="text-blue-400 mr-2 mt-1">•</span>
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  className="bg-blue-500 text-gray-900 py-2 px-5 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg flex items-center text-sm"
                                  onClick={() => {
                                    // Set the position in the form when "Apply Now" is clicked
                                    setFormData({
                                      ...formData,
                                      position: job.title
                                    });
                                    // Scroll to the application form
                                    document.getElementById('application-form').scrollIntoView({ 
                                      behavior: 'smooth',
                                      block: 'start'
                                    });
                                  }}
                                >
                                  <Briefcase size={16} className="mr-2" />
                                  Apply Now
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div 
              id="application-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-8 bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg relative overflow-hidden"
            >
              {/* Decorative elements */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ delay: 1.3, duration: 1 }}
                className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-500"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-blue-500"
              />

              <div className="relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-xl font-bold text-white mb-6 flex items-center"
                >
                  <FileText className="mr-2 text-blue-400" size={20} />
                  Submit Your Application
                </motion.h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                    >
                      <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                    >
                <label htmlFor="phone" className="block text-gray-400 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                        placeholder="(123) 456-7890"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                    >
                      <label htmlFor="position" className="block text-gray-400 text-sm font-medium mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                        placeholder="Position you're applying for"
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <label htmlFor="experience" className="block text-gray-400 text-sm font-medium mb-2">
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                    >
                      <option value="">Select your experience</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    <label htmlFor="coverLetter" className="block text-gray-400 text-sm font-medium mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 w-full text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
                      placeholder="Tell us why you're a good fit for this position..."
                    ></textarea>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    className="relative"
                  >
                    <label htmlFor="resume" className="block text-gray-400 text-sm font-medium mb-2">
                      Resume/CV
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="resume"
                        className={`flex items-center justify-center gap-2 cursor-pointer border ${
                          fileUploaded 
                            ? "border-green-500 bg-green-500 bg-opacity-10" 
                            : "border-gray-700 bg-gray-750"
                        } rounded-lg px-4 py-3 w-full text-white transition-all duration-200 hover:border-blue-500`}
                      >
                        {fileUploaded ? (
                          <>
                            <Upload size={18} className="text-green-500" />
                            <span className="text-sm text-green-500">File uploaded successfully</span>
                          </>
                        ) : (
                          <>
                            <Upload size={18} className="text-blue-400" />
                            <span className="text-sm text-gray-400">Upload your resume (PDF, DOC, DOCX)</span>
                          </>
                        )}
                      </label>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="flex justify-end"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="bg-blue-500 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg flex items-center"
                    >
                      <Send size={18} className="mr-2" /> Submit Application
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg relative overflow-hidden h-full">
              {/* Decorative elements */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500"
              />

              <div className="relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-xl font-bold text-white mb-6 flex items-center"
                >
                  <HelpCircle className="mr-2 text-blue-400" size={20} />
                  Frequently Asked Questions
                </motion.h3>

                <div className="space-y-4">
                  <AnimatePresence>
                    {faqData.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
                        className="border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-300"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className={`w-full p-4 text-left transition-colors duration-300 flex justify-between items-center ${
                            openFaqId === faq.id ? "bg-gray-750" : "hover:bg-gray-750"
                          }`}
                        >
                          <span className="font-medium text-white">{faq.question}</span>
                          <motion.span
                            animate={{ rotate: openFaqId === faq.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-blue-400 flex-shrink-0"
                          >
                            <ChevronDown size={18} />
                          </motion.span>
                        </button>
                        
                        <AnimatePresence>
                          {openFaqId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 text-gray-300 text-sm bg-gray-750 border-t border-gray-700">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.7 }}
                  className="mt-6 p-4 bg-blue-500 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-20"
                >
                  <p className="text-sm text-gray-300">
                    Still have questions? Feel free to contact our recruitment team at{" "}
                    <a href="mailto:careers@ysolecraft.com" className="text-blue-400 hover:underline">
                      careers@yourfashionbrand.com
                    </a>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}