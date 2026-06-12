import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  background: 'linear-gradient(135deg, rgba(27, 39, 49, 0.48) 0%, rgba(27, 39, 49, 0.45) 100%)',
  backdropFilter: 'blur(22px) saturate(115%)',
  border: '1px solid rgba(244, 220, 178, 0.18)',
  boxShadow: '0 24px 70px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(232,189,115,0.06)',
};

function SuccessGauge({ success }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (success / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto' }}>
      <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(244, 220, 178, 0.08)" strokeWidth="2" />
        <circle
          cx="50" cy="50" r="45" fill="none"
          stroke="#8EF0A0"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(142, 240, 160, 0.35))',
            transition: 'stroke-dashoffset 0.8s ease-out',
          }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#8EF0A0',
          fontFamily: 'Courier Prime, monospace',
        }}>
          {success.toFixed(1)}%
        </div>
        <div style={{
          fontSize: '9px',
          color: 'rgba(244, 232, 208, 0.6)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginTop: '2px',
        }}>
          Success
        </div>
      </div>
    </div>
  );
}

function ScenarioCard({ scenario, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
      style={{
        ...glassPanel,
        borderRadius: '18px',
        padding: '24px 20px',
        flex: 1,
        minWidth: '280px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#8EF0A0',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{
              display: 'inline-block',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#8EF0A0',
            }} />
            {scenario.name}
          </div>
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          color: 'rgba(244, 232, 208, 0.4)',
          cursor: 'pointer',
          fontSize: '18px',
          padding: 0,
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.color = 'rgba(244, 232, 208, 0.7)'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(244, 232, 208, 0.4)'}
        >
          ⋯
        </button>
      </div>

      {/* Success Gauge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
        <SuccessGauge success={scenario.success} />
      </div>

      {/* Delta */}
      {scenario.delta && (
        <div style={{
          textAlign: 'center',
          fontSize: '11px',
          color: '#8EF0A0',
          marginBottom: '14px',
          fontFamily: 'Courier Prime, monospace',
          letterSpacing: '0.05em',
        }}>
          {scenario.delta}
        </div>
      )}

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(244, 220, 178, 0.12), transparent)',
        marginBottom: '14px',
      }} />

      {/* Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
        {/* Retirement Age */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'rgba(244, 232, 208, 0.68)' }}>60</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{
              background: 'rgba(27, 39, 49, 0.6)',
              border: '1px solid rgba(244, 220, 178, 0.12)',
              color: 'rgba(244, 232, 208, 0.5)',
              width: '20px',
              height: '20px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px',
            }}>−</button>
            <button style={{
              background: 'rgba(27, 39, 49, 0.6)',
              border: '1px solid rgba(244, 220, 178, 0.12)',
              color: 'rgba(244, 232, 208, 0.5)',
              width: '20px',
              height: '20px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px',
            }}>+</button>
          </div>
        </div>

        {/* Start Age */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'rgba(244, 232, 208, 0.68)' }}>67</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{
              background: 'rgba(27, 39, 49, 0.6)',
              border: '1px solid rgba(244, 220, 178, 0.12)',
              color: 'rgba(244, 232, 208, 0.5)',
              width: '20px',
              height: '20px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px',
            }}>−</button>
            <button style={{
              background: 'rgba(27, 39, 49, 0.6)',
              border: '1px solid rgba(244, 220, 178, 0.12)',
              color: 'rgba(244, 232, 208, 0.5)',
              width: '20px',
              height: '20px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px',
            }}>+</button>
          </div>
        </div>

        {/* Lifestyle Spending */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'rgba(244, 232, 208, 0.68)',
          paddingTop: '4px',
        }}>
          <span>$ 12,000</span>
          <span style={{ color: 'rgba(174, 183, 189, 0.72)' }}>/mo</span>
        </div>

        {/* One-Time Event */}
        <div style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          color: 'rgba(244, 232, 208, 0.68)',
        }}>
          <span>$ 0</span>
          <span style={{ color: 'rgba(174, 183, 189, 0.72)' }}>@ age</span>
          <span>70</span>
        </div>

        {/* Allocation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'rgba(174, 183, 189, 0.72)',
          paddingBottom: '8px',
          borderBottom: '1px solid rgba(244, 220, 178, 0.08)',
        }}>
          <span style={{ fontSize: '11px' }}>100 / 0</span>
        </div>

        {/* Savings */}
        <div style={{
          display: 'flex',
          gap: '8px',
          color: 'rgba(244, 232, 208, 0.68)',
          paddingTop: '4px',
        }}>
          <span>$ 62,125</span>
          <span style={{ color: 'rgba(174, 183, 189, 0.72)' }}>/yr</span>
        </div>

        {/* Pension */}
        <div style={{ color: 'rgba(244, 232, 208, 0.68)' }}>
          $ {scenario.stats.pension}
        </div>

        {/* Goals breakdown */}
        <div style={{
          fontSize: '11px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          paddingTop: '6px',
          borderTop: '1px solid rgba(244, 220, 178, 0.08)',
          marginTop: '4px',
        }}>
          {scenario.stats.goals.map((goal, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '8px',
              color: 'rgba(244, 232, 208, 0.68)',
            }}>
              <span>$ {goal.amount.toLocaleString()}</span>
              <span style={{ color: 'rgba(174, 183, 189, 0.72)' }}>/yr</span>
            </div>
          ))}
        </div>

        {/* Annual Total */}
        <div style={{
          marginTop: '10px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(244, 220, 178, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 500,
          color: '#F4E8D0',
          fontSize: '13px',
        }}>
          <span>$ 50,064</span>
          <span style={{ color: 'rgba(174, 183, 189, 0.72)' }}>/yr</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Scenarios() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Atmospheric background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 140% 100% at 50% 20%, rgba(142, 200, 220, 0.08) 0%, rgba(45, 60, 80, 0.3) 30%, rgba(20, 30, 45, 0.8) 100%)',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TopNav />

        <div style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          padding: '32px 28px',
          gap: '24px',
        }}>
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              ...glassPanel,
              borderRadius: '18px',
              width: '210px',
              flexShrink: 0,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Section label */}
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#E8BD73',
              fontWeight: 600,
            }}>
              Scenarios
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['+ Add', '⚡ Solve...', '↻ Reset'].map((label) => (
                <button
                  key={label}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '5px',
                    background: 'rgba(27, 39, 49, 0.6)',
                    border: '1px solid rgba(244, 220, 178, 0.16)',
                    color: 'rgba(244, 232, 208, 0.72)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(27, 39, 49, 0.75)';
                    e.target.style.borderColor = 'rgba(244, 220, 178, 0.24)';
                    e.target.style.color = '#F4E8D0';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(27, 39, 49, 0.6)';
                    e.target.style.borderColor = 'rgba(244, 220, 178, 0.16)';
                    e.target.style.color = 'rgba(244, 232, 208, 0.72)';
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(244, 220, 178, 0.12), transparent)',
            }} />

            {/* Controls list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Retirement Age',
                'Start Age',
                'Lifestyle Spending',
                'One-Time Event',
                'Allocation',
                'Savings / Yr',
                'Pension',
              ].map((label) => (
                <button
                  key={label}
                  style={{
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(244, 232, 208, 0.54)',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    padding: '4px 0',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'rgba(244, 232, 208, 0.8)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(244, 232, 208, 0.54)'}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(244, 220, 178, 0.12), transparent)',
            }} />

            {/* Goals section */}
            <div>
              <div style={{
                fontSize: '9px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#E8BD73',
                fontWeight: 600,
                marginBottom: '8px',
              }}>
                Goals
              </div>
              <div style={{
                fontSize: '10px',
                color: 'rgba(244, 232, 208, 0.54)',
                lineHeight: '1.5',
              }}>
                Kitchen renovation<br />
                Kitchen + pool<br />
                Pool
              </div>
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(244, 220, 178, 0.12), transparent)',
            }} />

            {/* Annual goal spend */}
            <div>
              <div style={{
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(244, 232, 208, 0.54)',
                fontWeight: 500,
                marginBottom: '4px',
              }}>
                Annual Goal Spend
              </div>
              <div style={{
                fontSize: '16px',
                fontFamily: 'Courier Prime, monospace',
                color: '#E8BD73',
                fontWeight: 600,
              }}>
                $ 50,064
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{ marginBottom: '20px' }}
            >
              <div style={{
                fontSize: '28px',
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                color: '#F4E8D0',
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}>
                Scenarios
              </div>
            </motion.div>

            {/* Scenario cards */}
            <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: 0 }}>
              {SCENARIOS.map((scenario, idx) => (
                <ScenarioCard key={scenario.id} scenario={scenario} index={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* Suggest button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 10,
          }}
        >
          <button style={{
            padding: '10px 18px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, rgba(232, 189, 115, 0.22) 0%, rgba(232, 189, 115, 0.12) 100%)',
            border: '1px solid rgba(232, 189, 115, 0.32)',
            color: '#E8BD73',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, rgba(232, 189, 115, 0.32) 0%, rgba(232, 189, 115, 0.18) 100%)';
            e.target.style.borderColor = 'rgba(232, 189, 115, 0.48)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, rgba(232, 189, 115, 0.22) 0%, rgba(232, 189, 115, 0.12) 100%)';
            e.target.style.borderColor = 'rgba(232, 189, 115, 0.32)';
          }}
          >
            ★ Suggest
          </button>
        </motion.div>
      </div>
    </div>
  );
}