import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNav from '../components/goals/TopNav';
import LifeAreaRail from '../components/goals/LifeAreaRail';
import GoalCanvas from '../components/goals/GoalCanvas';
import GoalDrawer from '../components/goals/GoalDrawer';
import AgeRail from '../components/goals/AgeRail';
import { DEFAULT_GOALS, LIFE_AREAS } from '../components/goals/GoalData';

let nextId = 100;

export default function Goals() {
  const [activeArea, setActiveArea] = useState('travel');
  const [allGoals, setAllGoals] = useState(DEFAULT_GOALS);
  const [selectedGoalId, setSelectedGoalId] = useState('g1');
  const [highlightedField, setHighlightedField] = useState(null);
  const [savedGoalIds, setSavedGoalIds] = useState(new Set());
  const [justSaved, setJustSaved] = useState(false);

  const currentGoals = allGoals[activeArea] || [];
  const lifeArea = LIFE_AREAS.find(a => a.id === activeArea);
  const selectedGoal = currentGoals.find(g => g.id === selectedGoalId) || null;

  const goalCounts = Object.fromEntries(
    Object.entries(allGoals).map(([k, v]) => [k, v.length])
  );

  const handleSelectArea = useCallback((areaId) => {
    setActiveArea(areaId);
    const goals = allGoals[areaId] || [];
    setSelectedGoalId(goals.length > 0 ? goals[0].id : null);
    setHighlightedField(null);
  }, [allGoals]);

  const handleSelectGoal = useCallback((goalId) => {
    setSelectedGoalId(goalId);
    setHighlightedField(null);
  }, []);

  const handleAddGoal = useCallback(() => {
    const id = `new-${++nextId}`;
    const newGoal = {
      id, name: 'New Goal',
      ageStart: 65, ageEnd: 70,
      cadence: 'Annual', amount: 10000,
      inflation: true, notes: '',
    };
    setAllGoals(prev => ({
      ...prev,
      [activeArea]: [...(prev[activeArea] || []), newGoal],
    }));
    setSelectedGoalId(id);
    setHighlightedField(null);
  }, [activeArea]);

  const handleGoalChange = useCallback((updatedGoal) => {
    setAllGoals(prev => ({
      ...prev,
      [activeArea]: prev[activeArea].map(g => g.id === updatedGoal.id ? updatedGoal : g),
    }));
  }, [activeArea]);

  const handleSave = useCallback(() => {
    setSavedGoalIds(prev => new Set([...prev, selectedGoalId]));
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1400);
  }, [selectedGoalId]);

  const handleAddAnother = useCallback(() => {
    handleSave();
    handleAddGoal();
  }, [handleSave, handleAddGoal]);

  const handleAgeRailSelect = useCallback((goalId, areaId) => {
    setActiveArea(areaId);
    setSelectedGoalId(goalId);
    setHighlightedField(null);
  }, []);

  // Calculate total annual goal spend for active area
  const totalAnnual = currentGoals.reduce((sum, g) => {
    if (g.cadence === 'Annual') return sum + (g.amount || 0);
    if (g.cadence === 'Monthly') return sum + (g.amount || 0) * 12;
    return sum;
  }, 0);

  const totalOneTime = currentGoals.reduce((sum, g) => {
    if (g.cadence === 'One-time') return sum + (g.amount || 0);
    return sum;
  }, 0);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', overflow: 'hidden',
      background: 'radial-gradient(ellipse 140% 80% at 50% 0%, hsl(28 18% 10%) 0%, hsl(28 14% 6%) 70%)',
    }}>
      <TopNav />

      {/* Main content area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT RAIL — Life Areas */}
        <div style={{
          width: '176px', flexShrink: 0,
          borderRight: '1px solid hsl(28 10% 16% / 0.6)',
          background: 'hsl(28 14% 7% / 0.6)',
          overflow: 'hidden',
        }}>
          <LifeAreaRail
            activeArea={activeArea}
            onSelect={handleSelectArea}
            goalCounts={goalCounts}
          />
        </div>

        {/* CENTER — Goal canvas + summary strip */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

          {/* Canvas area */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

            {/* Background grid lines (decorative) */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.06 }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(38 20% 50%)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <GoalCanvas
                  lifeArea={lifeArea}
                  goals={currentGoals}
                  selectedGoalId={selectedGoalId}
                  onSelectGoal={handleSelectGoal}
                  onAddGoal={handleAddGoal}
                  highlightedField={highlightedField}
                  onHighlightField={setHighlightedField}
                  width={580}
                  height={520}
                />
              </motion.div>
            </AnimatePresence>

            {/* Area summary strip — top of canvas */}
            <div style={{
              position: 'absolute', top: '16px', left: '16px',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
              <div style={{
                fontSize: '22px', fontFamily: 'Cormorant Garamond, Georgia, serif',
                color: 'hsl(38 20% 80%)', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1,
              }}>
                {lifeArea?.label}
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                {totalAnnual > 0 && (
                  <div>
                    <span style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'hsl(38 15% 42%)', textTransform: 'uppercase' }}>Annual · </span>
                    <span style={{ fontSize: '11px', fontFamily: 'Courier Prime, monospace', color: 'hsl(38 40% 58%)' }}>
                      ${totalAnnual.toLocaleString()}
                    </span>
                  </div>
                )}
                {totalOneTime > 0 && (
                  <div>
                    <span style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'hsl(38 15% 42%)', textTransform: 'uppercase' }}>One-time · </span>
                    <span style={{ fontSize: '11px', fontFamily: 'Courier Prime, monospace', color: 'hsl(38 40% 58%)' }}>
                      ${totalOneTime.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Goal count */}
            <div style={{
              position: 'absolute', top: '16px', right: '16px',
              textAlign: 'right',
            }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(38 15% 38%)' }}>
                Goals
              </div>
              <div style={{ fontSize: '18px', fontFamily: 'Courier Prime, monospace', color: 'hsl(38 35% 52%)', lineHeight: 1.2 }}>
                {currentGoals.length}
              </div>
            </div>

            {/* Hint for input nodes */}
            {selectedGoalId && (
              <div style={{
                position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
                fontSize: '9px', color: 'hsl(38 12% 36%)', letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif', textAlign: 'center',
                pointerEvents: 'none',
              }}>
                Click a field node to highlight it in the drawer
              </div>
            )}

            {/* Save flash */}
            <AnimatePresence>
              {justSaved && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
                    padding: '6px 16px', borderRadius: '3px',
                    background: 'hsl(38 40% 20%)',
                    border: '1px solid hsl(38 45% 38%)',
                    fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'hsl(38 55% 68%)', fontFamily: 'Inter, sans-serif',
                    zIndex: 10,
                  }}
                >
                  Saved
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Age Rail — bottom of center */}
          <div style={{ flexShrink: 0, borderTop: '1px solid hsl(28 10% 15% / 0.5)' }}>
            <AgeRail
              allGoals={allGoals}
              selectedGoalId={selectedGoalId}
              onSelectGoal={handleAgeRailSelect}
              currentAge={58}
            />
          </div>
        </div>

        {/* RIGHT RAIL — Goal Drawer */}
        <div style={{
          width: '256px', flexShrink: 0,
          borderLeft: '1px solid hsl(28 10% 16% / 0.6)',
          background: 'hsl(28 13% 8% / 0.7)',
          overflow: 'hidden', overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
        }}>
          <GoalDrawer
            goal={selectedGoal}
            lifeAreaId={activeArea}
            highlightedField={highlightedField}
            onChange={handleGoalChange}
            onSave={handleSave}
            onAddAnother={handleAddAnother}
            onClose={() => setSelectedGoalId(null)}
          />
        </div>
      </div>
    </div>
  );
}