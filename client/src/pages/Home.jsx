import React from 'react';
import Header from '../components/Header';
import ChatModal from '../components/ChatModal';
import { motion } from 'framer-motion';
import { Brain, Database, Shield, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-6 flex flex-col items-center text-center space-y-4 hover:bg-white/5 transition-colors"
  >
    <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen flex flex-col px-4 sm:px-6 mb-16 relative">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center py-12 sm:py-24 z-10">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-center space-y-8 mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Now using Qwen 72B
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white">
            Master your studies with <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Agentic AI Intelligence
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The ultimate personalized tutor. It remembers what you discussed, protects your API keys securely in the backend, and answers flawlessly. 
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => {
                // A fun little trick: we just show them where the chat button is if they click this
                const btn = document.getElementById('chat-trigger-btn');
                if (btn) {
                  btn.classList.add('ring-4', 'ring-indigo-400', 'ring-offset-2', 'ring-offset-[#0f172a]');
                  setTimeout(() => {
                    btn.classList.remove('ring-4', 'ring-indigo-400', 'ring-offset-2', 'ring-offset-[#0f172a]');
                  }, 1000);
                }
              }}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 group cursor-pointer"
            >
              Click Chat Icon Below
              <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
            </button>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Shield size={16}/> Secure Backend Proxy
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
          <FeatureCard 
            icon={Brain} 
            title="Genius Level Insights" 
            description="Leveraging the staggering 72-Billion parameter Qwen Instruct model dynamically loaded from Hugging Face's inference API."
            delay={0.2}
          />
          <FeatureCard 
            icon={Database} 
            title="Persistent Memory" 
            description="Every question and answer is vaulted securely into MongoDB Atlas. Refreshing the page will never wipe your study session."
            delay={0.4}
          />
          <FeatureCard 
            icon={Shield} 
            title="Maximum Privacy" 
            description="Your UI is physically separated from the API calls. Tokens are kept securely on the Node.js backend to prevent unwanted scraping."
            delay={0.6}
          />
        </div>
        
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 z-10">
        <p>© 2026 AI Study Helper. Built with React & Express.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>

      {/* Background decorations */}
      <div className="fixed top-0 inset-x-0 h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      {/* The isolated Chat Modal taking care of everything! */}
      <ChatModal />
    </div>
  );
};

export default Home;
