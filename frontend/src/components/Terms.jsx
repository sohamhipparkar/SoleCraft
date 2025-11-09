import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  FileText, 
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
  ShieldAlert,
  HelpCircle,
  RefreshCw,
  AlertTriangle,
  Gavel,
  BookOpen,
  Ban,
  MessageSquare
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function TermsOfServiceComponent() {
  const [activeSection, setActiveSection] = useState('use');
  const [openSectionId, setOpenSectionId] = useState(null);

  const legalInfo = {
    email: 'legal@solecraft.com',
    location: 'New York, NY',
    response: 'Within 72 hours',
    update: 'Last updated: March 28, 2025'
  };

  const termsSections = [
    { id: 'use', icon: <UserCheck />, name: 'Acceptable Use' },
    { id: 'account', icon: <Eye />, name: 'Account Terms' },
    { id: 'content', icon: <FileText />, name: 'Content Rights' },
    { id: 'liability', icon: <ShieldAlert />, name: 'Limitations' },
    { id: 'termination', icon: <Ban />, name: 'Termination' }
  ];

  const policySections = [
    {
      id: 'section-1',
      title: 'Acceptance of Terms',
      content: `By accessing or using our Services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not access or use our Services.

These Terms of Service apply to all visitors, users, and others who access or use our Services. By accessing or using any part of the Services, you agree to be bound by these Terms of Service.`
    },
    {
      id: 'section-2',
      title: 'Account Registration and Security',
      content: `When you create an account with us, you must provide accurate, complete, and up-to-date information. Failure to do so is a breach of the Terms, which may result in the immediate termination of your account.

You are responsible for safeguarding the password you use to access our Services and for any activities or actions taken using your password. You should use a strong, unique password and change it regularly.

You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

We reserve the right to terminate accounts, remove or edit content, or cancel orders at our sole discretion.`
    },
    {
      id: 'section-3',
      title: 'User Content and Conduct',
      content: `Our Services allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post, including its legality, reliability, and appropriateness.

By posting Content to our Services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such Content in connection with providing our Services.

You represent and warrant that: (i) the Content is yours or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.

You agree not to engage in any of the following prohibited activities:
• Using our Services for any illegal purpose or in violation of any laws
• Posting unauthorized commercial communications
• Uploading viruses or other malicious code
• Soliciting personal information from minors
• Sending spam or otherwise harassing other users
• Attempting to impersonate another user or person
• Interfering with the proper working of our Services`
    },
    {
      id: 'section-4',
      title: 'Intellectual Property',
      content: `Our Services and their original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of SoleCraft Inc. and its licensors. Our Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.

Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of SoleCraft Inc.

You acknowledge that all intellectual property rights, including without limitation, copyright, trademarks, service marks, trade secrets, and patents, in our Services are owned by us or our licensors.`
    },
    {
      id: 'section-5',
      title: 'DMCA Compliance',
      content: `We respect the intellectual property rights of others and expect users of our Services to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law and are properly provided to us.

If you believe that your Content has been copied in a way that constitutes copyright infringement, please provide us with the following information:
• An electronic or physical signature of the copyright owner or a person authorized to act on their behalf
• A description of the copyrighted work that you claim has been infringed
• A description of where the material that you claim is infringing is located on our Services
• Your contact information, including your address, telephone number, and email address
• A statement by you that you have a good faith belief that the use is not authorized by the copyright owner
• A statement by you, made under penalty of perjury, that the above information is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf

Our designated copyright agent for notice of alleged copyright infringement can be reached at: copyright@solecraft.com`
    },
    {
      id: 'section-6',
      title: 'Limitations of Liability',
      content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SOLECRAFT INC., ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY TO USE, THE SERVICES.

UNDER NO CIRCUMSTANCES WILL SOLECRAFT INC. BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR USE OF THE SERVICES OR YOUR ACCOUNT OR THE INFORMATION CONTAINED THEREIN.

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SOLECRAFT INC. ASSUMES NO LIABILITY OR RESPONSIBILITY FOR ANY: (I) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (II) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO OR USE OF OUR SERVICES; (III) UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY PERSONAL INFORMATION STORED THEREIN; (IV) INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES; (V) BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH OUR SERVICES BY ANY THIRD PARTY; AND/OR (VI) CONTENT OR CONDUCT OF ANY THIRD PARTY ON THE SERVICES.

THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN SOLECRAFT INC. AND YOU.`
    },
    {
      id: 'section-7',
      title: 'Disclaimer of Warranties',
      content: `YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. SOLECRAFT INC. EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

SOLECRAFT INC. MAKES NO WARRANTY THAT: (I) THE SERVICES WILL MEET YOUR REQUIREMENTS; (II) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES WILL BE ACCURATE OR RELIABLE; OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS.`
    },
    {
      id: 'section-8',
      title: 'Governing Law and Jurisdiction',
      content: `These Terms shall be governed and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.

Any disputes relating to these Terms or your use of our Services shall be finally settled by binding arbitration in New York, New York, in accordance with the rules of the American Arbitration Association.`
    },
    {
      id: 'section-9',
      title: 'Termination',
      content: `We may terminate or suspend your account and bar access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.

All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.`
    },
    {
      id: 'section-10',
      title: 'Changes to Terms',
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.`
    },
    {
      id: 'section-11',
      title: 'Contact Information',
      content: `If you have any questions about these Terms, please contact us:

Email: legal@solecraft.com
Mail: Legal Department, SoleCraft Inc., 123 Fashion Street, New York, NY 10001, USA
Phone: +1 (555) 123-4567`
    }
  ];

  const termsHighlights = [
    { 
      icon: <Gavel />, 
      title: 'Legal Compliance', 
      description: 'Our terms ensure compliance with laws and protect both parties legal rights.' 
    },
    { 
      icon: <BookOpen />, 
      title: 'Clear Guidelines', 
      description: 'Straightforward rules for using our services and platform properly.' 
    },
    { 
      icon: <MessageSquare />, 
      title: 'Open Communication', 
      description: 'We are committed to addressing concerns and questions about our terms.' 
    },
    { 
      icon: <RefreshCw />, 
      title: 'Regular Updates', 
      description: 'We keep our terms current with evolving laws and business practices.' 
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
    use: [
      'section-1',
      'section-3'
    ],
    account: [
      'section-2'
    ],
    content: [
      'section-4',
      'section-5'
    ],
    liability: [
      'section-6',
      'section-7',
      'section-8'
    ],
    termination: [
      'section-9',
      'section-10',
      'section-11'
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
              <Scale size={40} className="text-blue-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white relative inline-block">
            Terms of Service
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
            Please read these terms carefully before using our services.
            By using our platform, you agree to be bound by these conditions.
          </motion.p>
        </motion.div>

        {/* Legal Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: <Mail size={24} />, title: "Legal Contact", content: legalInfo.email, delay: 0 },
            { icon: <Globe size={24} />, title: "Legal Office", content: legalInfo.location, delay: 0.1 },
            { icon: <Clock size={24} />, title: "Response Time", content: legalInfo.response, delay: 0.2 },
            { icon: <FileText size={24} />, title: "Last Updated", content: legalInfo.update, delay: 0.3 }
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

        {/* Terms Highlights Section */}
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
              Terms Highlights
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-1 left-0 right-0 mx-auto h-1 bg-blue-500 rounded-full"
              ></motion.div>
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {termsHighlights.map((highlight, index) => (
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

        {/* Main Terms Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Terms Sections */}
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
                {termsSections.map((section) => (
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

            {/* Terms Content */}
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
                  {termsSections.find(section => section.id === activeSection)?.name || 'Terms of Service'}
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

            {/* Dispute Resolution Section */}
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
                  Dispute Resolution Process
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="text-gray-400 mb-6"
                >
                  Our streamlined process for resolving any disputes that may arise during your use of our services.
                </motion.p>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="bg-gray-750 p-4 rounded-lg border-l-4 border-blue-500"
                  >
                    <h4 className="text-white font-medium mb-2">1. Direct Communication</h4>
                    <p className="text-gray-400 text-sm">Before initiating formal procedures, please contact our customer service team to address any concerns or misunderstandings.</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="bg-gray-750 p-4 rounded-lg border-l-4 border-blue-500"
                  >
                    <h4 className="text-white font-medium mb-2">2. Formal Complaint</h4>
                    <p className="text-gray-400 text-sm">If the issue remains unresolved, submit a formal complaint to legal@solecraft.com with all relevant details and documentation.</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="bg-gray-750 p-4 rounded-lg border-l-4 border-blue-500"
                  >
                    <h4 className="text-white font-medium mb-2">3. Mediation Process</h4>
                    <p className="text-gray-400 text-sm">If we cannot resolve the dispute directly, we offer a mediation service with a neutral third party to help reach a mutually acceptable solution.</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="bg-gray-750 p-4 rounded-lg border-l-4 border-blue-500"
                  >
                    <h4 className="text-white font-medium mb-2">4. Binding Arbitration</h4>
                    <p className="text-gray-400 text-sm">As a final step, disputes will be resolved through binding arbitration in accordance with the rules specified in our Terms of Service.</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="flex justify-end mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-blue-500 text-gray-900 py-2 px-5 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg flex items-center"
                  >
                    <Mail size={18} className="mr-2" />
                    Contact Legal Team
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
                  className="text-xl font-bold text-white mb-4 flex items-center"
                >
                  <HelpCircle className="mr-2 text-blue-400" size={20} />
                  Frequently Asked Questions
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-white font-medium mb-2">How do I close my account?</h4>
                    <p className="text-gray-400 text-sm">You can close your account at any time by visiting your account settings page and selecting "Close Account." Alternatively, you can contact our support team for assistance.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">What happens to my data when I delete my account?</h4>
                    <p className="text-gray-400 text-sm">When you delete your account, your personal information will be removed from our active databases. Some information may be retained for legal, legitimate business purposes, or to prevent fraud as outlined in our Privacy Policy.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Can I download a copy of my data?</h4>
                    <p className="text-gray-400 text-sm">Yes, you can request a copy of your data from your account settings page or by contacting our support team. We will provide your data in a structured, commonly used, and machine-readable format.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">How do you handle copyright claims?</h4>
                    <p className="text-gray-400 text-sm">We respect intellectual property rights and respond to notices of alleged copyright infringement. Please refer to the DMCA Compliance section in our Terms of Service for the complete process.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">How often do you update the Terms of Service?</h4>
                    <p className="text-gray-400 text-sm">We update our Terms of Service periodically to reflect changes in our services, legal requirements, or business practices. We'll notify you of any material changes at least 30 days before they take effect.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="mt-8 bg-gray-750 p-5 rounded-lg border border-gray-700"
                >
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <AlertTriangle size={18} className="mr-2 text-yellow-500" />
                    Need More Help?
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">Can't find the answer you're looking for? Our legal team is here to help with any questions about our Terms of Service.</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gray-700 hover:bg-gray-650 text-white py-2 px-4 rounded-lg text-sm flex items-center transition-colors duration-300 w-full justify-center"
                  >
                    <HelpCircle size={16} className="mr-2" />
                    Contact Support
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="mt-8 pt-6 border-t border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell size={18} className="text-blue-400 mr-2" />
                      <span className="text-sm text-gray-400">Stay Updated</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Acceptance Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 shadow-xl relative overflow-hidden"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white"
          />

          <div className="relative z-10 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Accept Our Terms of Service
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-blue-100"
              >
                By using our services, you agree to be bound by these terms.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                Accept Terms
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-transparent text-white py-3 px-6 rounded-lg font-medium border border-white hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}