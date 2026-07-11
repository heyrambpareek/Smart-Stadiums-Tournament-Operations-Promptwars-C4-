import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { fetchAiChat } from '../utils/api';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: "Hello! I am your StadiumMind AI assistant. I can help you find your seat, locate the nearest restrooms, or get live queue times. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const replyText = await fetchAiChat(userMessage.content);
    
    const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: replyText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const samplePrompts = [
    "Where is Gate C?",
    "Which restroom has the shortest queue?",
    "Find vegetarian food.",
    "What is the fastest exit after the match?"
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] p-4 flex flex-col">
      <div className="text-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gradient">AI Match Assistant</h1>
        <p className="text-gray-400 text-sm">Powered by GPT-4 live stadium intelligence</p>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex flex-col mb-4">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-fifa-blue' : 'bg-fifa-teal'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-fifa-blue/20 text-white rounded-tr-sm' : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-fifa-teal">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-black/20 border-t border-white/5">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt)}
                className="whitespace-nowrap px-4 py-2 rounded-full glass text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about the stadium..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-fifa-teal transition-colors text-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square rounded-full bg-gradient-to-r from-fifa-teal to-fifa-blue flex items-center justify-center disabled:opacity-50 transition-opacity"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
