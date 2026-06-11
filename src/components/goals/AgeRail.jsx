import React from 'react';
import { motion } from 'framer-motion';
import { LIFE_AREAS } from './GoalData';

const AGE_START = 55;
const AGE_END = 95;
const AREA_COLORS = {
  travel:      'hsl(38 55% 58%)',
  home:        'hsl(32 45% 52%)',
  family:      'hsl(45 40% 55%)',
  health:      'hsl(30 35% 50%)',
  giving:      'hsl(50 38% 52%)',
  work:        'hsl(35 30% 48%)',
  experiences: 'hsl(42 50% 55%)',
};

export default function AgeRail({ allGoals, selectedGoalId, onSelectGoal, currentAge = 58 }) {
  const totalAges = AGE_END - AGE_START;

  const ageToPercent = (age) => ((age - AGE_START) / totalAges) * 100;

  // Flatten all goals with area info
  const flatGoals = Object.entries(allGoals).flatMap(([areaId, goals]) =>
    goals.map(g => ({ ...g, areaId }))
  );

  // Group markers by position to avoid overlap
  const markers = flatGoals.map(goal => ({
    ...goal,
    leftPct: ageToPercent(goal.ageStart),
    widthPct: Math.max(0.8, ageToPercent(goal.ageEnd) - ageToPercent(goal.ageStart)),
    color: AREA_COLORS[goal.areaId] || 'hsl(38 50% 55%)',
  }));

  const currentAgePct = ageToPercent(currentAge);

  return (
    <div style={{
      width: '100%', padding: '10px 0 4px',
      borderTop: '1px solid hsl(28 10% 16% / 0.7)',
      position: 'relative',
    }}>
      {/* Age rail header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', marginBottom: '6px' }}>
        <span className="section-label">Age Rail</span>
        <span style={{ fontSize: '9px', color: 'hsl(38 15% 38%)', fontFamily: 'Courier Prime, monospace', letterSpacing: '0.06em' }}>
          ages {AGE_START}–{AGE_END}
        </span>
      </div>

      <div style={{ position: 'relative', margin: '0 12px' }}>
        {/* Track background */}
        <div style={{
          height: '38px', position: 'relative',
          background: 'hsl(28 10% 10%)',
          borderRadius: '2px',
          border: '1px solid hsl(28 10% 18% / 0.5)',
          overflow: 'hidden',
        }}>
          {/* Goal bars */}
          {markers.map((goal, i) => {
            const isSelected = goal.id === selectedGoalId;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                title={`${goal.name} · age ${goal.ageStart}–${goal.ageEnd}`}
                onClick={() => onSelectGoal(goal.id, goal.areaId)}
                style={{
                  position: 'absolute',
                  left: `${goal.leftPct}%`,
                  width: `${Math.max(goal.widthPct, 1.2)}%`,
                  top: '6px',
                  height: '8px',
                  borderRadius: '4px',
                  background: isSelected
                    ? goal.color
                    : `${goal.color.replace(')', ' / 0.45)')}`,
                  cursor: 'pointer',
                  border: isSelected ? `1px solid ${goal.color}` : '1px solid transparent',
                  boxShadow: isSelected ? `0 0 8px ${goal.color.replace(')', ' / 0.4)')}` : undefined,
                  transition: 'all 0.2s',
                  transformOrigin: 'left center',
                  zIndex: isSelected ? 2 : 1,
                }}
              />
            );
          })}

          {/* Goal name labels on hover / selected */}
          {markers.filter(g => g.id === selectedGoalId).map(goal => (
            <div key={goal.id + '-label'} style={{
              position: 'absolute',
              left: `${goal.leftPct}%`,
              top: '18px',
              fontSize: '8px',
              color: goal.color,
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              pointerEvents: 'none',
              zIndex: 3,
              textShadow: '0 1px 4px hsl(28 15% 6%)',
            }}>
              {goal.name}
            </div>
          ))}

          {/* Tick marks every 5 years */}
          {Array.from({ length: Math.floor(totalAges / 5) + 1 }, (_, i) => AGE_START + i * 5).map(age => {
            const pct = ageToPercent(age);
            const isMajor = age % 10 === 0;
            return (
              <div key={age} style={{
                position: 'absolute',
                left: `${pct}%`,
                bottom: 0,
                height: isMajor ? '6px' : '3px',
                width: '1px',
                background: `hsl(38 15% ${isMajor ? '32' : '22'}%)`,
                transform: 'translateX(-50%)',
              }} />
            );
          })}

          {/* Current age marker */}
          <div style={{
            position: 'absolute',
            left: `${currentAgePct}%`,
            top: 0, bottom: 0,
            width: '1px',
            background: 'hsl(38 55% 60% / 0.55)',
            transform: 'translateX(-50%)',
            zIndex: 4,
          }}>
            <div style={{
              position: 'absolute', top: '-2px', left: '50%', transform: 'translateX(-50%)',
              width: '4px', height: '4px', borderRadius: '50%',
              background: 'hsl(38 55% 62%)',
            }} />
          </div>
        </div>

        {/* Age labels */}
        <div style={{ position: 'relative', height: '18px', marginTop: '2px' }}>
          {Array.from({ length: Math.floor(totalAges / 5) + 1 }, (_, i) => AGE_START + i * 5)
            .filter(age => age % 10 === 0 || age === AGE_START || age === AGE_END)
            .map(age => {
              const pct = ageToPercent(age);
              const isCurrent = age === currentAge;
              return (
                <div key={age} style={{
                  position: 'absolute',
                  left: `${pct}%`,
                  transform: 'translateX(-50%)',
                  fontSize: '8.5px',
                  fontFamily: 'Courier Prime, monospace',
                  color: isCurrent ? 'hsl(38 50% 60%)' : 'hsl(38 12% 38%)',
                  letterSpacing: '0.04em',
                }}>
                  {age}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}