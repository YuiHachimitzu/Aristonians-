import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Camera, ChevronRight, Images } from 'lucide-react';
import { events } from '@/data/classData';
import Lightbox from '@/components/Lightbox';

interface HighlightRowProps {
  event: typeof events[0];
  index: number;
  onImageClick: () => void;
}

function HighlightRow({ event, index, onImageClick }: HighlightRowProps) {
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <motion.div
        className={`relative group ${isReversed ? 'lg:order-2' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
          onClick={onImageClick}
        >
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Click to view overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 rounded-full bg-white/90 text-gray-800 text-sm font-medium flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Click to view
            </span>
          </div>
        </div>

        {/* Decorative Element */}
        <div className={`absolute -z-10 w-full h-full rounded-2xl bg-gradient-to-br from-violet-200 to-purple-200 ${
          isReversed ? '-top-4 -right-4' : '-top-4 -left-4'
        }`} />
      </motion.div>

      {/* Content */}
      <div className={`${isReversed ? 'lg:order-1 lg:text-right' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Date Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            {event.date}
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {event.title}
          </h3>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {event.description}
          </p>

          <button
            onClick={onImageClick}
            className={`inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700 transition-colors ${
              isReversed ? 'flex-row-reverse' : ''
            }`}
          >
            {isReversed && <ChevronRight className="w-5 h-5 rotate-180" />}
            <span>View Photos</span>
            {!isReversed && <ChevronRight className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface AlbumCardProps {
  event: typeof events[0];
  index: number;
  onClick: () => void;
}

function AlbumCard({ event, index, onClick }: AlbumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Photo Count */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
            <Images className="w-3 h-3" />
            {event.images.length}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-white font-bold text-lg line-clamp-1">
              {event.title}
            </h4>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4" />
            {event.date}
          </p>
          <p className="text-gray-600 text-sm line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<typeof events[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const featuredEvents = events.filter(e => e.featured);
  const albumEvents = events.filter(e => !e.featured);

  const openLightbox = (event: typeof events[0], imageIndex = 0) => {
    setCurrentEvent(event);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentEvent(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentEvent) {
      setCurrentImageIndex((prev) =>
        prev === currentEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (currentEvent) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? currentEvent.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            Memories
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Event Albums
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Relive the moments that made our Grade 11 journey unforgettable
          </p>
        </motion.div>

        {/* Featured Events - Alternating Layout */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </span>
            Featured Events
          </motion.h2>

          <div className="space-y-16 lg:space-y-24">
            {featuredEvents.map((event, index) => (
              <HighlightRow
                key={event.id}
                event={event}
                index={index}
                onImageClick={() => openLightbox(event)}
              />
            ))}
          </div>
        </div>

        {/* Albums Grid */}
        {albumEvents.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                <Images className="w-4 h-4 text-white" />
              </span>
              More Albums
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albumEvents.map((event, index) => (
                <AlbumCard
                  key={event.id}
                  event={event}
                  index={index}
                  onClick={() => openLightbox(event)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {currentEvent && (
        <Lightbox
          images={currentEvent.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          title={currentEvent.title}
          description={currentEvent.description}
        />
      )}
    </div>
  );
}
