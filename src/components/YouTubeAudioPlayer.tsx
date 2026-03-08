import React, { useState, useRef, useEffect } from 'react';
import { AudioWave } from './AudioWave';

interface YouTubeAudioPlayerProps {
  videoUrl: string;
  songTitle?: string;
}

export const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({ 
  videoUrl,
  songTitle 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/v\/|youtube\.com\/watch\?.*v=)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const videoId = getVideoId(videoUrl);

  const togglePlay = () => {
    if (!iframeRef.current || !videoId) return;
    
    const iframe = iframeRef.current;
    const message = isPlaying 
      ? '{"event":"command","func":"pauseVideo","args":""}'
      : '{"event":"command","func":"playVideo","args":""}';
    
    iframe.contentWindow?.postMessage(message, '*');
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Listen for player state changes
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.event === 'onReady') {
        setIsReady(true);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!videoId) {
    return <div className="text-red-500 text-xs">Invalid YouTube URL</div>;
  }

  return (
    <div className="youtube-player-wrapper">
      {/* Hidden YouTube iframe for audio playback */}
      <div className="iframe-container" style={{ display: 'none' }}>
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          title="YouTube Audio Player"
        />
      </div>
      
      <AudioWave 
        audioUrl={videoUrl}
        isPlaying={isPlaying}
        onToggle={togglePlay}
        songTitle={songTitle}
      />

      <style jsx>{`
        .youtube-player-wrapper {
          width: 100%;
        }
        .iframe-container {
          position: absolute;
          left: -9999px;
        }
      `}</style>
    </div>
  );
};
