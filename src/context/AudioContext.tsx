import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: string | null;
  currentTrackName: string | null;
  volume: number;
  playTrack: (trackId: string, trackName?: string) => void;
  stopTrack: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  playClickSound: () => void;
  playWhooshSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Local MP3 file paths - Place these files in /public/audio/
// Naming convention: [firstname]-[lastname].mp3 (lowercase, hyphenated)
const AUDIO_TRACKS: Record<string, string> = {
  // Adrian Fortin - Every Summertime by NIKI
  'every-summertime': '/audio/adrian-fortin-every-summertime.mp3',
  
  // Students - Add their MP3 files here
  'theme-aeron': '/audio/aeron-quinto.mp3',
  'theme-noah': '/audio/noah-deluna.mp3',
  'theme-brent': '/audio/brent-raven-ramos.mp3',
  'theme-hayden': '/audio/hayden-magsino.mp3',
  'theme-cody': '/audio/cody-ezekiel-cauad.mp3',
  'theme-jaren': '/audio/decena-jaren.mp3',
  'theme-tyrone': '/audio/tyrone-rogel.mp3',
  'theme-nicole': '/audio/nicole-batan.mp3',
  'theme-angel': '/audio/an-gel.mp3',
  'theme-ashleigh': '/audio/ashleigh-peregrin.mp3',
  'theme-alyssa': '/audio/alyssa-penaflor-zara.mp3',
  'theme-cayla': '/audio/cayla-bayla.mp3',
  'theme-jaymark': '/audio/jaymark-pondevida.mp3',
  'theme-johnmark': '/audio/johnmark-pondevida.mp3',
  'theme-denmark': '/audio/denmark.mp3',
  'theme-linzaye': '/audio/linzaye-hilary.mp3',
  'theme-amara': '/audio/amara-pamfilo.mp3',
  'theme-jenny': '/audio/jenny-moral.mp3',
  'theme-genemark': '/audio/genemark-generoso.mp3',
  'theme-micah-ella': '/audio/micah-ella-perin.mp3',
  'theme-micah-perlas': '/audio/micah-perlas.mp3',
  'theme-riell': '/audio/riell-shaenn-ariola-go.mp3',
  'theme-justin': '/audio/justin.mp3',
  'theme-jewelyn': '/audio/jewelyn-rodil.mp3',
  'theme-hanna': '/audio/hanna-jean-rio-moral.mp3',
  'theme-missy': '/audio/missy-fernandez.mp3',
  'theme-kenneth': '/audio/kenneth-venancio.mp3',
  'theme-jessa': '/audio/jessa-pizarra.mp3',
  'theme-alexis': '/audio/alexis-crispo.mp3',
};

// Micro-interaction sounds
const CLICK_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE';

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentTrackName, setCurrentTrackName] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize click sound
  useEffect(() => {
    clickAudioRef.current = new Audio(CLICK_SOUND);
    clickAudioRef.current.volume = 0.3;
  }, []);

  const playTrack = useCallback((trackId: string, trackName?: string) => {
    const audioUrl = AUDIO_TRACKS[trackId];
    if (!audioUrl) {
      console.log(`Audio track not found: ${trackId}`);
      return;
    }

    // Stop current track if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Create new audio element
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    // Handle errors (file not found, etc.)
    audioRef.current.onerror = () => {
      console.log(`Failed to load audio: ${audioUrl}`);
      setIsPlaying(false);
      setCurrentTrack(null);
      setCurrentTrackName(null);
    };

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setCurrentTrack(trackId);
      setCurrentTrackName(trackName || trackId);
    }).catch((error) => {
      console.log('Audio playback failed:', error);
      // Silently fail - file might not exist yet
    });
  }, [volume]);

  const stopTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
    setCurrentTrackName(null);
  }, []);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Audio playback failed:', error);
        });
      }
    }
  }, [isPlaying]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const playClickSound = useCallback(() => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  const playWhooshSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Ignore audio context errors
    }
  }, []);

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      currentTrack, 
      currentTrackName,
      volume, 
      playTrack, 
      stopTrack, 
      togglePlay, 
      setVolume,
      playClickSound,
      playWhooshSound,
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
