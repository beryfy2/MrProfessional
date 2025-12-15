import { useEffect, useState } from 'react';
import type { NavItem, Title } from '../../../common/types';
import { getJSON, sendJSON, delJSON } from '../lib/api';

export default function NavItemDetail({ id, onBack, onEditTitle }: { id: string; onBack: () => void; onEditTitle: (tid: string) => void }) {
  const [item, setItem] = useState<NavItem | null>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [mainTitle, setMainTitle] = useState('');

  useEffect(() => {
    getJSON<NavItem>(`/nav-items/${id}`).then((i) => {
      setItem(i);
      setMainTitle(i.name);
    });
    getJSON<Title[]>(`/nav-items/${id}/titles`).then(setTitles);
  }, [id]);

  async function saveMainTitle() {
    if (!item) return;
    const updated = await sendJSON<NavItem>(`/nav-items/${id}`, { name: mainTitle, slug: mainTitle.toLowerCase().replace(/\s+/g, '-') }, 'PUT');
    setItem(updated);
    alert('Main title saved');
  }

  async function addTitle() {
    const t = prompt('Title');
    if (!t) return;
    const created = await sendJSON<Title>(`/nav-items/${id}/titles`, { title: t }, 'POST');
    setTitles((prev) => [created, ...prev]);
  }

  async function removeTitle(tid: string) {
    if (!confirm('Delete this title?')) return;
    await delJSON(`/titles/${tid}`);
    setTitles((prev) => prev.filter((t) => t._id !== tid));
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={onBack}>← Back to Nav Items</button>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Main Title</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <input className="input" style={{ flex: 1 }} value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} />
          <button className="btn primary" onClick={saveMainTitle}>Save</button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Titles</div>
          <button className="btn primary" onClick={addTitle}>Add Title</button>
        </div>
        {titles.length === 0 ? (
          <div style={{ color: '#6B7280', marginTop: 12 }}>No titles yet</div>
        ) : (
          <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
            {titles.map((t) => (
              <div key={t._id} style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{(t.content || '').slice(0, 80)}</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn" onClick={() => onEditTitle(t._id!)} style={{ color: '#0f4260', fontWeight: 500 }}>Edit</button>
                  <button className="btn" onClick={() => removeTitle(t._id!)} style={{ color: '#DC2626' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
