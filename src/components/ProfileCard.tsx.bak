import { motion } from 'framer-motion';
import { User, Music, Sparkles, Crown, Star } from 'lucide-react';
import { useProfileDrawer } from '../context/ProfileDrawerContext';
import { useAudio } from '../context/AudioContext';
import type { Student } from '../data/students';
import type { Teacher } from '../data/teachers';

interface ProfileCardProps {
  profile: Student | Teacher;
  type: 'student' | 'teacher';
  index?: number;
  isAdviser?: boolean;
}

export default function ProfileCard({ profile, type, index = 0, isAdviser = false }: ProfileCardProps) {
  const { openProfile } = useProfileDrawer();
  const { playClickSound, playWhooshSound } = useAudio();

  const handleClick = () => {
    playClickSound();
    playWhooshSound();
    openProfile({ type, data: profile });
  };

  const isStudent = type === 'student';
  const student = isStudent ? profile as Student : null;
  const isDeveloper = student?.isDeveloper;
  const hasAudio = student?.audioTrack;

  // Generate gradient based on name for placeholder images
  const generateGradient = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hash * 2) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 60%, 75%), hsl(${hue2}, 60%, 65%))`;
  };

  // Special styling for adviser - CIRCULAR with border
  if (isAdviser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
        className="group cursor-pointer max-w-[280px] mx-auto"
      >
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-full h-full rounded-full bg-white" />
          </div>

          {/* Crown icon at top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-lg border-2 border-white"
            >
              <Crown className="w-5 h-5 text-white" />
            </motion.div>
          </div>

          {/* Circular Image Container */}
          <div className="relative aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: generateGradient(profile.name) }}
              >
                <User className="w-20 h-20 text-white/60" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Name at bottom */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-[#d4af37] text-xs font-medium uppercase tracking-wider mb-1">
                {'title' in profile ? profile.title : 'Teacher'}
              </p>
              <h3 className="font-heading text-lg font-bold text-white drop-shadow-lg">
                {profile.name}
              </h3>
            </div>
          </div>

          {/* Class Adviser Badge below */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-white text-xs font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap"
          >
            <Star className="w-3 h-3" />
            Class Adviser
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Regular student/teacher card - CIRCULAR with border
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.08, y: -5 }}
      onClick={handleClick}
      className="group cursor-pointer"
    >
      <div className="relative">
        {/* Animated border ring */}
        <motion.div
          className={`absolute inset-0 rounded-full p-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDeveloper 
              ? 'bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37]' 
              : 'bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6]'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full rounded-full bg-white" />
        </motion.div>

        {/* Static border */}
        <div className={`absolute inset-0 rounded-full p-[2px] ${
          isDeveloper 
            ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f]' 
            : 'bg-gradient-to-r from-[#8b5cf6]/50 to-[#8b5cf6]/30'
        }`}>
          <div className="w-full h-full rounded-full bg-white" />
        </div>

        {/* Circular Image Container */}
        <div className="relative aspect-square rounded-full overflow-hidden m-[3px]">
          {profile.image ? (
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: generateGradient(profile.name) }}
            >
              <User className="w-12 h-12 text-white/60" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Developer Badge */}
          {isDeveloper && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </motion.div>
          )}

          {/* Audio Indicator */}
          {hasAudio && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 + 0.4 }}
              className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
            >
              <Music className="w-3.5 h-3.5 text-[#8b5cf6]" />
            </motion.div>
          )}

          {/* Name on hover */}
          <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="font-heading text-sm font-bold text-white drop-shadow-lg">
              {profile.name}
            </h3>
            {isStudent && student?.role && (
              <p className="text-[10px] text-[#d4af37] font-medium">{student.role}</p>
            )}
          </div>
        </div>
      </div>

      {/* Name below circle */}
      <div className="text-center mt-3">
        <h3 className="font-heading text-sm font-semibold text-gray-800 group-hover:text-[#8b5cf6] transition-colors">
          {profile.name}
        </h3>
        {'subject' in profile && (
          <p className="text-xs text-gray-500">
            {profile.subject}
          </p>
        )}
      </div>
    </motion.div>
  );
}
