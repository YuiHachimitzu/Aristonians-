import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Heart, Sparkles, Star, Trophy } from 'lucide-react';
import { timeline, classInfo } from '@/data/classData';

const getIcon = (title: string) => {
  if (title.includes('Award')) return Trophy;
  if (title.includes('Recognition')) return Star;
  if (title.includes('Festival')) return Sparkles;
  if (title.includes('First Day')) return GraduationCap;
  if (title.includes('End')) return Heart;
  return Calendar;
};

const getColor = (index: number) => {
  const colors = [
    'from-violet-500 to-purple-600',
    'from-pink-500 to-rose-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
    'from-yellow-500 to-orange-600',
    'from-red-500 to-pink-600',
    'from-indigo-500 to-violet-600'
  ];
  return colors[index % colors.length];
};

interface TimelineItemProps {
  item: typeof timeline[0];
  index: number;
  isLast: boolean;
}

function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const Icon = getIcon(item.title);
  const gradient = getColor(index);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className={`${isEven ? 'text-right pr-12' : 'col-start-2 pl-12'}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`relative p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow ${
              isEven ? 'ml-auto' : ''
            }`}
            style={{ maxWidth: '400px' }}
          >
            {/* Date Badge */}
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white text-sm font-medium mb-4`}>
              <Calendar className="w-4 h-4" />
              {item.date}
            </span>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {item.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>

            {/* Arrow */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 ${
              isEven ? '-right-2' : '-left-2'
            }`} />
          </motion.div>
        </div>

        {/* Center Line & Icon */}
        <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center ${
          isEven ? '' : 'col-start-1 row-start-1'
        }`}>
          {/* Line */}
          {!isLast && (
            <div className="absolute top-16 bottom-0 w-0.5 bg-gradient-to-b from-violet-300 to-purple-300" />
          )}

          {/* Icon Circle */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
            className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Right Side (Empty for even items) */}
        <div className={isEven ? '' : 'col-start-1 row-start-1'} />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex gap-4">
        {/* Line & Icon */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          {!isLast && (
            <div className="flex-1 w-0.5 bg-gradient-to-b from-violet-300 to-purple-300 my-2" />
          )}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 pb-8"
        >
          <div className="p-5 rounded-xl bg-white shadow-md">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-medium mb-3`}>
              <Calendar className="w-3 h-3" />
              {item.date}
            </span>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Our Journey
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Timeline
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A walk through our unforgettable {classInfo.schoolYear} school year
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 via-purple-200 to-pink-200" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-0">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </div>

        {/* End Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Forever Aristotle</span>
            <Heart className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
