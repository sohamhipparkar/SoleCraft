import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  Server, 
  ChevronDown, 
  Users, 
  Globe, 
  Mail, 
  Clock,
  Bell,
  FileText,
  HelpCircle,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  X,
  Loader,
  Zap,
  Award,
  Database,
  Key,
  AlertCircle as AlertIcon
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

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

export default function PrivacyPolicyComponent() {
  const [activeSection, setActiveSection] = useState('collection');
  const [openSectionId, setOpenSectionId] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
    advertising: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    requestType: '',
    message: ''
  });
  const [inquiryId, setInquiryId] = useState('');

  const dpoInfo = {
    email: 'privacy@solecraft.com',
    location: 'Pune, India',
    response: 'Within 48 hours',
    update: 'Last updated: April 15, 2025'
  };

  const privacySections = [
    { id: 'collection', icon: Database, name: 'Data Collection', color: 'blue' },
    { id: 'usage', icon: Eye, name: 'Data Usage', color: 'purple' },
    { id: 'sharing', icon: Users, name: 'Data Sharing', color: 'green' },
    { id: 'security', icon: Lock, name: 'Security', color: 'amber' },
    { id: 'rights', icon: Key, name: 'Your Rights', color: 'red' }
  ];

  const policySections = [
    {
      id: 'section-1',
      title: 'Information We Collect',
      content: `We collect several types of information from and about users of our Website and Services, including:
        
• Personal identifiers such as name, postal address, email address, and phone number.
• Account credentials such as username and password.
• Payment information such as credit card details (stored securely with our payment processors).
• Profile information such as purchases, preferences, feedback, and survey responses.
• Technical data such as IP address, browser type, device information, operating system, and cookies.
• Usage data such as pages visited, time spent on pages, referring websites, and interaction patterns.

We collect this information directly when you provide it to us, automatically as you navigate through the site, and from third parties such as business partners and analytics providers.`
    },
    {
      id: 'section-2',
      title: 'How We Use Your Information',
      content: `We use the information we collect for various purposes, including:

• To provide, maintain, and improve our Services.
• To process transactions and send related information including confirmations and invoices.
• To send administrative information such as changes to our terms, conditions, and policies.
• To personalize your experience and deliver content and product offerings relevant to your interests.
• To respond to your comments, questions, and requests and provide customer service.
• To monitor and analyze trends, usage, and activities in connection with our Services.
• To detect, prevent, and address technical issues, fraud, and other illegal activities.
• To comply with legal obligations and enforce our terms of service.

We will process your personal information only for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason compatible with the original purpose.`
    },
    {
      id: 'section-3',
      title: 'How We Share Your Information',
      content: `We may share your personal information in the following situations:

• With service providers, contractors, and other third parties we use to support our business operations.
• With business partners to offer you certain products, services, or promotions.
• In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition.
• With your consent or at your direction.
• To comply with legal obligations, enforce our terms, and protect our rights or the rights of others.

We require all third parties to respect the security of your personal information and to treat it in accordance with applicable laws. We do not allow our third-party service providers to use your personal information for their own purposes.`
    },
    {
      id: 'section-4',
      title: 'Data Security',
      content: `We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. These measures include:

• Encryption of sensitive data both in transit and at rest.
• Regular security assessments and penetration testing.
• Access controls and authentication requirements for all systems containing personal data.
• Regular backups and disaster recovery planning.
• Employee training on data protection and security awareness.
• Incident response procedures for potential data breaches.

The safety and security of your information also depends on you. We urge you to be careful about sharing your personal information and to maintain the confidentiality of your account credentials.`
    },
    {
      id: 'section-5',
      title: 'Your Privacy Rights',
      content: `Depending on your location, you may have certain rights regarding your personal information, including:

• Right to Access: You can request to know what personal information we have about you.
• Right to Rectification: You can request correction of inaccurate information.
• Right to Erasure: You can request deletion of your personal information in certain circumstances.
• Right to Restrict Processing: You can request that we limit how we use your data.
• Right to Data Portability: You can request a copy of your data in a machine-readable format.
• Right to Object: You can object to certain types of processing activities.
• Right to Withdraw Consent: When processing is based on consent, you can withdraw it at any time.

To exercise these rights, please contact us using the details provided at the end of this policy. We will respond to all legitimate requests within the timeframes required by applicable law.`
    },
    {
      id: 'section-6',
      title: 'International Data Transfers',
      content: `We operate globally and may transfer your personal information to countries other than your country of residence. We have implemented appropriate safeguards to ensure your information receives an adequate level of protection regardless of where it is processed.

These safeguards include:

• Standard Contractual Clauses approved by the European Commission.
• Privacy Shield certification for transfers to the United States (when applicable).
• Binding Corporate Rules for intra-group transfers.
• Contractual commitments from recipients to protect your information.

By using our Services, you consent to the transfer of information to countries that may have different data protection rules than your country.`
    },
    {
      id: 'section-7',
      title: 'Cookies and Similar Technologies',
      content: `We use cookies and similar tracking technologies to track activity on our Services and to hold certain information.

• Essential cookies: Required for the operation of our website.
• Analytical/performance cookies: Allow us to recognize and count visitors and analyze website usage.
• Functionality cookies: Enable website features like remembering your preferences.
• Targeting cookies: Record your visit, pages visited, and links followed to make advertising more relevant.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.`
    },
    {
      id: 'section-8',
      title: 'Children\'s Privacy',
      content: `Our Services are not intended for children under 16 years of age, and we do not knowingly collect personal information from children under 16. If we learn we have collected personal information from a child under 16, we will delete that information as quickly as possible.

If you believe we might have any information from or about a child under 16, please contact us immediately.`
    },
    {
      id: 'section-9',
      title: 'Changes to Our Privacy Policy',
      content: `We may update our Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.

We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information. If we make material changes to this Privacy Policy, we will notify you either through the email address you have provided or by placing a prominent notice on our website.`
    },
    {
      id: 'section-10',
      title: 'Contact Information',
      content: `If you have questions or comments about this Privacy Policy, your personal information, our use and disclosure practices, or your consent choices, please contact our Data Protection Officer:

Email: privacy@solecraft.com
Mail: Privacy Department, SoleCraft Inc., 123 Fashion Street, New York, NY 10001, USA
Phone: +91-7705481058

For residents of the European Economic Area, we have appointed a data protection representative whom you can contact at eudpr@solecraft.com.`
    }
  ];

  const privacyHighlights = [
    { 
      icon: Shield, 
      title: 'Data Protection', 
      description: 'Industry-standard encryption and security practices.',
      color: 'blue'
    },
    { 
      icon: Bell, 
      title: 'Transparency', 
      description: 'Clear explanation of data collection and usage.',
      color: 'purple'
    },
    { 
      icon: RefreshCw, 
      title: 'Control', 
      description: 'Access, modify, or delete your data anytime.',
      color: 'green'
    },
    { 
      icon: AlertTriangle, 
      title: 'Minimization', 
      description: 'Only collect necessary information.',
      color: 'amber'
    }
  ];

  const faqData = [
    {
      id: 'faq-1',
      question: 'How do I request a copy of my data?',
      answer: 'You can request a copy of your personal data by contacting our Data Protection Officer at privacy@solecraft.com or by visiting your account settings and selecting "Request Data Export" under the Privacy section.'
    },
    {
      id: 'faq-2',
      question: 'How long do you retain my information?',
      answer: 'We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements. In general, account information is kept for the duration of your relationship with us, plus a reasonable period afterward for legal and accounting purposes.'
    },
    {
      id: 'faq-3',
      question: 'Can I opt out of marketing communications?',
      answer: 'Yes, you can opt out of marketing communications at any time. Simply click the "Unsubscribe" link at the bottom of any marketing email you receive from us, or update your communication preferences in your account settings.'
    },
    {
      id: 'faq-4',
      question: 'How do you protect my payment information?',
      answer: 'We use industry-standard encryption to protect your payment information during transmission. We do not store your full credit card details on our servers—this information is processed and stored by our PCI-compliant payment processors.'
    },
    {
      id: 'faq-5',
      question: 'How do I delete my account?',
      answer: 'To delete your account, log in to your account settings, navigate to the "Account" tab, and select "Delete Account" at the bottom of the page. Please note that some information may be retained for legal purposes even after account deletion.'
    }
  ];

  const stats = [
    { label: 'Data Protection', value: '256-bit', icon: Lock, color: 'blue' },
    { label: 'Compliance', value: 'GDPR', icon: Award, color: 'green' },
    { label: 'Response Time', value: '< 48h', icon: Clock, color: 'purple' },
    { label: 'Security Updates', value: 'Daily', icon: Shield, color: 'amber' }
  ];

  const sectionContent = {
    collection: ['section-1', 'section-7', 'section-8'],
    usage: ['section-2'],
    sharing: ['section-3', 'section-6'],
    security: ['section-4'],
    rights: ['section-5', 'section-9', 'section-10']
  };

  const toggleSection = (sectionId) => {
    setOpenSectionId(openSectionId === sectionId ? null : sectionId);
  };

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const handleCookieToggle = (cookieType) => {
    if (cookieType !== 'essential') {
      setCookiePreferences({
        ...cookiePreferences,
        [cookieType]: !cookiePreferences[cookieType]
      });
    }
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
      if (!formData.fullName || !formData.email || !formData.requestType || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Submit to API
      const response = await axios.post('http://localhost:5000/api/privacy/data-requests', formData);

      if (response.data.success) {
        setSubmitSuccess(true);
        setInquiryId(response.data.request.requestId);
        setFormData({
          fullName: '',
          email: '',
          requestType: '',
          message: ''
        });

        setTimeout(() => {
          document.getElementById('success-message')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);

        setTimeout(() => {
          setSubmitSuccess(false);
          setInquiryId('');
        }, 10000);
      }

    } catch (error) {
      console.error('Data subject request error:', error);
      setSubmitError(
        error.response?.data?.message || 
        error.message || 
        'Failed to submit request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSections = policySections.filter(section => 
    sectionContent[activeSection].includes(section.id)
  );

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
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Your Privacy Matters</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Privacy Policy
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "220px" }}
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
                We value your privacy and are committed to protecting your personal information. 
                Learn how we collect, use, and safeguard your data.
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

          {/* DPO Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Mail, title: "Contact DPO", content: dpoInfo.email, color: 'blue', delay: 0 },
              { icon: Globe, title: "DPO Office", content: dpoInfo.location, color: 'purple', delay: 0.1 },
              { icon: Clock, title: "Response Time", content: dpoInfo.response, color: 'green', delay: 0.2 },
              { icon: FileText, title: "Last Updated", content: dpoInfo.update, color: 'amber', delay: 0.3 }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + item.delay, duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${item.color}-500/50 transition-all shadow-lg text-center group`}
                >
                  <div className={`inline-flex p-3 bg-${item.color}-500/10 rounded-xl mb-4 border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 text-${item.color}-400`} />
                  </div>
                  <h3 className="font-medium text-white text-lg mb-2">{item.title}</h3>
                  <p className={`text-${item.color}-400 text-sm font-medium mb-1`}>{item.content}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Privacy Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center">
                <Zap className="mr-2 text-amber-400" />
                Privacy Highlights
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our commitment to protecting your data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {privacyHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className={`bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-${highlight.color}-500/50 transition-all text-center group`}
                  >
                    <div className={`inline-flex p-3 bg-${highlight.color}-500/10 rounded-xl mb-4 border border-${highlight.color}-500/20 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${highlight.color}-400`} />
                    </div>
                    <h4 className="text-white font-medium text-lg mb-2">{highlight.title}</h4>
                    <p className="text-gray-400 text-sm">{highlight.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Policy Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Category Navigation */}
              <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2">
                  {privacySections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <motion.button
                        key={section.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                          activeSection === section.id 
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30' 
                            : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{section.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Policy Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <FileText className="mr-2 text-amber-400" size={20} />
                  {privacySections.find(section => section.id === activeSection)?.name || 'Privacy Policy'}
                </h3>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {filteredSections.map((section) => (
                      <motion.div
                        key={section.id}
                        variants={itemVariants}
                        className="border border-gray-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors"
                      >
                        <button
                          onClick={() => toggleSection(section.id)}
                          className={`w-full p-5 text-left transition-colors flex justify-between items-center ${
                            openSectionId === section.id ? "bg-gray-900" : "hover:bg-gray-900"
                          }`}
                        >
                          <h4 className="font-medium text-white text-lg pr-2">{section.title}</h4>
                          <ChevronDown 
                            className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                              openSectionId === section.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {openSectionId === section.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 text-gray-300 bg-gray-900 border-t border-gray-700 whitespace-pre-line leading-relaxed">
                                {section.content}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Cookie Management */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Server className="mr-2 text-amber-400" size={20} />
                  Cookie Preferences
                </h3>

                <p className="text-gray-400 mb-6">
                  Control what types of cookies you allow us to use on our website.
                </p>

                <div className="space-y-4">
                  {[
                    { id: 'essential', title: 'Essential Cookies', description: 'Required for basic website functionality. These cannot be disabled.', required: true, color: 'blue' },
                    { id: 'analytics', title: 'Analytics Cookies', description: 'Help us understand how visitors interact with our website.', required: false, color: 'purple' },
                    { id: 'functional', title: 'Functional Cookies', description: 'Enable personalized features and remember your preferences.', required: false, color: 'green' },
                    { id: 'advertising', title: 'Advertising Cookies', description: 'Used to deliver relevant ads and track campaign performance.', required: false, color: 'amber' }
                  ].map((cookie, index) => (
                    <motion.div
                      key={cookie.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + (index * 0.1), duration: 0.3 }}
                      className={`bg-gray-900 p-5 rounded-xl border border-gray-700 hover:border-${cookie.color}-500/50 transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-white font-medium">{cookie.title}</h4>
                            {cookie.required && (
                              <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{cookie.description}</p>
                        </div>
                        <div className="ml-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={cookie.required ? true : cookiePreferences[cookie.id]}
                              onChange={() => handleCookieToggle(cookie.id)}
                              disabled={cookie.required}
                            />
                            <div className={`w-11 h-6 ${cookie.required ? 'bg-amber-500' : 'bg-gray-700'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${!cookie.required && 'peer-checked:bg-amber-500'}`}></div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2.5 px-6 rounded-xl font-medium transition-colors"
                  >
                    Reject All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 py-2.5 px-6 rounded-xl font-medium transition-colors shadow-lg shadow-amber-500/20"
                  >
                    Save Preferences
                  </motion.button>
                </div>
              </motion.div>

              {/* Data Subject Request Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
              >
                {/* Success Message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      id="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 mb-6"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-green-400 font-bold text-lg mb-2">Request Submitted!</h4>
                          <p className="text-gray-300 text-sm">
                            We've received your data subject request. Our team will process it within 48 hours.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <UserCheck className="mr-2 text-amber-400" size={20} />
                  Submit Data Subject Request
                </h3>

                <p className="text-gray-400 mb-6">
                  Exercise your rights regarding your personal data, such as access, deletion, or correction.
                </p>

                {/* Error Message */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3"
                    >
                      <AlertIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm">{submitError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-gray-400 text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName"
                        value={formData.fullName}
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

                  <div>
                    <label htmlFor="requestType" className="block text-gray-400 text-sm font-medium mb-2">
                      Request Type *
                    </label>
                    <select 
                      id="requestType" 
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select request type</option>
                      <option value="access">Access my data</option>
                      <option value="delete">Delete my data</option>
                      <option value="correct">Correct my data</option>
                      <option value="restrict">Restrict processing</option>
                      <option value="object">Object to processing</option>
                      <option value="portable">Data portability</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">
                      Details of Your Request *
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4} 
                      required
                      disabled={isSubmitting}
                      className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed" 
                      placeholder="Please provide details about your request..."
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input 
                      id="terms" 
                      type="checkbox" 
                      required
                      disabled={isSubmitting}
                      className="w-4 h-4 bg-gray-900 border-gray-700 rounded mt-1 focus:ring-amber-500 focus:ring-2 disabled:opacity-50"
                    />
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                      I confirm that I am the data subject or authorized to act on their behalf, and the information provided is accurate. *
                    </label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 py-3 px-8 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <UserCheck size={18} />
                          <span>Submit Request</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-amber-400" size={20} />
                  Privacy FAQ
                </h3>

                <div className="space-y-3">
                  {faqData.map((faq) => (
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
                  <h4 className="font-medium text-white mb-2 text-sm">Need more help?</h4>
                  <p className="text-gray-400 text-xs mb-4">
                    Contact our Data Protection Officer directly for assistance.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 py-2 px-4 rounded-xl font-medium transition-colors w-full flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Mail size={16} />
                    Contact DPO
                  </motion.button>
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
