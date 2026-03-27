// Timeline data for Aristotle Class 2025-2026

export interface TimelineEvent {
  id: string;
  date: string;
  month: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  location?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: 'June 2025',
    month: 'June',
    title: 'First Day of School',
    description: 'The beginning of an incredible journey. New faces, new friends, and the start of something special. Grade 11 Aristotle was formed!',
  },
  {
    id: '2',
    date: 'July 2025',
    month: 'July',
    title: 'Class Officers Election',
    description: 'Leadership emerged as we elected our class officers, ready to guide us through the academic year.',
  },
  {
    id: '3',
    date: 'August 2025',
    month: 'August',
    title: 'Buwan ng Wika Celebration',
    description: 'We celebrated Filipino language and culture with performances, presentations, and the iconic cultural dance.',
    image: '/images/events/1000168918.jpg',
  },
  {
    id: '4',
    date: 'September 22, 2025',
    month: 'September',
    title: 'Gawad Pagkilala',
    description: 'Proud moment! Grade 11-HUMSS Aristotle received recognition for Best Classroom Structuring.',
    image: '/images/events/1000168916.jpg',
  },
  {
    id: '5',
    date: 'October 2025',
    month: 'October',
    title: 'United Nations Day',
    description: 'Celebrating global unity and diversity. We represented different nations and learned about world cultures.',
  },
  {
    id: '6',
    date: 'November 14, 2025',
    month: 'November',
    title: 'Recognition Day',
    description: 'Honoring academic excellence. Many Aristonians received awards for their outstanding performance.',
    image: '/images/events/1000168919.jpg',
  },
  {
    id: '7',
    date: 'December 2025',
    month: 'December',
    title: 'Christmas Party',
    description: 'Gift-giving, games, and great food! We celebrated the holiday season together as one big family.',
  },
  {
    id: '8',
    date: 'January 2026',
    month: 'January',
    title: 'Second Semester Begins',
    description: 'New semester, new challenges. We returned refreshed and ready to conquer the second half of the year.',
  },
  {
    id: '9',
    date: 'February 2026',
    month: 'February',
    title: 'Friendship Day',
    description: 'Celebrating the bonds we\'ve formed. Cards, flowers, and appreciation for our friends.',
  },
  {
    id: '10',
    date: 'March 2026',
    month: 'March',
    title: 'Final Days',
    description: 'As the school year comes to a close, we cherish every last moment together. Basta Aristotle, always!',
    image: '/images/events/1000168935.jpg',
  },
];
