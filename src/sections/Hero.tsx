import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, GraduationCap } from 'lucide-react';
import StarFieldBackground from '../components/StarFieldBackground';
import { useAudio } from '../context/AudioContext';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const { playClickSound } = useAudio();

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Tagline letter animation - Now just "Aristotle"
  const tagline = 'Aristotle';
  const letters = tagline.split('');

  const scrollToContent = () => {
    playClickSound();
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Three.js Star Field Background */}
      <StarFieldBackground />

      {/* Background Image with Parallax - Full Class Picture */}
      <motion.div
        style={{ y: backgroundY, scale }}
        className="absolute inset-0 w-full h-[120%] z-[1]"
      >
        <img
          src="/images/events/1000168935.jpg"
          alt="Grade 11 Aristotle Class Photo"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay - Light Theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/95" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
      >
        {/* Graduation Hat Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-xl">
            <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
        </motion.div>

        {/* Tagline - Now "Aristotle" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4"
        >
          <h1 className="font-accent text-6xl md:text-8xl lg:text-9xl font-bold text-center">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="inline-block gradient-gold"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-lg md:text-xl text-gray-600 text-center mb-2"
        >
          Grade 11 HUMSS | School Year 2025-2026
        </motion.p>

        {/* School Name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-sm md:text-base text-gray-400 text-center mb-8"
        >
          San Isidro National High School
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContent}
          className="btn-primary flex items-center gap-2 shadow-lg"
        >
          Explore Our Journey
        </motion.button>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="flex gap-6 md:gap-10 mt-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center glass-card px-6 py-4 cursor-default"
          >
            <p className="font-heading text-3xl md:text-4xl font-bold text-[#8b5cf6]">40</p>
            <p className="text-sm text-gray-500">Students</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center glass-card px-6 py-4 cursor-default"
          >
            <p className="font-heading text-3xl md:text-4xl font-bold text-[#d4af37]">10</p>
            <p className="text-sm text-gray-500">Teachers</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center glass-card px-6 py-4 cursor-default"
          >
            <p className="font-heading text-3xl md:text-4xl font-bold text-red-500">1</p>
            <p className="text-sm text-gray-500">Family</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToContent}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Decorative Corner Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute top-24 left-8 w-20 h-20 border-l-2 border-t-2 border-[#d4af37]/30 rounded-tl-3xl hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
        className="absolute top-24 right-8 w-20 h-20 border-r-2 border-t-2 border-[#8b5cf6]/30 rounded-tr-3xl hidden lg:block"
      />
    </section>
  );
}
