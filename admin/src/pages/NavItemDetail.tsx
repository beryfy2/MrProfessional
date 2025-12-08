import { useEffect, useState } from 'react';
import type { NavItem, Subtitle } from '../../../common/types';
import { getJSON, sendJSON, delJSON } from '../lib/api';

export default function NavItemDetail({ id, onBack, onEditSubtitle }: { id: string; onBack: () => void; onEditSubtitle: (sid: string) => void }) {
  const [item, setItem] = useState<NavItem | null>(null);
  const [subs, setSubs] = useState<Subtitle[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getJSON<NavItem>(`/nav-items/${id}`).then((i) => {
      setItem(i);
      setTitle(i.name);
    });
    getJSON<Subtitle[]>(`/nav-items/${id}/subtitles`).then(setSubs);
  }, [id]);

  async function saveTitle() {
    if (!item) return;
    const updated = await sendJSON<NavItem>(`/nav-items/${id}`, { name: title, slug: title.toLowerCase().replace(/\s+/g, '-') }, 'PUT');
    setItem(updated);
    alert('Title saved');
  }

  async function addSubtitle() {
    const t = prompt('Subtitle title');
    if (!t) return;
    const created = await sendJSON<Subtitle>(`/nav-items/${id}/subtitles`, { title: t }, 'POST');
    setSubs((prev) => [created, ...prev]);
  }

  async function removeSubtitle(sid: string) {
    if (!confirm('Delete this subtitle?')) return;
    await delJSON(`/subtitles/${sid}`);
    setSubs((prev) => prev.filter((s) => s._id !== sid));
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={onBack}>← Back to Nav Items</button>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Title</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <input className="input" style={{ flex: 1 }} value={title} onChange={(e) => setTitle(e.target.value)} />
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
                  <div style={{ fontSize: 13, color: '#6B7280' }}>Questions: {s.questions?.length || 0}</div>
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
