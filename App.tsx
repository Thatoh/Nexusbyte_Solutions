import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GenericPage from './pages/GenericPage';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/SignInPage'; // Import SignInPage
import SignUpPage from './pages/SignUpPage'; // Import SignUpPage
import { useChatControl } from './components/ChatSystem';
import { NAV_ITEMS } from './constants';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const { openChat, ChatModalComponent, isChatOpen, closeChat } = useChatControl();

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage openChat={openChat} />} />
            {NAV_ITEMS.map(item => (
              <Route 
                key={item.id} 
                path={item.path} 
                element={<GenericPage title={item.title} />} 
              />
            ))}
            {/* Additional routes for featured links in MegaMenu if they are distinct pages */}
            <Route path="/solutions/nexusguard" element={<GenericPage title="NexusGuard Security Suite" />} />
            <Route path="/solutions/cloud" element={<GenericPage title="Cloud Solutions" />} />
            <Route path="/solutions/cybersecurity" element={<GenericPage title="Cybersecurity" />} />
            <Route path="/solutions/managed-it" element={<GenericPage title="Managed IT Services" />} />
            <Route path="/solutions/data-analytics" element={<GenericPage title="Data Analytics" />} />
            <Route path="/use-cases/remote-work" element={<GenericPage title="Remote Work Enablement" />} />
            <Route path="/use-cases/digital-transformation" element={<GenericPage title="Digital Transformation" />} />
            <Route path="/use-cases/ecommerce" element={<GenericPage title="E-commerce Platforms" />} />

            {/* Basic static pages from footer example */}
            <Route path="/contact" element={<GenericPage title="Contact Us" />} />
            <Route path="/faq" element={<GenericPage title="FAQs" />} />
            <Route path="/docs" element={<GenericPage title="Documentation" />} />
            <Route path="/privacy" element={<GenericPage title="Privacy Policy" />} />
            <Route path="/terms" element={<GenericPage title="Terms of Service" />} />
            <Route path="/cookies" element={<GenericPage title="Cookie Policy" />} />

            {/* Authentication Pages */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        
        <FloatingChatButtonForApp onOpen={openChat} />
        <ChatModalComponent isOpen={isChatOpen} onClose={closeChat} />

      </div>
    </HashRouter>
  );
};

// This button is controlled by App's state
const FloatingChatButtonForApp: React.FC<{onOpen: () => void}> = ({onOpen}) => {
   return (
    <motion.button
      onClick={onOpen}
      className="fixed bottom-6 left-6 bg-nexusbyte-accent-green text-nexusbyte-primary-dark p-4 rounded-full shadow-xl hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-nexusbyte-accent-green focus:ring-opacity-50 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open chat"
    >
      <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
    </motion.button>
  );
}
// Icon for the button
import { ChatBubbleOvalLeftEllipsisIcon } from './components/icons';
import { motion } from 'framer-motion';


export default App;