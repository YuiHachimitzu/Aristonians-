import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Student } from '../data/students';
import type { Teacher } from '../data/teachers';

export type ProfileType = 'student' | 'teacher';

export interface ProfileData {
  type: ProfileType;
  data: Student | Teacher;
}

interface ProfileDrawerContextType {
  isOpen: boolean;
  profile: ProfileData | null;
  openProfile: (profile: ProfileData) => void;
  closeProfile: () => void;
}

const ProfileDrawerContext = createContext<ProfileDrawerContextType | undefined>(undefined);

export function ProfileDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const openProfile = useCallback((profileData: ProfileData) => {
    setProfile(profileData);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProfile = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    // Delay clearing profile to allow exit animation
    setTimeout(() => setProfile(null), 300);
  }, []);

  return (
    <ProfileDrawerContext.Provider value={{ isOpen, profile, openProfile, closeProfile }}>
      {children}
    </ProfileDrawerContext.Provider>
  );
}

export function useProfileDrawer() {
  const context = useContext(ProfileDrawerContext);
  if (context === undefined) {
    throw new Error('useProfileDrawer must be used within a ProfileDrawerProvider');
  }
  return context;
}
