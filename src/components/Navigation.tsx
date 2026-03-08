import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, GraduationCap } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'events', label: 'Event Albums' },
  { id: 'videos', label: 'Videos' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'timeline', label: 'Timeline' }
];

// Magnetic Button Component
function MagneticButton({ 
  children, 
  onClick, 
  className 
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <MagneticButton onClick={() => handleNavClick('home')}>
              <div className="flex items-center gap-2 group">
                <motion.div 
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isScrolled ? 'bg-gradient-to-br from-violet-500 to-purple-600' : 'bg-white/20'
                  }`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap className="w-6 h-6 text-white" />
                </motion.div>
                <div className="hidden sm:block text-left">
                  <p className={`text-sm font-bold transition-colors ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  }`}>
                    ARISTOTLE
                  </p>
                  <p className={`text-xs transition-colors ${
                    isScrolled ? 'text-gray-600' : 'text-white/80'
                  }`}>
                    Basta Aristotle
                  </p>
                </div>
              </div>
            </MagneticButton>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <MagneticButton
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                >
                  <div className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? isScrolled
                        ? 'text-violet-600'
                        : 'text-white'
                      : isScrolled
                        ? 'text-gray-600 hover:text-violet-600'
                        : 'text-white/80 hover:text-white'
                  }`}>
                    {currentPage === item.id && (
                      <motion.span
                        layoutId="activeNav"
                        className={`absolute inset-0 rounded-full ${
                          isScrolled ? 'bg-violet-100' : 'bg-white/20'
                        }`}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </div>
                </MagneticButton>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <MagneticButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <div className={`md:hidden p-2 rounded-xl transition-colors ${
                isScrolled
                  ? 'hover:bg-gray-100'
                  : 'hover:bg-white/20'
              }`}>
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
                )}
              </div>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl"
            >
              <div className="p-6 pt-20">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        currentPage === item.id
                          ? 'bg-violet-100 text-violet-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Grade 11-HUMSS Aristotle
                  </p>
                  <p className="text-xs text-violet-600 text-center font-medium mt-1">
                    Basta Aristotle
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
