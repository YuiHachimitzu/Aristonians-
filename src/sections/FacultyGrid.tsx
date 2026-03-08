import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, BookOpen, Quote, User, Sparkles } from 'lucide-react';
import { teachers, subjects } from '@/data/classData';
import ProfileDrawer from '@/components/ProfileDrawer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const
    }
  }
};

interface ProfileCardProps {
  teacher: typeof teachers[0];
  isAdviser?: boolean;
  onClick: () => void;
}

function ProfileCard({ teacher, isAdviser = false, onClick }: ProfileCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group cursor-pointer ${isAdviser ? 'md:col-span-2 lg:col-span-1' : ''}`}
      onClick={onClick}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl ${
        isAdviser ? 'border-2 border-violet-400 ring-2 ring-violet-100' : ''
      }`}>
        {/* Image Container */}
        <div className={`relative overflow-hidden ${isAdviser ? 'h-80' : 'h-64'}`}>
          {teacher.image ? (
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-100 via-purple-50 to-violet-100 group-hover:from-violet-200 group-hover:via-purple-100 group-hover:to-violet-200 transition-colors duration-300 flex items-center justify-center">
              <User className="w-20 h-20 text-violet-300 transition-transform duration-300 group-hover:scale-110" />
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Role Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg transition-transform duration-300 group-hover:scale-105 ${
              isAdviser
                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                : 'bg-white/90 text-violet-700'
            }`}>
              {isAdviser ? (
                <>
                  <Crown className="w-3.5 h-3.5" />
                  Adviser
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  {teacher.subject}
                </>
              )}
            </span>
          </div>

          {/* Honorific Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-lg transition-transform duration-300 group-hover:scale-105 ${
              teacher.honorific === 'Sir'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
            }`}>
              {teacher.honorific}
            </span>
          </div>

          {/* Click Hint */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white/80 text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Click to view profile
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-violet-600 transition-colors duration-300">
            {teacher.name}
          </h3>
          
          {teacher.motto && (
            <div className="mt-3 flex items-start gap-2">
              <Quote className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 italic line-clamp-2">
                "{teacher.motto}"
              </p>
            </div>
          )}
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function FacultyGrid() {
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const adviser = teachers.find(t => t.role === 'Adviser');
  const subjectTeachers = teachers.filter(t => t.role === 'Subject Teacher');

  const openDrawer = (teacher: typeof teachers[0]) => {
    setSelectedTeacher(teacher);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedTeacher(null), 300);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
            <Crown className="w-4 h-4" />
            Our Mentors
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Faculty & Staff
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The dedicated educators who guided us through our Grade 11 journey
          </p>
          <p className="text-sm text-violet-600 mt-3">
            Click on any teacher to view their profile!
          </p>
        </motion.div>

        {/* Adviser Section */}
        {adviser && (
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </span>
              Class Adviser
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <ProfileCard 
                teacher={adviser} 
                isAdviser={true} 
                onClick={() => openDrawer(adviser)}
              />
            </motion.div>
          </div>
        )}

        {/* Subject Teachers Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
          >
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </span>
            Subject Teachers
          </motion.h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {subjectTeachers.map((teacher) => (
              <ProfileCard
                key={teacher.id}
                teacher={teacher}
                onClick={() => openDrawer(teacher)}
              />
            ))}
          </motion.div>
        </div>

        {/* Subjects List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border border-violet-100"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Subjects We Studied
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {subjects.map((subject, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-full bg-white text-violet-700 text-sm font-medium shadow-sm border border-violet-100 hover:shadow-md hover:border-violet-300 hover:scale-105 transition-all cursor-default"
              >
                {subject}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        profile={selectedTeacher}
        type="teacher"
      />
    </section>
  );
}
