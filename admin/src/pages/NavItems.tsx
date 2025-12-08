import { useEffect, useMemo, useState } from 'react';
import type { NavItem } from '../../../common/types';
import { getJSON, sendJSON } from '../lib/api';

export default function NavItems({ onEdit }: { onEdit: (id: string) => void }) {
  const [items, setItems] = useState<NavItem[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    getJSON<NavItem[]>('/nav-items').then(setItems);
  }, []);

  const filtered = useMemo(() => items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())), [items, q]);

  async function handleAdd() {
    const name = prompt('New Nav Item name');
    if (!name) return;
    try {
      const body = { name, slug: name.toLowerCase().replace(/\s+/g, '-'), order: items.length + 1 };
      const created = await sendJSON<NavItem>('/nav-items', body, 'POST');
      setItems((prev) => [...prev, created]);
    } catch {
      alert('Failed to add nav item. It may already exist.');
    }
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>Navigation Items</div>
        <button className="btn primary" onClick={handleAdd}>+ Add Nav Item</button>
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
                <td className="td"><button className="btn" onClick={() => onEdit(i._id!)} style={{ color: '#0f4260', fontWeight: 500 }}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
