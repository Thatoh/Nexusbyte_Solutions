import React from 'react';
import { ChatBubbleOvalLeftEllipsisIcon } from './icons';

interface AIChatbotSectionProps {
  onOpenChat: () => void;
}

const AIChatbotSection: React.FC<AIChatbotSectionProps> = ({ onOpenChat }) => {
  return (
    <section className="py-16 md:py-24 bg-nexusbyte-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ChatBubbleOvalLeftEllipsisIcon className="w-16 h-16 mx-auto mb-6 text-nexusbyte-accent-green" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Your NexusByte AI Assistant</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions? Our intelligent AI chatbot is here to help you navigate our services,
            provide instant information, and guide you to the right solutions.
          </p>
          <button
            onClick={onOpenChat}
            className="px-8 py-3 bg-nexusbyte-accent-green text-nexusbyte-primary-dark font-semibold rounded-md hover:bg-opacity-90 transition-colors text-lg"
          >
            Chat With Our AI
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIChatbotSection;