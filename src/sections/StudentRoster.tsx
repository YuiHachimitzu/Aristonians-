import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import { students, getStudentsByGender } from '../data/students';
import { Users, User, Heart, Sparkles } from 'lucide-react';

type FilterType = 'all' | 'male' | 'female';

export default function StudentRoster() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredStudents = getStudentsByGender(filter);
  const maleCount = students.filter((s) => s.gender === 'male').length;
  const femaleCount = students.filter((s) => s.gender === 'female').length;

  const filters: { value: FilterType; label: string; count: number; icon: typeof User }[] = [
    { value: 'all', label: 'All', count: students.length, icon: Users },
    { value: 'male', label: 'Boys', count: maleCount, icon: User },
    { value: 'female', label: 'Girls', count: femaleCount, icon: Heart },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-40 right-20 w-48 h-48 bg-[#8b5cf6]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-[#d4af37]/5 rounded-full blur-3xl" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-sm text-[#8b5cf6] font-medium">The Aristonians</span>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            Meet the <span className="text-[#8b5cf6]">Family</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            40 amazing souls, one incredible journey. Each one unique, together unstoppable.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`relative px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filter === f.value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {filter === f.value && (
                <motion.div
                  layoutId="activeStudentFilter"
                  className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <f.icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">
                {f.label} ({f.count})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Student Grid */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
              >
                <ProfileCard
                  profile={student}
                  type="student"
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="text-gray-600">
              One class, one family, forever <span className="text-[#d4af37] font-semibold">Aristotle</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
