import { useEffect, useState } from 'react';
import type { Employee } from '../../../common/types';
import { getJSON, sendForm } from '../lib/api';

export default function EmployeeDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const isNew = id === 'new';
  const [emp, setEmp] = useState<Employee | null>(() => (isNew ? ({ name: '', email: '', position: '', department: '', phone: '' } as Employee) : null));
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    if (isNew) return;
    getJSON<Employee>(`/employees/${id}`).then((data) => {
      setEmp(data);
      setPreview(data.photoUrl);
    });
  }, [id, isNew]);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (!emp) return;
    const form = new FormData();
    Object.entries(emp).forEach(([k, v]) => {
      if (v !== undefined && v !== null && k !== '_id') form.append(k, String(v));
    });
    const input = document.getElementById('photoInput') as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (file) form.append('photo', file);
    if (id === 'new') {
      await sendForm<Employee>(`/employees`, form, 'POST');
      alert('Employee created');
      onBack();
      return;
    }
    const updated = await sendForm<Employee>(`/employees/${id}`, form, 'PUT');
    setEmp(updated);
    alert('Employee saved');
  }

  if (!emp) return <div>Loading...</div>;

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={onBack}>← Back to Employees</button>
      <div className="grid-2">
        <div className="card">
          <div style={{ width: 96, height: 96, borderRadius: 999, background: '#EEF2FF', color: '#4F46E5', display: 'grid', placeItems: 'center', overflow: 'hidden', fontSize: 24 }}>
            {preview ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (emp.name?.[0] || 'A')}
          </div>
          <div style={{ marginTop: 12 }}>
            <label>
              <input id="photoInput" type="file" accept="image/*" onChange={handlePhotoChange} hidden />
              <span className="btn">Upload Photo</span>
            </label>
          </div>
          <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
            <input className="input" value={emp.name} onChange={(e) => setEmp({ ...emp!, name: e.target.value })} />
            <input className="input" value={emp.email} onChange={(e) => setEmp({ ...emp!, email: e.target.value })} />
            <input className="input" value={emp.position} onChange={(e) => setEmp({ ...emp!, position: e.target.value })} />
            <input className="input" value={emp.department} onChange={(e) => setEmp({ ...emp!, department: e.target.value })} />
            <input className="input" value={emp.phone || ''} onChange={(e) => setEmp({ ...emp!, phone: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="btn primary" onClick={handleSave}>Save</button>
          </div>
        </div>
        <div className="card">
          <div className="grid-2" style={{ fontSize: 14 }}>
            <div>
              <div style={{ color: '#6B7280' }}>Join Date</div>
              <div>{emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : '-'}</div>
            </div>
            <div>
              <div style={{ color: '#6B7280' }}>Department</div>
              <div>{emp.department}</div>
            </div>
            <div>
              <div style={{ color: '#6B7280' }}>Manager</div>
              <div>{emp.manager || '—'}</div>
            </div>
            <div>
              <div style={{ color: '#6B7280' }}>Salary</div>
              <div>{emp.salary || '—'}</div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 4 }}>Bio</div>
            <textarea className="input" rows={4} value={emp.bio || ''} onChange={(e) => setEmp({ ...emp!, bio: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
}
