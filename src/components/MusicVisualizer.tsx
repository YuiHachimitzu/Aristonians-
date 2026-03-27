import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music, X } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function MusicVisualizer() {
  const { isPlaying, currentTrackName, togglePlay, stopTrack } = useAudio();
  const [bars, setBars] = useState<number[]>(Array(20).fill(0));

  // Generate animated bars
  useEffect(() => {
    if (!isPlaying) {
      setBars(Array(20).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 0.7 + 0.3));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Don't render if not playing
  if (!isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-card px-5 py-4 flex items-center gap-4 shadow-2xl border border-white/50 min-w-[320px]">
        {/* Spinning Disc */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full"
          >
            {/* Vinyl Record */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg overflow-hidden relative">
              {/* Grooves */}
              <div className="absolute inset-1.5 rounded-full border border-gray-700/50" />
              <div className="absolute inset-3 rounded-full border border-gray-700/50" />
              <div className="absolute inset-4 rounded-full border border-gray-700/50" />
              <div className="absolute inset-5 rounded-full border border-gray-700/50" />
              
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            </div>
          </motion.div>
          
          {/* Music icon badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8b5cf6] flex items-center justify-center shadow-md z-10">
            <Music className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        {/* Wave Visualization */}
        <div className="flex flex-col gap-2 flex-1 min-w-[140px]">
          {/* Track Name */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Now Playing</span>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"
            />
          </div>
          
          <p className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
            {currentTrackName || 'Unknown Track'}
          </p>
          
          {/* Animated Bars */}
          <div className="flex items-end gap-[3px] h-8">
            {bars.map((height, i) => (
              <motion.div
                key={i}
                animate={{ height: `${height * 100}%` }}
                transition={{ duration: 0.1 }}
                className="w-1.5 rounded-full bg-gradient-to-t from-[#8b5cf6] to-[#d4af37]"
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white shadow-lg hover:bg-[#7c3aed] transition-colors"
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={stopTrack}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
