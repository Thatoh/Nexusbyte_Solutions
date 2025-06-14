import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, XMarkIcon } from './icons';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage, GroundingChunk } from '../types';

interface FloatingChatButtonProps {
  onOpen: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onOpen }) => {
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
};

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  },[]);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'initial-greeting',
          text: "Hello! I'm Nova, the NexusByte AI Assistant. How can I help you today regarding our ICT solutions, AI, cloud services, or cybersecurity?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);


  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    // Add user message and a temporary bot thinking message
    setMessages(prev => [
        ...prev, 
        newUserMessage,
        { id: `bot-thinking-${Date.now()}`, text: 'Nova is thinking...', sender: 'bot', timestamp: new Date() }
    ]);
    
    setInputValue('');
    setIsLoading(true);

    const historyForGemini = messages.filter(msg => msg.id !== `bot-thinking-${Date.now()}`); // Exclude previous thinking messages from history

    let botResponseText = '';
    const currentBotMessageId = `bot-${Date.now()}`;
    let finalGroundingChunks: GroundingChunk[] | undefined = undefined;
    
    // Replace "thinking" message with the actual bot message placeholder that will be updated
    setMessages(prev => prev.filter(msg => !msg.id.startsWith('bot-thinking-')).concat([
        { id: currentBotMessageId, text: '', sender: 'bot', timestamp: new Date() }
    ]));

    try {
      for await (const chunk of streamChatResponse(inputValue, historyForGemini)) {
        if (chunk.error) {
          botResponseText = chunk.error; // Display error message
          setMessages(prev =>
            prev.map(msg =>
              msg.id === currentBotMessageId ? { ...msg, text: botResponseText, groundingChunks: undefined } : msg
            )
          );
          break; 
        }
        if (chunk.text) {
          botResponseText += chunk.text;
        }
        if (chunk.groundingChunks && chunk.groundingChunks.length > 0) {
           finalGroundingChunks = chunk.groundingChunks;
        }
        
        setMessages(prev =>
            prev.map(msg =>
              msg.id === currentBotMessageId ? { ...msg, text: botResponseText, groundingChunks: finalGroundingChunks } : msg
            )
        );

        if (chunk.isFinalChunk) {
            // The stream has ended. Grounding chunks should be final here.
            // If sources need to be appended explicitly at the end:
            if (finalGroundingChunks && finalGroundingChunks.length > 0) {
                const sourceLinksText = finalGroundingChunks
                    .map(gc => gc.web ? `\n- [${gc.web.title || gc.web.uri}](${gc.web.uri})` : '')
                    .filter(Boolean)
                    .join('');
                if (sourceLinksText) {
                    const fullTextWithSources = `${botResponseText}\n\n**Sources:**${sourceLinksText}`;
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === currentBotMessageId ? { ...msg, text: fullTextWithSources, groundingChunks: finalGroundingChunks } : msg
                        )
                    );
                }
            }
        }
      }
    } catch (error) {
        console.error("Streaming error in component:", error);
        setMessages(prev => prev.map(msg => msg.id === currentBotMessageId ? {...msg, text: "Sorry, I couldn't process that response fully."} : msg));
    } finally {
        setIsLoading(false);
         // Remove any "thinking" messages that might have persisted due to error or quick succession
        setMessages(prev => prev.filter(msg => !msg.id.startsWith('bot-thinking-')));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, isLoading, messages]); // `messages` is a dependency to provide correct history. `setIsLoading` and `setInputValue` are stable.


  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const parseAndRenderText = (text: string) => {
    // Basic markdown for bold (**text**) and links ([title](url))
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;
    
    let parts = text.split(linkRegex);
    let elements: (string | React.ReactNode)[] = [];

    for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 0) { // Text part
            let subParts = parts[i].split(boldRegex);
            for (let j = 0; j < subParts.length; j++) {
                if (j % 2 === 0) {
                    elements.push(subParts[j]);
                } else {
                    elements.push(<strong key={`bold-${i}-${j}`}>{subParts[j]}</strong>);
                }
            }
        } else if (i % 3 === 1) { // Link title
            const title = parts[i];
            const url = parts[i+1];
            elements.push(
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" key={`link-${i}`}>
                    {title}
                </a>
            );
            i++; // Skip next part as it's the URL
        }
    }
    return elements.map((el, idx) => <React.Fragment key={idx}>{el}</React.Fragment>);
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-0 sm:p-4 z-[60]"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.2 }}
          onClick={onClose} 
        >
          <motion.div
            className="bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-lg h-[85vh] sm:h-[80vh] flex flex-col overflow-hidden"
            variants={modalVariants}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-nexusbyte-primary-dark text-white">
              <h3 className="text-lg font-semibold">NexusByte AI Assistant</h3>
              <button onClick={onClose} className="text-gray-300 hover:text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow p-4 space-y-4 overflow-y-auto chat-modal-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-xl shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-nexusbyte-accent-green text-nexusbyte-primary-dark rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{parseAndRenderText(msg.text)}</div>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-right text-gray-700 opacity-80' : 'text-left text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-nexusbyte-accent-green focus:border-transparent outline-none transition-shadow text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="p-3 bg-nexusbyte-accent-green text-nexusbyte-primary-dark rounded-full hover:bg-opacity-90 disabled:opacity-50 transition-colors"
                  disabled={isLoading}
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const ChatSystem: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  // This hook is not used here if ChatSystem itself manages its state.
  // const { isChatOpen, openChat, closeChat, ChatModalComponent } = useChatControl();
  // Instead, ChatSystem provides the button and modal.
  return (
    <>
      <FloatingChatButton onOpen={() => setIsChatOpen(true)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};
export default ChatSystem;

// This hook can be used by other components (like AIChatbotSection) to control a shared chat instance
// if the chat state needs to be lifted higher, e.g., to App.tsx.
// For the current setup where ChatSystem is self-contained, this hook is primarily for external components
// to trigger the opening of the chat modal managed by the main <ChatSystem /> instance in App.tsx.
// This requires state to be lifted to App.tsx as shown in the original App.tsx.
export const useChatControl = () => {
    // This hook itself doesn't hold state if ChatSystem is rendered once in App.
    // It would need to be connected to a context or state lifted to App.
    // For simplicity, if App.tsx uses its own state for chat, this hook might not be necessary
    // or would need to interact with that state (e.g., via props or context).
    // The existing App.tsx uses a local state managed by `useChatControl` itself.
    const [isChatOpen, setIsChatOpen] = useState(false);
    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);
    return { isChatOpen, openChat, closeChat, ChatModalComponent: ChatModal };
};