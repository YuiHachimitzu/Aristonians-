import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Medal, Crown } from 'lucide-react';
import { recognitions, events } from '@/data/classData';
import Lightbox from '@/components/Lightbox';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const
    }
  }
};

interface RecognitionCardProps {
  recognition: typeof recognitions[0];
  onClick: () => void;
}

function RecognitionCard({ recognition, onClick }: RecognitionCardProps) {
  const getIcon = (award: string) => {
    if (award.includes('High Honors')) return Crown;
    if (award.includes('Honors')) return Star;
    if (award.includes('Attendance')) return Medal;
    return Trophy;
  };

  const getColor = (award: string) => {
    if (award.includes('High Honors')) return 'from-yellow-400 to-orange-500';
    if (award.includes('Honors')) return 'from-violet-400 to-purple-500';
    if (award.includes('Attendance')) return 'from-green-400 to-emerald-500';
    return 'from-blue-400 to-cyan-500';
  };

  const Icon = getIcon(recognition.award);
  const gradient = getColor(recognition.award);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={recognition.image}
            alt={recognition.studentName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Award Badge */}
          <div className="absolute top-4 right-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Student Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-white font-bold text-xl mb-1">
              {recognition.studentName}
            </h3>
            <p className="text-white/80 text-sm">
              {recognition.date}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white text-sm font-medium mb-3`}>
            <Icon className="w-4 h-4" />
            {recognition.award}
          </div>
          {recognition.description && (
            <p className="text-gray-600 text-sm">
              {recognition.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function RecognitionPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get class award image
  const classAward = events.find(e => e.id === 'class-recognition');
  const allImages = [
    ...(classAward ? [classAward.thumbnail] : []),
    ...recognitions.map(r => r.image)
  ];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Achievements
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Recognition
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating the excellence and achievements of our Aristotle family
          </p>
        </motion.div>

        {/* Class Award Section */}
        {classAward && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </span>
              Class Achievement
            </h2>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-2xl bg-white shadow-xl cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={classAward.thumbnail}
                    alt={classAward.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:bg-gradient-to-l" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium w-fit mb-4">
                    <Crown className="w-4 h-4" />
                    Best Classroom Structuring
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {classAward.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {classAward.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Gawad Pagkilala 2025-2026
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Individual Recognitions */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
          >
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </span>
            Student Achievements
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recognitions.map((recognition, index) => (
              <RecognitionCard
                key={recognition.id}
                recognition={recognition}
                onClick={() => openLightbox(classAward ? index + 1 : index)}
              />
            ))}
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border border-violet-100">
            <Trophy className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              "Success is the sum of small efforts, repeated day in and day out."
            </p>
            <p className="text-gray-500">
              — Robert Collier
            </p>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={allImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
}
