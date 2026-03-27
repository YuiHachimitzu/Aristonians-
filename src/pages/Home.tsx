import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import Faculty from '../sections/Faculty';
import StudentRoster from '../sections/StudentRoster';
import DeveloperCredits from '../sections/DeveloperCredits';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Faculty />
      <StudentRoster />
      <DeveloperCredits />
    </motion.main>
  );
}
