import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote, User, Heart, Sparkles, Crown, BookOpen } from 'lucide-react';

interface ProfileData {
  id: string;
  name: string;
  role?: string;
  subject?: string;
  honorific?: 'Sir' | 'Ma\'am';
  gender?: 'female' | 'male';
  image?: string;
  motto?: string;
  quote?: string;
}

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData | null;
  type: 'student' | 'teacher';
}

export default function ProfileDrawer({ isOpen, onClose, profile, type }: ProfileDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!profile) return null;

  const isAdrian = profile.name === 'Adrian Fortin';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 200,
              duration: 0.5 
            }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl overflow-y-auto"
          >
            <div className="min-h-full bg-gradient-to-br from-white via-violet-50/30 to-purple-50/30 backdrop-blur-xl shadow-2xl">
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-gray-600 group-hover:text-violet-600 transition-colors" />
              </motion.button>

              {/* Content */}
              <div className="p-8 lg:p-12">
                {/* Profile Image Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative mb-8"
                >
                  <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-full blur-2xl opacity-50 ${
                      profile.gender === 'female' 
                        ? 'bg-gradient-to-br from-pink-400 to-rose-500' 
                        : profile.gender === 'male'
                          ? 'bg-gradient-to-br from-blue-400 to-cyan-500'
                          : 'bg-gradient-to-br from-violet-400 to-purple-500'
                    }`} />
                    
                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                      {profile.image ? (
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          profile.gender === 'female'
                            ? 'bg-gradient-to-br from-pink-100 to-rose-100'
                            : profile.gender === 'male'
                              ? 'bg-gradient-to-br from-blue-100 to-cyan-100'
                              : 'bg-gradient-to-br from-violet-100 to-purple-100'
                        }`}>
                          <User className={`w-24 h-24 ${
                            profile.gender === 'female'
                              ? 'text-pink-400'
                              : profile.gender === 'male'
                                ? 'text-blue-400'
                                : 'text-violet-400'
                          }`} />
                        </div>
                      )}
                    </div>

                    {/* Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg ${
                        type === 'teacher' 
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600' 
                          : profile.gender === 'female'
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      }`}
                    >
                      {type === 'teacher' ? (
                        <span className="flex items-center gap-1.5">
                          <Crown className="w-4 h-4" />
                          {profile.role}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Heart className="w-4 h-4" />
                          {profile.gender === 'female' ? 'She/Her' : 'He/Him'}
                        </span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Name & Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {profile.name}
                  </h2>
                  
                  {type === 'teacher' && profile.subject && (
                    <p className="text-lg text-violet-600 font-medium flex items-center justify-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {profile.subject}
                    </p>
                  )}

                  {type === 'teacher' && profile.honorific && (
                    <span className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      profile.honorific === 'Sir'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {profile.honorific}
                    </span>
                  )}
                </motion.div>

                {/* Motto Section */}
                {profile.motto && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <div className={`relative p-6 rounded-2xl ${
                      isAdrian 
                        ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500'
                        : 'bg-gradient-to-r from-violet-100 via-purple-100 to-pink-100'
                    }`}>
                      <Sparkles className={`absolute top-4 right-4 w-6 h-6 ${
                        isAdrian ? 'text-white/50' : 'text-violet-400'
                      }`} />
                      
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          isAdrian ? 'bg-white/20' : 'bg-white'
                        }`}>
                          <Quote className={`w-6 h-6 ${
                            isAdrian ? 'text-white' : 'text-violet-500'
                          }`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium mb-1 ${
                            isAdrian ? 'text-white/70' : 'text-violet-600'
                          }`}>
                            Personal Motto
                          </p>
                          <p className={`text-xl sm:text-2xl font-bold ${
                            isAdrian ? 'text-white' : 'text-gray-800'
                          }`}>
                            "{profile.motto}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quote Section */}
                {profile.quote && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                      <p className="text-gray-600 italic leading-relaxed">
                        "{profile.quote}"
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Special Badge for Adrian */}
                {isAdrian && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-lg shadow-violet-200">
                      <Sparkles className="w-5 h-5" />
                      <span>Lead Developer</span>
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="mt-4 text-gray-500 text-sm">
                      Created this website with love for the Aristotle family
                    </p>
                  </motion.div>
                )}

                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-12 flex justify-center gap-2"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className={`w-2 h-2 rounded-full ${
                        profile.gender === 'female'
                          ? 'bg-pink-400'
                          : profile.gender === 'male'
                            ? 'bg-blue-400'
                            : 'bg-violet-400'
                      }`}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
