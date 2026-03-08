import { motion } from 'framer-motion';
import { Code, Heart, Sparkles, Github, Instagram, Facebook, Quote, Star } from 'lucide-react';
import { developer } from '@/data/classData';

export default function DeveloperCredits() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-violet-950 to-purple-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-4 h-4" />
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium mb-4 border border-white/10"
          >
            <Code className="w-4 h-4" />
            Developer Credits
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Crafted with <span className="text-pink-400">Love</span>
          </h2>
          <p className="text-white/60 text-lg">
            This digital yearbook was lovingly created by
          </p>
        </motion.div>

        {/* Developer Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30" />
          
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-50" />
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src={developer.image}
                    alt={developer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shadow-lg"
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {developer.name}
                  </h3>
                  <p className="text-violet-300 font-medium mb-4">
                    {developer.role}
                  </p>

                  {/* Motto */}
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-pink-500/20 border border-violet-400/30 mb-6">
                    <Quote className="w-5 h-5 text-violet-400" />
                    <p className="text-white font-medium italic">
                      "{developer.motto}"
                    </p>
                  </div>

                  <p className="text-white/60 mb-6">
                    {developer.quote}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <motion.a
                      href={developer.socials.github}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.a
                      href={developer.socials.instagram}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.a
                      href={developer.socials.facebook}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
            <span className="text-white/80">
              Made with love for the Aristotle Family
            </span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm mb-4">Built with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs font-medium border border-white/10"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
