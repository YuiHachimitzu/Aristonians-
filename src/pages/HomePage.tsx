import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Award, Calendar, Users } from 'lucide-react';
import Hero from '@/sections/Hero';
import FacultyGrid from '@/sections/FacultyGrid';
import StudentGrid from '@/sections/StudentGrid';
import DeveloperCredits from '@/sections/DeveloperCredits';
import { classInfo, events } from '@/data/classData';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredEvents = events.filter(e => e.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onScrollToContent={scrollToContent} />

      {/* Content Sections */}
      <div ref={contentRef}>
        {/* Welcome Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Welcome to Our Class
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {classInfo.name}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Welcome to our digital yearbook! This website is a collection of memories, 
                achievements, and moments from our Grade 11 journey at {classInfo.school}. 
                From classroom fun to recognition days, every moment here tells our story.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('events')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  View Events
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('recognition')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-violet-600 font-medium border-2 border-violet-200 hover:border-violet-400 transition-colors"
                >
                  <Award className="w-5 h-5" />
                  See Recognition
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-600 to-purple-700">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { label: 'Students', value: classInfo.totalStudents, icon: Users },
                { label: 'Female', value: classInfo.femaleStudents, icon: Users },
                { label: 'Male', value: classInfo.maleStudents, icon: Users },
                { label: 'Subjects', value: '9+', icon: Calendar }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-white/60 mx-auto mb-3" />
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Events Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  Featured Events
                </h2>
                <p className="text-gray-600">
                  Some of our most memorable moments
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('events')}
                className="inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700 transition-colors"
              >
                View All Events
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => setCurrentPage('events')}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
                          <Calendar className="w-3 h-3" />
                          {event.date}
                        </span>
                        <h3 className="text-white font-bold text-lg line-clamp-2">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <FacultyGrid />

        {/* Student Roster */}
        <StudentGrid />

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Explore More Memories
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Discover all the events, recognition moments, and our complete journey 
                through the school year.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('events')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-violet-600 font-medium hover:bg-gray-100 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  Event Albums
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('recognition')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition-colors"
                >
                  <Award className="w-5 h-5" />
                  Recognition
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('timeline')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Timeline
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Developer Credits */}
        <DeveloperCredits />

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">ARISTOTLE</h3>
                <p className="text-gray-400">
                  {classInfo.name}<br />
                  {classInfo.school}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <button 
                      onClick={() => setCurrentPage('home')}
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setCurrentPage('events')}
                      className="hover:text-white transition-colors"
                    >
                      Event Albums
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setCurrentPage('recognition')}
                      className="hover:text-white transition-colors"
                    >
                      Recognition
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setCurrentPage('timeline')}
                      className="hover:text-white transition-colors"
                    >
                      Timeline
                    </button>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Class Info</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>School Year: {classInfo.schoolYear}</li>
                  <li>Adviser: {classInfo.adviser}</li>
                  <li>Students: {classInfo.totalStudents}</li>
                  <li>Strand: {classInfo.strand}</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-800 text-center">
              <p className="text-2xl font-bold gradient-text mb-2">
                "{classInfo.tagline}"
              </p>
              <p className="text-gray-500 text-sm">
                Made with love for the Aristotle Family
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
