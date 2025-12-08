import { useEffect, useMemo, useState } from 'react';
import { getJSON } from '../lib/api';
import type { Employee } from '../../../common/types';

export default function Employees({ onView, onAdd }: { onView: (id: string) => void; onAdd: () => void }) {
  const [list, setList] = useState<Employee[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    getJSON<Employee[]>('/employees').then(setList);
  }, []);

  const filtered = useMemo(() => list.filter((e) => e.name.toLowerCase().includes(q.toLowerCase())), [list, q]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>Employees</div>
        <button className="btn primary" onClick={onAdd}>+ Add Employee</button>
      </div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search employees..." className="input" />
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Name</th>
              <th className="th">Role</th>
              <th className="th">Contact</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e._id}>
                <td className="td">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="pill">{e.name?.[0]}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{e.name}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>{e.department}</div>
                    </div>
                  </div>
                </td>
                <td className="td">{e.position}</td>
                <td className="td">
                  <div style={{ fontSize: 14 }}>{e.email}</div>
                  <div style={{ fontSize: 14, color: '#6B7280' }}>{e.phone}</div>
                </td>
                <td className="td">
                  <button className="btn" onClick={() => onView(e._id!)} style={{ color: '#0f4260', fontWeight: 500 }}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
