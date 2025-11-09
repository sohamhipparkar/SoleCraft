import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  FileText, 
  Eye, 
  UserCheck, 
  Server, 
  ChevronDown, 
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
  MessageSquare,
  CheckCircle,
  Globe,
  Award,
  Zap,
  Shield,
  ArrowRight,
  ExternalLink
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

export default function TermsOfServiceComponent() {
  const [activeSection, setActiveSection] = useState('use');
  const [openSectionId, setOpenSectionId] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);

  const legalInfo = {
    email: 'legal@solecraft.com',
    location: 'New York, NY',
    response: 'Within 72 hours',
    update: 'Last updated: March 28, 2025'
  };

  const termsSections = [
    { id: 'use', icon: UserCheck, name: 'Acceptable Use', color: 'blue' },
    { id: 'account', icon: Eye, name: 'Account Terms', color: 'purple' },
    { id: 'content', icon: FileText, name: 'Content Rights', color: 'green' },
    { id: 'liability', icon: ShieldAlert, name: 'Limitations', color: 'amber' },
    { id: 'termination', icon: Ban, name: 'Termination', color: 'red' }
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
Phone: +91-7705481059`
    }
  ];

  const termsHighlights = [
    { 
      icon: Gavel, 
      title: 'Legal Compliance', 
      description: 'Full compliance with laws protecting both parties.',
      color: 'blue'
    },
    { 
      icon: BookOpen, 
      title: 'Clear Guidelines', 
      description: 'Straightforward rules for using our platform.',
      color: 'purple'
    },
    { 
      icon: MessageSquare, 
      title: 'Open Communication', 
      description: 'Address concerns about our terms anytime.',
      color: 'green'
    },
    { 
      icon: RefreshCw, 
      title: 'Regular Updates', 
      description: 'Terms kept current with evolving practices.',
      color: 'amber'
    }
  ];

  const stats = [
    { label: 'Legal Compliance', value: '100%', icon: Shield, color: 'blue' },
    { label: 'Countries Covered', value: '40+', icon: Globe, color: 'green' },
    { label: 'Response Time', value: '<72h', icon: Clock, color: 'purple' },
    { label: 'User Trust', value: '4.9/5', icon: Award, color: 'amber' }
  ];

  const faqData = [
    {
      id: 'faq-1',
      question: 'How do I close my account?',
      answer: 'You can close your account at any time by visiting your account settings page and selecting "Close Account." Alternatively, you can contact our support team for assistance. Please note that some information may be retained for legal purposes as outlined in our Privacy Policy.'
    },
    {
      id: 'faq-2',
      question: 'What happens to my data when I delete my account?',
      answer: 'When you delete your account, your personal information will be removed from our active databases. Some information may be retained for legal, legitimate business purposes, or to prevent fraud as outlined in our Privacy Policy. We comply with all applicable data protection regulations.'
    },
    {
      id: 'faq-3',
      question: 'Can I download a copy of my data?',
      answer: 'Yes, you can request a copy of your data from your account settings page or by contacting our support team. We will provide your data in a structured, commonly used, and machine-readable format within 30 days of your request.'
    },
    {
      id: 'faq-4',
      question: 'How do you handle copyright claims?',
      answer: 'We respect intellectual property rights and respond to notices of alleged copyright infringement in accordance with the DMCA. Please refer to the DMCA Compliance section in our Terms of Service for the complete process and contact information.'
    },
    {
      id: 'faq-5',
      question: 'How often do you update the Terms of Service?',
      answer: 'We update our Terms of Service periodically to reflect changes in our services, legal requirements, or business practices. We\'ll notify you of any material changes at least 30 days before they take effect via email or through a prominent notice on our website.'
    }
  ];

  const sectionContent = {
    use: ['section-1', 'section-3'],
    account: ['section-2'],
    content: ['section-4', 'section-5'],
    liability: ['section-6', 'section-7', 'section-8'],
    termination: ['section-9', 'section-10', 'section-11']
  };

  const toggleSection = (sectionId) => {
    setOpenSectionId(openSectionId === sectionId ? null : sectionId);
  };

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
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
                <Scale className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Legal Agreement</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Terms of Service
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "280px" }}
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
                Please read these terms carefully before using our services. By using our platform, you agree to be bound by these conditions.
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

          {/* Legal Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Mail, title: "Legal Contact", content: legalInfo.email, color: 'blue', delay: 0 },
              { icon: Globe, title: "Legal Office", content: legalInfo.location, color: 'purple', delay: 0.1 },
              { icon: Clock, title: "Response Time", content: legalInfo.response, color: 'green', delay: 0.2 },
              { icon: FileText, title: "Last Updated", content: legalInfo.update, color: 'amber', delay: 0.3 }
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
                  <p className={`text-${item.color}-400 text-sm font-medium`}>{item.content}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Terms Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center">
                <Zap className="mr-2 text-amber-400" />
                Terms Highlights
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Key aspects of our Terms of Service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {termsHighlights.map((highlight, index) => {
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
            {/* Main Terms Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="lg:col-span-2"
            >
              {/* Category Navigation */}
              <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2">
                  {termsSections.map((section) => {
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

              {/* Terms Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <FileText className="mr-2 text-amber-400" size={20} />
                  {termsSections.find(section => section.id === activeSection)?.name || 'Terms of Service'}
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

              {/* Dispute Resolution Process */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Server className="mr-2 text-amber-400" size={20} />
                  Dispute Resolution Process
                </h3>

                <p className="text-gray-400 mb-6">
                  Our streamlined process for resolving any disputes that may arise during your use of our services.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: '1. Direct Communication',
                      description: 'Before initiating formal procedures, please contact our customer service team to address any concerns or misunderstandings.',
                      color: 'blue'
                    },
                    {
                      title: '2. Formal Complaint',
                      description: 'If the issue remains unresolved, submit a formal complaint to legal@solecraft.com with all relevant details and documentation.',
                      color: 'purple'
                    },
                    {
                      title: '3. Mediation Process',
                      description: 'If we cannot resolve the dispute directly, we offer a mediation service with a neutral third party to help reach a mutually acceptable solution.',
                      color: 'green'
                    },
                    {
                      title: '4. Binding Arbitration',
                      description: 'As a final step, disputes will be resolved through binding arbitration in accordance with the rules specified in our Terms of Service.',
                      color: 'amber'
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + (index * 0.1), duration: 0.3 }}
                      className={`bg-gray-900 p-5 rounded-xl border-l-4 border-${step.color}-500`}
                    >
                      <h4 className="text-white font-medium mb-2">{step.title}</h4>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 py-3 px-6 rounded-xl font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-colors"
                  >
                    <Mail size={18} />
                    Contact Legal Team
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-amber-400" size={20} />
                  Frequently Asked Questions
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
                  <h4 className="font-medium text-white mb-2 text-sm flex items-center">
                    <AlertTriangle size={16} className="mr-2 text-amber-400" />
                    Need More Help?
                  </h4>
                  <p className="text-gray-400 text-xs mb-4">
                    Can't find the answer you're looking for? Our legal team is here to help with any questions about our Terms of Service.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 py-2 px-4 rounded-xl font-medium transition-colors w-full flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <MessageSquare size={16} />
                    Contact Support
                  </motion.button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Bell size={18} className="text-amber-400 mr-2" />
                      <span className="text-sm text-gray-400">Stay Updated</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                    >
                      <span>Subscribe</span>
                      <ExternalLink size={14} />
                    </motion.button>
                  </div>
                  <p className="text-gray-500 text-xs">
                    Get notified about updates to our Terms of Service
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Acceptance Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-8 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
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
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Legal Agreement</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Accept Our Terms of Service
                </h3>
                <p className="text-gray-800 text-lg">
                  By using our services, you agree to be bound by these terms.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gray-900 text-amber-400 px-6 py-3 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-gray-800 transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Accept Terms</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 whitespace-nowrap hover:bg-white transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span>Learn More</span>
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