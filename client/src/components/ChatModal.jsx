import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, AlertCircle } from 'lucide-react';
import api from '../services/api';
import ChatBox from './ChatBox';
import MessageBubble from './MessageBubble';

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      fetchHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const fetchHistory = async () => {
    try {
      const data = await api.getHistory();
      if (data.success) {
        const history = data.history.flatMap(chat => [
          { text: chat.question, isAI: false, id: chat._id + '_q', dbId: chat._id },
          { text: chat.answer, isAI: true, id: chat._id + '_a', dbId: chat._id }
        ]).reverse();
        setMessages(history);
      }
    } catch (err) {
      console.error('History fetch failed', err);
    }
  };

  const handleDeleteMessage = async (dbId) => {
    if (!dbId) return;
    setMessages(prev => prev.filter(m => m.dbId !== dbId));
    try {
      await api.deleteHistory(dbId);
    } catch (err) {
      console.error('Failed to delete history', err);
    }
  };

  const handleSendMessage = async (text) => {
    const userMsg = { text, isAI: false, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const response = await api.askQuestion(text);
      if (response.success) {
        const aiMsg = { text: response.answer, isAI: true, id: Date.now() + 1, dbId: response.dbId };
        setMessages(prev => {
          const updated = prev.map(m => m.id === userMsg.id ? { ...m, dbId: response.dbId } : m);
          return [...updated, aiMsg];
        });
      } else {
        setError(response.error || 'AI Failed to respond');
      }
    } catch (err) {
      setError('Communication with server failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="chat-trigger-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 z-50 transition-transform ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageSquare size={28} />
      </motion.button>

      {/* Floating Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[400px] h-[600px] max-h-[85vh] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <MessageSquare size={18} />
                </div>
                <h3 className="font-semibold text-white">AI Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.length === 0 && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-10">
                  <p className="text-sm">Ask any academic question to get started.</p>
                </div>
              )}
              
              {messages.map((msg) => (
                <MessageBubble 
                  key={msg.id} 
                  message={msg.text} 
                  isAI={msg.isAI} 
                  dbId={msg.dbId}
                  onDelete={handleDeleteMessage}
                />
              ))}
              
              {loading && (
                <MessageBubble message="Thinking..." isAI={true} />
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs mb-4">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Modal Footer / Chat Box input */}
            <div className="p-4 bg-black/20">
              <ChatBox onSendMessage={handleSendMessage} isLoading={loading} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatModal;
