import React, { useState } from 'react';
import { YouTubeAudioPlayer } from './YouTubeAudioPlayer';
import { Student } from '../data';

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const [imageError, setImageError] = useState(false);
  
  const defaultImage = student.gender === 'female' 
    ? '/images/default-female.jpg' 
    : '/images/default-male.jpg';

  // Extract song title from known mappings or use generic
  const getSongTitle = (name: string): string | undefined => {
    const songs: Record<string, string> = {
      'Genemark Generoso': 'The Day - Crystal Castles',
      'Adrian Fortin': 'Climax of Every Summertime - Niki'
    };
    return songs[name];
  };

  return (
    <div className="student-card">
      <div className="student-image-wrapper">
        <img 
          src={!imageError ? (student.image || defaultImage) : defaultImage} 
          alt={student.name}
          className="student-image"
          onError={() => setImageError(true)}
        />
        <div className="image-overlay" />
      </div>
      
      <div className="student-content">
        <div className="student-header">
          <h3 className="student-name">{student.name}</h3>
          {student.nickname && (
            <span className="student-nickname">"{student.nickname}"</span>
          )}
        </div>
        
        <div className="motto-section">
          <span className="motto-label">Motto</span>
          <p className="student-motto">"{student.motto}"</p>
        </div>
        
        {student.audioUrl && (
          <YouTubeAudioPlayer 
            videoUrl={student.audioUrl}
            songTitle={getSongTitle(student.name)}
          />
        )}
        
        <p className="student-quote">{student.quote}</p>
      </div>

      <style jsx>{`
        .student-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .student-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .student-image-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .student-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .student-card:hover .student-image {
          transform: scale(1.1);
        }
        
        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .student-card:hover .image-overlay {
          opacity: 1;
        }
        
        .student-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .student-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .student-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .student-nickname {
          font-size: 0.875rem;
          color: #8b5cf6;
          font-style: italic;
        }
        
        .motto-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .motto-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9ca3af;
          font-weight: 600;
        }
        
        .student-motto {
          font-size: 0.95rem;
          color: #4b5563;
          font-style: italic;
          line-height: 1.5;
          margin: 0;
          position: relative;
          padding-left: 12px;
          border-left: 3px solid #8b5cf6;
        }
        
        .student-quote {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 8px 0 0 0;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};
