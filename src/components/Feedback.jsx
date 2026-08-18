import { useState, useEffect } from 'react';
import config from '../config.js';
import { Mail } from 'lucide-react';

export default function Feedback() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedPref = localStorage.getItem('feedback_last');
    if (savedPref) {
      const obj = JSON.parse(savedPref);
      setName(obj.name || '');
      setEmail(obj.email || '');
    }
  }, []);

  async function submit(e) {
    e && e.preventDefault();
    const payload = { name, email, message, ts: Date.now() };

    if (config.feedback && config.feedback.endpoint) {
      try {
        const res = await fetch(config.feedback.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Network response not ok');
        setSaved(true);
        setMessage('');
      } catch (err) {
        // fallback to local storage
        saveLocally(payload);
        setSaved(true);
      }
    } else if (config.feedback && config.feedback.storeLocal) {
      saveLocally(payload);
      setSaved(true);
      setMessage('');
    }

    localStorage.setItem('feedback_last', JSON.stringify({ name, email }));
  }

  function saveLocally(payload) {
    const prev = JSON.parse(localStorage.getItem('feedback_store') || '[]');
    prev.push(payload);
    localStorage.setItem('feedback_store', JSON.stringify(prev));
  }

  return (
    <>
      <button
        className="icon-btn"
        onClick={() => setOpen(true)}
        style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 60 }}
        aria-label="Open feedback"
      >
        <Mail size={16} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 70 }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={() => setOpen(false)} />
          <form
            onSubmit={submit}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, width: 420, maxWidth: '94%' }}
          >
            <h3 style={{ marginBottom: 8 }}>Send feedback</h3>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 6 }}>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 6 }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 6 }}>Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
            {saved && <div style={{ marginTop: 10, color: 'var(--mint)' }}>Thanks — saved.</div>}
          </form>
        </div>
      )}
    </>
  );
}
