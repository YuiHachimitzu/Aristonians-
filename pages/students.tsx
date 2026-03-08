'use client';

import React, { useState } from 'react';
import { students, classInfo } from '../data';
import { StudentCard } from '../components/StudentCard';

export default function StudentsPage() {
  const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');

  const filteredStudents = students.filter(student => {
    if (filter === 'all') return true;
    return student.gender === filter;
  });

  return (
    <div className="students-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Meet Aristotle</h1>
          <p className="hero-subtitle">
            {classInfo.totalStudents} Students • {classInfo.femaleStudents} Female • {classInfo.maleStudents} Male
          </p>
          <div className="filter-tabs">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Students
            </button>
            <button 
              className={`filter-btn ${filter === 'female' ? 'active' : ''}`}
              onClick={() => setFilter('female')}
            >
              Female
            </button>
            <button 
              className={`filter-btn ${filter === 'male' ? 'active' : ''}`}
              onClick={() => setFilter('male')}
            >
              Male
            </button>
          </div>
        </div>
        <div className="hero-gradient" />
      </section>

      {/* Students Grid */}
      <section className="students-grid-section">
        <div className="students-grid">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .students-page {
          min-height: 100vh;
          background: #f9fafb;
        }
        
        .hero-section {
          position: relative;
          padding: 80px 24px;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow: hidden;
        }
        
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          margin: 0 0 16px 0;
          text-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .hero-subtitle {
          font-size: 1.125rem;
          color: rgba(255,255,255,0.9);
          margin-bottom: 32px;
        }
        
        .filter-tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          padding: 12px 24px;
          border-radius: 9999px;
          border: 2px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .filter-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }
        
        .filter-btn.active {
          background: white;
          color: #764ba2;
          border-color: white;
        }
        
        .students-grid-section {
          padding: 48px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .students-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 32px;
        }
        
        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .students-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
