import React, { useState, useEffect, useRef } from 'react';

interface Stage {
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricUnit: string;
  accentColor: string;
  vectorDetail: string;
}

const STAGES: Stage[] = [
  {
    num: "01",
    badge: "Motion Capture Screening",
    title: "Global Biomechanical 3D Kinetic Scan",
    subtitle: "High-speed 240fps multi-plane joint angle mapping",
    description: "Before applying any hands-on therapy, our motion sensors quantify your ground reaction forces, pelvic asymmetry, and deceleration braking mechanics to uncover the true mechanical root of pain.",
    metricLabel: "Bilateral Force Asymmetry",
    metricValue: "18.4%",
    metricUnit: "Deficit (Pre-Rehab)",
    accentColor: "from-red-500 to-amber-500",
    vectorDetail: "Frontal Plane Knee Valgus Angle: 8.2° (High ACL Risk)"
  },
  {
    num: "02",
    badge: "Vector Analysis",
    title: "Isolating Joint Shear & Torque Stress",
    subtitle: "Targeting focal patellofemoral and lumbar compression",
    description: "We pinpoint where compensatory overload occurs. If gluteal firing is delayed by even 40 milliseconds, the knee or lumbar spine absorbs 3x its rated shear force during cutting movements.",
    metricLabel: "Focal Joint Shear Stress",
    metricValue: "640 N·m",
    metricUnit: "Peak Torque Detected",
    accentColor: "from-amber-400 to-emerald-400",
    vectorDetail: "Hamstring-to-Quad Torque Ratio: 0.46 (Target: > 0.65)"
  },
  {
    num: "03",
    badge: "Neuromuscular Loading",
    title: "Active Kinetic Remodeling & Dry Needling",
    subtitle: "Resetting neurological motor patterns & heavy slow resistance",
    description: "Combining sterile Clinical Dry Needling (CDNT) with progressive eccentric loading to stimulate tendon collagen synthesis and re-educate the central nervous system.",
    metricLabel: "Tendon Collagen Remodeling",
    metricValue: "78.2%",
    metricUnit: "Tensile Recovery",
    accentColor: "from-emerald-400 to-cyan-400",
    vectorDetail: "Single-Leg Balance Perturbation Score: +52%"
  },
  {
    num: "04",
    badge: "Athletic Clearance",
    title: "100% Return-to-Sport Biomechanical Clearance",
    subtitle: "Objective IOC & FIFA testing benchmarks verified",
    description: "We verify limb symmetry index exceeding 90% across single-leg triple hop tests, reactive agility decelerations, and simulated match fatigue before issuing medical clearance.",
    metricLabel: "Limb Symmetry Index (LSI)",
    metricValue: "96.8%",
    metricUnit: "Symmetrical Power",
    accentColor: "from-cyan-400 to-emerald-400",
    vectorDetail: "Clearance Status: 100% Unrestricted Match Play"
  }
];

export default function ScrollExperience3D() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = STAGES[activeStageIdx];

  // Scrub through stages manually or via scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the container is through the viewport
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      
      // Map progress (0 to 1) into 4 stages
      const idx = Math.min(3, Math.floor(progress * 4));
      setActiveStageIdx(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative py-16">
      
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 badge-tech px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          Scroll-Driven Diagnostic Journey
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How High Heal Re-Engineers Movement
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          Experience our four-phase clinical sequence from initial 3D kinetic discovery to match clearance.
        </p>
      </div>

      {/* Stage Step Tabs / Progress Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-8 px-4">
        {STAGES.map((s, idx) => {
          const isActive = idx === activeStageIdx;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStageIdx(idx)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                isActive
                  ? 'bg-emerald-500/15 border-emerald-500/60 shadow-xl shadow-emerald-500/15'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:border-emerald-500/30 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {s.num} // STAGE
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {idx * 25}% - {(idx + 1) * 25}%
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-1 line-clamp-1">{s.badge}</div>
            </button>
          );
        })}
      </div>

      {/* 3D Interactive Presentation Stage Card */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-[#050811]">
          
          {/* Background Ambient Aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 px-3 py-1 rounded-lg">
                  STAGE {stage.num}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  {stage.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {stage.title}
              </h3>

              <div className="text-xs font-mono text-cyan-400 font-semibold">
                {stage.subtitle}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                {stage.description}
              </p>

              <div className="p-3.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-2.5">
                <span className="text-emerald-400 font-bold">⚡ Telemetry Vector:</span>
                <span className="text-slate-200">{stage.vectorDetail}</span>
              </div>
            </div>

            {/* Right Column: 3D Holographic Metric Gauge */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Metric Card */}
              <div className="bg-slate-900/70 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  {stage.metricLabel}
                </div>

                <div className="text-4xl sm:text-6xl font-extrabold font-mono text-white mt-3 tracking-tight">
                  <span className={`bg-gradient-to-r ${stage.accentColor} -webkit-background-clip-text text-transparent`}>
                    {stage.metricValue}
                  </span>
                </div>

                <div className="text-xs font-mono text-emerald-400 mt-2 font-semibold">
                  {stage.metricUnit}
                </div>

                {/* Progress bar visual */}
                <div className="w-full h-2 bg-slate-800 rounded-full mt-6 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 rounded-full"
                    style={{ width: `${(activeStageIdx + 1) * 25}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <a
                href="/contact"
                className="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm hover:opacity-95 transition shadow-xl shadow-emerald-500/25"
              >
                Experience 3D Assessment in Clinic →
              </a>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
