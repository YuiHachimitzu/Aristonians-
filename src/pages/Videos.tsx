import { motion } from 'framer-motion';
import { Video, Film, Play, Clock, Sparkles, Upload, Heart } from 'lucide-react';

export default function Videos() {

  // Placeholder videos - in production, these would be actual video embeds
  const videos = [
    {
      id: '1',
      title: 'Cultural Dance Performance',
      description: 'The Aristonians showcasing their talent in traditional Filipino dance.',
      duration: '5:32',
      thumbnail: '/images/events/1000168918.jpg',
      views: '1.2K',
    },
    {
      id: '2',
      title: 'Classroom Moments Compilation',
      description: 'Fun and memorable moments from our daily school life.',
      duration: '8:15',
      thumbnail: '/images/events/1000168933.jpg',
      views: '856',
    },
    {
      id: '3',
      title: 'Recognition Day Highlights',
      description: 'Celebrating academic excellence and achievements.',
      duration: '4:48',
      thumbnail: '/images/events/1000168919.jpg',
      views: '2.1K',
    },
    {
      id: '4',
      title: 'Christmas Party 2025',
      description: 'Gift-giving, games, and great times together.',
      duration: '12:20',
      thumbnail: '/images/events/1000168935.jpg',
      views: '1.5K',
    },
  ];

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
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#8b5cf6]/10 rounded-full blur-3xl" />

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 mb-6"
            >
              <Film className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-sm text-[#8b5cf6] font-medium">Video Memories</span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
              Relive the <span className="text-[#8b5cf6]">Moments</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Watch the laughter, the performances, and the joy that made our year unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 md:p-12 text-center border-2 border-dashed border-[#d4af37]/30 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37]" />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-10 -right-10 w-32 h-32 border-2 border-[#d4af37]/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-10 -left-10 w-24 h-24 border-2 border-[#8b5cf6]/10 rounded-full"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/20 mb-6">
                <Sparkles className="w-10 h-10 text-[#d4af37]" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Videos Coming Soon
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We're collecting and editing the best moments. Check back soon for amazing content!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-[#d4af37]">
                <Upload className="w-4 h-4" />
                <span>Have videos? Send them to Adrian!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Grid Preview */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <span className="text-gray-400 text-sm uppercase tracking-wider">Preview</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="glass-card overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="w-16 h-16 rounded-full bg-[#8b5cf6]/90 flex items-center justify-center backdrop-blur-sm shadow-xl border-2 border-white/20"
                      >
                        <Play className="w-7 h-7 text-white ml-1" />
                      </motion.div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 text-white text-sm font-medium flex items-center gap-1.5 backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5" />
                      {video.duration}
                    </div>

                    {/* Views */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                      {video.views} views
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8b5cf6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-[#8b5cf6]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#8b5cf6] transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-card shadow-lg border border-[#d4af37]/20">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span className="text-gray-700">
                <span className="text-[#d4af37] font-semibold">Basta Aristotle</span> — Share the memories
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
