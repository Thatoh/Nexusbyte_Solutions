import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon } from './icons';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage, GroundingChunk } from '../types';

const AIChatbotSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  useEffect(() => {
    // Initial greeting message when the component mounts
    setMessages([
      {
        id: 'initial-greeting-inline',
        text: "Hello! I'm Nova, your NexusByte AI Assistant. How can I assist you with our services today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [
      ...prev,
      newUserMessage,
      { id: `bot-thinking-${Date.now()}`, text: 'Nova is thinking...', sender: 'bot', timestamp: new Date() }
    ]);
    
    const currentInputVal = inputValue; // Capture current input value before clearing
    setInputValue('');
    setIsLoading(true);

    const historyForGemini = messages.filter(msg => !msg.id.startsWith('bot-thinking-'));
    
    let botResponseText = '';
    const currentBotMessageId = `bot-inline-${Date.now()}`;
    let finalGroundingChunks: GroundingChunk[] | undefined = undefined;

    // Replace "thinking" message with the actual bot message placeholder that will be updated
    setMessages(prev => prev.filter(msg => !msg.id.startsWith('bot-thinking-')).concat([
      { id: currentBotMessageId, text: '', sender: 'bot', timestamp: new Date(), groundingChunks: undefined }
    ]));

    try {
      for await (const chunk of streamChatResponse(currentInputVal, historyForGemini)) { // Use captured inputValue
        if (chunk.error) {
          botResponseText = chunk.error;
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
      console.error("Streaming error in AIChatbotSection:", error);
      setMessages(prev => prev.map(msg => msg.id === currentBotMessageId ? {...msg, text: "Sorry, I couldn't process that response fully."} : msg));
    } finally {
      setIsLoading(false);
      // Ensure "thinking" message is removed after response or error
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('bot-thinking-')));
    }
  }, [inputValue, isLoading, messages]); // inputValue is still needed for the check at the beginning of the function.

  const parseAndRenderText = (text: string) => {
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
                    elements.push(<strong key={`bold-${Date.now()}-${i}-${j}`}>{subParts[j]}</strong>);
                }
            }
        } else if (i % 3 === 1) { // Link title
            const title = parts[i];
            const url = parts[i+1];
            elements.push(
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline" key={`link-${Date.now()}-${i}`}>
                    {title}
                </a>
            );
            i++; 
        }
    }
    return elements.map((el, idx) => <React.Fragment key={idx}>{el}</React.Fragment>);
  };

  return (
    <section className="py-16 md:py-24 bg-nexusbyte-primary-dark text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ChatBubbleOvalLeftEllipsisIcon className="w-16 h-16 mx-auto mb-6 text-nexusbyte-accent-green" />
          <h2 className="text-3xl md:text-4xl font-bold">Meet Your NexusByte AI Assistant</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions? Our intelligent AI chatbot, Nova, is here to help you navigate our services,
            provide instant information, and guide you to the right solutions.
          </p>
        </div>

        {/* Inline Chat Interface */}
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto h-[60vh] md:h-[500px] flex flex-col overflow-hidden">
          <div className="flex-grow p-4 space-y-4 overflow-y-auto chat-modal-messages"> {/* Added chat-modal-messages for scrollbar styling */}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-xl shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-nexusbyte-accent-green text-nexusbyte-primary-dark rounded-br-none'
                      : 'bg-gray-700 text-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{parseAndRenderText(msg.text)}</div>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-right text-gray-600 opacity-80' : 'text-left text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Nova about our services..."
                className="flex-grow px-4 py-3 border border-gray-600 rounded-full focus:ring-2 focus:ring-nexusbyte-accent-green focus:border-transparent outline-none transition-shadow text-sm bg-gray-700 text-white placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="p-3 bg-nexusbyte-accent-green text-nexusbyte-primary-dark rounded-full hover:bg-opacity-90 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-nexusbyte-accent-green"
                disabled={isLoading}
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatbotSection;