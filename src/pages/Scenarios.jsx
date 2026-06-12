import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopNav from '../components/goals/TopNav';

const SCENARIOS = [
  {
    id: 'baseline',
    name: 'Baseline',
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
      kitchen: { name: 'Kitchen renovation', age: '40-50', amount: 10308 },
      kitchenPool: { name: 'Kitchen + pool', age: '41-48', amount: 25032 },
      pool: { name: 'Pool', age: '46-90', amount: 14724 },
      annual: 50064,
    }
  },
  {
    id: 'scenario-b',
    name: 'Scenario B',
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
      kitchen: { name: 'Kitchen renovation', age: '40-50', amount: 10308 },
      kitchenPool: { name: 'Kitchen + pool', age: '41-48', amount: 25032 },
      pool: { name: 'Pool', age: '46-90', amount: 14724 },
      annual: 50064,
    }
  },
  {
    id: 'aggressive',
    name: 'Aggressive',
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
      kitchen: { name: 'Kitchen renovation', age: '40-50', amount: 10308 },
      kitchenPool: { name: 'Kitchen + pool', age: '41-48', amount: 25032 },
      pool: { name: 'Pool', age: '46-90', amount: 14724 },
      annual: 50064,
    }
  },
];

function ScenarioCard({ scenario, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      style={{
        background: 'linear-gradient(135deg, hsl(215 32% 22% / 0.65) 0%, hsl(215 28% 18% / 0.65) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid hsl(215 40% 35% / 0.4)',
        borderRadius: '12px',
        padding: '20px',
        flex: 1,
        minWidth: '200px',
      }}
    >
      {/* Header with menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{
            fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'hsl(100 60% 50% / 0.8)', fontWeight: 500, marginBottom: '2px',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(100 60% 50%)' }} />
            {scenario.name}
          </div>
        </div>
        <button style={{
          background: 'none', border: 'none', color: 'hsl(215 20% 50%)',
          cursor: 'pointer', fontSize: '16px', padding: 0,
        }}>⋯</button>
      </div>

      {/* Success circle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
        <div style={{
          position: 'relative',
          width: '100px', height: '100px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(215 20% 25%)" strokeWidth="2" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke="hsl(100 60% 50%)" strokeWidth="2.5"
              strokeDasharray={`${(scenario.success / 100) * 283} 283`}
              strokeLinecap="round"
            />
          </svg>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '20px', fontWeight: 600,
              color: 'hsl(100 60% 50%)', fontFamily: 'Courier Prime, monospace',
            }}>
              {scenario.success.toFixed(1)}%
            </div>
            <div style={{
              fontSize: '10px', color: 'hsl(215 20% 50%)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginTop: '2px',
            }}>
              Success
            </div>
          </div>
        </div>
      </div>

      {/* Delta if present */}
      {scenario.delta && (
        <div style={{
          textAlign: 'center', fontSize: '11px', color: 'hsl(100 50% 60%)',
          marginBottom: '12px', fontFamily: 'Courier Prime, monospace',
        }}>
          {scenario.delta}
        </div>
      )}

      {/* Stats section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'hsl(215 20% 70%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'hsl(215 20% 50%)' }}>Baseline</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span>{scenario.stats.retirementAge}</span>
          <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
            <button style={{ background: 'hsl(215 25% 20%)', border: 'none', color: 'hsl(215 20% 50%)', width: '20px', height: '20px', borderRadius: '3px', cursor: 'pointer', fontSize: '10px' }}>−</button>
            <button style={{ background: 'hsl(215 25% 20%)', border: 'none', color: 'hsl(215 20% 50%)', width: '20px', height: '20px', borderRadius: '3px', cursor: 'pointer', fontSize: '10px' }}>+</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span>{scenario.stats.startAge}</span>
          <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
            <button style={{ background: 'hsl(215 25% 20%)', border: 'none', color: 'hsl(215 20% 50%)', width: '20px', height: '20px', borderRadius: '3px', cursor: 'pointer', fontSize: '10px' }}>−</button>
            <button style={{ background: 'hsl(215 25% 20%)', border: 'none', color: 'hsl(215 20% 50%)', width: '20px', height: '20px', borderRadius: '3px', cursor: 'pointer', fontSize: '10px' }}>+</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>$ 12,000</span>
          <span style={{ color: 'hsl(215 20% 50%)' }}>/mo</span>
        </div>

        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>$ 0</span>
          <span style={{ color: 'hsl(215 20% 50%)' }}>@ age</span>
          <span>70</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'hsl(215 20% 50%)', paddingBottom: '8px', borderBottom: '1px solid hsl(215 25% 20%)' }}>
          <span>100 / 0</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span>$ 62,125</span>
          <span style={{ color: 'hsl(215 20% 50%)' }}>/yr</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span>$ {scenario.stats.pension}</span>
        </div>

        <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '4px', borderTop: '1px solid hsl(215 25% 20%)', marginTop: '4px' }}>
          <div style={{ color: 'hsl(215 20% 50%)' }}>$ 10,308 <span style={{ fontSize: '9px' }}>/yr</span></div>
          <div style={{ color: 'hsl(215 20% 50%)' }}>$ 25,032 <span style={{ fontSize: '9px' }}>/yr</span></div>
          <div style={{ color: 'hsl(215 20% 50%)' }}>$ 14,724 <span style={{ fontSize: '9px' }}>/yr</span></div>
        </div>

        <div style={{
          marginTop: '8px', paddingTop: '8px', borderTop: '1px solid hsl(215 25% 20%)',
          display: 'flex', justifyContent: 'space-between', fontWeight: 500,
          color: 'hsl(215 25% 75%)',
        }}>
          <span>$ 50,064</span>
          <span style={{ color: 'hsl(215 20% 50%)' }}>/yr</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Scenarios() {
  const [expandedControl, setExpandedControl] = useState(null);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', overflow: 'hidden',
      background: 'linear-gradient(135deg, hsl(215 35% 18%) 0%, hsl(215 30% 12%) 50%, hsl(215 25% 10%) 100%)',
    }}>
      <TopNav />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', padding: '24px' }}>
        {/* Left sidebar */}
        <div style={{
          width: '220px', flexShrink: 0,
          background: 'linear-gradient(135deg, hsl(215 32% 20% / 0.6) 0%, hsl(215 28% 16% / 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid hsl(215 40% 35% / 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginRight: '20px',
          overflow: 'hidden', overflowY: 'auto',
        }}>
          <div style={{
            fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'hsl(40 70% 60%)', fontWeight: 600, marginBottom: '12px',
          }}>
            Scenarios
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{
              width: '100%', padding: '8px 12px', borderRadius: '6px',
              background: 'hsl(215 25% 22%)',
              border: '1px solid hsl(215 35% 30% / 0.5)',
              color: 'hsl(215 20% 70%)',
              fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.background = 'hsl(215 25% 26%)'}
            onMouseLeave={(e) => e.target.style.background = 'hsl(215 25% 22%)'}
            >
              + Add
            </button>

            <button style={{
              width: '100%', padding: '8px 12px', borderRadius: '6px',
              background: 'transparent',
              border: '1px solid hsl(215 35% 28%)',
              color: 'hsl(215 20% 60%)',
              fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}>
              ⚡ Solve...
            </button>

            <button style={{
              width: '100%', padding: '8px 12px', borderRadius: '6px',
              background: 'transparent',
              border: '1px solid hsl(215 35% 28%)',
              color: 'hsl(215 20% 60%)',
              fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}>
              ↻ Reset
            </button>
          </div>

          <div style={{ borderTop: '1px solid hsl(215 25% 22%)', marginTop: '16px', paddingTop: '16px' }}>
            {[
              { icon: '🎯', label: 'Retirement Age' },
              { icon: '🔢', label: 'Start Age' },
              { icon: '💰', label: 'Lifestyle Spending' },
              { icon: '📍', label: 'One-Time Event' },
              { icon: '📊', label: 'Allocation' },
              { icon: '💾', label: 'Savings / Yr' },
              { icon: '🏦', label: 'Pension' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setExpandedControl(expandedControl === item.label ? null : item.label)}
                style={{
                  width: '100%', padding: '8px 12px', textAlign: 'left',
                  background: 'transparent', border: 'none',
                  color: 'hsl(215 20% 65%)',
                  fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                  marginTop: '6px', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.color = 'hsl(215 20% 75%)'}
                onMouseLeave={(e) => e.target.style.color = 'hsl(215 20% 65%)'}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid hsl(215 25% 22%)', marginTop: '16px', paddingTop: '16px' }}>
            <div style={{
              fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'hsl(40 70% 60%)', fontWeight: 600, marginBottom: '8px',
            }}>
              Goals
            </div>
            <div style={{ fontSize: '11px', color: 'hsl(215 20% 60%)', lineHeight: '1.6' }}>
              • Kitchen renovation<br/>age 40-50<br/>
              • Kitchen + pool<br/>age 41-48<br/>
              • Pool<br/>age 46-90
            </div>
          </div>

          <div style={{ borderTop: '1px solid hsl(215 25% 22%)', marginTop: '16px', paddingTop: '16px' }}>
            <div style={{
              fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'hsl(215 20% 60%)', fontWeight: 500, marginBottom: '4px',
            }}>
              Annual Goal Spend
            </div>
            <div style={{
              fontSize: '14px', fontFamily: 'Courier Prime, monospace',
              color: 'hsl(40 70% 60%)', fontWeight: 600,
            }}>
              $ 50,064
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Title */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '28px', fontFamily: 'Cormorant Garamond, Georgia, serif',
              color: 'hsl(215 25% 85%)', fontWeight: 300, letterSpacing: '0.02em',
            }}>
              Scenarios
            </div>
          </div>

          {/* Scenario cards */}
          <div style={{ display: 'flex', gap: '16px', flex: 1, overflow: 'hidden' }}>
            {SCENARIOS.map((scenario, idx) => (
              <ScenarioCard key={scenario.id} scenario={scenario} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom suggest button */}
      <div style={{ position: 'absolute', bottom: '24px', right: '24px' }}>
        <button style={{
          padding: '8px 16px', borderRadius: '4px',
          background: 'hsl(215 30% 28%)',
          border: '1px solid hsl(40 70% 60% / 0.4)',
          color: 'hsl(40 70% 60%)',
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}
        onMouseEnter={(e) => e.target.style.background = 'hsl(215 30% 32%)'}
        onMouseLeave={(e) => e.target.style.background = 'hsl(215 30% 28%)'}
        >
          ★ Suggest
        </button>
      </div>
    </div>
  );
}