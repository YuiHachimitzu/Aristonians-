import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { timelineEvents } from '../data/timeline';
import { Calendar, MapPin, X, ChevronLeft, ChevronRight, Sparkles, Clock, Heart } from 'lucide-react';

export default function Timeline() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<typeof timelineEvents[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (event: typeof timelineEvents[0], imageIndex = 0) => {
    setCurrentEvent(event);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (currentEvent?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % currentEvent.images!.length);
    }
  };

  const prevImage = () => {
    if (currentEvent?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + currentEvent.images!.length) % currentEvent.images!.length);
    }
  };

  // Get images array from event
  const getEventImages = (event: typeof timelineEvents[0]) => {
    if (event.images && event.images.length > 0) return event.images;
    if (event.image) return [event.image];
    return [];
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
      <section className="relative py-20 bg-gradient-to-b from-[#8b5cf6]/10 to-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-[#8b5cf6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-[#ec4899]/10 rounded-full blur-3xl" />
        
        {/* Floating Decorations */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 right-16 text-[#d4af37]/30"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-16 left-16 text-[#8b5cf6]/30"
        >
          <Heart className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-24 left-24 text-[#ec4899]/20"
        >
          <Clock className="w-5 h-5" />
        </motion.div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8b5cf6]/20 to-[#a78bfa]/20 border border-[#8b5cf6]/30 mb-6"
            >
              <Clock className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-sm font-semibold text-[#8b5cf6]">Our Story</span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              A timeline of memories, milestones, and moments that defined our year together as Aristonians.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-gray-100">
                <Calendar className="w-4 h-4 text-[#8b5cf6]" />
                <span className="text-sm font-medium text-gray-700">{timelineEvents.length} Memories</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-gray-100">
                <Heart className="w-4 h-4 text-[#ec4899]" />
                <span className="text-sm font-medium text-gray-700">Forever Friends</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
        <div className="container-custom">
          <div className="relative max-w-5xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6]/30 rounded-full" />

            {/* Events */}
            <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                const images = getEventImages(event);
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-12 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-6 h-6 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] border-4 border-white shadow-lg z-10">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="absolute inset-0 rounded-full bg-[#8b5cf6]"
                      />
                    </div>

                    {/* Content Card */}
                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                      isEven ? 'md:text-right md:pr-4' : 'md:text-left md:pl-4'
                    }`}>
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        {/* Card Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#8b5cf6]/20 to-[#a78bfa]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden">
                          {/* Decorative Corner */}
                          <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-20 h-20 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent rounded-full -translate-y-1/2 ${isEven ? 'translate-x-1/2' : '-translate-x-1/2'}`} />

                          {/* Date Badge */}
                          <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white text-sm font-semibold shadow-md">
                              <Calendar className="w-3.5 h-3.5" />
                              {event.month}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-heading text-xl md:text-2xl font-bold text-gray-900 mb-2 relative z-10">
                            {event.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 relative z-10">
                            {event.description}
                          </p>

                          {/* Location (if available) */}
                          {event.location && (
                            <div className={`flex items-center gap-2 text-sm text-gray-500 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                              <MapPin className="w-4 h-4 text-[#8b5cf6]" />
                              <span>{event.location}</span>
                            </div>
                          )}

                          {/* Images Grid */}
                          {images.length > 0 && (
                            <div className={`grid gap-2 mt-4 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                              {images.slice(0, 3).map((img, imgIndex) => (
                                <motion.button
                                  key={imgIndex}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => openLightbox(event, imgIndex)}
                                  className="relative aspect-video rounded-xl overflow-hidden shadow-md group/image"
                                >
                                  <img
                                    src={img}
                                    alt={`${event.title} - ${imgIndex + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                                  
                                  {/* More indicator */}
                                  {imgIndex === 2 && images.length > 3 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                      <span className="text-white font-semibold text-lg">+{images.length - 3}</span>
                                    </div>
                                  )}
                                </motion.button>
                              ))}
                            </div>
                          )}

                          {/* Single Image (legacy support) */}
                          {event.image && !event.images && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => openLightbox(event)}
                              className="mt-4 relative aspect-video rounded-xl overflow-hidden shadow-lg group/image block w-full"
                            >
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                  </motion.div>
                );
              })}
            </div>

            {/* End of Timeline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute left-4 md:left-1/2 bottom-0 translate-y-full -translate-x-1/2 pt-8"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] border-4 border-white shadow-lg flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </motion.div>
          </div>

          {/* End Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-24"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#8b5cf6]/10 to-[#a78bfa]/10 backdrop-blur-sm border border-[#8b5cf6]/20 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] font-heading text-xl font-bold">
                Basta Aristotle
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium">Forever</span>
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </motion.div>

            <p className="mt-6 text-gray-500 max-w-md mx-auto">
              "The best things in life are the people we love, the places we've been, and the memories we've made along the way."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Custom Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section */}
              <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                <div className="relative max-w-4xl max-h-[70vh] lg:max-h-[85vh]">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    src={getEventImages(currentEvent)[currentImageIndex]}
                    alt={currentEvent.title}
                    className="max-w-full max-h-[70vh] lg:max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  />

                  {/* Navigation Arrows */}
                  {getEventImages(currentEvent).length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  {getEventImages(currentEvent).length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white text-sm font-medium">
                      {currentImageIndex + 1} / {getEventImages(currentEvent).length}
                    </div>
                  )}
                </div>
              </div>

              {/* Info Panel */}
              <div className="lg:w-80 p-4 lg:p-6 bg-white/5 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white text-sm font-semibold">
                    {currentEvent.month}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{currentEvent.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{currentEvent.description}</p>

                {currentEvent.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{currentEvent.location}</span>
                  </div>
                )}

                {/* Thumbnail Grid */}
                {getEventImages(currentEvent).length > 1 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-3">All Photos</p>
                    <div className="grid grid-cols-4 gap-2">
                      {getEventImages(currentEvent).map((img, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                            idx === currentImageIndex ? 'border-[#8b5cf6]' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${currentEvent.title} - ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
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
