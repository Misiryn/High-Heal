import React, { useState, useEffect } from 'react';

export default function BookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('Sports Injury (ACL, Meniscus, Strain)');
  const [timing, setTiming] = useState('Morning (8:00 AM — 12:00 PM)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlReason = urlParams.get('reason');
      if (urlReason) {
        setReason(urlReason);
      }
    }
  }, []);

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill in your name and phone number to continue.');
      return;
    }

    const message = `Hello High Heal Clinic!%0A%0A*New Appointment Request*%0A• *Patient Name:* ${encodeURIComponent(name)}%0A• *Phone:* ${encodeURIComponent(phone)}%0A• *Condition / Reason:* ${encodeURIComponent(reason)}%0A• *Preferred Slot:* ${encodeURIComponent(timing)}%0A• *Clinical Notes:* ${encodeURIComponent(notes || 'None')}%0A%0APlease confirm availability for this slot.`;

    const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
      <div className="mb-6">
        <span className="badge-tech text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider font-semibold">
          Direct Patient Intake
        </span>
        <h3 className="text-2xl font-bold text-white mt-2">
          Schedule Clinical Evaluation
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Every consultation is a dedicated 45–60 minute comprehensive 1-on-1 assessment with our sports physio specialist.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center font-bold text-xl">
            ✓
          </div>
          <h4 className="text-lg font-bold text-white">WhatsApp Consultation Triggered!</h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Your clinical details have been populated. Our coordinator will confirm your exact consultation timing within 2 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-emerald-400 underline pt-2"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleWhatsAppBooking} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 XXXXX"
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Primary Medical / Physical Complaint *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Sports Injury (ACL, Meniscus, Strain)">Sports Injury (ACL, Meniscus, Ligament, Muscle Strain)</option>
              <option value="Lumbar Spine & Sciatica Decompression">Lumbar Spine & Sciatica Decompression</option>
              <option value="Cervical Neck & Posture Realignment">Cervical Neck & Posture Realignment</option>
              <option value="Post-Operative Orthopedic Rehabilitation">Post-Operative Orthopedic Rehabilitation</option>
              <option value="Biomechanical 3D Gait Analysis">Biomechanical 3D Gait & Running Analysis</option>
              <option value="Shoulder / Rotator Cuff Impingement">Shoulder / Rotator Cuff Impingement</option>
              <option value="Corporate Ergonomic Audit / Workshop">Corporate Ergonomic Audit / Workshop</option>
              <option value="General Physical Therapy Consultation">General Physical Therapy Consultation</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Preferred Consultation Timing
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                'Morning (8:00 AM — 12:00 PM)',
                'Afternoon (12:00 PM — 4:00 PM)',
                'Evening (4:00 PM — 8:30 PM)'
              ].map((slot) => (
                <label
                  key={slot}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                    timing === slot
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-white font-medium'
                      : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="timingSlot"
                    checked={timing === slot}
                    onChange={() => setTiming(slot)}
                    className="accent-emerald-400"
                  />
                  <span>{slot.split(' ')[0]}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Brief Symptoms / Prior Scans (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Right knee popped while playing badminton 3 days ago. MRI showed Grade 2 ACL sprain..."
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm hover:opacity-95 transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed via Direct WhatsApp Confirmation</span>
            <span>💬 →</span>
          </button>

          <p className="text-[11px] text-center text-slate-500 mt-2">
            🔒 Medical privacy guaranteed. We never share patient records with third parties.
          </p>
        </form>
      )}
    </div>
  );
}
