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
    accentColor: "from-rose-600 to-amber-600",
    vectorDetail: "Frontal Plane Knee Valgus Angle: 8.2° (Elevated ACL Risk)"
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
    accentColor: "from-amber-600 to-teal-600",
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
    accentColor: "from-teal-600 to-cyan-600",
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
    metricUnit: "Symmetrical Power Restored",
    accentColor: "from-teal-600 to-blue-600",
    vectorDetail: "Clearance Status: 100% Unrestricted Match Play"
  }
];

export default function ScrollExperience3D() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = STAGES[activeStageIdx];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      
      const idx = Math.min(3, Math.floor(progress * 4));
      setActiveStageIdx(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative py-12">
      
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 badge-medical px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
          Scroll-Driven Clinical Journey
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How High Heal Re-Engineers Movement
        </h2>
        <p className="text-slate-600 text-sm mt-3">
          Experience our four-phase clinical sequence from initial 3D kinetic discovery to match clearance.
        </p>
      </div>

      {/* Stage Step Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-8 px-4">
        {STAGES.map((s, idx) => {
          const isActive = idx === activeStageIdx;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStageIdx(idx)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                isActive
                  ? 'bg-teal-50/90 border-teal-500 shadow-sm text-teal-950 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold ${isActive ? 'text-teal-700' : 'text-slate-400'}`}>
                  {s.num} // STAGE
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {idx * 25}% - {(idx + 1) * 25}%
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">{s.badge}</div>
            </button>
          );
        })}
      </div>

      {/* Clinical Presentation Stage Card */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl relative overflow-hidden bg-white">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-extrabold bg-teal-600 text-white px-3 py-1 rounded-lg">
                  STAGE {stage.num}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold">
                  {stage.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {stage.title}
              </h3>

              <div className="text-xs font-mono text-teal-700 font-semibold">
                {stage.subtitle}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {stage.description}
              </p>

              <div className="p-3.5 bg-teal-50/60 border border-teal-200/70 rounded-xl text-xs font-mono text-slate-700 flex items-center gap-2.5">
                <span className="text-teal-700 font-bold">⚡ Clinical Telemetry Vector:</span>
                <span className="text-slate-900 font-medium">{stage.vectorDetail}</span>
              </div>
            </div>

            {/* Right Column: Clinical Metric Gauge */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
                <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
                  {stage.metricLabel}
                </div>

                <div className="text-4xl sm:text-6xl font-extrabold font-mono text-slate-900 mt-3 tracking-tight">
                  <span className={`bg-gradient-to-r ${stage.accentColor} -webkit-background-clip-text text-transparent`}>
                    {stage.metricValue}
                  </span>
                </div>

                <div className="text-xs font-mono text-teal-700 mt-2 font-semibold">
                  {stage.metricUnit}
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full mt-6 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-500 rounded-full"
                    style={{ width: `${(activeStageIdx + 1) * 25}%` }}
                  />
                </div>
              </div>

              <a
                href="/contact"
                className="w-full text-center py-4 rounded-2xl bg-teal-600 text-white font-extrabold text-xs sm:text-sm hover:bg-teal-700 transition shadow-lg shadow-teal-600/20"
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
