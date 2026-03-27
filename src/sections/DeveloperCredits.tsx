import { motion } from 'framer-motion';
import { Heart, Code, Sparkles, Music, Facebook, Instagram, Twitter, ExternalLink } from 'lucide-react';
import { useProfileDrawer } from '../context/ProfileDrawerContext';
import { useAudio } from '../context/AudioContext';
import { students } from '../data/students';

export default function DeveloperCredits() {
  const { openProfile } = useProfileDrawer();
  const { playClickSound } = useAudio();
  const adrian = students.find((s) => s.isDeveloper);

  const handleClick = () => {
    playClickSound();
    if (adrian) {
      openProfile({ type: 'student', data: adrian });
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/2 w-full h-full opacity-5"
        >
          <div className="w-full h-full border border-[#d4af37] rounded-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full opacity-5"
        >
          <div className="w-full h-full border border-[#d4af37] rounded-full" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-6"
          >
            <Heart className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm text-[#d4af37] font-medium">Made with Love</span>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Created with <span className="gradient-gold">Love</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A digital time capsule crafted with passion, dedication, and countless hours of coding.
          </p>
        </motion.div>

        {/* Developer Card - Landscape Layout */}
        {adrian && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={handleClick}
              className="cursor-pointer group"
            >
              <div className="relative glass-card overflow-hidden border-[#d4af37]/30 hover:border-[#d4af37]/60 transition-all duration-300 shadow-xl">
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 60px rgba(212, 175, 55, 0.15)',
                  }}
                />

                {/* Landscape Layout - Image Left, Content Right */}
                <div className="flex flex-col md:flex-row">
                  {/* Left - Image */}
                  <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[350px] overflow-hidden">
                    <img
                      src={adrian.image}
                      alt={adrian.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-t md:from-black/30 md:via-transparent md:to-transparent" />

                    {/* Developer Badge */}
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#d4af37] text-white font-bold flex items-center gap-2 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      DEV
                    </div>

                    {/* Music Note */}
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                    >
                      <Music className="w-5 h-5 text-[#d4af37]" />
                    </motion.div>
                  </div>

                  {/* Right - Content */}
                  <div className="flex-1 p-6 md:p-8 bg-white/80 flex flex-col justify-center">
                    {/* Name & Role */}
                    <div className="mb-4">
                      <h3 className="font-heading text-3xl md:text-4xl font-bold gradient-gold mb-1 animate-glow-gold">
                        {adrian.name}
                      </h3>
                      <p className="text-gray-500 text-sm uppercase tracking-wider">
                        Developer & Designer
                      </p>
                    </div>

                    {/* Motto */}
                    <div className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 mb-4">
                      <p className="font-heading text-lg italic text-[#d4af37]">
                        "{adrian.motto}"
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      The creative mind behind this digital time capsule. Built with React, 
                      Three.js, Framer Motion, and lots of love for the Aristonians!
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['React', 'TypeScript', 'Three.js', 'Framer Motion'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      {adrian.socialLinks?.facebook && (
                        <a 
                          href={adrian.socialLinks.facebook} 
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full bg-[#d4af37]/10 hover:bg-[#d4af37]/20 transition-colors"
                        >
                          <Facebook className="w-4 h-4 text-[#d4af37]" />
                        </a>
                      )}
                      {adrian.socialLinks?.instagram && (
                        <a 
                          href={adrian.socialLinks.instagram}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full bg-[#d4af37]/10 hover:bg-[#d4af37]/20 transition-colors"
                        >
                          <Instagram className="w-4 h-4 text-[#d4af37]" />
                        </a>
                      )}
                      {adrian.socialLinks?.twitter && (
                        <a 
                          href={adrian.socialLinks.twitter}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full bg-[#d4af37]/10 hover:bg-[#d4af37]/20 transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-[#d4af37]" />
                        </a>
                      )}
                      <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                        Click to view profile <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
            <Code className="w-5 h-5 text-[#8b5cf6]" />
            <span className="text-gray-600">
              Built for the Aristonians, with love
            </span>
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>

          <p className="mt-6 text-gray-400 text-sm max-w-lg mx-auto">
            Thank you for being part of this journey. Every line of code was written
            with the memories we've shared together. Basta Aristotle!
          </p>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-16 pt-8 border-t border-gray-200"
      >
        <p className="font-heading text-xl animate-glow-gold">
          <span className="gradient-gold">Created with</span>{' '}
          <Heart className="w-5 h-5 inline text-red-500 fill-red-500" />{' '}
          <span className="gradient-gold">by Adrian Fortin</span>
        </p>
      </motion.div>
    </section>
  );
}
