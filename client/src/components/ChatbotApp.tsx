import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Send, Bot, User, ExternalLink } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { MatrixBackground } from './CyberpunkEffects';

interface ChatbotAppProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatbotApp: React.FC<ChatbotAppProps> = ({ isOpen, onClose }) => {
  const { currentLanguage } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: currentLanguage === 'EN' 
        ? 'Welcome to Maiwald Enterprises AI Assistant. I can help you explore my technical expertise, project portfolio, and strategic consulting services. What would you like to know?'
        : 'Willkommen beim Maiwald Enterprises KI-Assistenten. Ich kann Ihnen dabei helfen, meine technischen Fähigkeiten, mein Projektportfolio und meine strategischen Beratungsdienstleistungen zu erkunden. Was möchten Sie wissen?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: currentLanguage === 'EN'
          ? `Thank you for your question about "${inputText}". For comprehensive AI-powered assistance with detailed responses about my technical expertise and services, please visit my dedicated chatbot at chat.maiwald.work. This integrated demo showcases basic interaction capabilities.`
          : `Vielen Dank für Ihre Frage zu "${inputText}". Für umfassende KI-gestützte Hilfe mit detaillierten Antworten zu meinen technischen Fähigkeiten und Dienstleistungen besuchen Sie bitte meinen dedizierten Chatbot unter chat.maiwald.work. Diese integrierte Demo zeigt grundlegende Interaktionsfähigkeiten.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        style={{ cursor: 'none' }}
      >
        {/* Matrix Background */}
        <MatrixBackground />
        
        {/* Custom Cursor */}
        <div
          className="fixed pointer-events-none z-[60]"
          style={{
            left: mousePosition.x - 10,
            top: mousePosition.y - 10,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(0, 212, 255, 0.3) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900/95 border border-cyan-500/30 rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden relative z-[55]"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
            boxShadow: '0 0 50px rgba(6, 182, 212, 0.3)',
            cursor: 'auto',
          }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-cyan-400 font-mono text-sm">AI_ASSISTANT.exe</span>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href="https://chat.maiwald.work"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-cyan-500/20 rounded text-cyan-400 hover:text-cyan-300 transition-colors"
                title="Open Full AI Assistant"
              >
                <ExternalLink size={16} />
              </a>
              <button
                className="p-1 hover:bg-gray-700/50 rounded text-gray-400 hover:text-white transition-colors"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Header */}
          <div className="p-4 border-b border-cyan-500/20 bg-gray-800/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold">Maiwald Enterprises AI</h3>
                <p className="text-gray-400 text-sm">
                  {currentLanguage === 'EN' ? 'Showcasing AI Prompting Excellence' : 'KI-Prompting-Exzellenz präsentieren'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30'
                      : 'bg-gray-700/50 text-gray-200 border border-gray-600/30'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700/50 text-gray-200 border border-gray-600/30 rounded-lg p-3 max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <Bot size={16} className="text-cyan-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-cyan-500/20 bg-gray-800/30">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={currentLanguage === 'EN' ? 'Ask about my AI expertise...' : 'Fragen Sie nach meiner KI-Expertise...'}
                  className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg p-3 text-gray-200 placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-cyan-500/20 hover:bg-cyan-500/30 disabled:bg-gray-700/30 border border-cyan-500/30 disabled:border-gray-600/30 rounded-lg p-3 text-cyan-400 disabled:text-gray-500 transition-all duration-200"
              >
                <Send size={20} />
              </button>
            </div>
            
            {/* Footer Link */}
            <div className="mt-3 text-center">
              <a
                href="https://chat.maiwald.work"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {currentLanguage === 'EN' 
                  ? '→ Experience the full AI assistant at chat.maiwald.work'
                  : '→ Erleben Sie den vollständigen KI-Assistenten unter chat.maiwald.work'
                }
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};