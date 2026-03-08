import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, User, Search, GraduationCap, Heart, Sparkles } from 'lucide-react';
import { students, classInfo } from '@/data/classData';
import ProfileDrawer from '@/components/ProfileDrawer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const
    }
  }
};

interface StudentCardProps {
  student: typeof students[0];
  onClick: () => void;
}

function StudentCard({ student, onClick }: StudentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isAdrian = student.name === 'Adrian Fortin';

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl ${
        isAdrian ? 'ring-2 ring-violet-400 ring-offset-2' : ''
      }`}>
        {/* Image Container */}
        <div className="relative h-52 sm:h-60 overflow-hidden">
          {student.image ? (
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
              student.gender === 'female'
                ? 'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 group-hover:from-pink-200 group-hover:via-rose-100 group-hover:to-pink-200'
                : 'bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100 group-hover:from-blue-200 group-hover:via-cyan-100 group-hover:to-blue-200'
            }`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                student.gender === 'female'
                  ? 'bg-pink-200'
                  : 'bg-blue-200'
              }`}>
                <User className={`w-10 h-10 ${
                  student.gender === 'female'
                    ? 'text-pink-500'
                    : 'text-blue-500'
                }`} />
              </div>
            </div>
          )}

          {/* Gender Badge */}
          <div className="absolute top-3 right-3">
            <span className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
              student.gender === 'female'
                ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white'
                : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
            }`}>
              <Heart className="w-4 h-4" />
            </span>
          </div>

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/60 to-transparent flex items-end p-5"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                >
                  {student.motto && (
                    <p className="text-white/90 text-sm italic mb-2 line-clamp-2">
                      "{student.motto}"
                    </p>
                  )}
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Click to view profile
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Adrian Special Badge */}
          {isAdrian && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Developer
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className={`text-lg font-bold transition-colors duration-300 group-hover:text-violet-600 ${
            isAdrian ? 'text-violet-700' : 'text-gray-800'
          }`}>
            {student.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize flex items-center gap-2 mt-1">
            <span className={`w-2 h-2 rounded-full ${
              student.gender === 'female' ? 'bg-pink-400' : 'bg-blue-400'
            }`} />
            {student.gender === 'female' ? 'She/Her' : 'He/Him'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StudentGrid() {
  const [filter, setFilter] = useState<'all' | 'female' | 'male'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === 'all' || student.gender === filter;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const femaleCount = students.filter(s => s.gender === 'female').length;
  const maleCount = students.filter(s => s.gender === 'male').length;

  const openDrawer = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedStudent(null), 300);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Our Class
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            The Aristonians
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the {classInfo.totalStudents} amazing students of Grade 11-HUMSS Aristotle
          </p>
          <p className="text-sm text-violet-600 mt-3">
            Click on any student to view their profile!
          </p>
        </motion.div>

        {/* Stats & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              All Students ({classInfo.totalStudents})
            </button>
            <button
              onClick={() => setFilter('female')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === 'female'
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className="w-4 h-4" />
              Female ({femaleCount})
            </button>
            <button
              onClick={() => setFilter('male')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === 'male'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className="w-4 h-4" />
              Male ({maleCount})
            </button>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
            />
          </div>
        </motion.div>

        {/* Student Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onClick={() => openDrawer(student)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No students found matching your search.</p>
          </motion.div>
        )}

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl sm:text-3xl font-bold gradient-text">
            "{classInfo.tagline}"
          </p>
          <p className="text-gray-500 mt-2">
            — The Aristotle Family
          </p>
        </motion.div>
      </div>

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        profile={selectedStudent}
        type="student"
      />
    </section>
  );
}
