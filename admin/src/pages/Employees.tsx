import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJSON } from '../lib/api';
import type { Employee } from '../../../common/types';

export default function Employees() {
  const navigate = useNavigate();
  const [list, setList] = useState<Employee[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    getJSON<Employee[]>('/employees').then(setList);
  }, []);

  const filtered = useMemo(() => list.filter((e) => e.name.toLowerCase().includes(q.toLowerCase())), [list, q]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Employees</h1>
        <p className="page-subtitle">Manage your team members</p>
        <button className="btn primary" onClick={() => navigate('/admin/employees/new')}>+ Add Employee</button>
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
                  <button className="btn" onClick={() => navigate(`/admin/employees/${e._id}`)} style={{ color: '#0f4260', fontWeight: 500 }}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
