import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GoalEditPopup({ goal, pos, svgRef, onSave, onClose }) {
  const [name, setName] = useState(goal?.name || '');
  const [notes, setNotes] = useState(goal?.notes || '');
  const nameRef = useRef(null);

  useEffect(() => {
    setName(goal?.name || '');
    setNotes(goal?.notes || '');
    setTimeout(() => nameRef.current?.focus(), 80);
  }, [goal?.id]);

  if (!goal || !pos) return null;

  const svgRect = svgRef?.current?.getBoundingClientRect() || { left: 0, top: 0 };
  const rawLeft = svgRect.left + pos.x + 48;
  const rawTop = svgRect.top + pos.y - 70;
  const left = Math.min(rawLeft, window.innerWidth - 248);
  const top = Math.max(rawTop, 64);

  const handleSave = () => {
    onSave({ ...goal, name, notes });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        key={goal.id}
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{
          position: 'fixed',
          left,
          top,
          zIndex: 200,
          width: '220px',
          background: 'hsl(28 14% 11%)',
          border: '1px solid hsl(38 35% 30% / 0.7)',
          borderRadius: '6px',
          boxShadow: '0 8px 32px hsl(28 15% 4% / 0.7), 0 0 0 1px hsl(38 30% 20% / 0.3)',
          padding: '14px',
        }}
        onKeyDown={handleKeyDown}
      >
        <div style={{
          fontSize: '8.5px', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'hsl(38 30% 42%)', marginBottom: '10px', fontFamily: 'Inter, sans-serif',
        }}>
          Edit Goal
        </div>

        <div style={{ marginBottom: '10px' }}>
          <div style={{
            fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'hsl(38 25% 38%)', marginBottom: '4px', fontFamily: 'Inter, sans-serif',
          }}>Name</div>
          <input
            ref={nameRef}
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'hsl(28 12% 14%)',
              border: '1px solid hsl(38 25% 24% / 0.8)',
              borderRadius: '3px',
              color: 'hsl(38 20% 80%)',
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
              padding: '6px 8px',
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'hsl(38 50% 45%)'}
            onBlur={e => e.target.style.borderColor = 'hsl(38 25% 24% / 0.8)'}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <div style={{
            fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'hsl(38 25% 38%)', marginBottom: '4px', fontFamily: 'Inter, sans-serif',
          }}>Description</div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Context, constraints, or conditions"
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'hsl(28 12% 14%)',
              border: '1px solid hsl(38 25% 24% / 0.8)',
              borderRadius: '3px',
              color: 'hsl(38 20% 72%)',
              fontSize: '10.5px',
              fontFamily: 'Inter, sans-serif',
              padding: '6px 8px',
              outline: 'none',
              resize: 'none',
              lineHeight: '1.5',
            }}
            onFocus={e => e.target.style.borderColor = 'hsl(38 50% 45%)'}
            onBlur={e => e.target.style.borderColor = 'hsl(38 25% 24% / 0.8)'}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1, padding: '6px 0',
              background: 'hsl(38 45% 22%)',
              border: '1px solid hsl(38 45% 36% / 0.7)',
              borderRadius: '3px',
              color: 'hsl(38 55% 68%)',
              fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '6px 10px',
              background: 'transparent',
              border: '1px solid hsl(38 15% 22%)',
              borderRadius: '3px',
              color: 'hsl(38 15% 46%)',
              fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}