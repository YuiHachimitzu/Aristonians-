
export interface Student {
  id: string;
  name: string;
  gender: 'male' | 'female';
  motto: string;
  role?: string;
  image?: string;
  isDeveloper?: boolean;
  audioTrack?: string;
  audioTrackName?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  legacyMessage?: string;
  whiteBoxQuote?: {
    teaser: string;
    full: string;
  };
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Genemark Generoso',
    gender: 'male',
    motto: 'everyone is gonna die anyway, so live life to the fullest',
    role: 'cul guy',
    audioTrack: 'theme-genemark',
    audioTrackName: 'Genemark\'s Theme',
    legacyMessage: 'Give more than you take.',
    whiteBoxQuote: {
      teaser: 'in another life maybe-',
      full: "there's no another life, so live how you want to live—right here, right now.",
    },
  },
  {
    id: '2,
    name: 'Micah Ella Perin',
    gender: 'female',
    motto: 'if you never bleed you\'ll never gonna grow',
    role: 'the day time star',
    image: '/images/events/1000168922.jpg',
    audioTrack: 'theme-micah-ella',
    audioTrackName: 'High school in Jakarta - NIKI',
    legacyMessage: 'overr sa mwhehehehe',
  },
  {
    id: '3',
    name: 'Adrian Fortin',
    gender: 'male',
    motto: 'i eat bread for breakfast',
    role: 'bread',
    isDeveloper: true,
    image: '/images/events/adrian.jpg',
    audioTrack: 'every-summertime',
    audioTrackName: 'Stress relief x Harvey',
    legacyMessage: 'look at me now, look at me I\'ve e become a butterfly, playing, dancing at my own stage',
    socialLinks: {
      facebook: 'https://www.facebook.com/share/1BgD4u2TDA/',
    },
  },
];

export const getStudentById = (id: string): Student | undefined => {
  return students.find((student) => student.id === id);
};

export const getStudentsByGender = (gender: 'male' | 'female' | 'all'): Student[] => {
  if (gender === 'all') return students;
  return students.filter((student) => student.gender === gender);
};
