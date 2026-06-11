import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INPUT_NODES } from './GoalData';

const GOAL_ORBIT_POSITIONS = [
  { angle: -75,  r: 165 },
  { angle:   0,  r: 172 },
  { angle:  75,  r: 162 },
  { angle: 148,  r: 168 },
  { angle: 220,  r: 162 },
];

const INPUT_ORBIT_POSITIONS = [
  { angle: -105, r: 95 },
  { angle:  -52, r: 102 },
  { angle:    5, r: 96 },
  { angle:   60, r: 102 },
  { angle:  115, r: 95 },
  { angle:  168, r: 102 },
  { angle:  224, r: 90 },
  { angle:  278, r: 95 },
];

const toXY = (angle, r, cx, cy) => {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

// Spring presets
const SPRING_SOFT = { type: 'spring', stiffness: 220, damping: 22, mass: 0.8 };
const SPRING_BLOOM = { type: 'spring', stiffness: 260, damping: 20, mass: 0.6 };

function ConnectionLine({ x1, y1, x2, y2, active, dim }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={active ? 'hsl(38 50% 58% / 0.55)' : 'hsl(38 20% 35% / 0.22)'}
      strokeWidth={active ? 1 : 0.8}
      strokeDasharray={dim ? '3 4' : undefined}
    />
  );
}

function GoalNode({ goal, pos, isSelected, onClick, isNew, index }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ ...SPRING_SOFT, delay: index * 0.04 }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Ambient ripple ring — only when selected, animates in */}
      <AnimatePresence>
        {isSelected && (
          <motion.circle
            cx={pos.x} cy={pos.y} r={46}
            fill="none"
            stroke="hsl(38 50% 58% / 0.06)"
            strokeWidth={14}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ ...SPRING_BLOOM }}
          />
        )}
      </AnimatePresence>

      {/* Main circle */}
      <motion.circle
        cx={pos.x} cy={pos.y} r={36}
        fill={isSelected ? 'hsl(28 14% 13%)' : 'hsl(28 12% 10%)'}
        stroke={isSelected ? 'hsl(38 50% 58% / 0.65)' : 'hsl(38 18% 28% / 0.5)'}
        strokeWidth={isSelected ? 1.5 : 0.8}
        animate={{
          filter: isSelected
            ? 'drop-shadow(0 0 14px hsl(38 50% 58% / 0.28))'
            : 'drop-shadow(0 0 0px hsl(38 50% 58% / 0))',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Inner glow ring when selected */}
      <AnimatePresence>
        {isSelected && (
          <motion.circle
            cx={pos.x} cy={pos.y} r={39}
            fill="none"
            stroke="hsl(38 50% 58% / 0.12)"
            strokeWidth={5}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ ...SPRING_BLOOM, delay: 0.05 }}
          />
        )}
      </AnimatePresence>

      <foreignObject x={pos.x - 34} y={pos.y - 20} width={68} height={40} style={{ pointerEvents: 'none' }}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{
          textAlign: 'center', fontSize: '9.5px', fontWeight: 500,
          color: isSelected ? 'hsl(38 65% 72%)' : 'hsl(38 18% 68%)',
          lineHeight: '1.3', fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.01em',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100%', padding: '0 2px',
          wordBreak: 'break-word',
          transition: 'color 0.3s ease',
        }}>
          {isNew ? <span style={{ color: 'hsl(38 50% 58%)' }}>+ New Goal</span> : goal.name}
        </div>
      </foreignObject>

      {goal && goal.ageStart && !isNew && (
        <text
          x={pos.x} y={pos.y + 30}
          textAnchor="middle" fontSize="7.5"
          fill="hsl(38 20% 42%)"
          fontFamily="Courier Prime, monospace"
        >
          {goal.ageStart === goal.ageEnd ? `age ${goal.ageStart}` : `${goal.ageStart}–${goal.ageEnd}`}
        </text>
      )}
    </motion.g>
  );
}

function InputNode({ node, pos, isHighlighted, onClick, index, originX, originY }) {
  const locked = node.locked;

  // Each node blooms outward from the parent goal position
  const dx = pos.x - originX;
  const dy = pos.y - originY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const initX = -(dx / dist) * 28;
  const initY = -(dy / dist) * 28;

  return (
    <motion.g
      initial={{ opacity: 0, x: initX, y: initY, scale: 0.55 }}
      animate={{ opacity: locked ? 0.38 : 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: initX * 0.5, y: initY * 0.5, scale: 0.7 }}
      transition={{ ...SPRING_BLOOM, delay: index * 0.035 }}
    >
      <motion.rect
        x={pos.x - 28} y={pos.y - 11} width={56} height={22} rx={11}
        fill={isHighlighted ? 'hsl(38 30% 18%)' : 'hsl(28 10% 13%)'}
        stroke={isHighlighted ? 'hsl(38 50% 55% / 0.7)' : locked ? 'hsl(38 15% 25% / 0.4)' : 'hsl(38 20% 28% / 0.5)'}
        strokeWidth={isHighlighted ? 1 : 0.75}
        strokeDasharray={locked ? '3 3' : undefined}
        animate={{
          filter: isHighlighted
            ? 'drop-shadow(0 0 7px hsl(38 50% 55% / 0.25))'
            : 'drop-shadow(0 0 0px hsl(38 50% 55% / 0))',
        }}
        transition={{ duration: 0.3 }}
        style={{ cursor: locked ? 'default' : 'pointer' }}
        onClick={!locked ? onClick : undefined}
      />
      {locked && (
        <text x={pos.x - 16} y={pos.y + 4} fontSize="7" fill="hsl(38 20% 38%)" fontFamily="Inter, sans-serif">⬡</text>
      )}
      <text
        x={locked ? pos.x - 4 : pos.x} y={pos.y + 4}
        textAnchor="middle" fontSize="8.5"
        fill={isHighlighted ? 'hsl(38 60% 68%)' : locked ? 'hsl(38 15% 40%)' : 'hsl(38 15% 58%)'}
        fontFamily="Inter, sans-serif"
        fontWeight={isHighlighted ? 600 : 400}
        style={{ pointerEvents: 'none', letterSpacing: '0.02em' }}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

export default function GoalCanvas({
  lifeArea,
  goals,
  selectedGoalId,
  onSelectGoal,
  onAddGoal,
  highlightedField,
  onHighlightField,
  width = 580,
  height = 450,
}) {
  const cx = width / 2;
  const cy = height / 2 + 60;

  const visibleGoals = goals.slice(0, 5);
  const selectedGoal = goals.find(g => g.id === selectedGoalId);
  const showInputNodes = !!selectedGoalId;
  const selectedGoalPos = selectedGoalId
    ? GOAL_ORBIT_POSITIONS.slice(0, visibleGoals.length)
        .map((p, i) => ({ pos: toXY(p.angle, p.r, cx, cy), goal: visibleGoals[i] }))
        .find(({ goal }) => goal?.id === selectedGoalId)?.pos
    : null;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="rootGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(38 50% 58%)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(38 50% 58%)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(38 50% 58%)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="hsl(38 50% 58%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={200} fill="url(#centerGlow)" />

      {/* Root → goal connection lines */}
      {visibleGoals.map((goal, i) => {
        const pos = toXY(GOAL_ORBIT_POSITIONS[i].angle, GOAL_ORBIT_POSITIONS[i].r, cx, cy);
        return (
          <ConnectionLine key={goal.id + '-line'}
            x1={cx} y1={cy} x2={pos.x} y2={pos.y}
            active={goal.id === selectedGoalId}
          />
        );
      })}

      {/* Selected goal → input node connection lines */}
      <AnimatePresence>
        {showInputNodes && selectedGoalPos && INPUT_ORBIT_POSITIONS.map((ip, i) => {
          const ipos = toXY(ip.angle, ip.r, selectedGoalPos.x, selectedGoalPos.y);
          const node = INPUT_NODES[i];
          return (
            <motion.line key={node.id + '-iline'}
              x1={selectedGoalPos.x} y1={selectedGoalPos.y}
              x2={ipos.x} y2={ipos.y}
              stroke={node.locked ? 'hsl(38 15% 28% / 0.18)' : 'hsl(38 35% 45% / 0.28)'}
              strokeWidth={0.7}
              strokeDasharray={node.locked ? '2 4' : undefined}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              exit={{ opacity: 0, pathLength: 0 }}
              transition={{ duration: 0.35, delay: i * 0.025, ease: 'easeOut' }}
            />
          );
        })}
      </AnimatePresence>

      {/* Root node */}
      <circle cx={cx} cy={cy} r={72} fill="url(#rootGlow)" />
      <circle cx={cx} cy={cy} r={80} fill="none" stroke="hsl(38 30% 30% / 0.08)" strokeWidth={12} />
      <circle cx={cx} cy={cy} r={46}
        fill="hsl(28 14% 11%)"
        stroke="hsl(38 50% 58% / 0.5)"
        strokeWidth={1.5}
        style={{ filter: 'drop-shadow(0 0 20px hsl(38 50% 58% / 0.16))' }}
      />
      <circle cx={cx} cy={cy} r={50} fill="none" stroke="hsl(38 50% 58% / 0.09)" strokeWidth={6} />
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="12" fill="hsl(38 55% 64%)"
        fontFamily="Cormorant Garamond, Georgia, serif" fontWeight={500}>
        {lifeArea?.icon || '✦'}
      </text>
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize="8.5" fill="hsl(38 18% 58%)"
        fontFamily="Inter, sans-serif" letterSpacing="0.14em">
        {lifeArea?.label?.toUpperCase() || ''}
      </text>

      {/* Goal nodes */}
      {visibleGoals.map((goal, i) => {
        const pos = toXY(GOAL_ORBIT_POSITIONS[i].angle, GOAL_ORBIT_POSITIONS[i].r, cx, cy);
        return (
          <GoalNode key={goal.id} goal={goal} pos={pos} index={i}
            isSelected={goal.id === selectedGoalId}
            onClick={() => onSelectGoal(goal.id)}
          />
        );
      })}

      {/* Add goal node */}
      {visibleGoals.length < 5 && (() => {
        const idx = visibleGoals.length;
        const pos = toXY(GOAL_ORBIT_POSITIONS[idx].angle, GOAL_ORBIT_POSITIONS[idx].r, cx, cy);
        return (
          <motion.g key="add-node"
            initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            style={{ cursor: 'pointer' }} onClick={onAddGoal}>
            <ConnectionLine x1={cx} y1={cy} x2={pos.x} y2={pos.y} active={false} dim />
            <circle cx={pos.x} cy={pos.y} r={26}
              fill="hsl(28 10% 10%)"
              stroke="hsl(38 30% 35% / 0.4)"
              strokeWidth={0.8}
              strokeDasharray="3 3"
            />
            <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="14"
              fill="hsl(38 40% 50%)" fontFamily="Inter, sans-serif">+</text>
          </motion.g>
        );
      })()}

      {/* Input nodes around selected goal */}
      <AnimatePresence>
        {showInputNodes && selectedGoalPos && INPUT_ORBIT_POSITIONS.map((ip, i) => {
          const node = INPUT_NODES[i];
          if (!node) return null;
          const ipos = toXY(ip.angle, ip.r, selectedGoalPos.x, selectedGoalPos.y);
          return (
            <InputNode key={node.id} node={node} pos={ipos} index={i}
              originX={selectedGoalPos.x} originY={selectedGoalPos.y}
              isHighlighted={highlightedField === node.id}
              onClick={() => onHighlightField(node.id === highlightedField ? null : node.id)}
              selectedGoal={selectedGoal}
            />
          );
        })}
      </AnimatePresence>
    </svg>
  );
}