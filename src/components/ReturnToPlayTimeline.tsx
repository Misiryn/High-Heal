import React, { useState } from 'react';

interface Phase {
  phase: string;
  badge: string;
  title: string;
  objective: string;
  clinicalCriteria: string[];
  clearanceTests: string;
  duration: string;
}

const phases: Phase[] = [
  {
    phase: 'Phase 01',
    badge: 'Acute Stabilization',
    title: 'Protection, Effusion Control & Pain Quenching',
    objective: 'Eradicate active joint inflammation, modulate central pain sensitization, and safeguard healing anatomical structures without inducing muscle atrophy.',
    clinicalCriteria: [
      'Resting Visual Analog Scale (VAS) pain score ≤ 2/10',
      'Zero resting joint effusion (Grade 0 on Stroke Test)',
      'Baseline quadriceps/glute isometric activation without lag',
      'Normalized non-antalgic gait pattern in walking footwear'
    ],
    clearanceTests: 'Effusion stroke test & active knee extension lag test = 0°',
    duration: 'Week 1 — Week 3'
  },
  {
    phase: 'Phase 02',
    badge: 'Structural Load',
    title: 'Symmetrical Range of Motion & Progressive Hypertrophy',
    objective: 'Restore 100% full active physiological joint range, resolve kinetic chain compensations, and progressively load muscle tendon units.',
    clinicalCriteria: [
      'Full passive and active symmetrical joint range of motion',
      'Isometric limb strength symmetry ≥ 75% compared to uninjured side',
      'Single-leg balance on unstable surface > 45 seconds',
      'Pain-free bilateral squats to 90° with equal weight distribution'
    ],
    clearanceTests: 'Dynamometer quadriceps/hamstring torque ratio > 0.60',
    duration: 'Week 3 — Week 8'
  },
  {
    phase: 'Phase 03',
    badge: 'Kinetic Power',
    title: 'Dynamic Plyometrics & Deceleration Braking',
    objective: 'Retrain elastic stretch-shortening cycle (SSC), multidirectional change of direction, and high-velocity deceleration mechanics.',
    clinicalCriteria: [
      'Single-leg hop for distance symmetry ≥ 90%',
      'Triple hop and crossover hop test limb symmetry ≥ 90%',
      'Drop vertical jump with zero knee valgus collapse on video',
      'Y-Balance test anterior reach difference < 4 cm'
    ],
    clearanceTests: 'Limb Symmetry Index (LSI) > 90% across 4 Hop Tests',
    duration: 'Week 8 — Week 16'
  },
  {
    phase: 'Phase 04',
    badge: 'Match Ready',
    title: 'Sport-Specific Simulation & Psychological Readiness',
    objective: 'Expose the athlete to full contact, high-speed sprinting, unpredictable reactive drills, and fatigue resistance matching live competition conditions.',
    clinicalCriteria: [
      'ACL-RSI (Return to Sport after Injury) psychological score > 75%',
      'Sprint speeds exceeding 95% of pre-injury maximum velocity',
      'Full participation in unrestricted team practice for 2 consecutive weeks',
      'Zero post-training soreness persisting beyond 24 hours'
    ],
    clearanceTests: 'Full clearance by Consultant Sports Physio & Orthopedic Surgeon',
    duration: 'Week 16+'
  }
];

export default function ReturnToPlayTimeline() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activePhase = phases[activeIdx];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="badge-tech text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider font-semibold">
            Clearance Protocol
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            The High Heal 4-Phase Return-to-Play Framework
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            We never clear athletes based on arbitrary calendar dates. Every progression is unlocked strictly through validated biomechanical and functional testing benchmarks.
          </p>
        </div>
        <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-xl border border-cyan-500/20">
          IOC / FIFA Medical Guidelines
        </div>
      </div>

      {/* Step Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {phases.map((p, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                isActive
                  ? 'bg-emerald-500/15 border-emerald-500/60 shadow-lg shadow-emerald-500/15'
                  : 'bg-slate-900/60 border-white/5 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">{p.phase}</span>
                <span className="text-[10px] font-mono text-slate-400">{p.duration}</span>
              </div>
              <div className="text-sm font-bold text-white mt-2 leading-tight">{p.badge}</div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{p.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-md font-bold">
              {activePhase.phase}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
              {activePhase.badge}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white">{activePhase.title}</h3>
          
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-white/5">
            <strong>Clinical Objective:</strong> {activePhase.objective}
          </p>

          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold mb-3">
              Must-Pass Clinical Gate Criteria:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activePhase.clinicalCriteria.map((crit, cIdx) => (
                <div key={cIdx} className="bg-slate-900/70 p-3 rounded-xl border border-white/5 flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{crit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/60 p-6 rounded-2xl border border-white/5 space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
              Diagnostic Benchmark Test
            </span>
            <div className="text-sm font-bold text-white mt-1.5 leading-snug">
              {activePhase.clearanceTests}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-xs font-bold text-emerald-400">Why this matters:</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Premature return before meeting these benchmarks increases reinjury rates by over 400%. High Heal ensures absolute joint integrity before match play.
            </p>
          </div>

          <a
            href="/contact?reason=Sports%20Rehab%20Assessment"
            className="w-full text-center py-3 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition shadow-lg shadow-white/10"
          >
            Schedule Athletic Evaluation →
          </a>
        </div>
      </div>
    </div>
  );
}
