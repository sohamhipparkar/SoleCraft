import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  Server, 
  List, 
  ChevronDown, 
  Users, 
  Globe, 
  Mail, 
  Clock,
  Bell,
  FileText,
  HelpCircle,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PrivacyPolicyComponent() {
  const [activeSection, setActiveSection] = useState('collection');
  const [openSectionId, setOpenSectionId] = useState(null);

  const dpoInfo = {
    email: 'privacy@solecraft.com',
    location: 'New York, NY',
    response: 'Within 48 hours',
    update: 'Last updated: April 15, 2025'
  };

  const privacySections = [
    { id: 'collection', icon: <UserCheck />, name: 'Data Collection' },
    { id: 'usage', icon: <Eye />, name: 'Data Usage' },
    { id: 'sharing', icon: <Users />, name: 'Data Sharing' },
    { id: 'security', icon: <Lock />, name: 'Security Measures' },
    { id: 'rights', icon: <FileText />, name: 'Your Rights' }
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
      title: 'Childrens Privacy',
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
Phone: +1 (555) 123-4567

For residents of the European Economic Area, we have appointed a data protection representative whom you can contact at eudpr@solecraft.com.`
    }
  ];

  const privacyHighlights = [
    { 
      icon: <Shield />, 
      title: 'Data Protection', 
      description: 'Your data is protected using industry-standard encryption and security practices.' 
    },
    { 
      icon: <Bell />, 
      title: 'Transparency', 
      description: 'We clearly explain what data we collect and how it iss used.' 
    },
    { 
      icon: <RefreshCw />, 
      title: 'Control', 
      description: 'You can access, modify, or delete your personal information at any time.' 
    },
    { 
      icon: <AlertTriangle />, 
      title: 'Data Minimization', 
      description: 'We only collect information that is necessary for providing our services.' 
    }
  ];

  const toggleSection = (sectionId) => {
    setOpenSectionId(openSectionId === sectionId ? null : sectionId);
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

  const sectionContent = {
    collection: [
      'section-1',
      'section-7',
      'section-8'
    ],
    usage: [
      'section-2'
    ],
    sharing: [
      'section-3',
      'section-6'
    ],
    security: [
      'section-4'
    ],
    rights: [
      'section-5',
      'section-9',
      'section-10'
    ]
  };

  const filteredSections = policySections.filter(section => 
    sectionContent[activeSection].includes(section.id)
  );

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
              <Shield size={40} className="text-blue-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
            Privacy Policy
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
            We value your privacy and are committed to protecting your personal information. 
            This policy explains how we collect, use, and safeguard your data.
          </motion.p>
        </motion.div>

        {/* DPO Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: <Mail size={24} />, title: "Contact DPO", content: dpoInfo.email, delay: 0 },
            { icon: <Globe size={24} />, title: "DPO Office", content: dpoInfo.location, delay: 0.1 },
            { icon: <Clock size={24} />, title: "Response Time", content: dpoInfo.response, delay: 0.2 },
            { icon: <FileText size={24} />, title: "Last Updated", content: dpoInfo.update, delay: 0.3 }
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

        {/* Privacy Highlights Section */}
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
              Privacy Highlights
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-1 left-0 right-0 mx-auto h-1 bg-blue-500 rounded-full"
              ></motion.div>
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyHighlights.map((highlight, index) => (
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
                    {highlight.icon}
                  </span>
                </motion.div>
                <h4 className="text-white font-medium text-lg mb-2">{highlight.title}</h4>
                <p className="text-gray-400 text-sm">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Policy Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Policy Sections */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="lg:col-span-2"
          >
            {/* Section Navigation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6 overflow-x-auto pb-2 hide-scrollbar"
            >
              <div className="flex space-x-2 md:space-x-4">
                {privacySections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ y: -3, backgroundColor: "#1f2937" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-3 rounded-lg flex items-center whitespace-nowrap transition-all duration-300 ${
                      activeSection === section.id 
                        ? "bg-blue-500 text-gray-900 font-medium" 
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <span className={`mr-2 ${activeSection === section.id ? "text-gray-900" : "text-blue-400"}`}>
                      {section.icon}
                    </span>
                    <span className="text-sm">{section.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Policy Content */}
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
                  <List className="mr-2 text-blue-400" size={20} />
                  {privacySections.find(section => section.id === activeSection)?.name || 'Privacy Policy'}
                </motion.h3>

                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredSections.map((section, index) => (
                      <motion.div
                        key={section.id}
                        variants={itemVariants}
                        className="border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-300"
                      >
                        <button
                          onClick={() => toggleSection(section.id)}
                          className={`w-full p-4 text-left transition-colors duration-300 ${
                            openSectionId === section.id ? "bg-gray-750" : "hover:bg-gray-750"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white text-lg">{section.title}</h4>
                            <motion.span
                              animate={{ rotate: openSectionId === section.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-blue-400 flex-shrink-0"
                            >
                              <ChevronDown size={18} />
                            </motion.span>
                          </div>
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
                              <div className="p-4 md:p-5 text-gray-300 bg-gray-750 border-t border-gray-700 whitespace-pre-line">
                                {section.content}
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

            {/* Cookie Consent Management */}
            <motion.div 
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

              <div className="relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-xl font-bold text-white mb-4 flex items-center"
                >
                  <Server className="mr-2 text-blue-400" size={20} />
                  Manage Cookie Preferences
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="text-gray-400 mb-6"
                >
                  Control what types of cookies you allow us to use on our website.
                </motion.p>

                <div className="space-y-4">
                  {[
                    { id: 'essential', title: 'Essential Cookies', description: 'Required for basic website functionality. These cannot be disabled.', required: true },
                    { id: 'analytics', title: 'Analytics Cookies', description: 'Help us understand how visitors interact with our website.', required: false },
                    { id: 'functional', title: 'Functional Cookies', description: 'Enable personalized features and remember your preferences.', required: false },
                    { id: 'advertising', title: 'Advertising Cookies', description: 'Used to deliver relevant ads and track campaign performance.', required: false }
                  ].map((cookie, index) => (
                    <motion.div
                      key={cookie.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + (index * 0.1), duration: 0.5 }}
                      className="bg-gray-750 p-4 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">{cookie.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{cookie.description}</p>
                          {cookie.required && <span className="text-xs text-blue-400 mt-1 inline-block">Required</span>}
                        </div>
                        <div className="ml-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              defaultChecked={cookie.required}
                              disabled={cookie.required}
                            />
                            <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${cookie.required ? 'peer-checked:bg-blue-500' : 'peer-checked:bg-blue-500'}`}></div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="flex justify-end mt-6 space-x-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gray-700 text-white py-2 px-5 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300"
                  >
                    Reject All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-blue-500 text-gray-900 py-2 px-5 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg"
                  >
                    Save Preferences
                  </motion.button>
                </motion.div>
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
                  Privacy FAQ
                </motion.h3>

                <div className="space-y-4">
                  <AnimatePresence>
                    {[
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
                    ].map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
                        className="border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-300"
                      >
                        <button
                          onClick={() => toggleSection(faq.id)}
                          className={`w-full p-4 text-left transition-colors duration-300 ${
                            openSectionId === faq.id ? "bg-gray-750" : "hover:bg-gray-750"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white">{faq.question}</h4>
                            <motion.span
                              animate={{ rotate: openSectionId === faq.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-blue-400 flex-shrink-0"
                            >
                              <ChevronDown size={18} />
                            </motion.span>
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {openSectionId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 text-gray-300 bg-gray-750 border-t border-gray-700">
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="mt-8 bg-gray-750 p-5 rounded-lg border border-gray-700"
                >
                  <h4 className="font-medium text-white mb-2">Need more help?</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    If you couldn't find an answer to your question, please contact our Data Protection Officer directly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "#3B82F6" }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-blue-500 text-gray-900 py-2 px-5 rounded-lg font-medium transition-all duration-300 w-full flex items-center justify-center"
                  >
                    <Mail size={18} className="mr-2" />
                    Contact DPO
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Data Subject Request Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-12 bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 shadow-lg relative overflow-hidden"
        >
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
              className="text-xl font-bold text-white mb-4 flex items-center"
            >
              <FileText className="mr-2 text-blue-400" size={20} />
              Submit a Data Subject Request
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="text-gray-400 mb-6"
            >
              Use this form to exercise your rights regarding your personal data, such as access, deletion, or correction.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <label htmlFor="fullName" className="block text-white mb-2 text-sm font-medium">Full Name*</label>
                <input 
                  type="text" 
                  id="fullName" 
                  className="bg-gray-750 text-gray-300 border border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <label htmlFor="email" className="block text-white mb-2 text-sm font-medium">Email Address*</label>
                <input 
                  type="email" 
                  id="email" 
                  className="bg-gray-750 text-gray-300 border border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter your email address"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mb-6"
            >
              <label htmlFor="requestType" className="block text-white mb-2 text-sm font-medium">Request Type*</label>
              <select 
                id="requestType" 
                className="bg-gray-750 text-gray-300 border border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Select request type</option>
                <option value="access">Access my data</option>
                <option value="delete">Delete my data</option>
                <option value="correct">Correct my data</option>
                <option value="restrict">Restrict processing</option>
                <option value="object">Object to processing</option>
                <option value="portable">Data portability</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mb-6"
            >
              <label htmlFor="message" className="block text-white mb-2 text-sm font-medium">Details of Your Request*</label>
              <textarea 
                id="message" 
                rows={4} 
                className="bg-gray-750 text-gray-300 border border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Please provide details about your request..."
              ></textarea>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="mb-6 flex items-start"
            >
              <div className="flex items-center h-5">
                <input 
                  id="terms" 
                  type="checkbox" 
                  className="w-4 h-4 bg-gray-750 border border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                I confirm that I am the data subject or authorized to act on their behalf, and the information provided is accurate.*
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="flex justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-blue-500 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg"
              >
                Submit Request
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
 