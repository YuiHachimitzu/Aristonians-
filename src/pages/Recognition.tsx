import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Medal, Star, Trophy, FileBadge, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface AwardRecipient {
  name: string;
  award: string;
  image?: string;
  certificateImage?: string;
}

export default function Recognition() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playClickSound } = useAudio();

  // Extract award recipients from student data
  const awardRecipients: AwardRecipient[] = [
    {
      name: 'Micah Perlas',
      award: 'With High Honors',
      image: '/images/events/1000168919.jpg',
      certificateImage: '/images/events/1000168919.jpg',
    },
    {
      name: 'Micah Ella Perin',
      award: 'With Honors',
      image: '/images/events/1000168922.jpg',
      certificateImage: '/images/events/1000168922.jpg',
    },
    {
      name: 'Hanna Jean Rio Moral',
      award: 'With Honors',
      image: '/images/events/1000168923.jpg',
      certificateImage: '/images/events/1000168923.jpg',
    },
    {
      name: 'Jenny Marie R. Moral',
      award: 'With Honors',
      image: '/images/events/1000168927.jpg',
      certificateImage: '/images/events/1000168927.jpg',
    },
    {
      name: 'Jessa Pizarra',
      award: 'Perfect Attendance',
      image: '/images/events/1000168928.jpg',
      certificateImage: '/images/events/1000168928.jpg',
    },
    {
      name: 'Amara Pamfilo',
      award: 'Perfect Attendance',
      image: '/images/events/1000168930.jpg',
      certificateImage: '/images/events/1000168930.jpg',
    },
    {
      name: 'Alexis Crispo',
      award: 'Perfect Attendance',
      image: '/images/events/1000168931.jpg',
      certificateImage: '/images/events/1000168931.jpg',
    },
    {
      name: 'Kenneth Venancio',
      award: 'Perfect Attendance',
      image: '/images/events/1000168925.jpg',
      certificateImage: '/images/events/1000168925.jpg',
    },
  ];

  const openLightbox = (image: string, index: number) => {
    playClickSound();
    setCurrentImage(image);
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    const next = (currentIndex + 1) % awardRecipients.length;
    setCurrentIndex(next);
    setCurrentImage(awardRecipients[next].certificateImage || '');
  };

  const prevImage = () => {
    const prev = (currentIndex - 1 + awardRecipients.length) % awardRecipients.length;
    setCurrentIndex(prev);
    setCurrentImage(awardRecipients[prev].certificateImage || '');
  };

  const getAwardIcon = (award: string) => {
    if (award.includes('High Honors')) return <Trophy className="w-5 h-5" />;
    if (award.includes('Honors')) return <Medal className="w-5 h-5" />;
    if (award.includes('Attendance')) return <Star className="w-5 h-5" />;
    return <Award className="w-5 h-5" />;
  };

  const getAwardColor = (award: string) => {
    if (award.includes('High Honors')) return {
      bg: 'from-[#d4af37]/20 to-[#d4af37]/5',
      border: 'border-[#d4af37]/30',
      text: 'text-[#d4af37]',
      icon: 'text-[#d4af37]'
    };
    if (award.includes('Honors')) return {
      bg: 'from-[#8b5cf6]/20 to-[#8b5cf6]/5',
      border: 'border-[#8b5cf6]/30',
      text: 'text-[#8b5cf6]',
      icon: 'text-[#8b5cf6]'
    };
    if (award.includes('Attendance')) return {
      bg: 'from-[#22c55e]/20 to-[#22c55e]/5',
      border: 'border-[#22c55e]/30',
      text: 'text-[#22c55e]',
      icon: 'text-[#22c55e]'
    };
    return {
      bg: 'from-[#8b5cf6]/20 to-[#8b5cf6]/5',
      border: 'border-[#8b5cf6]/30',
      text: 'text-[#8b5cf6]',
      icon: 'text-[#8b5cf6]'
    };
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-[72px]"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#d4af37]/10 to-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#8b5cf6]/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-6"
            >
              <Trophy className="w-4 h-4 text-[#d4af37]" />
              <span className="text-sm text-[#d4af37] font-medium">Recognition</span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
              Celebrating <span className="gradient-gold">Excellence</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Honoring dedication, achievements, and the hard work of our amazing Aristonians.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Class Award */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative glass-card p-8 md:p-12 text-center overflow-hidden border-2 border-[#d4af37]/20">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-20 -right-20 w-40 h-40 border border-[#d4af37]/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-20 -left-20 w-32 h-32 border border-[#d4af37]/10 rounded-full"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/20 mb-6">
                  <FileBadge className="w-10 h-10 text-[#d4af37]" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold gradient-gold mb-3">
                  Best Classroom Structuring
                </h2>
                <p className="text-gray-500 mb-4">
                  Gawad Pagkilala 2025-2026 | First Quarter
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#f4d03f]/10 border border-[#d4af37]/20">
                  <span className="text-gray-700">Grade 11-HUMSS</span>
                  <span className="text-[#d4af37] font-bold">Aristotle</span>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Adviser: Mrs. Fatima V. Gonzales
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Individual Awards */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <Medal className="w-5 h-5 text-[#8b5cf6]" />
            <span className="text-gray-400 text-sm uppercase tracking-wider">Individual Achievements</span>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardRecipients.map((recipient, index) => {
              const colors = getAwardColor(recipient.award);
              return (
                <motion.div
                  key={recipient.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => recipient.certificateImage && openLightbox(recipient.certificateImage, index)}
                  className="cursor-pointer group"
                >
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} border-2 ${colors.border} p-1 shadow-lg hover:shadow-2xl transition-all duration-300`}>
                    <div className="glass-card overflow-hidden bg-white">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={recipient.image}
                          alt={recipient.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Award Badge */}
                        <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm flex items-center gap-1.5 shadow-lg`}>
                          <span className={colors.icon}>{getAwardIcon(recipient.award)}</span>
                          <span className={`text-xs font-semibold ${colors.text}`}>
                            {recipient.award}
                          </span>
                        </div>

                        {/* View Certificate */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="px-4 py-2 rounded-full bg-white/90 text-gray-900 text-sm font-medium shadow-lg">
                            View Certificate
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 text-center">
                        <h3 className="font-heading text-lg font-semibold text-gray-900">
                          {recipient.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'With High Honors', value: '1', color: '#d4af37', icon: Trophy },
                { label: 'With Honors', value: '3', color: '#8b5cf6', icon: Medal },
                { label: 'Perfect Attendance', value: '4', color: '#22c55e', icon: Star },
                { label: 'Class Awards', value: '1', color: '#d4af37', icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-6 text-center shadow-lg border-2 border-transparent hover:border-gray-100 transition-all"
                >
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <p
                    className="font-heading text-3xl md:text-4xl font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative max-w-4xl max-h-[80vh]">
                <motion.img
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={currentImage}
                  alt="Certificate"
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />

                {/* Info */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/70 text-white text-center">
                  <p className="font-semibold">{awardRecipients[currentIndex]?.name}</p>
                  <p className="text-sm text-white/70">{awardRecipients[currentIndex]?.award}</p>
                </div>

                {/* Counter */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                  {currentIndex + 1} / {awardRecipients.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
