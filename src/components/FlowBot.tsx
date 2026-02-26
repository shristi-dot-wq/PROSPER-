import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { getFlowBotResponse } from '../services/gemini';
import { User as UserType, Transaction } from '../types';

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
}

interface FlowBotProps {
  user: UserType;
  transactions: Transaction[];
}

export default function FlowBot({ user, transactions }: FlowBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: `Hello! I'm FlowBot, your AI financial advisor. Based on your ${user.role} profile, I've analyzed your recent spending. How can I help you optimize your cash flow today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

    const context = {
      role: user.role,
      totalIncome,
      totalExpenses,
      recentTransactions: transactions.slice(0, 5)
    };

    const response = await getFlowBotResponse(input, context);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: response || "I'm sorry, I couldn't process that. Could you rephrase?"
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-200px)] overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">FlowBot AI</h3>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Online & Analyzing
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask FlowBot about your finances..."
            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          FlowBot uses AI to provide financial insights. Always consult with a professional advisor for critical decisions.
        </p>
      </div>
    </div>
  );
}
