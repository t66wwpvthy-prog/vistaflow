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
      padding: '0 28px', height: '60px',
      borderBottom: '1px solid rgba(244, 220, 178, 0.15)',
      background: 'rgba(27, 39, 49, 0.48)',
      backdropFilter: 'blur(22px) saturate(115%)',
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
        <img
          src="https://media.base44.com/images/public/6a2aeae97467619d42bebb47/55f911c3d_image.png"
          alt="Parallax"
          style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.1) contrast(1.1)' }}
        />
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '36px', height: '100%' }}>
        {NAV_ITEMS.map(item => {
          // Keep Goals active if on home route
          const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/goals');
          return (
            <Link key={item.path} to={item.path} style={{
              fontSize: '11px',
              letterSpacing: '0.16em',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: isActive ? '#F4E8D0' : 'rgba(174,183,189,0.72)',
              textDecoration: 'none',
              position: 'relative',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s',
            }}>
              {item.label}
              {isActive && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                  background: '#E8BD73',
                  boxShadow: '0 -2px 10px rgba(232, 189, 115, 0.6)'
                }} />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right side controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: '180px', justifyContent: 'flex-end' }}>
        <span style={{
          fontSize: '10px', letterSpacing: '0.12em',
          color: 'rgba(174,183,189,0.72)', fontFamily: 'Inter, sans-serif',
          textTransform: 'uppercase', fontWeight: 500
        }}>
          Complete
        </span>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '7px 18px', borderRadius: '16px',
          background: 'linear-gradient(135deg, #F7DDAA 0%, #E8BD73 100%)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 16px rgba(232, 189, 115, 0.3), inset 0 1px 1px rgba(255,255,255,0.7)',
          cursor: 'pointer',
          fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#4A3310', fontFamily: 'Inter, sans-serif', fontWeight: 700,
        }}>
          <span style={{ fontSize: '9px' }}>▶</span>
          Run
        </button>
      </div>
    </div>
  );
}