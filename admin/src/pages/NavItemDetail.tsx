import { useEffect, useState } from 'react';
import type { NavItem, Title } from '../../../common/types';
import { getJSON, sendJSON, delJSON } from '../lib/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function NavItemDetail() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [item, setItem] = useState<NavItem | null>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [mainTitle, setMainTitle] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newOrder, setNewOrder] = useState<number | ''>('');
  const [saving, setSaving] = useState(false);

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

  function addTitle() {
    setShowAdd(true);
    setNewTitle('');
    setNewOrder((titles?.length || 0) + 1);
  }

  async function saveNewTitle() {
    const title = newTitle.trim();
    if (!title) {
      alert('Please enter a title');
      return;
    }
    const order = typeof newOrder === 'number' && !Number.isNaN(newOrder) ? newOrder : (titles?.length || 0) + 1;
    try {
      setSaving(true);
      await sendJSON<Title>(`/nav-items/${id}/titles`, { title, order }, 'POST');
      const refreshed = await getJSON<Title[]>(`/nav-items/${id}/titles`);
      setTitles(refreshed);
      setShowAdd(false);
    } catch {
      alert('Failed to add title. Please ensure you are logged in.');
    } finally {
      setSaving(false);
    }
  }

  async function removeTitle(tid: string) {
    if (!confirm('Delete this title?')) return;
    await delJSON(`/titles/${tid}`);
    setTitles((prev) => prev.filter((t) => t._id !== tid));
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={() => navigate('/admin/nav-items')}>← Back to Nav Items</button>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Main Title</div>
          {item && (
            <button
              className="btn"
              onClick={async () => {
                if (!confirm('Delete this head title and all its titles/subtitles?')) return;
                await delJSON(`/nav-items/${id}`);
                navigate('/admin/nav-items');
              }}
              style={{ color: '#DC2626' }}
            >
              Delete
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <input className="input" style={{ flex: 1 }} value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} />
          <button className="btn primary" onClick={saveMainTitle}>Save</button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Titles</div>
          {!showAdd ? (
            <button className="btn primary" onClick={addTitle}>Add Title</button>
          ) : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input className="input" placeholder="Title name" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ width: 260 }} />
              <input className="input" placeholder="Order" type="number" value={newOrder} onChange={(e) => setNewOrder(e.target.value === '' ? '' : Number(e.target.value))} style={{ width: 110 }} />
              <button className="btn success" onClick={saveNewTitle} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <button className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          )}
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
                  <button className="btn" onClick={() => navigate(`/admin/titles/${t._id}`)} style={{ color: '#0f4260', fontWeight: 500 }}>Edit</button>
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
