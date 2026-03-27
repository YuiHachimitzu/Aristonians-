import { motion } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import { getAdviser, getSubjectTeachers } from '../data/teachers';
import { Sparkles, BookOpen, GraduationCap } from 'lucide-react';

export default function Faculty() {
  const adviser = getAdviser();
  const subjectTeachers = getSubjectTeachers();

  return (
    <section className="section-padding bg-gradient-to-b from-white/50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#8b5cf6]/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-6"
          >
            <GraduationCap className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm text-[#d4af37] font-medium">Our Mentors</span>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            Meet Our <span className="gradient-gold">Guiding Stars</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            The incredible educators who shaped our journey and inspired us to reach for the stars.
          </p>
        </motion.div>

        {/* Adviser Section - Premium Design */}
        {adviser && (
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] text-sm uppercase tracking-widest font-semibold">
                Class Adviser
              </span>
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </motion.div>

            <ProfileCard profile={adviser} type="teacher" index={0} isAdviser={true} />
          </div>
        )}

        {/* Subject Teachers Grid */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#8b5cf6]" />
            <BookOpen className="w-5 h-5 text-[#8b5cf6]" />
            <span className="text-[#8b5cf6] text-sm uppercase tracking-widest font-semibold">
              Subject Teachers
            </span>
            <BookOpen className="w-5 h-5 text-[#8b5cf6]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#8b5cf6]" />
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
            {subjectTeachers.map((teacher, index) => (
              <ProfileCard
                key={teacher.id}
                profile={teacher}
                type="teacher"
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
