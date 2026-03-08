// ============================================
// ARISTOTLE CLASS DATA - 2025-2026
// Grade 11-HUMSS Aristotle
// San Isidro National High School
// ============================================

// --------------------------------------------
// ADVISER & TEACHERS
// --------------------------------------------

export interface Teacher {
  id: string;
  name: string;
  role: 'Adviser' | 'Subject Teacher';
  subject?: string;
  honorific: 'Sir' | 'Ma\'am';
  image?: string;
  motto?: string;
  quote?: string;
}

export const teachers: Teacher[] = [
  {
    id: 'adviser-1',
    name: 'Mrs. Fatima V. Gonzales',
    role: 'Adviser',
    honorific: 'Ma\'am',
    image: '/images/1000168388.jpg',
    motto: 'Guiding hearts, shaping futures.',
    quote: 'Every student is a star waiting to shine.'
  },
  {
    id: 'teacher-1',
    name: 'Sir [Math Teacher]',
    role: 'Subject Teacher',
    subject: 'General Mathematics',
    honorific: 'Sir',
    motto: 'Numbers never lie.',
    quote: 'Mathematics is the language of the universe.'
  },
  {
    id: 'teacher-2',
    name: 'Ma\'am [Creative Writing]',
    role: 'Subject Teacher',
    subject: 'Creative Writing',
    honorific: 'Ma\'am',
    motto: 'Words have power.',
    quote: 'Write what you know, dream what you don\'t.'
  },
  {
    id: 'teacher-3',
    name: 'Ma\'am [Filipino]',
    role: 'Subject Teacher',
    subject: 'Filipino',
    honorific: 'Ma\'am',
    motto: 'Ang wika ay kayamanan.',
    quote: 'Ang hindi marunong lumingon sa pinanggalingan...'
  }
];

export const subjects = [
  'Creative Writing',
  'PR1 (Philippine Regional Literature)',
  'DIASS (Disciplines and Ideas in Applied Social Sciences)',
  'Impotech (Empowerment Technologies)',
  'General Mathematics',
  '21st Century Literature',
  'UCSP (Understanding Culture, Society, and Politics)',
  'Filipino',
  'PE (Physical Education)'
];

// --------------------------------------------
// STUDENTS - 40 Total (18 Female, 22 Male)
// Real names provided by the class
// --------------------------------------------

export interface Student {
  id: string;
  name: string;
  gender: 'female' | 'male';
  image?: string;
  motto?: string;
  quote?: string;
  nickname?: string;
}

// Real students from Aristotle class
export const students: Student[] = [
  // Female Students (18)
  { 
    id: 'f-1', 
    name: 'Nicole Batan', 
    gender: 'female', 
    motto: 'Stay positive, work hard, make it happen.',
    quote: 'Basta Aristotle!' 
  },
  { 
    id: 'f-2', 
    name: 'AN Gel', 
    gender: 'female', 
    motto: 'Shine bright like a diamond.',
    quote: 'Living my best life!' 
  },
  { 
    id: 'f-3', 
    name: 'Ashleigh Peregrin', 
    gender: 'female', 
    motto: 'Be the change you wish to see.',
    quote: 'Making memories with Aristotle.' 
  },
  { 
    id: 'f-4', 
    name: 'Alyssa Penaflor Zara', 
    gender: 'female', 
    motto: 'Dream without fear, love without limits.',
    quote: 'Class of 2025-2026!' 
  },
  { 
    id: 'f-5', 
    name: 'Cayla Bayla', 
    gender: 'female', 
    motto: 'Good vibes only.',
    quote: 'Forever Aristonian.' 
  },
  { 
    id: 'f-6', 
    name: 'Linzaye Hilary', 
    gender: 'female', 
    motto: 'With Honors mindset.',
    quote: 'HUMSS Aristotle pride!' 
  },
  { 
    id: 'f-7', 
    name: 'Amara Pamfilo', 
    gender: 'female', 
    motto: 'Perfect attendance, perfect effort.',
    quote: 'Learning never stops.' 
  },
  { 
    id: 'f-8', 
    name: 'Jenny Moral', 
    gender: 'female', 
    motto: 'Excellence is not a skill, it\'s an attitude.',
    quote: 'Together we rise.' 
  },
  { 
    id: 'f-9', 
    name: 'Micah Ella Perin', 
    gender: 'female', 
    motto: 'Believe you can and you\'re halfway there.',
    quote: 'Grateful for this journey.' 
  },
  { 
    id: 'f-10', 
    name: 'Micah Perlas', 
    gender: 'female', 
    motto: 'High Honors, higher goals.',
    quote: 'Aristotle forever!' 
  },
  { 
    id: 'f-11', 
    name: 'Riell Shaenn Ariola Go', 
    gender: 'female', 
    motto: 'Create your own sunshine.',
    quote: 'Cherishing every moment.' 
  },
  { 
    id: 'f-12', 
    name: 'Jewelyn Rodil', 
    gender: 'female', 
    motto: 'Stay strong, make them wonder.',
    quote: 'Best class ever!' 
  },
  { 
    id: 'f-13', 
    name: 'Hanna Jean Rio Moral', 
    gender: 'female', 
    motto: 'With Honors, with heart.',
    quote: 'Grade 11 memories.' 
  },
  { 
    id: 'f-14', 
    name: 'Missy Fernandez', 
    gender: 'female', 
    motto: 'Be yourself, everyone else is taken.',
    quote: 'SINHS Aristotle!' 
  },
  { 
    id: 'f-15', 
    name: 'Student 15', 
    gender: 'female', 
    motto: 'Placeholder motto.',
    quote: 'Friends for life.' 
  },
  { 
    id: 'f-16', 
    name: 'Student 16', 
    gender: 'female', 
    motto: 'Placeholder motto.',
    quote: 'Thank you, Aristotle!' 
  },
  { 
    id: 'f-17', 
    name: 'Student 17', 
    gender: 'female', 
    motto: 'Placeholder motto.',
    quote: 'Unforgettable year.' 
  },
  { 
    id: 'f-18', 
    name: 'Student 18', 
    gender: 'female', 
    motto: 'Placeholder motto.',
    quote: 'Basta Aristotle, solid!' 
  },
  
  // Male Students (22)
  { 
    id: 'm-1', 
    name: 'Aeron Quinto', 
    gender: 'male', 
    motto: 'Aim high, fly higher.',
    quote: 'Basta Aristotle!' 
  },
  { 
    id: 'm-2', 
    name: 'Noah De Luna', 
    gender: 'male', 
    motto: 'The sky is not the limit.',
    quote: 'Living the dream.' 
  },
  { 
    id: 'm-3', 
    name: 'Brent Raven Ramos', 
    gender: 'male', 
    motto: 'Rise above the storm.',
    quote: 'Aristonian for life.' 
  },
  { 
    id: 'm-4', 
    name: 'Hayden Magsino', 
    gender: 'male', 
    motto: 'Stay hungry, stay foolish.',
    quote: 'HUMSS represent!' 
  },
  { 
    id: 'm-5', 
    name: 'Cody Ezekiel Cauad', 
    gender: 'male', 
    motto: 'Code your own destiny.',
    quote: 'Making history.' 
  },
  { 
    id: 'm-6', 
    name: 'Decena Jaren', 
    gender: 'male', 
    motto: 'Never back down.',
    quote: 'Grade 11 best year!' 
  },
  { 
    id: 'm-7', 
    name: 'Tyrone Rogel', 
    gender: 'male', 
    motto: 'Lead by example.',
    quote: 'Solid Aristotle.' 
  },
  { 
    id: 'm-8', 
    name: 'Jay Mark Latina Pondevida', 
    gender: 'male', 
    motto: 'Work hard in silence.',
    quote: 'Friends forever.' 
  },
  { 
    id: 'm-9', 
    name: 'John Mark Pondevida', 
    gender: 'male', 
    motto: 'Let success make the noise.',
    quote: 'SINHS pride!' 
  },
  { 
    id: 'm-10', 
    name: 'Denmark', 
    gender: 'male', 
    motto: 'Keep moving forward.',
    quote: 'Unstoppable together.' 
  },
  { 
    id: 'm-11', 
    name: 'Genemark Generoso', 
    gender: 'male', 
    motto: 'Generosity is the key.',
    quote: 'Aristotle strong!' 
  },
  { 
    id: 'm-12', 
    name: 'Adrian Fortin', 
    gender: 'male', 
    motto: 'i eat bread for breakfast',
    quote: 'Developer of this site!',
    image: '/images/adrian-fortin.jpg'
  },
  { 
    id: 'm-13', 
    name: 'AN Gel', 
    gender: 'male', 
    motto: 'Double the name, double the fun.',
    quote: 'Best class section!' 
  },
  { 
    id: 'm-14', 
    name: 'Justin', 
    gender: 'male', 
    motto: 'Just keep swimming.',
    quote: 'Thankful and blessed.' 
  },
  { 
    id: 'm-15', 
    name: 'Student 31', 
    gender: 'male', 
    motto: 'Placeholder motto.',
    quote: 'Aristotle family.' 
  },
  { 
    id: 'm-16', 
    name: 'Student 32', 
    gender: 'male', 
    motto: 'Placeholder motto.',
    quote: 'HUMSS Aristotle!' 
  },
  { 
    id: 'm-17', 
    name: 'Student 33', 
    gender: 'male', 
    motto: 'Placeholder motto.',
    quote: 'Forever grateful.' 
  },
  { 
    id: 'm-18', 
    name: 'Student 34', 
    gender: 'male', 
    motto: 'Placeholder motto.',
    quote: 'Class of champions!' 
  },
  { 
    id: 'm-19', 
    name: 'Student 35', 
    gender: 'male', 
    motto: 'Placeholder motto.',
    quote: 'Basta Aristotle!' 
  },
  { 
    id: 'm-20', 
    name: 'Student 36', 
    gender: 'male', 
    motto: 'Placeholder motto.',
    quote: 'Together we shine.' 
  },
  { 
    id: 'm-21', 
    name: 'Student 37', 
    gender: 'male', 
    motto: 'Placeholder motto.',
    quote: 'Aristotle legacy.' 
  },
  { 
    id: 'm-22', 
    name: 'Student 38', 
    gender: 'male', 
    motto: 'Placeholder motto.',
    quote: 'Until we meet again!' 
  }
];

// --------------------------------------------
// DEVELOPER CREDITS
// --------------------------------------------

export const developer = {
  name: 'Adrian Fortin',
  role: 'Lead Developer & Designer',
  motto: 'i eat bread for breakfast',
  image: '/images/adrian-fortin.jpg',
  quote: 'Created with love for the Aristotle family.',
  socials: {
    github: '#',
    instagram: '#',
    facebook: '#'
  }
};

// --------------------------------------------
// EVENTS & ALBUMS
// --------------------------------------------

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  featured?: boolean;
  thumbnail: string;
}

export const events: Event[] = [
  {
    id: 'class-recognition',
    title: 'Best Classroom Structuring Award',
    description: 'Grade 11-HUMSS Aristotle received the Certificate of Recognition for having the Best Classroom Structuring during the First Quarter of Gawad Pagkilala 2025-2026. A testament to our unity and dedication!',
    date: 'September 22, 2025',
    thumbnail: '/images/1000168353.jpg',
    images: ['/images/1000168353.jpg'],
    featured: true
  },
  {
    id: 'cultural-festival',
    title: 'Cultural Festival Performance',
    description: 'Aristotle class showcased our rich Filipino heritage through traditional costumes and dances. A beautiful celebration of our culture and traditions!',
    date: '2025-2026 School Year',
    thumbnail: '/images/1000168364.jpg',
    images: ['/images/1000168364.jpg'],
    featured: true
  },
  {
    id: 'class-bonding',
    title: 'Classroom Moments',
    description: 'Fun times, laughter, and memories created inside our classroom. From group photos to candid shots, these moments define our Aristotle journey.',
    date: '2025-2026 School Year',
    thumbnail: '/images/1000168395.jpg',
    images: [
      '/images/1000168395.jpg',
      '/images/1000168390.jpg',
      '/images/1000168392.jpg'
    ],
    featured: true
  },
  {
    id: 'clean-up-drive',
    title: 'Class Clean-Up Activity',
    description: 'Working together to keep our classroom clean and organized. Teamwork makes the dream work!',
    date: '2025-2026 School Year',
    thumbnail: '/images/1000168361.jpg',
    images: ['/images/1000168361.jpg']
  },
  {
    id: 'recognition-day',
    title: 'Recognition Day',
    description: 'Celebrating the achievements of our fellow Aristonians. From academic honors to perfect attendance, we are proud of each and every one!',
    date: '2025-2026 School Year',
    thumbnail: '/images/1000168372.jpg',
    images: [
      '/images/1000168370.jpg',
      '/images/1000168372.jpg',
      '/images/1000168374.jpg',
      '/images/1000168376.jpg',
      '/images/1000168378.jpg',
      '/images/1000168379.jpg',
      '/images/1000168381.jpg',
      '/images/1000168382.jpg',
      '/images/1000168383.jpg',
      '/images/1000168384.jpg',
      '/images/1000168385.jpg',
      '/images/1000168386.jpg',
      '/images/1000168387.jpg'
    ]
  }
];

// --------------------------------------------
// RECOGNITIONS
// --------------------------------------------

export interface Recognition {
  id: string;
  studentName: string;
  award: string;
  image: string;
  date: string;
  description?: string;
}

export const recognitions: Recognition[] = [
  {
    id: 'rec-1',
    studentName: 'Micah Perlas',
    award: 'With High Honors & Perfect Attendance',
    image: '/images/1000168372.jpg',
    date: '2025-2026',
    description: 'Excellence in academics and dedication to attendance'
  },
  {
    id: 'rec-2',
    studentName: 'Linzaye Hilary',
    award: 'With Honors',
    image: '/images/1000168370.jpg',
    date: '2025-2026',
    description: 'Outstanding academic performance'
  },
  {
    id: 'rec-3',
    studentName: 'Hanna Jean Rio Moral',
    award: 'With Honors',
    image: '/images/1000168378.jpg',
    date: '2025-2026',
    description: 'Academic excellence achieved'
  },
  {
    id: 'rec-4',
    studentName: 'Jenny Moral',
    award: 'With Honors',
    image: '/images/1000168383.jpg',
    date: '2025-2026',
    description: 'Recognized for academic achievement'
  },
  {
    id: 'rec-5',
    studentName: 'Kenneth Venancio',
    award: 'Perfect Attendance',
    image: '/images/1000168381.jpg',
    date: '2025-2026',
    description: 'Never missed a day of school'
  },
  {
    id: 'rec-6',
    studentName: 'Jessa Pizarra',
    award: 'Perfect Attendance',
    image: '/images/1000168385.jpg',
    date: '2025-2026',
    description: 'Consistent attendance throughout the year'
  },
  {
    id: 'rec-7',
    studentName: 'Amara Pamfilo',
    award: 'Perfect Attendance',
    image: '/images/1000168386.jpg',
    date: '2025-2026',
    description: 'Dedicated to showing up every day'
  },
  {
    id: 'rec-8',
    studentName: 'Alexis Ivan Crispo',
    award: 'Certificate of Recognition',
    image: '/images/1000168390.jpg',
    date: '2025-2026',
    description: 'Special recognition for outstanding performance'
  }
];

// --------------------------------------------
// TIMELINE
// --------------------------------------------

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  icon?: string;
}

export const timeline: TimelineItem[] = [
  {
    id: 'tl-1',
    title: 'First Day of School',
    date: 'August 2025',
    description: 'The beginning of our Grade 11 journey. New faces, new friends, new memories to create. Basta Aristotle!'
  },
  {
    id: 'tl-2',
    title: 'Best Classroom Structuring Award',
    date: 'September 22, 2025',
    description: 'Grade 11-HUMSS Aristotle was recognized for having the Best Classroom Structuring. Our first major achievement!'
  },
  {
    id: 'tl-3',
    title: 'First Quarter Recognition',
    date: 'November 2025',
    description: 'Celebrating academic achievements and perfect attendance. Proud of all our Aristonians!'
  },
  {
    id: 'tl-4',
    title: 'Cultural Festival',
    date: '2025-2026',
    description: 'Showcasing our Filipino heritage through traditional costumes and performances.'
  },
  {
    id: 'tl-5',
    title: 'Class Activities & Bonding',
    date: 'Throughout the Year',
    description: 'From clean-up drives to classroom fun, every moment spent together strengthened our bond.'
  },
  {
    id: 'tl-6',
    title: 'More Recognition Days',
    date: '2025-2026',
    description: 'Continuous celebration of academic excellence and student achievements.'
  },
  {
    id: 'tl-7',
    title: 'End of School Year',
    date: 'March 2026',
    description: 'The end of an unforgettable chapter. Forever Aristotle, forever family.'
  }
];

// --------------------------------------------
// VIDEOS (Placeholder for future)
// --------------------------------------------

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url?: string;
  description: string;
}

export const videos: Video[] = [
  {
    id: 'vid-1',
    title: 'Class Video Compilation',
    thumbnail: '/images/1000168395.jpg',
    description: 'A compilation of our best moments throughout the school year. (Video placeholder - add your video link here!)'
  },
  {
    id: 'vid-2',
    title: 'Cultural Performance',
    thumbnail: '/images/1000168364.jpg',
    description: 'Our traditional costume presentation. (Video placeholder - add your video link here!)'
  },
  {
    id: 'vid-3',
    title: 'Funny Moments',
    thumbnail: '/images/1000168392.jpg',
    description: 'The funniest and most memorable candid moments. (Video placeholder - add your video link here!)'
  }
];

// --------------------------------------------
// CLASS INFO
// --------------------------------------------

export const classInfo = {
  name: 'Grade 11-HUMSS Aristotle',
  school: 'San Isidro National High School',
  schoolYear: '2025-2026',
  adviser: 'Mrs. Fatima V. Gonzales',
  totalStudents: 40,
  femaleStudents: 18,
  maleStudents: 22,
  tagline: 'Basta Aristotle',
  section: 'Aristotle',
  strand: 'HUMSS (Humanities and Social Sciences)'
};

export default {
  teachers,
  students,
  events,
  recognitions,
  timeline,
  videos,
  classInfo,
  subjects,
  developer
};
