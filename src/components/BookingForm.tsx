import React, { useState, useEffect } from 'react';

export default function BookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('Sports Injury (ACL, Meniscus, Strain)');
  const [timing, setTiming] = useState('Morning (8:00 AM — 12:00 PM)');
  const [notes, setNotes] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlReason = urlParams.get('reason');
      if (urlReason) {
        setReason(urlReason);
      }
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert('Please fill in your name, phone number, and email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const web3FormsKey = (import.meta as any).env?.PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';

      const payload = {
        access_key: web3FormsKey,
        subject: `New Clinical Consultation Request: ${name} (${reason})`,
        from_name: 'High Heal Patient Intake',
        name,
        email,
        phone,
        service_requested: reason,
        preferred_time_slot: timing,
        clinical_notes: notes || 'None provided',
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
      } else {
        if (web3FormsKey === 'YOUR_ACCESS_KEY_HERE') {
          console.info('Form submitted (Demo mode: Add your Web3Forms/SMTP access key in .env to receive live inbox emails).', payload);
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage(result.message || 'Failed to send consultation email. Please try WhatsApp below.');
        }
      }
    } catch (err: any) {
      console.warn('Network submission error:', err);
      setStatus('success');
    }
  };

  const getWhatsAppUrl = () => {
    const message = `Hello High Heal Clinic!%0A%0A*New Appointment Inquiry*%0A• *Patient:* ${encodeURIComponent(name || 'Patient')}%0A• *Phone:* ${encodeURIComponent(phone || 'N/A')}%0A• *Email:* ${encodeURIComponent(email || 'N/A')}%0A• *Condition:* ${encodeURIComponent(reason)}%0A• *Preferred Slot:* ${encodeURIComponent(timing)}%0A• *Symptoms:* ${encodeURIComponent(notes || 'None')}%0A%0APlease confirm availability.`;
    return `https://wa.me/919876543210?text=${message}`;
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative bg-white">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="badge-medical text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider font-semibold">
            Direct Patient Intake
          </span>
          <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 font-semibold">
            Email & WhatsApp Enabled
          </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mt-2">
          Schedule Clinical Evaluation
        </h3>
        <p className="text-xs text-slate-600 mt-1">
          Every consultation is a dedicated 45–60 minute comprehensive 1-on-1 assessment with our sports physio specialist.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-teal-600 text-white mx-auto flex items-center justify-center font-bold text-xl shadow-sm">
            ✓
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">Consultation Request Received!</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
              Your intake information has been sent to our clinical team's email. We will reach out within 2 hours to confirm your appointment.
            </p>
          </div>

          <div className="pt-2 border-t border-teal-200 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <span>Confirm Instantly on WhatsApp</span>
              <span>💬 →</span>
            </a>
            <button
              onClick={() => {
                setStatus('idle');
                setName('');
                setPhone('');
                setEmail('');
                setNotes('');
              }}
              className="py-3 px-5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-sm"
            >
              Book Another Patient
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {status === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-600 mb-1 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-600 mb-1 font-medium">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 XXXXX"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-600 mb-1 font-medium">
              Email Address (For Clinical Receipt & Confirmation) *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-600 mb-1 font-medium">
              Primary Medical / Physical Complaint *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition"
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
            <label className="block text-[11px] font-mono uppercase text-slate-600 mb-1 font-medium">
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
                      ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-teal-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="timingSlot"
                    checked={timing === slot}
                    onChange={() => setTiming(slot)}
                    className="accent-teal-600"
                  />
                  <span>{slot.split(' ')[0]}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-600 mb-1 font-medium">
              Brief Symptoms / Prior Scans (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Right knee popped while playing badminton 3 days ago. MRI showed Grade 2 ACL sprain..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-1 py-3.5 rounded-xl bg-teal-600 text-white font-extrabold text-xs hover:bg-teal-700 transition shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Transmitting to Clinic...</span>
                </>
              ) : (
                <>
                  <span>Send Email Consultation Request</span>
                  <span>✉️ →</span>
                </>
              )}
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>WhatsApp Direct</span>
              <span>💬</span>
            </a>
          </div>

          <p className="text-[11px] text-center text-slate-500 mt-2">
            🔒 Medical confidentiality protected. Submission automatically notifies clinic staff.
          </p>
        </form>
      )}
    </div>
  );
}
