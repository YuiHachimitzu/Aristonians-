import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 bg-white border-t border-gray-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-accent text-lg font-bold gradient-gold">
              ARISTOTLE
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center">
            © 2025-2026 Grade 11 Aristotle | San Isidro National High School
          </p>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for the Aristonians</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
