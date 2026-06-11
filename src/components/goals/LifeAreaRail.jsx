import React from 'react';
import { motion } from 'framer-motion';
import { LIFE_AREAS } from './GoalData';

export default function LifeAreaRail({ activeArea, onSelect, goalCounts }) {
  return (
    <div className="flex flex-col h-full py-6 px-4 gap-1">
      <div className="section-label mb-4 px-2">Life Areas</div>
      {LIFE_AREAS.map((area) => {
        const isActive = activeArea === area.id;
        const count = goalCounts[area.id] || 0;
        return (
          <motion.button
            key={area.id}
            onClick={() => onSelect(area.id)}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
            className="relative flex items-center justify-between w-full px-3 py-2.5 rounded-sm text-left group transition-all duration-200"
            style={{
              background: isActive ? 'hsl(28 14% 14%)' : 'transparent',
              borderLeft: isActive ? '1.5px solid hsl(38 50% 58% / 0.7)' : '1.5px solid transparent',
            }}
          >
            <div className="flex items-center gap-3">
              <span style={{
                fontSize: '10px',
                color: isActive ? 'hsl(38 55% 62%)' : 'hsl(38 18% 42%)',
                transition: 'color 0.2s',
              }}>
                {area.icon}
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.04em',
                color: isActive ? 'hsl(38 20% 82%)' : 'hsl(38 12% 52%)',
                transition: 'color 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}>
                {area.label}
              </span>
            </div>
            {count > 0 && (
              <span style={{
                fontSize: '9px',
                fontFamily: 'Courier Prime, monospace',
                color: isActive ? 'hsl(38 45% 55%)' : 'hsl(38 15% 38%)',
                letterSpacing: '0.05em',
              }}>
                {count}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-sm pointer-events-none"
                style={{ background: 'hsl(38 50% 58% / 0.04)' }}
              />
            )}
          </motion.button>
        );
      })}

      <div className="mt-auto pt-6 px-2 border-t border-border/30">
        <div className="section-label mb-3">Summary</div>
        {Object.entries(goalCounts).filter(([, v]) => v > 0).map(([areaId, count]) => {
          const area = LIFE_AREAS.find(a => a.id === areaId);
          return (
            <div key={areaId} className="flex items-center justify-between py-1">
              <span style={{ fontSize: '10px', color: 'hsl(38 12% 48%)', letterSpacing: '0.04em' }}>
                {area?.label}
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'Courier Prime, monospace', color: 'hsl(38 35% 50%)' }}>
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}