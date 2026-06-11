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

  const flatGoals = Object.entries(allGoals).flatMap(([areaId, goals]) =>
    goals.map(g => ({ ...g, areaId }))
  );

  const markers = flatGoals.map(goal => ({
    ...goal,
    leftPct: ageToPercent(goal.ageStart),
    widthPct: Math.max(0.8, ageToPercent(goal.ageEnd) - ageToPercent(goal.ageStart)),
    color: AREA_COLORS[goal.areaId] || 'hsl(38 50% 55%)',
  }));

  const currentAgePct = ageToPercent(currentAge);
  const selectedGoal = markers.find(g => g.id === selectedGoalId);

  return (
    <div style={{
      width: '100%',
      padding: '10px 0 8px',
      background: 'hsl(28 14% 7% / 0.85)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid hsl(38 20% 20% / 0.3)',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', marginBottom: '8px',
      }}>
        <span style={{
          fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'hsl(38 28% 40%)', fontFamily: 'Inter, sans-serif', fontWeight: 500,
        }}>
          Age Rail
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {selectedGoal && (
            <span style={{
              fontSize: '9px', letterSpacing: '0.06em',
              color: selectedGoal.color,
              fontFamily: 'Courier Prime, monospace',
              opacity: 0.85,
            }}>
              {selectedGoal.name} · {selectedGoal.ageStart === selectedGoal.ageEnd ? `age ${selectedGoal.ageStart}` : `${selectedGoal.ageStart}–${selectedGoal.ageEnd}`}
            </span>
          )}
          <span style={{
            fontSize: '9px', color: 'hsl(38 15% 34%)',
            fontFamily: 'Courier Prime, monospace', letterSpacing: '0.06em',
          }}>
            ages {AGE_START}–{AGE_END}
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', margin: '0 16px' }}>
        {/* Track */}
        <div style={{
          height: '44px', position: 'relative',
          background: 'linear-gradient(180deg, hsl(28 12% 9%) 0%, hsl(28 10% 8%) 100%)',
          borderRadius: '3px',
          border: '1px solid hsl(28 14% 16% / 0.8)',
          overflow: 'visible',
          boxShadow: 'inset 0 1px 3px hsl(28 15% 4% / 0.6), inset 0 -1px 0 hsl(38 15% 18% / 0.15)',
        }}>

          {/* Subtle inner glow strip */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '3px',
            background: 'linear-gradient(180deg, hsl(38 20% 20% / 0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          {/* "Active years" progress fill — from AGE_START to currentAge */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0, bottom: 0,
            width: `${currentAgePct}%`,
            background: 'linear-gradient(90deg, hsl(38 30% 16% / 0.5) 0%, hsl(38 40% 20% / 0.25) 100%)',
            borderRight: '1px solid hsl(38 45% 38% / 0.3)',
            borderRadius: '3px 0 0 3px',
            pointerEvents: 'none',
          }} />

          {/* Goal bars */}
          {markers.map((goal, i) => {
            const isSelected = goal.id === selectedGoalId;
            const barColor = goal.color;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.35, delay: i * 0.03, ease: 'easeOut' }}
                title={`${goal.name} · age ${goal.ageStart}–${goal.ageEnd}`}
                onClick={() => onSelectGoal(goal.id, goal.areaId)}
                style={{
                  position: 'absolute',
                  left: `${goal.leftPct}%`,
                  width: `${Math.max(goal.widthPct, 1.2)}%`,
                  top: isSelected ? '8px' : '11px',
                  height: isSelected ? '20px' : '14px',
                  borderRadius: isSelected ? '3px' : '2px',
                  background: isSelected
                    ? `linear-gradient(180deg, ${barColor.replace('hsl(', 'hsl(').replace(')', ' / 0.9)')} 0%, ${barColor.replace(')', ' / 0.65)')} 100%)`
                    : `${barColor.replace(')', ' / 0.28)')}`,
                  cursor: 'pointer',
                  border: isSelected
                    ? `1px solid ${barColor.replace(')', ' / 0.7)')}`
                    : `1px solid ${barColor.replace(')', ' / 0.18)')}`,
                  boxShadow: isSelected
                    ? `0 0 12px ${barColor.replace(')', ' / 0.35)')}, 0 2px 6px hsl(28 15% 4% / 0.5)`
                    : undefined,
                  transition: 'all 0.2s ease',
                  transformOrigin: 'left center',
                  zIndex: isSelected ? 4 : 1,
                }}
              />
            );
          })}

          {/* Tick marks */}
          {Array.from({ length: Math.floor(totalAges / 5) + 1 }, (_, i) => AGE_START + i * 5).map(age => {
            const pct = ageToPercent(age);
            const isMajor = age % 10 === 0;
            return (
              <div key={age} style={{
                position: 'absolute',
                left: `${pct}%`,
                bottom: 0,
                height: isMajor ? '7px' : '4px',
                width: '1px',
                background: `hsl(38 15% ${isMajor ? '28' : '18'}%)`,
                transform: 'translateX(-50%)',
                zIndex: 2,
              }} />
            );
          })}

          {/* Current age marker */}
          <div style={{
            position: 'absolute',
            left: `${currentAgePct}%`,
            top: '-5px',
            bottom: '-1px',
            width: '1.5px',
            background: 'linear-gradient(180deg, hsl(38 60% 65% / 0.9) 0%, hsl(38 50% 55% / 0.4) 100%)',
            transform: 'translateX(-50%)',
            zIndex: 5,
          }}>
            {/* Diamond top marker */}
            <div style={{
              position: 'absolute', top: '-4px', left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '6px', height: '6px',
              background: 'hsl(38 60% 65%)',
              boxShadow: '0 0 8px hsl(38 60% 65% / 0.7), 0 0 16px hsl(38 55% 58% / 0.3)',
            }} />
          </div>
        </div>

        {/* Age labels */}
        <div style={{ position: 'relative', height: '18px', marginTop: '3px' }}>
          {Array.from({ length: Math.floor(totalAges / 5) + 1 }, (_, i) => AGE_START + i * 5)
            .filter(age => age % 10 === 0 || age === AGE_START || age === AGE_END)
            .map(age => {
              const pct = ageToPercent(age);
              const isCurrent = Math.abs(age - currentAge) < 3;
              return (
                <div key={age} style={{
                  position: 'absolute',
                  left: `${pct}%`,
                  transform: 'translateX(-50%)',
                  fontSize: '8.5px',
                  fontFamily: 'Courier Prime, monospace',
                  color: isCurrent ? 'hsl(38 55% 58%)' : 'hsl(38 12% 34%)',
                  letterSpacing: '0.04em',
                  fontWeight: isCurrent ? 700 : 400,
                }}>
                  {age}
                </div>
              );
            })
          }

          {/* Current age label */}
          <div style={{
            position: 'absolute',
            left: `${currentAgePct}%`,
            transform: 'translateX(-50%)',
            fontSize: '8px',
            fontFamily: 'Inter, sans-serif',
            color: 'hsl(38 50% 58%)',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            top: '0px',
          }}>
            {currentAge}
          </div>
        </div>
      </div>
    </div>
  );
}