import { useEffect, useMemo, useState } from 'react';
import type { NavItem } from '../../../common/types';
import { getJSON, sendJSON, delJSON } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function NavItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState<NavItem[]>([]);
  const [q, setQ] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newOrder, setNewOrder] = useState<number | ''>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getJSON<NavItem[]>('/nav-items').then(setItems);
  }, []);

  const filtered = useMemo(() => items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())), [items, q]);

  async function handleAdd() {
    setShowAdd(true);
    setNewName('');
    setNewOrder(items.length + 1);
  }

  async function saveNewItem() {
    const name = newName.trim();
    if (!name) {
      alert('Please enter a name');
      return;
    }
    const order = typeof newOrder === 'number' && !Number.isNaN(newOrder) ? newOrder : items.length + 1;
    const slug = name.toLowerCase().replace(/\\s+/g, '-');
    if (items.some((i) => i.slug === slug)) {
      alert('A nav item with the same slug already exists.');
      return;
    }
    try {
      setSaving(true);
      await sendJSON<NavItem>('/nav-items', { name, slug, order }, 'POST');
      const refreshed = await getJSON<NavItem[]>('/nav-items');
      setItems(refreshed);
      setShowAdd(false);
    } catch {
      alert('Failed to add nav item. Please ensure you are logged in and the name is unique.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>Navigation Items</div>
        {!showAdd ? (
          <button className="btn primary" onClick={handleAdd}>+ Add Nav Item</button>
        ) : (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              className="input"
              placeholder="Item name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ width: 240 }}
            />
            <input
              className="input"
              placeholder="Order"
              type="number"
              value={newOrder}
              onChange={(e) => setNewOrder(e.target.value === '' ? '' : Number(e.target.value))}
              style={{ width: 110 }}
            />
            <button className="btn success" onClick={saveNewItem} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        )}
      </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search navigation items..." className="input" />
        <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Order</th>
              <th className="th">Name</th>
              <th className="th">ID</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i._id}>
                <td className="td"><div className="pill">{i.order}</div></td>
                <td className="td">{i.name}</td>
                <td className="td">{i.slug}</td>
                <td className="td" style={{ display: 'flex', gap: 8 }}>
                  <button className="btn" onClick={() => navigate(`/admin/nav-items/${i._id}`)} style={{ color: '#0f4260', fontWeight: 500 }}>Edit</button>
                  <button
                    className="btn"
                    onClick={async () => {
                      if (!confirm('Delete this head title and all its titles/subtitles?')) return;
                      await delJSON(`/nav-items/${i._id}`);
                      const refreshed = await getJSON<NavItem[]>('/nav-items');
                      setItems(refreshed);
                    }}
                    style={{ color: '#DC2626' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
