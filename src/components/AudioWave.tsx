import React from 'react';

interface AudioWaveProps {
  audioUrl?: string;
  isPlaying: boolean;
  onToggle: () => void;
  songTitle?: string;
}

export const AudioWave: React.FC<AudioWaveProps> = ({ 
  audioUrl, 
  isPlaying, 
  onToggle,
  songTitle 
}) => {
  if (!audioUrl) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="audio-wave-container"
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      <div className={`wave-bars ${isPlaying ? 'playing' : ''}`}>
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className="bar" 
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <div className="wave-info">
        <span className="wave-label">{isPlaying ? 'Playing' : 'Listen'}</span>
        {songTitle && <span className="song-title">{songTitle}</span>}
      </div>
      
      <style jsx>{`
        .audio-wave-container {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 12px;
          width: fit-content;
        }
        
        .audio-wave-container:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
        }
        
        .wave-bars {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 24px;
          padding-bottom: 4px;
        }
        
        .bar {
          width: 4px;
          background: linear-gradient(to top, #8b5cf6, #ec4899);
          border-radius: 2px;
          transition: all 0.3s ease;
          height: 6px;
        }
        
        .wave-bars.playing .bar {
          animation: sound-wave 0.8s ease-in-out infinite;
        }
        
        .bar:nth-child(1) { height: 10px; }
        .bar:nth-child(2) { height: 18px; }
        .bar:nth-child(3) { height: 14px; }
        .bar:nth-child(4) { height: 20px; }
        .bar:nth-child(5) { height: 12px; }
        
        @keyframes sound-wave {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1.3); }
        }
        
        .wave-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        
        .wave-label {
          font-size: 0.75rem;
          color: #8b5cf6;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .song-title {
          font-size: 0.65rem;
          color: #6b7280;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </button>
  );
};
