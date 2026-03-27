// Teacher and Adviser data for Aristotle Class 2025-2026

export interface Teacher {
  id: string;
  name: string;
  title: 'Sir' | "Ma'am";
  subject: string;
  role: 'Adviser' | 'Subject Teacher';
  motto: string;
  image?: string;
}

export const teachers: Teacher[] = [
  {
    id: 'adviser-1',
    name: 'Fatima V. Gonzales',
    title: "Ma'am",
    subject: 'Adviser',
    role: 'Adviser',
    motto: 'Guiding future leaders.',
    image: '/images/events/1000168916.jpg',
  },
  {
    id: 'teacher-1',
    name: '[Teacher Name]',
    title: 'Sir',
    subject: 'Mathematics',
    role: 'Subject Teacher',
    motto: 'Numbers tell stories.',
  },
  {
    id: 'teacher-2',
    name: '[Teacher Name]',
    title: "Ma'am",
    subject: 'Filipino',
    role: 'Subject Teacher',
    motto: 'Wika ay susi ng pagkakaisa.',
  },
  {
    id: 'teacher-3',
    name: '[Teacher Name]',
    title: "Ma'am",
    subject: 'PE',
    role: 'Subject Teacher',
    motto: 'Health is wealth.',
  },
  {
    id: 'teacher-4',
    name: '[Teacher Name]',
    title: "Ma'am",
    subject: 'Creative Writing',
    role: 'Subject Teacher',
    motto: 'Words create worlds.',
  },
  {
    id: 'teacher-5',
    name: '[Teacher Name]',
    title: 'Sir',
    subject: 'PR1',
    role: 'Subject Teacher',
    motto: 'Research is discovery.',
  },
  {
    id: 'teacher-6',
    name: '[Teacher Name]',
    title: "Ma'am",
    subject: 'DIASS',
    role: 'Subject Teacher',
    motto: 'Discipline leads to success.',
  },
  {
    id: 'teacher-7',
    name: '[Teacher Name]',
    title: 'Sir',
    subject: 'Impotech',
    role: 'Subject Teacher',
    motto: 'Technology empowers.',
  },
  {
    id: 'teacher-8',
    name: '[Teacher Name]',
    title: "Ma'am",
    subject: '21st Century',
    role: 'Subject Teacher',
    motto: 'Skills for the future.',
  },
  {
    id: 'teacher-9',
    name: '[Teacher Name]',
    title: "Ma'am",
    subject: 'UCSP',
    role: 'Subject Teacher',
    motto: 'Understanding cultures.',
  },
];

export const getAdviser = (): Teacher | undefined => {
  return teachers.find((teacher) => teacher.role === 'Adviser');
};

export const getSubjectTeachers = (): Teacher[] => {
  return teachers.filter((teacher) => teacher.role === 'Subject Teacher');
};

export const getTeacherById = (id: string): Teacher | undefined => {
  return teachers.find((teacher) => teacher.id === id);
};
