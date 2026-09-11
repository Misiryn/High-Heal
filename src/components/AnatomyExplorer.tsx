import React, { useState } from 'react';

interface ConditionDetail {
  id: string;
  name: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  symptoms: string[];
  protocols: string[];
  timeline: string;
  testBenchmark: string;
}

const conditions: Record<string, ConditionDetail> = {
  knee: {
    id: 'knee',
    name: 'Knee Joint',
    emoji: '🦵',
    title: 'ACL Reconstruction & Patellofemoral Pain Syndrome',
    subtitle: 'Ligamentous tears, meniscus impingement & patellar maltracking',
    description: 'Specialized kinetic rehabilitation for cruciate ligament sprains, meniscus tears, and runner’s knee. We utilize objective video gait and force-absorption testing before clearance.',
    symptoms: ['Giving way during pivoting', 'Anterior knee pain when taking stairs', 'Joint line swelling & stiffness'],
    protocols: [
      'Biomechanical landing mechanics & valgus reduction',
      'Hamstring-to-quadriceps isometric load progression',
      'Proprioceptive wobble-board & perturbation training',
      'Dry needling to vastus lateralis & IT band fascial release'
    ],
    timeline: '4 — 8 Weeks',
    testBenchmark: 'Limb Symmetry Index > 92%'
  },
  shoulder: {
    id: 'shoulder',
    name: 'Shoulder & Rotator',
    emoji: '💪',
    title: 'Rotator Cuff Tendinopathy & Subacromial Impingement',
    subtitle: 'Supraspinatus tears, labral SLAP lesions & throwing shoulder pain',
    description: 'Comprehensive scapulothoracic rhythm correction and overhead athletic conditioning tailored for cricketers, swimmers, and weightlifters.',
    symptoms: ['Pain when raising arm overhead', 'Night pain when sleeping on affected side', 'Weakness in external rotation'],
    protocols: [
      'Scapular stabilization (Serratus anterior & lower trap)',
      'High-cadence rhythmic stabilization drills',
      'Instrument-Assisted Soft Tissue Mobilization (IASTM)',
      'Kinetic chain power transfer from hips to arm'
    ],
    timeline: '3 — 6 Weeks',
    testBenchmark: 'Full Pain-Free Overhead Clearance'
  },
  spine: {
    id: 'spine',
    name: 'Spine & Lower Back',
    emoji: '🧘',
    title: 'Lumbar Disc Herniation, Sciatica & Facet Syndrome',
    subtitle: 'Nerve root compression & chronic desk-worker spinal stiffness',
    description: 'Decompression manual therapy and deep core neuromuscular re-education designed to alleviate radiating sciatica pain and reinforce the spinal corset.',
    symptoms: ['Sharp pain radiating down glute or leg', 'Inability to sit for more than 20 minutes', 'Morning lower back stiffness'],
    protocols: [
      'Maitland spinal joint mobilization & traction',
      'Directional preference McKenzie directional extension',
      'Transversus abdominis & multifidus core retraining',
      'Standing ergonomic workstation posture recalibration'
    ],
    timeline: '2 — 6 Weeks',
    testBenchmark: '0 Radicular Symptoms on Straight Leg Test'
  },
  ankle: {
    id: 'ankle',
    name: 'Ankle & Achilles',
    emoji: '🦶',
    title: 'Achilles Tendinopathy & Inversion Sprain Recovery',
    subtitle: 'Grade I-III ATFL sprains & insertional tendon thickening',
    description: 'High-load heavy slow resistance (HSR) protocols combined with neuromuscular reactive balance for road runners and court athletes.',
    symptoms: ['Morning heel stiffness during first steps', 'Swelling and bruising around lateral malleolus', 'Instability when changing directions'],
    protocols: [
      'Alfredson eccentric heel drop & heavy loading',
      'Single-leg dynamic hop testing & reactive stabilization',
      'Pneumatic compression lymphatic flushing',
      'Foot strike biomechanics and footwear guidance'
    ],
    timeline: '2 — 5 Weeks',
    testBenchmark: 'Single-Leg Heel Raise > 25 Reps'
  },
  neck: {
    id: 'neck',
    name: 'Neck & Cervical',
    emoji: '👔',
    title: 'Cervical Radiculopathy & Tech-Neck Dysfunction',
    subtitle: 'Forward head posture strain, trap spasm & cervicogenic headache',
    description: 'Targeted deep cervical flexor endurance training and myofascial dry needling for tech workers and executives suffering from screen fatigue.',
    symptoms: ['Suboccipital tension headaches', 'Stiff neck when turning while driving', 'Burning sensation in upper trapezius'],
    protocols: [
      'Deep cervical flexor cranio-cervical flexion drills',
      'Dry needling to levator scapulae & upper trapezius',
      'Thoracic spine extension foam roller mobilizations',
      'Ergonomic display eye-level correction'
    ],
    timeline: '1 — 4 Weeks',
    testBenchmark: 'Cranio-Cervical Endurance > 30s Hold'
  },
  hip: {
    id: 'hip',
    name: 'Hip & Groin',
    emoji: '🏃',
    title: 'Femoroacetabular Impingement (FAI) & Athletic Groin Pain',
    subtitle: 'Adductor strains, labral irritation & pelvic asymmetry',
    description: 'Restoration of hip internal/external rotation and eccentric groin strengthening using proven athletic protocols like Copenhagen exercises.',
    symptoms: ['Groin pain when kicking or sprinting', 'Clicking sensation deep in the hip socket', 'Gluteal fatigue and tight hip flexors'],
    protocols: [
      'Copenhagen eccentric adductor strengthening',
      'Gluteus medius dynamic force production',
      'Hip joint manual distraction & capsule stretch',
      'Multidirectional deceleration drills'
    ],
    timeline: '4 — 7 Weeks',
    testBenchmark: 'Adductor Squeeze Strength Ratio > 90%'
  }
};

export default function AnatomyExplorer() {
  const [selectedKey, setSelectedKey] = useState<string>('knee');
  const activeCondition = conditions[selectedKey];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10">
        <div>
          <span className="badge-tech text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider font-semibold">
            Interactive Diagnostic Navigator
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            Targeted Anatomical Pathologies
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Select a target zone to explore our evidence-based clinical protocols, typical diagnostic signs, and recovery milestones.
          </p>
        </div>
        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20">
          6 Clinical Zones Active
        </div>
      </div>

      {/* Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8 relative z-10">
        {Object.values(conditions).map((item) => {
          const isSelected = item.id === selectedKey;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedKey(item.id)}
              className={`py-3 px-3 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-500/50 shadow-lg shadow-emerald-500/15'
                  : 'bg-slate-900/60 border-white/5 hover:border-emerald-500/30 text-slate-300'
              }`}
            >
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="text-xs font-bold text-white tracking-tight">{item.name}</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                {isSelected ? '● Active' : 'Inspect →'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Diagnostic Card */}
      <div className="bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Condition Overview */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-semibold">
            <span>Zone:</span>
            <span className="text-white">{activeCondition.name}</span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {activeCondition.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            {activeCondition.description}
          </p>

          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2 font-semibold">
              Typical Clinical Presentation:
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5">
              {activeCondition.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Column: Clinical Protocols */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[11px] font-mono uppercase text-cyan-400 block font-semibold tracking-wider">
            Evidence-Based Rehabilitation Protocol
          </span>

          <div className="space-y-2.5">
            {activeCondition.protocols.map((proto, idx) => (
              <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-white/5 flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{proto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Metrics & CTA */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5 space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
              Expected Recovery Arc
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
              {activeCondition.timeline}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">
              Based on adherence to 2–3 guided clinical sessions weekly.
            </p>
          </div>

          <div className="border-t border-emerald-500/20 pt-4">
            <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
              Clearance Benchmark
            </span>
            <div className="text-xs font-bold text-white mt-1">
              {activeCondition.testBenchmark}
            </div>
          </div>

          <a
            href={`/contact?reason=${encodeURIComponent(activeCondition.name)}`}
            className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-xs hover:opacity-95 transition shadow-lg shadow-emerald-500/20"
          >
            Book {activeCondition.name} Consult →
          </a>
        </div>
      </div>
    </div>
  );
}
