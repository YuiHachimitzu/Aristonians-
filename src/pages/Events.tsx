import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ImageIcon, Award, Users, Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { events, getFeaturedEvents } from '../data/events';
import { useAudio } from '../context/AudioContext';

export default function Events() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState<typeof events[0] | null>(null);
  const { playClickSound } = useAudio();

  const featuredEvents = getFeaturedEvents();

  const openLightbox = (event: typeof events[0], startIndex = 0) => {
    playClickSound();
    setCurrentEvent(event);
    setCurrentImageIndex(startIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (currentEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % currentEvent.images.length);
    }
  };

  const prevImage = () => {
    if (currentEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + currentEvent.images.length) % currentEvent.images.length);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'award':
        return <Award className="w-4 h-4" />;
      case 'performance':
        return <Sparkles className="w-4 h-4" />;
      case 'celebration':
        return <Users className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'award':
        return 'Award Ceremony';
      case 'performance':
        return 'Performance';
      case 'celebration':
        return 'Celebration';
      case 'classroom':
        return 'Classroom';
      default:
        return 'Event';
    }
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
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#8b5cf6]/10 rounded-full blur-3xl" />

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
              <ImageIcon className="w-4 h-4 text-[#d4af37]" />
              <span className="text-sm text-[#d4af37] font-medium">Event Albums</span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
              Our <span className="gradient-gold">Memories</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Relive the moments that made our year unforgettable. From awards to celebrations, every memory preserved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-12"
          >
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span className="text-gray-400 text-sm uppercase tracking-wider">Featured Events</span>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
          </motion.div>

          <div className="space-y-20">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openLightbox(event)}
                    className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
                  >
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#8b5cf6]/90 text-white text-sm font-medium flex items-center gap-2 backdrop-blur-sm border border-white/20">
                      {getCategoryIcon(event.category)}
                      {getCategoryLabel(event.category)}
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-6 py-3 rounded-full bg-white/90 text-gray-900 text-sm font-semibold shadow-lg flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        View Gallery
                      </span>
                    </div>

                    {/* Image Count */}
                    {event.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/70 text-white text-sm font-medium backdrop-blur-sm">
                        +{event.images.length - 1} more
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {event.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                    {event.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openLightbox(event)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    View Photos
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Events Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <span className="text-gray-400 text-sm uppercase tracking-wider">All Memories</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => openLightbox(event)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src={event.images[0]}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Category */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-[#8b5cf6]/80 text-white text-xs font-medium backdrop-blur-sm">
                      {getCategoryLabel(event.category)}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white/70 text-xs mb-1">{event.date}</p>
                    <h3 className="font-heading text-white font-semibold text-sm line-clamp-2">
                      {event.title}
                    </h3>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentEvent && (
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
              className="relative w-full h-full flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Section */}
              <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                <div className="relative max-w-4xl max-h-[70vh] lg:max-h-[85vh]">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    src={currentEvent.images[currentImageIndex]}
                    alt={currentEvent.title}
                    className="max-w-full max-h-[70vh] lg:max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  />

                  {/* Navigation Arrows */}
                  {currentEvent.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                    {currentImageIndex + 1} / {currentEvent.images.length}
                  </div>
                </div>
              </div>

              {/* Info Panel */}
              <div className="lg:w-80 p-6 lg:p-8 bg-white/5 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/10">
                <div className="flex items-center gap-2 text-[#d4af37] text-sm mb-3">
                  {getCategoryIcon(currentEvent.category)}
                  <span>{getCategoryLabel(currentEvent.category)}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  {currentEvent.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {currentEvent.date}
                </p>
                <p className="text-white/80 leading-relaxed">
                  {currentEvent.description}
                </p>

                {/* Thumbnail Grid */}
                {currentEvent.images.length > 1 && (
                  <div className="mt-6">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-3">All Photos</p>
                    <div className="grid grid-cols-4 gap-2">
                      {currentEvent.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            idx === currentImageIndex 
                              ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30' 
                              : 'border-transparent hover:border-white/30'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
