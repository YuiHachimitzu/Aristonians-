import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

const COLORS = [
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#f43f5e', // rose
  '#06b6d4', // cyan
  '#a855f7', // purple
];

export default function EasterEgg() {
  const [typedKeys, setTypedKeys] = useState('');
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const triggerConfetti = useCallback(() => {
    // Generate confetti pieces
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    setConfetti(pieces);
    setShowMessage(true);

    // Clear confetti after animation
    setTimeout(() => {
      setConfetti([]);
    }, 5000);

    // Hide message after animation
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      
      // Only track letter keys
      if (!/^[A-Z]$/.test(key)) return;

      setTypedKeys(prev => {
        const newKeys = (prev + key).slice(-9); // Keep last 9 characters
        
        // Check if "ARISTOTLE" was typed
        if (newKeys === 'ARISTOTLE') {
          triggerConfetti();
          return ''; // Reset after triggering
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerConfetti]);

  return (
    <>
      {/* Confetti Animation */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: piece.rotation,
              scale: piece.scale,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: piece.rotation + 720,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3 + Math.random() * 2,
              ease: 'easeOut',
            }}
            className="fixed z-[100] pointer-events-none"
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 px-8 py-6 rounded-3xl shadow-2xl text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Basta Aristotle!
              </h3>
              <p className="text-white/80">
                You found the secret code!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Hint (only shows when user starts typing A) */}
      {typedKeys.startsWith('A') && typedKeys.length < 9 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-4 right-4 z-50 text-xs text-gray-400 pointer-events-none"
        >
          Keep typing...
        </motion.div>
      )}
    </>
  );
}
