import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Zap, RotateCcw } from 'lucide-react';
import TopNav from '../components/goals/TopNav';

const SCENARIOS = [
  {
    id: 'baseline',
    name: 'BASELINE',
    success: 83.1,
    delta: null,
    stats: {
      retirementAge: 60,
      startAge: 67,
      lifestyleSpending: 12000,
      oneTimeEvent: 0,
      allocation: { num: 100, denom: 0 },
      savingsYr: 62125,
      pension: 62,
      goals: [
        { amount: 10308 },
        { amount: 25032 },
        { amount: 14724 },
      ],
      annual: 50064,
    }
  },
  {
    id: 'scenario-b',
    name: 'SCENARIO B',
    success: 96.7,
    delta: '+13.6 pts',
    stats: {
      retirementAge: 67,
      startAge: 67,
      lifestyleSpending: 12000,
      oneTimeEvent: 0,
      allocation: { num: 100, denom: 0 },
      savingsYr: 62125,
      pension: 65,
      goals: [
        { amount: 10308 },
        { amount: 25032 },
        { amount: 14724 },
      ],
      annual: 50064,
    }
  },
  {
    id: 'aggressive',
    name: 'AGGRESSIVE',
    success: 82.3,
    delta: '-0.8 pts',
    stats: {
      retirementAge: 60,
      startAge: 67,
      lifestyleSpending: 12000,
      oneTimeEvent: 0,
      allocation: { num: 90, denom: 10 },
      savingsYr: 62125,
      pension: 62,
      goals: [
        { amount: 10308 },
        { amount: 25032 },
        { amount: 14724 },
      ],
      annual: 50064,
    }
  },
];

const glassPanel = {
  background: 'rgba(27, 39, 49, 0.48)',
  backdropFilter: 'blur(22px) saturate(115%)',
  border: '1px solid rgba(244, 220, 178, 0.18)',
  boxShadow: '0 24px 70px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(232,189,115,0.06)',
};

function SuccessGauge({ success }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (success / 100) * circumference;

  return (
    <div style={{
      position: 'relative', width: '96px', height: '96px', margin: '0 auto',
      borderRadius: '50%',
      background: 'rgba(10, 15, 20, 0.25)',
      boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)'
    }}>
      <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(244, 220, 178, 0.05)" strokeWidth="3.5" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke="#A0E8B0"
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(160, 232, 176, 0.45))',
            transition: 'stroke-dashoffset 0.8s ease-out',
          }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontSize: '16px', fontWeight: 600, color: '#A0E8B0',
          fontFamily: 'Courier Prime, monospace', letterSpacing: '0.02em'
        }}>
          {success.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}

const StatRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0' }}>
    <span style={{ color: 'rgba(174,183,189,0.72)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.04em' }}>{label}</span>
    <span style={{ color: '#F4E8D0', fontSize: '11px', fontFamily: 'Courier Prime, monospace' }}>{value}</span>
  </div>
);

function ScenarioCard({ scenario, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
      style={{
        ...glassPanel,
        borderRadius: '16px',
        padding: '20px',
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{
          fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#E8BD73', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#E8BD73', boxShadow: '0 0 6px rgba(232,189,115,0.6)' }} />
          {scenario.name}
        </div>
        <button style={{ background: 'none', border: 'none', color: 'rgba(244, 232, 208, 0.4)', cursor: 'pointer', fontSize: '16px', padding: 0 }}>⋯</button>
      </div>

      {/* Success Gauge */}
      <SuccessGauge success={scenario.success} />

      {/* Delta */}
      <div style={{
        textAlign: 'center', fontSize: '10px', color: '#A0E8B0',
        marginTop: '12px', marginBottom: '14px', fontFamily: 'Courier Prime, monospace', letterSpacing: '0.05em'
      }}>
        {scenario.delta || '\u00A0'}
      </div>

      <div style={{ height: '1px', background: 'rgba(244, 220, 178, 0.08)', marginBottom: '12px' }} />

      {/* Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <StatRow label="Retirement Age" value={scenario.stats.retirementAge} />
        <StatRow label="Start Age" value={scenario.stats.startAge} />
        <StatRow label="Lifestyle Spend" value={`$ ${scenario.stats.lifestyleSpending.toLocaleString()} /mo`} />
        <StatRow label="One-Time Event" value={`$ ${scenario.stats.oneTimeEvent} @ age 70`} />
        <StatRow label="Allocation" value={`${scenario.stats.allocation.num} / ${scenario.stats.allocation.denom}`} />
        <StatRow label="Savings / Yr" value={`$ ${scenario.stats.savingsYr.toLocaleString()}`} />
        <StatRow label="Pension" value={`$ ${scenario.stats.pension}`} />
      </div>

      {/* Goals Breakdown */}
      <div style={{
        marginTop: '12px', paddingTop: '10px',
        borderTop: '1px solid rgba(244, 220, 178, 0.08)',
        display: 'flex', flexDirection: 'column', gap: '4px'
      }}>
        <div style={{ fontSize: '9px', color: 'rgba(174,183,189,0.72)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>Goals</div>
        {scenario.stats.goals.map((goal, i) => (
          <StatRow key={i} label={`Goal ${i+1}`} value={`$ ${goal.amount.toLocaleString()} /yr`} />
        ))}
      </div>

      {/* Annual Spend Box (Stronger Border, Glass Embedded) */}
      <div style={{
        marginTop: 'auto', paddingTop: '16px',
      }}>
        <div style={{
          padding: '14px 16px',
          background: 'rgba(10, 15, 22, 0.35)',
          border: '1px solid rgba(244, 220, 178, 0.28)',
          borderRadius: '8px',
          boxShadow: 'inset 0 2px 14px rgba(0,0,0,0.35)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ color: 'rgba(244,232,208,0.85)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Annual Spend</span>
          <span style={{ color: '#E8BD73', fontSize: '15px', fontFamily: 'Courier Prime, monospace', fontWeight: 700 }}>$ {scenario.stats.annual.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
}

const SidebarBtn = ({ icon: Icon, label }) => (
  <button style={{
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 14px',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(244, 220, 178, 0.12)',
    borderRadius: '8px',
    color: 'rgba(244, 232, 208, 0.8)',
    fontSize: '10px', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.12em',
    cursor: 'pointer',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
    transition: 'all 0.2s',
  }}
  onMouseEnter={(e) => {
    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
    e.target.style.borderColor = 'rgba(244, 220, 178, 0.25)';
  }}
  onMouseLeave={(e) => {
    e.target.style.background = 'rgba(255, 255, 255, 0.04)';
    e.target.style.borderColor = 'rgba(244, 220, 178, 0.12)';
  }}
  >
    <Icon size={14} strokeWidth={2} color="#E8BD73" />
    {label}
  </button>
);

export default function Scenarios() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Deep Atmospheric Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: '#0a1016',
        backgroundImage: `
          radial-gradient(circle at 85% 15%, rgba(232, 189, 115, 0.07) 0%, transparent 45%),
          radial-gradient(circle at 15% 85%, rgba(45, 60, 80, 0.35) 0%, transparent 55%)
        `
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TopNav />

        <div style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          padding: '32px 36px',
          gap: '24px',
        }}>
          {/* Compact Left Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              ...glassPanel,
              borderRadius: '16px',
              width: '210px',
              flexShrink: 0,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Section label */}
            <div style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#E8BD73',
              fontWeight: 600,
            }}>
              Scenarios
            </div>

            {/* Buttons (Clean line icons) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <SidebarBtn icon={Plus} label="Add" />
              <SidebarBtn icon={Zap} label="Solve..." />
              <SidebarBtn icon={RotateCcw} label="Reset" />
            </div>

            <div style={{ height: '1px', background: 'rgba(244, 220, 178, 0.08)' }} />

            {/* Controls list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Retirement Age',
                'Start Age',
                'Lifestyle Spending',
                'One-Time Event',
                'Allocation',
                'Savings / Yr',
                'Pension',
              ].map((label) => (
                <div key={label} style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'rgba(244, 232, 208, 0.54)',
                  cursor: 'pointer',
                }}>
                  {label}
                </div>
              ))}
            </div>

            <div style={{ height: '1px', background: 'rgba(244, 220, 178, 0.08)' }} />

            {/* Sub-labels */}
            <div>
              <div style={{
                fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#E8BD73', fontWeight: 600, marginBottom: '10px',
              }}>
                Goals
              </div>
              <div style={{
                fontSize: '10px', color: 'rgba(244, 232, 208, 0.54)', lineHeight: '1.6', letterSpacing: '0.04em'
              }}>
                Kitchen renovation<br />
                Kitchen + pool<br />
                Pool
              </div>
            </div>
            
            <div style={{ height: '1px', background: 'rgba(244, 220, 178, 0.08)' }} />

            {/* Global Annual Spend */}
            <div>
              <div style={{
                fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(244, 232, 208, 0.54)', fontWeight: 600, marginBottom: '6px',
              }}>
                Annual Goal Spend
              </div>
              <div style={{
                fontSize: '16px', fontFamily: 'Courier Prime, monospace',
                color: '#E8BD73', fontWeight: 700,
              }}>
                $ 50,064
              </div>
            </div>
          </motion.div>

          {/* Main Cards Content (No big text headers above them) */}
          <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
            {SCENARIOS.map((scenario, idx) => (
              <ScenarioCard key={scenario.id} scenario={scenario} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}