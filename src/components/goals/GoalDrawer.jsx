import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIFE_AREAS, CADENCE_OPTIONS, formatAmount } from './GoalData';

const fieldMap = {
  ageRange:  ['ageStart', 'ageEnd'],
  cadence:   ['cadence'],
  amount:    ['amount'],
  duration:  ['duration'],
  inflation: ['inflation'],
  notes:     ['notes'],
};

function FieldLabel({ label, highlighted }) {
  return (
    <div style={{
      fontSize: '9px',
      letterSpacing: '0.13em',
      textTransform: 'uppercase',
      color: highlighted ? 'hsl(38 55% 62%)' : 'hsl(38 15% 45%)',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      transition: 'color 0.2s',
      marginBottom: '4px',
    }}>
      {label}
    </div>
  );
}

function StyledInput({ value, onChange, type = 'text', placeholder, highlighted, style = {} }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || '—'}
      style={{
        width: '100%',
        background: highlighted ? 'hsl(38 20% 14%)' : 'hsl(28 10% 12%)',
        border: `1px solid ${highlighted ? 'hsl(38 45% 45% / 0.6)' : 'hsl(28 10% 22% / 0.6)'}`,
        borderRadius: '3px',
        padding: '6px 8px',
        fontSize: '12px',
        color: 'hsl(38 18% 78%)',
        fontFamily: 'Inter, sans-serif',
        outline: 'none',
        transition: 'border-color 0.2s, background 0.2s',
        boxShadow: highlighted ? '0 0 8px hsl(38 45% 45% / 0.1)' : undefined,
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = 'hsl(38 45% 50%)'}
      onBlur={e => e.target.style.borderColor = highlighted ? 'hsl(38 45% 45% / 0.6)' : 'hsl(28 10% 22% / 0.6)'}
    />
  );
}

function StyledSelect({ value, onChange, options, highlighted }) {
  return (
    <select
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        background: highlighted ? 'hsl(38 20% 14%)' : 'hsl(28 10% 12%)',
        border: `1px solid ${highlighted ? 'hsl(38 45% 45% / 0.6)' : 'hsl(28 10% 22% / 0.6)'}`,
        borderRadius: '3px',
        padding: '6px 8px',
        fontSize: '12px',
        color: 'hsl(38 18% 78%)',
        fontFamily: 'Inter, sans-serif',
        outline: 'none',
        appearance: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      {options.map(o => <option key={o} value={o} style={{ background: 'hsl(28 14% 10%)' }}>{o}</option>)}
    </select>
  );
}

export default function GoalDrawer({ goal, lifeAreaId, highlightedField, onChange, onSave, onAddAnother, onClose }) {
  const area = LIFE_AREAS.find(a => a.id === lifeAreaId);

  const isHighlighted = (fieldId) => {
    const mapped = fieldMap[highlightedField];
    return mapped && fieldMap[fieldId]?.some(k => mapped.includes(k));
  };

  const update = (key, val) => onChange({ ...goal, [key]: val });

  if (!goal) {
    return (
      <div className="flex flex-col h-full items-center justify-center" style={{ opacity: 0.35 }}>
        <div style={{ fontSize: '28px', marginBottom: '12px', color: 'hsl(38 30% 45%)' }}>◎</div>
        <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'hsl(38 12% 45%)', fontFamily: 'Inter, sans-serif' }}>
          Select a goal
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={goal.id}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 12 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col h-full py-5 px-5"
        style={{ gap: '16px' }}
      >
        {/* Goal name */}
        <div>
          <div className="section-label mb-2">Goal</div>
          <input
            value={goal.name}
            onChange={e => update('name', e.target.value)}
            style={{
              width: '100%', background: 'transparent',
              border: 'none', borderBottom: '1px solid hsl(38 30% 32% / 0.5)',
              padding: '2px 0 6px',
              fontSize: '17px',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: 400,
              color: 'hsl(38 25% 82%)',
              outline: 'none',
              letterSpacing: '0.01em',
            }}
          />
        </div>

        {/* Life area badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'hsl(38 35% 48%)', fontFamily: 'Inter, sans-serif',
          }}>{area?.icon} {area?.label}</span>
        </div>

        <div style={{ borderTop: '1px solid hsl(28 10% 18% / 0.6)', margin: '0 -4px' }} />

        {/* Age Range */}
        <div style={{ background: isHighlighted('ageRange') ? 'hsl(38 20% 13% / 0.5)' : 'transparent', borderRadius: '4px', padding: '2px 4px', transition: 'background 0.2s' }}>
          <FieldLabel label="Age Range" highlighted={isHighlighted('ageRange')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '6px', alignItems: 'center' }}>
            <StyledInput value={goal.ageStart} onChange={v => update('ageStart', Number(v))} type="number"
              placeholder="Start" highlighted={isHighlighted('ageRange')} />
            <span style={{ fontSize: '11px', color: 'hsl(38 15% 40%)', textAlign: 'center' }}>–</span>
            <StyledInput value={goal.ageEnd} onChange={v => update('ageEnd', Number(v))} type="number"
              placeholder="End" highlighted={isHighlighted('ageRange')} />
          </div>
        </div>

        {/* Cadence */}
        <div style={{ background: isHighlighted('cadence') ? 'hsl(38 20% 13% / 0.5)' : 'transparent', borderRadius: '4px', padding: '2px 4px', transition: 'background 0.2s' }}>
          <FieldLabel label="Cadence" highlighted={isHighlighted('cadence')} />
          <StyledSelect value={goal.cadence} onChange={v => update('cadence', v)}
            options={CADENCE_OPTIONS} highlighted={isHighlighted('cadence')} />
        </div>

        {/* Amount */}
        <div style={{ background: isHighlighted('amount') ? 'hsl(38 20% 13% / 0.5)' : 'transparent', borderRadius: '4px', padding: '2px 4px', transition: 'background 0.2s' }}>
          <FieldLabel label="Estimated Cost" highlighted={isHighlighted('amount')} />
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: 'hsl(38 20% 48%)', fontFamily: 'Courier Prime, monospace' }}>$</span>
            <input
              type="number"
              value={goal.amount ?? ''}
              onChange={e => update('amount', Number(e.target.value))}
              placeholder="0"
              style={{
                width: '100%', paddingLeft: '20px',
                background: isHighlighted('amount') ? 'hsl(38 20% 14%)' : 'hsl(28 10% 12%)',
                border: `1px solid ${isHighlighted('amount') ? 'hsl(38 45% 45% / 0.6)' : 'hsl(28 10% 22% / 0.6)'}`,
                borderRadius: '3px', padding: '6px 8px 6px 20px',
                fontSize: '12px', color: 'hsl(38 18% 78%)',
                fontFamily: 'Courier Prime, monospace', outline: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            />
          </div>
        </div>

        {/* Inflation toggle */}
        <div style={{ background: isHighlighted('inflation') ? 'hsl(38 20% 13% / 0.5)' : 'transparent', borderRadius: '4px', padding: '2px 4px', transition: 'background 0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FieldLabel label="Inflation Adjust" highlighted={isHighlighted('inflation')} />
            <button
              onClick={() => update('inflation', !goal.inflation)}
              style={{
                width: '32px', height: '16px', borderRadius: '8px',
                background: goal.inflation ? 'hsl(38 45% 45%)' : 'hsl(28 10% 20%)',
                border: 'none', cursor: 'pointer', position: 'relative',
                transition: 'background 0.2s',
              }}
            >
              <span style={{
                position: 'absolute', top: '2px',
                left: goal.inflation ? '18px' : '2px',
                width: '12px', height: '12px', borderRadius: '50%',
                background: goal.inflation ? 'hsl(38 65% 75%)' : 'hsl(38 15% 45%)',
                transition: 'left 0.2s',
              }} />
            </button>
          </div>
        </div>

        {/* Notes */}
        <div style={{ background: isHighlighted('notes') ? 'hsl(38 20% 13% / 0.5)' : 'transparent', borderRadius: '4px', padding: '2px 4px', transition: 'background 0.2s' }}>
          <FieldLabel label="Notes" highlighted={isHighlighted('notes')} />
          <textarea
            value={goal.notes ?? ''}
            onChange={e => update('notes', e.target.value)}
            placeholder="Context, constraints, or conditions"
            rows={2}
            style={{
              width: '100%', resize: 'none',
              background: 'hsl(28 10% 12%)',
              border: '1px solid hsl(28 10% 22% / 0.6)',
              borderRadius: '3px', padding: '6px 8px',
              fontSize: '11px', color: 'hsl(38 15% 65%)',
              fontFamily: 'Inter, sans-serif', outline: 'none',
              lineHeight: '1.5',
            }}
          />
        </div>

        {/* Locked fields hint */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '-4px' }}>
          {['Tax Treatment', 'Scenario Test'].map(label => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '4px 8px', borderRadius: '3px',
              border: '1px dashed hsl(38 15% 25% / 0.5)',
              opacity: 0.5,
            }}>
              <span style={{ fontSize: '8px', color: 'hsl(38 20% 40%)' }}>⬡</span>
              <span style={{ fontSize: '9px', color: 'hsl(38 15% 40%)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px', borderTop: '1px solid hsl(28 10% 18% / 0.5)' }}>
          <button onClick={onSave} style={{
            width: '100%', padding: '9px',
            background: 'hsl(38 45% 50%)',
            border: 'none', borderRadius: '3px', cursor: 'pointer',
            fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'hsl(28 15% 10%)', fontFamily: 'Inter, sans-serif', fontWeight: 600,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'hsl(38 50% 56%)'}
            onMouseLeave={e => e.target.style.background = 'hsl(38 45% 50%)'}
          >
            Save Goal
          </button>
          <button onClick={onAddAnother} style={{
            width: '100%', padding: '8px',
            background: 'transparent',
            border: '1px solid hsl(38 20% 28% / 0.6)', borderRadius: '3px', cursor: 'pointer',
            fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'hsl(38 15% 55%)', fontFamily: 'Inter, sans-serif', fontWeight: 500,
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.target.style.borderColor = 'hsl(38 35% 40%)'; e.target.style.color = 'hsl(38 20% 68%)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'hsl(38 20% 28% / 0.6)'; e.target.style.color = 'hsl(38 15% 55%)'; }}
          >
            + Add Another
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}