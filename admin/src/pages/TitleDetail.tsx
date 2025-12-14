import { useEffect, useState } from 'react';
import type { Title, Subtitle } from '../../../common/types';
import { getJSON, sendJSON, delJSON } from '../lib/api';

export default function TitleDetail({ id, onBack, onEditSubtitle }: { id: string; onBack: (navItemId: string) => void; onEditSubtitle: (sid: string) => void }) {
  const [t, setT] = useState<Title | null>(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [subs, setSubs] = useState<Subtitle[]>([]);

  useEffect(() => {
    getJSON<Title>(`/titles/${id}`).then((ti) => {
      setT(ti);
      setName(ti.title);
      setContent(ti.content || '');
    });
    getJSON<Subtitle[]>(`/titles/${id}/subtitles`).then(setSubs);
  }, [id]);

  async function saveTitle() {
    if (!t) return;
    const updated = await sendJSON<Title>(`/titles/${id}`, { title: name, content }, 'PUT');
    setT(updated);
    alert('Title saved');
  }

  async function addSubtitle() {
    const s = prompt('Subtitle');
    if (!s) return;
    const created = await sendJSON<Subtitle>(`/titles/${id}/subtitles`, { title: s }, 'POST');
    setSubs((prev) => [created, ...prev]);
  }

  async function removeSubtitle(sid: string) {
    if (!confirm('Delete this subtitle?')) return;
    await delJSON(`/subtitles/${sid}`);
    setSubs((prev) => prev.filter((x) => x._id !== sid));
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={() => t && onBack(String(t.navItem))}>← Back to Nav Item</button>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Title</div>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="input" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
        <div>
          <button className="btn primary" onClick={saveTitle}>Save</button>
        </div>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Subtitles</div>
          <button className="btn primary" onClick={addSubtitle}>Add Subtitle</button>
        </div>
        {subs.length === 0 ? (
          <div style={{ color: '#6B7280', marginTop: 12 }}>No subtitles yet</div>
        ) : (
          <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
            {subs.map((s) => (
              <div key={s._id} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{(s.content || '').slice(0, 80)}</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn" onClick={() => onEditSubtitle(s._id!)} style={{ color: '#0f4260', fontWeight: 500 }}>Edit</button>
                  <button className="btn" onClick={() => removeSubtitle(s._id!)} style={{ color: '#DC2626' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

