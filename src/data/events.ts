// Event Albums data for Aristotle Class 2025-2026

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  featured?: boolean;
  category: 'award' | 'performance' | 'classroom' | 'celebration';
}

export const events: Event[] = [
  {
    id: 'gawad-pagkilala',
    title: 'Gawad Pagkilala 2025',
    date: 'September 22, 2025',
    description: 'Grade 11-HUMSS Aristotle received the Certificate of Recognition for having the Best Classroom Structuring during the First Quarter of Gawad Pagkilala 2025-2026. A proud moment for all Aristonians!',
    images: [
      '/images/events/1000168916.jpg',
    ],
    featured: true,
    category: 'award',
  },
  {
    id: 'cultural-dance',
    title: 'Cultural Dance Performance',
    date: 'August 2025',
    description: 'The Aristonians showcased their talent and cultural pride through a mesmerizing traditional dance performance. Dressed in vibrant costumes, they represented the rich heritage of the Philippines.',
    images: [
      '/images/events/1000168918.jpg',
    ],
    featured: true,
    category: 'performance',
  },
  {
    id: 'class-photo',
    title: 'Class Photo Day',
    date: 'November 2025',
    description: 'A sweet moment captured! The whole class enjoying ice cream together - because nothing brings people together like good food and great company. Basta Aristotle!',
    images: [
      '/images/events/1000168935.jpg',
    ],
    featured: true,
    category: 'celebration',
  },
  {
    id: 'classroom-moments',
    title: 'Classroom Moments',
    date: 'Various 2025-2026',
    description: 'Candid moments from our daily classroom life - from group studies to fun times with friends. These are the memories that make school life special.',
    images: [
      '/images/events/1000168933.jpg',
      '/images/events/1000168934.jpg',
      '/images/events/1000168932.jpg',
      '/images/events/1000168917.jpg',
    ],
    featured: false,
    category: 'classroom',
  },
  {
    id: 'recognition-day',
    title: 'Recognition Day',
    date: 'November 14, 2025',
    description: 'Celebrating academic excellence! Our classmates received certificates and medals for their outstanding performance. Proud moments for students, parents, and teachers alike.',
    images: [
      '/images/events/1000168919.jpg',
      '/images/events/1000168920.jpg',
      '/images/events/1000168922.jpg',
      '/images/events/1000168923.jpg',
      '/images/events/1000168924.jpg',
      '/images/events/1000168925.jpg',
      '/images/events/1000168926.jpg',
      '/images/events/1000168927.jpg',
      '/images/events/1000168928.jpg',
      '/images/events/1000168929.jpg',
      '/images/events/1000168930.jpg',
      '/images/events/1000168931.jpg',
    ],
    featured: true,
    category: 'award',
  },
];

export const getFeaturedEvents = (): Event[] => {
  return events.filter((event) => event.featured);
};

export const getEventById = (id: string): Event | undefined => {
  return events.find((event) => event.id === id);
};

export const getEventsByCategory = (category: Event['category']): Event[] => {
  return events.filter((event) => event.category === category);
};
