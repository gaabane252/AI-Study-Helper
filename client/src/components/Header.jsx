import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            AI Study Helper
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-medium text-emerald-400">
          <Sparkles className="w-3 h-3" />
          <span>AI Powered Learning</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
