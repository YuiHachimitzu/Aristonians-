import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Home, Images, Video, Award, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

const quickLinks = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/events', icon: Images, label: 'Events' },
  { path: '/videos', icon: Video, label: 'Videos' },
  { path: '/recognition', icon: Award, label: 'Awards' },
  { path: '/timeline', icon: Clock, label: 'Timeline' },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const { playClickSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] text-white shadow-lg flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick Navigation Menu */}
      <div className="fixed bottom-8 left-8 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playClickSound();
            setIsExpanded(!isExpanded);
          }}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            isExpanded 
              ? 'bg-[#8b5cf6] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-0 glass-card p-3 rounded-2xl shadow-xl"
            >
              <div className="flex flex-col gap-2">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => {
                        playClickSound();
                        setIsExpanded(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                        location.pathname === link.path
                          ? 'bg-[#d4af37]/10 text-[#d4af37]'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="text-sm font-medium whitespace-nowrap">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
