import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Trash2 } from 'lucide-react';

const MessageBubble = ({ message, isAI, dbId, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 mb-6 ${isAI ? 'flex-row' : 'flex-row-reverse'} group`}
    >
      <div className={`p-2 rounded-xl h-fit shadow-md ${
        isAI ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/70'
      }`}>
        {isAI ? <Bot size={20} /> : <User size={20} />}
      </div>
      
      <div className={`relative max-w-[80%] px-5 py-4 rounded-2xl glass ${
        isAI 
          ? 'bg-indigo-500/5 border-indigo-500/20 rounded-tl-none' 
          : 'bg-white/5 border-white/10 rounded-tr-none'
      }`}>
        {onDelete && dbId && (
          <button 
            onClick={() => onDelete(dbId)}
            className={`absolute top-2 ${isAI ? '-right-10' : '-left-10'} p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 text-white/40 hover:text-red-400`}
            title="Delete this chat"
          >
            <Trash2 size={16} />
          </button>
        )}
        <p className="text-sm leading-relaxed text-gray-200 whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
