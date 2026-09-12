import React, { useState } from 'react';

export default function CorporateCalculator() {
  const [employees, setEmployees] = useState<number>(75);

  const sickDaysSaved = Math.round(employees * 2.1);
  const productivitySavings = Math.round(employees * 14500);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="badge-medical text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider font-semibold">
            Health Economics ROI Model
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Calculate Workplace Ergonomics Impact
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            See how targeted workstation ergonomics and spinal care directly cut absenteeism and prevent chronic RSI injuries in your workforce.
          </p>
        </div>
        <div className="text-xs font-mono text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-xl border border-teal-200 font-semibold">
          Data Model v2.4
        </div>
      </div>

      <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-8">
        {/* Slider Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="corp-slider" className="text-sm font-semibold text-slate-800">
              Select Total Company / Department Headcount:
            </label>
            <span className="text-xl font-bold font-mono text-teal-700 bg-teal-50 px-4 py-1 rounded-xl border border-teal-200">
              {employees} Employees
            </span>
          </div>

          <input
            id="corp-slider"
            type="range"
            min="15"
            max="1000"
            step="5"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />

          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
            <span>15 Staff (Startup)</span>
            <span>250 Staff (Mid-Market)</span>
            <span>1,000+ Staff (Enterprise)</span>
          </div>
        </div>

        {/* Dynamic ROI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-mono text-slate-500 uppercase">
              Spine & RSI Sick Days Saved
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono mt-2">
              {sickDaysSaved} <span className="text-sm font-sans font-normal text-slate-500">Days / Yr</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Through early cervical & lumbar strain mitigation.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-mono text-teal-700 uppercase font-semibold">
              Net Productivity Restored
            </span>
            <div className="text-3xl font-extrabold text-teal-700 font-mono mt-2">
              ₹ {productivitySavings.toLocaleString('en-IN')}+
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Based on median knowledge-worker output benchmarks.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-mono text-sky-700 uppercase font-semibold">
              Ergonomic Wellness Index
            </span>
            <div className="text-3xl font-extrabold text-sky-700 font-mono mt-2">
              +48.5%
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Self-reported reduction in end-of-day physical fatigue.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-600">
            ✓ Includes onsite workstation audits, group posture workshops, and executive retainer slots.
          </div>
          <a
            href={`/contact?reason=Corporate%20Wellness%20(${employees}%20Staff)`}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition shadow-md shadow-teal-600/20 whitespace-nowrap"
          >
            Request Corporate Proposal for {employees} Staff →
          </a>
        </div>
      </div>
    </div>
  );
}
