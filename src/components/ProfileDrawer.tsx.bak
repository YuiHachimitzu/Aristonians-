import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Music, User, GraduationCap, Sparkles, Heart, Quote, Star } from 'lucide-react';
import { useProfileDrawer } from '../context/ProfileDrawerContext';
import { useAudio } from '../context/AudioContext';
import type { Student } from '../data/students';
import type { Teacher } from '../data/teachers';

export default function ProfileDrawer() {
  const { isOpen, profile, closeProfile } = useProfileDrawer();
  const { playTrack, stopTrack, isPlaying } = useAudio();
  const [imageLoaded, setImageLoaded] = useState(false);
  const audioStarted = useRef(false);

  // Reset image loaded state when profile changes
  useEffect(() => {
    setImageLoaded(false);
  }, [profile]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeProfile();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeProfile]);

  // Handle audio playback
  useEffect(() => {
    if (isOpen && profile?.type === 'student') {
      const student = profile.data as Student;
      if (student.audioTrack && !audioStarted.current) {
        playTrack(student.audioTrack, student.audioTrackName);
        audioStarted.current = true;
      }
    }

    return () => {
      if (!isOpen && audioStarted.current) {
        stopTrack();
        audioStarted.current = false;
      }
    };
  }, [isOpen, profile, playTrack, stopTrack]);

  if (!profile) return null;

  const isStudent = profile.type === 'student';
  const data = profile.data;
  const isDeveloper = isStudent && (data as Student).isDeveloper;
  const student = isStudent ? (data as Student) : null;

  // Generate gradient for placeholder
  const generateGradient = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hash * 2) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 60%, 70%), hsl(${hue2}, 60%, 60%))`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      onClick={closeProfile}
    >
      {/* Backdrop with heavy blur */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: isOpen ? 1 : 0, backdropFilter: isOpen ? 'blur(20px)' : 'blur(0px)' }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-white/70"
      />

      {/* Drawer */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 50 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[900px] max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl ${
          isDeveloper 
            ? 'bg-gradient-to-br from-[#d4af37]/5 via-white to-[#8b5cf6]/5' 
            : 'bg-white'
        }`}
        style={{
          border: isDeveloper 
            ? '3px solid transparent' 
            : '2px solid transparent',
          backgroundClip: 'padding-box',
        }}
      >
        {/* Border gradient for developer */}
        {isDeveloper && (
          <div className="absolute inset-0 rounded-3xl p-[3px] bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37]">
            <div className="w-full h-full rounded-3xl bg-white" />
          </div>
        )}

        {/* Content wrapper */}
        <div className={`relative ${isDeveloper ? 'm-[3px]' : ''} bg-white rounded-3xl overflow-hidden`}>
          {/* Close Button */}
          <button
            onClick={closeProfile}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 border border-gray-100"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-col md:flex-row h-full md:h-auto overflow-auto">
            {/* Left Column - Image */}
            <div className="relative w-full md:w-[40%] aspect-square md:aspect-auto md:min-h-[500px] overflow-hidden">
              {/* Shimmer Loading Effect */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
              )}

              {data.image ? (
                <motion.img
                  src={data.image}
                  alt={data.name}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: generateGradient(data.name) }}
                >
                  <User className="w-32 h-32 text-white/30" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Developer Badge */}
              {isDeveloper && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-white font-bold flex items-center gap-2 shadow-lg border-2 border-white"
                >
                  <Sparkles className="w-4 h-4" />
                  THE DEVELOPER
                </motion.div>
              )}

              {/* Student Badge */}
              {isStudent && !isDeveloper && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold flex items-center gap-2 shadow-lg border-2 border-white"
                >
                  <Star className="w-4 h-4" />
                  ARISTONIAN
                </motion.div>
              )}

              {/* Audio Indicator */}
              {isPlaying && student?.audioTrack && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-[#8b5cf6]/90 text-white text-sm flex items-center gap-2 backdrop-blur-sm border border-white/20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Music className="w-4 h-4" />
                  </motion.div>
                  <span className="max-w-[150px] truncate">
                    {student.audioTrackName || 'Playing...'}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Right Column - Content */}
            <div className={`flex-1 p-6 md:p-8 ${isDeveloper ? 'bg-gradient-to-br from-[#d4af37]/5 to-transparent' : 'bg-white'}`}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {/* Role Badge */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                    isDeveloper
                      ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30'
                      : 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20'
                  }`}>
                    {isStudent
                      ? (data as Student).role || 'Student'
                      : (data as Teacher).role}
                  </span>
                  {'subject' in data && data.subject !== 'Adviser' && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      {data.subject}
                    </span>
                  )}
                </div>

                {/* Name */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`font-heading text-3xl md:text-4xl font-bold mb-2 ${
                    isDeveloper ? 'gradient-gold' : 'text-gray-900'
                  }`}
                >
                  {data.name}
                </motion.h2>

                {/* Title for teachers */}
                {'title' in data && (
                  <p className="text-gray-500 text-lg mb-6">
                    {data.title} {data.name.split(' ')[0]}
                  </p>
                )}

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className={`w-24 h-1 rounded-full mb-6 origin-left ${
                    isDeveloper ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f]' : 'bg-gradient-to-r from-[#8b5cf6] to-[#d4af37]'
                  }`}
                />

                {/* Motto */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Quote className="w-3 h-3" />
                    Personal Motto
                  </h3>
                  <div className={`p-4 rounded-xl border-l-4 ${
                    isDeveloper 
                      ? 'bg-[#d4af37]/5 border-[#d4af37]' 
                      : 'bg-[#8b5cf6]/5 border-[#8b5cf6]'
                  }`}>
                    <p className={`text-xl md:text-2xl font-heading italic leading-relaxed ${
                      isDeveloper ? 'text-[#d4af37]' : 'text-gray-700'
                    }`}>
                      "{isStudent ? (data as Student).motto : data.motto}"
                    </p>
                  </div>
                </motion.div>

                {/* White Box Quote (for students with special quotes) */}
                {student?.whiteBoxQuote && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.52 }}
                    className="mb-6"
                  >
                    <div className="relative">
                      {/* Glow effect behind */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#8b5cf6]/20 via-[#d4af37]/20 to-[#8b5cf6]/20 rounded-2xl blur-sm" />
                      
                      <div className="relative p-5 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent rounded-bl-full" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#d4af37]/10 to-transparent rounded-tr-full" />
                        
                        {/* Quote mark */}
                        <div className="absolute -top-1 -left-1 text-6xl text-[#8b5cf6]/10 font-serif leading-none select-none">
                          "
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <p className="text-gray-400 text-sm italic mb-2 pl-3 border-l-2 border-[#8b5cf6]/30">
                            {student.whiteBoxQuote.teaser}
                          </p>
                          <p className="text-gray-800 font-medium leading-relaxed">
                            {student.whiteBoxQuote.full}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Legacy Message */}
                {student?.legacyMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="mb-6"
                  >
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Heart className="w-3 h-3" />
                      Legacy Message
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {student.legacyMessage}
                    </p>
                  </motion.div>
                )}

                {/* Developer Special Section */}
                {isDeveloper && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-5 rounded-2xl bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent border-2 border-[#d4af37]/20"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-[#d4af37]">
                        About the Developer
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Adrian Fortin is the creative mind behind this class memory website.
                      With a passion for web development and design, he created this
                      digital time capsule to preserve the precious memories of Grade 11
                      Aristotle.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-3">
                      <span className="text-[#d4af37] font-medium">Fun fact:</span> This website was
                      built with React, Three.js, Framer Motion, and lots of love for the Aristonians!
                    </p>
                  </motion.div>
                )}

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between"
                >
                  <p className="text-sm text-gray-400">
                    Click outside to close
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                    <span>Aristotle 2025-2026</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
