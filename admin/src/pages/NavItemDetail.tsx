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
    const updated = await sendJSON<NavItem>(
      `/nav-items/${id}`,
      { name: mainTitle, slug: mainTitle.toLowerCase().replace(/\s+/g, '-') },
      'PUT'
    );
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

    const order =
      typeof newOrder === 'number' && !Number.isNaN(newOrder)
        ? newOrder
        : (titles?.length || 0) + 1;

    try {
      setSaving(true);
      await sendJSON<Title>(`/nav-items/${id}/titles`, { title, order }, 'POST');
      const refreshed = await getJSON<Title[]>(`/nav-items/${id}/titles`);
      setTitles(refreshed);
      setShowAdd(false);
    } catch {
      alert('Failed to add title.');
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
    <div className="page">

      {/* BACK LINK – TOP LEFT (LIKE EMPLOYEES PAGE) */}
      <div style={{ marginBottom: 16 }}>
        <button
          className="btn"
          onClick={() => navigate('/admin/nav-items')}
        >
          ← Back to Nav Items
        </button>
      </div>

      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Nav Item Details</h1>
        <p className="page-subtitle">
          Manage main title and its sub titles
        </p>
      </div>

      {/* MAIN TITLE CARD */}
      <div className="card" style={{ display: 'grid', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h2 style={{ margin: 0 }}>Main Title</h2>

          {item && (
            <button
              className="btn"
              style={{ color: '#ef4444' }}
              onClick={async () => {
                if (!confirm('Delete this nav item and all its titles?')) return;
                await delJSON(`/nav-items/${id}`);
                navigate('/admin/nav-items');
              }}
            >
              Delete
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <input
            className="input"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="btn primary" onClick={saveMainTitle}>
            Save
          </button>
        </div>
      </div>

      {/* TITLES CARD */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}
        >
          <h2 style={{ margin: 0 }}>Titles</h2>

          {!showAdd ? (
            <button className="btn primary" onClick={addTitle}>
              Add Title
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="input"
                placeholder="Title name"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ width: 260 }}
              />
              <input
                className="input"
                type="number"
                placeholder="Order"
                value={newOrder}
                onChange={(e) =>
                  setNewOrder(e.target.value === '' ? '' : Number(e.target.value))
                }
                style={{ width: 110 }}
              />
              <button
                className="btn success"
                onClick={saveNewTitle}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button className="btn" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>

        {titles.length === 0 ? (
          <p className="page-subtitle">No titles added yet</p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {titles.map((t) => (
              <div
                key={t._id}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: 12,
                  padding: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/admin/titles/${t._id}`)}
                >
                  <div style={{ fontWeight: 600 }}>{t.title}</div>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#64748b',
                      marginTop: 4
                    }}
                  >
                    {(t.content || '').slice(0, 80)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="btn"
                    onClick={() => navigate(`/admin/titles/${t._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    style={{ color: '#ef4444' }}
                    onClick={() => removeTitle(t._id!)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
