import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Household', path: '/household' },
  { label: 'Goals',     path: '/goals' },
  { label: 'Scenarios', path: '/scenarios' },
  { label: 'Sequencing',path: '/sequencing' },
  { label: 'History',   path: '/history' },
];

export default function TopNav({ householdTotal = 2800000 }) {
  const location = useLocation();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      height: '60px',
      borderBottom: '1px solid hsl(28 10% 16% / 0.7)',
      background: 'hsl(28 15% 7% / 0.95)',
      backdropFilter: 'blur(8px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
        <img
          src="https://media.base44.com/images/public/6a2aeae97467619d42bebb47/55f911c3d_image.png"
          alt="Parallax"
          style={{ height: '56px', width: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: '180px', justifyContent: 'flex-end' }}>
        <span style={{
          fontSize: '12px', letterSpacing: '0.08em',
          color: 'hsl(38 15% 42%)', fontFamily: 'Inter, sans-serif',
          textTransform: 'uppercase',
        }}>
          Complete
        </span>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px', borderRadius: '3px',
          background: 'hsl(28 12% 14%)',
          border: '1px solid hsl(38 30% 32% / 0.6)',
          cursor: 'pointer',
          fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'hsl(38 45% 60%)', fontFamily: 'Inter, sans-serif', fontWeight: 600,
        }}>
          <span style={{ fontSize: '8px' }}>▶</span>
          Run
        </button>
      </div>
    </div>
  );
}