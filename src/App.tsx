import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import FloatingNav from './components/FloatingNav';
import MusicVisualizer from './components/MusicVisualizer';
import Home from './pages/Home';
import Events from './pages/Events';
import Timeline from './pages/Timeline';
import Recognition from './pages/Recognition';
import Videos from './pages/Videos';
import Footer from './components/Footer';
import { ProfileDrawerProvider } from './context/ProfileDrawerContext';
import { AudioProvider } from './context/AudioContext';
import ProfileDrawer from './components/ProfileDrawer';

// Lenis smooth scroll wrapper
function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Animation frame
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return <>{children}</>;
}

function AppContent() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#fafafa] text-gray-900">
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/recognition" element={<Recognition />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <FloatingNav />
        <MusicVisualizer />
        <ProfileDrawer />
      </div>
    </SmoothScroll>
  );
}

function App() {
  return (
    <AudioProvider>
      <ProfileDrawerProvider>
        <Router>
          <AppContent />
        </Router>
      </ProfileDrawerProvider>
    </AudioProvider>
  );
}

export default App;
