export const LIFE_AREAS = [
  { id: 'travel',     label: 'Travel',        icon: '✦' },
  { id: 'home',       label: 'Home',          icon: '◈' },
  { id: 'family',     label: 'Family',        icon: '◇' },
  { id: 'health',     label: 'Health',        icon: '○' },
  { id: 'giving',     label: 'Giving',        icon: '◎' },
  { id: 'work',       label: 'Work / Purpose',icon: '▷' },
  { id: 'experiences',label: 'Experiences',   icon: '◈' },
];

export const DEFAULT_GOALS = {
  travel: [
    { id: 'g1', name: 'Italy Every Year',   ageStart: 65, ageEnd: 75, cadence: 'Annual',    amount: 18000, inflation: true,  notes: '' },
    { id: 'g2', name: 'Alaska Cruise',       ageStart: 67, ageEnd: 67, cadence: 'One-time',  amount: 12000, inflation: false, notes: '' },
    { id: 'g3', name: 'Family Trip',         ageStart: 66, ageEnd: 80, cadence: 'Biennial',  amount: 22000, inflation: true,  notes: 'Extended family' },
  ],
  home: [
    { id: 'g4', name: 'Lake House',          ageStart: 65, ageEnd: 65, cadence: 'One-time',  amount: 450000, inflation: false, notes: '' },
    { id: 'g5', name: 'Home Renovations',    ageStart: 68, ageEnd: 80, cadence: 'Periodic',  amount: 15000,  inflation: true,  notes: 'Every 3–5 years' },
  ],
  family: [
    { id: 'g6', name: 'Gift Grandkids',      ageStart: 68, ageEnd: 85, cadence: 'Annual',    amount: 8000,  inflation: false, notes: 'Education & experiences' },
    { id: 'g7', name: 'Wedding Support',     ageStart: 70, ageEnd: 72, cadence: 'One-time',  amount: 30000, inflation: false, notes: '' },
  ],
  health: [
    { id: 'g8', name: 'Concierge Care',      ageStart: 65, ageEnd: 95, cadence: 'Annual',    amount: 6000,  inflation: true,  notes: '' },
    { id: 'g9', name: 'Wellness Retreats',   ageStart: 65, ageEnd: 80, cadence: 'Annual',    amount: 5000,  inflation: true,  notes: '' },
  ],
  giving: [
    { id: 'g10', name: 'Donor-Advised Fund', ageStart: 65, ageEnd: 85, cadence: 'Annual',    amount: 20000, inflation: false, notes: 'Charitable giving' },
    { id: 'g11', name: 'Endowment Gift',     ageStart: 80, ageEnd: 80, cadence: 'One-time',  amount: 100000,inflation: false, notes: '' },
  ],
  work: [
    { id: 'g12', name: 'Board Service',      ageStart: 65, ageEnd: 75, cadence: 'Annual',    amount: 2000,  inflation: false, notes: 'Costs, not income' },
    { id: 'g13', name: 'Advisory Role',      ageStart: 65, ageEnd: 70, cadence: 'Annual',    amount: 4000,  inflation: false, notes: '' },
  ],
  experiences: [
    { id: 'g14', name: 'Safari',             ageStart: 68, ageEnd: 68, cadence: 'One-time',  amount: 28000, inflation: false, notes: 'East Africa' },
    { id: 'g15', name: 'Language Immersion', ageStart: 66, ageEnd: 66, cadence: 'One-time',  amount: 8000,  inflation: false, notes: 'Spanish, 6 weeks' },
  ],
};

export const INPUT_NODES = [
  { id: 'ageRange',  label: 'Age Range',   locked: false },
  { id: 'cadence',   label: 'Cadence',     locked: false },
  { id: 'amount',    label: 'Amount',      locked: false },
  { id: 'duration',  label: 'Duration',    locked: false },
  { id: 'inflation', label: 'Inflation',   locked: false },
  { id: 'notes',     label: 'Notes',       locked: false },
  { id: 'taxTreat',  label: 'Tax Treatment', locked: true },
  { id: 'scenTest',  label: 'Scenario Test',  locked: true },
];

export const CADENCE_OPTIONS = ['Annual', 'Biennial', 'One-time', 'Periodic', 'Monthly'];

export const formatAmount = (n) => {
  if (!n && n !== 0) return '—';
  return '$' + Number(n).toLocaleString();
};