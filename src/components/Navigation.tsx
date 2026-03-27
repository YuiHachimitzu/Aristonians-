import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Music, VolumeX, GraduationCap, Home } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Event Albums' },
  { path: '/videos', label: 'Videos' },
  { path: '/recognition', label: 'Recognition' },
  { path: '/timeline', label: 'Timeline' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isPlaying, currentTrackName, togglePlay, playClickSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo - Graduation Hat */}
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className="flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </motion.div>
              <span className="font-accent text-lg font-bold gradient-gold hidden sm:block">
                Aristotle
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className="relative group"
                >
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-[#d4af37]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute -bottom-1 left-1/2 h-0.5 bg-[#d4af37] transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'w-full -translate-x-1/2'
                      : 'w-0 group-hover:w-full group-hover:-translate-x-1/2'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Audio Indicator & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Audio Playing Indicator */}
              {isPlaying && currentTrackName && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Music className="w-4 h-4 text-[#8b5cf6]" />
                  </motion.div>
                  <span className="text-xs text-[#8b5cf6] max-w-[120px] truncate">
                    {currentTrackName}
                  </span>
                  <button
                    onClick={togglePlay}
                    className="p-1 hover:bg-[#8b5cf6]/10 rounded-full transition-colors"
                  >
                    <VolumeX className="w-3 h-3 text-[#8b5cf6]" />
                  </button>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-[280px] glass-drawer p-6 pt-24 shadow-2xl"
            >
              <div className="flex flex-col gap-6">
                {/* Mobile Logo */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-accent text-lg font-bold gradient-gold">
                    Aristotle
                  </span>
                </div>

                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 text-lg font-medium ${
                        location.pathname === link.path
                          ? 'text-[#d4af37]'
                          : 'text-gray-700'
                      }`}
                    >
                      {link.path === '/' && <Home className="w-5 h-5" />}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Audio Control in Mobile */}
                {isPlaying && currentTrackName && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Music className="w-4 h-4 text-[#8b5cf6]" />
                      <span className="text-sm text-[#8b5cf6]">Now Playing</span>
                    </div>
                    <p className="text-gray-700 text-sm">{currentTrackName}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
