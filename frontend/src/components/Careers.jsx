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
  Book,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Zap,
  Shield,
  Target,
  Sparkles,
  X,
  AlertCircle,
  Loader
} from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

// Configure axios
const API_BASE_URL = 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;

// Add token to requests if available
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const jobCategories = [
    { id: 'technology', icon: Code, name: 'Technology', color: 'blue' },
    { id: 'design', icon: Laptop, name: 'Design', color: 'purple' },
    { id: 'marketing', icon: PieChart, name: 'Marketing', color: 'amber' },
    { id: 'operations', icon: Building, name: 'Operations', color: 'green' }
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
    { 
      icon: Heart, 
      title: 'Health & Wellness', 
      description: 'Comprehensive insurance, mental health support, and wellness programs.',
      color: 'red'
    },
    { 
      icon: Coffee, 
      title: 'Work-Life Balance', 
      description: 'Flexible schedules, remote options, and generous PTO policy.',
      color: 'amber'
    },
    { 
      icon: Award, 
      title: 'Career Growth', 
      description: 'Professional development budget, mentorship, and clear advancement paths.',
      color: 'purple'
    },
    { 
      icon: Book, 
      title: 'Continuous Learning', 
      description: 'Learning stipends, workshops, and knowledge sharing sessions.',
      color: 'green'
    }
  ];

  const stats = [
    { label: 'Open Positions', value: '25+', icon: Briefcase, color: 'blue' },
    { label: 'Team Members', value: '500+', icon: Users, color: 'purple' },
    { label: 'Countries', value: '12', icon: MapPin, color: 'green' },
    { label: 'Avg. Tenure', value: '4.5yr', icon: Clock, color: 'amber' }
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
    // Clear errors when user starts typing
    if (submitError) setSubmitError('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitError('Invalid file type. Please upload PDF, DOC, or DOCX file.');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File size too large. Please upload a file smaller than 5MB.');
        return;
      }

      setFormData({
        ...formData,
        resumeFile: file
      });
      setFileUploaded(true);
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Validate all fields
      if (!formData.name || !formData.email || !formData.phone || 
          !formData.position || !formData.experience || !formData.resumeFile) {
        throw new Error('Please fill in all required fields');
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('position', formData.position);
      submitData.append('experience', formData.experience);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('resume', formData.resumeFile);

      // Submit application
      const response = await axios.post('/api/careers/apply', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        // Reset form
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
        }, 10000);
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setSubmitError(
        error.response?.data?.message || 
        error.message || 
        'Failed to submit application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
                <Briefcase className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">We're Hiring</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Join Our Team
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
                Discover exciting opportunities to grow your career and make an impact in the sneaker industry.
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

          {/* Benefits Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">Why Join SoleCraft</h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  We believe in supporting our team with the best benefits and growth opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefitsData.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                      whileHover={{ y: -3 }}
                      className={`bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-${benefit.color}-500/50 transition-all text-center`}
                    >
                      <div className={`inline-flex p-3 bg-${benefit.color}-500/10 rounded-xl mb-4 border border-${benefit.color}-500/20`}>
                        <Icon className={`w-6 h-6 text-${benefit.color}-400`} />
                      </div>
                      <h4 className="text-white font-medium text-lg mb-2">{benefit.title}</h4>
                      <p className="text-gray-400 text-sm">{benefit.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Open Positions Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Success Message */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    id="success-message"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-green-400 font-bold text-lg mb-2">Application Submitted Successfully!</h4>
                        <p className="text-gray-300 text-sm">
                          Thank you for your interest in joining SoleCraft. We've received your application and our recruitment team will review it shortly. You should hear back from us within 1-2 weeks.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Category Navigation */}
              <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2">
                  {jobCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                          activeCategory === category.id 
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30' 
                            : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Job Listings */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Briefcase className="mr-2 text-amber-400" size={20} />
                  Open Positions: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                </h3>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {jobsData[activeCategory].map((job, index) => (
                      <motion.div
                        key={job.id}
                        variants={itemVariants}
                        className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                      >
                        <button
                          onClick={() => toggleJob(job.id)}
                          className={`w-full p-5 text-left transition-colors ${
                            openJobId === job.id ? "bg-gray-900" : "hover:bg-gray-900"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-lg mb-2">{job.title}</h4>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                                <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                                  <MapPin size={14} className="text-purple-400" /> {job.location}
                                </span>
                                <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                                  <Clock size={14} className="text-blue-400" /> {job.type}
                                </span>
                                <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                                  <DollarSign size={14} className="text-green-400" /> {job.salary}
                                </span>
                              </div>
                            </div>
                            <ChevronDown 
                              className={`w-5 h-5 text-amber-400 transition-transform duration-200 ${
                                openJobId === job.id ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {openJobId === job.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 text-gray-300 bg-gray-900 border-t border-gray-700">
                                <p className="mb-4">{job.description}</p>
                                <h5 className="font-medium text-white mb-3 flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                  Requirements
                                </h5>
                                <ul className="space-y-2 mb-6">
                                  {job.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                      <span className="text-amber-400 mr-2 mt-1">•</span>
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      position: job.title
                                    });
                                    document.getElementById('application-form').scrollIntoView({ 
                                      behavior: 'smooth',
                                      block: 'start'
                                    });
                                  }}
                                >
                                  <Send size={18} />
                                  Apply Now
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Application Form */}
              <motion.div 
                id="application-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <FileText className="mr-2 text-amber-400" size={20} />
                  Submit Your Application
                </h3>

                {/* Error Message */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm">{submitError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
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
                        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
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
                        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-gray-400 text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+91-9876543210"
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className="block text-gray-400 text-sm font-medium mb-2">
                        Position *
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Position you're applying for"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-gray-400 text-sm font-medium mb-2">
                      Years of Experience *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select your experience</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="block text-gray-400 text-sm font-medium mb-2">
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={4}
                      disabled={isSubmitting}
                      className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell us why you're a good fit for this position..."
                    ></textarea>
                  </div>

                  <div className="relative">
                    <label htmlFor="resume" className="block text-gray-400 text-sm font-medium mb-2">
                      Resume/CV *
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="resume"
                      className={`flex items-center justify-center gap-2 cursor-pointer border ${
                        fileUploaded 
                          ? "border-green-500/50 bg-green-500/10" 
                          : "border-gray-700 bg-gray-900"
                      } rounded-xl px-4 py-3 w-full text-white transition-all hover:border-amber-500 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {fileUploaded ? (
                        <>
                          <CheckCircle size={18} className="text-green-400" />
                          <span className="text-sm text-green-400 font-medium">{formData.resumeFile?.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isSubmitting) {
                                setFormData({ ...formData, resumeFile: null });
                                setFileUploaded(false);
                              }
                            }}
                            disabled={isSubmitting}
                            className="ml-auto p-1 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <X size={16} className="text-gray-400" />
                          </button>
                        </>
                      ) : (
                        <>
                          <Upload size={18} className="text-amber-400" />
                          <span className="text-sm text-gray-400">Upload your resume (PDF, DOC, DOCX - Max 5MB)</span>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-amber-400" size={20} />
                  Frequently Asked Questions
                </h3>

                <div className="space-y-3">
                  {faqData.map((faq, index) => (
                    <div
                      key={faq.id}
                      className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className={`w-full p-4 text-left transition-colors flex justify-between items-center ${
                          openFaqId === faq.id ? "bg-gray-900" : "hover:bg-gray-900"
                        }`}
                      >
                        <span className="font-medium text-white text-sm pr-2">{faq.question}</span>
                        <ChevronDown 
                          className={`w-4 h-4 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                            openFaqId === faq.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {openFaqId === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 text-gray-400 text-sm bg-gray-900 border-t border-gray-700">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <p className="text-sm text-gray-300 mb-2">
                    <strong className="text-white">Still have questions?</strong>
                  </p>
                  <p className="text-sm text-gray-400">
                    Contact our recruitment team at{" "}
                    <a href="mailto:careers@solecraft.com" className="text-amber-400 hover:underline">
                      careers@solecraft.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}