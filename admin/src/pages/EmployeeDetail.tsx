import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Employee } from '../../../common/types';
import { getJSON, sendForm } from '../lib/api';

export default function EmployeeDetail() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isNew = id === 'new';
  const [emp, setEmp] = useState<Employee | null>(() => (isNew ? ({ firstName: '', lastName: '', name: '', email: '', position: '', designation: '', department: '', phone: '', address: '', street: '', city: '', state: '', zip: '', country: '', gender: '', bloodGroup: '', maritalStatus: '', bio: '', dob: '', joinDate: '', manager: '', salary: '', employeeId: '', employmentType: '', workLocation: '' } as Employee) : null));
  const [preview, setPreview] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

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
    const required = [
      ['Email', emp.email],
      ['Position', emp.position],
      ['Department', emp.department]
    ];
    const missing = required.filter(([, v]) => !String(v || '').trim()).map(([k]) => k);
    const nameCandidate = `${(emp.firstName || '').trim()} ${(emp.lastName || '').trim()}`.trim() || (emp.name || '').trim();
    if (!nameCandidate) missing.unshift('Name');
    if (missing.length > 0) {
      alert(`Please fill required fields: ${missing.join(', ')}`);
      return;
    }
    const form = new FormData();
    Object.entries(emp).forEach(([k, v]) => {
      if (v !== undefined && v !== null && k !== '_id') form.append(k, String(v));
    });
    const combinedName = `${emp.firstName || ''}${emp.firstName && emp.lastName ? ' ' : ''}${emp.lastName || ''}`.trim();
    if (combinedName) form.set('name', combinedName);
    const input = document.getElementById('photoInput') as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (file) form.append('photo', file);
    try {
      setSaving(true);
      if (id === 'new') {
        await sendForm<Employee>(`/employees`, form, 'POST');
        alert('Employee created');
        navigate('/admin/employees');
        return;
      }
      const updated = await sendForm<Employee>(`/employees/${id}`, form, 'PUT');
      setEmp(updated);
      alert('Employee saved');
    } catch {
      alert('Failed to save employee. Ensure you are logged in and required fields are filled.');
    } finally {
      setSaving(false);
    }
  }

  if (!emp) return <div>Loading...</div>;

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={() => navigate('/admin/employees')}>← Back to Employees</button>
      <div className="grid-1-2">
        <div className="card" style={{ display: 'grid', gap: 12 }}>
          <div style={{ width: 120, height: 120, borderRadius: 16, background: '#EEF2FF', color: '#4F46E5', display: 'grid', placeItems: 'center', overflow: 'hidden', fontSize: 28 }}>
            {preview ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (emp.firstName?.[0] || emp.name?.[0] || 'A')}
          </div>
          <label>
            <input id="photoInput" type="file" accept="image/*" onChange={handlePhotoChange} hidden />
            <span className="btn">Upload Photo</span>
          </label>
          <div style={{ color: '#6B7280', fontSize: 12 }}>Square image, at least 400x400px</div>
        </div>
        <div className="card" style={{ display: 'grid', gap: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Personal Information</div>
          <div className="grid-2">
            <input className="input" placeholder="First Name" value={emp.firstName || ''} onChange={(e) => setEmp({ ...emp!, firstName: e.target.value })} />
            <input className="input" placeholder="Last Name" value={emp.lastName || ''} onChange={(e) => setEmp({ ...emp!, lastName: e.target.value })} />
          </div>
          <div style={{ color: '#6B7280', fontSize: 12 }}>Enter first and last name</div>
          <div className="grid-2">
            <input className="input" type="date" value={(emp.dob ? new Date(emp.dob).toISOString().slice(0,10) : '')} onChange={(e) => setEmp({ ...emp!, dob: e.target.value })} />
            <select className="input" value={emp.gender || ''} onChange={(e) => setEmp({ ...emp!, gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="grid-2">
            <select className="input" value={emp.bloodGroup || ''} onChange={(e) => setEmp({ ...emp!, bloodGroup: e.target.value })}>
              <option value="">Select Blood Group</option>
              <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
            </select>
            <select className="input" value={emp.maritalStatus || ''} onChange={(e) => setEmp({ ...emp!, maritalStatus: e.target.value })}>
              <option value="">Select Status</option>
              <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Contact Information</div>
        <div className="grid-2">
          <input className="input" placeholder="Email Address" value={emp.email || ''} onChange={(e) => setEmp({ ...emp!, email: e.target.value })} />
          <input className="input" placeholder="Phone Number" value={emp.phone || ''} onChange={(e) => setEmp({ ...emp!, phone: e.target.value })} />
        </div>
        <div style={{ color: '#6B7280', fontSize: 12 }}>Use a valid work email and phone</div>
        <div className="grid-2">
          <input className="input" placeholder="Street Address" value={emp.street || ''} onChange={(e) => setEmp({ ...emp!, street: e.target.value })} />
          <input className="input" placeholder="City" value={emp.city || ''} onChange={(e) => setEmp({ ...emp!, city: e.target.value })} />
        </div>
        <div className="grid-2">
          <input className="input" placeholder="State/Province" value={emp.state || ''} onChange={(e) => setEmp({ ...emp!, state: e.target.value })} />
          <input className="input" placeholder="ZIP/Postal Code" value={emp.zip || ''} onChange={(e) => setEmp({ ...emp!, zip: e.target.value })} />
        </div>
        <input className="input" placeholder="Country" value={emp.country || ''} onChange={(e) => setEmp({ ...emp!, country: e.target.value })} />
      </div>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Employment Details</div>
        <div className="grid-2">
          <input className="input" placeholder="Position" value={emp.position || ''} onChange={(e) => setEmp({ ...emp!, position: e.target.value })} />
          <input className="input" placeholder="Department" value={emp.department || ''} onChange={(e) => setEmp({ ...emp!, department: e.target.value })} />
        </div>
        <div className="grid-2">
          <input className="input" placeholder="Employee ID" value={emp.employeeId || ''} onChange={(e) => setEmp({ ...emp!, employeeId: e.target.value })} />
          <input className="input" type="date" value={(emp.joinDate ? new Date(emp.joinDate).toISOString().slice(0,10) : '')} onChange={(e) => setEmp({ ...emp!, joinDate: e.target.value })} />
        </div>
        <div className="grid-2">
          <input className="input" placeholder="Designation" value={emp.designation || ''} onChange={(e) => setEmp({ ...emp!, designation: e.target.value })} />
          <input className="input" placeholder="Work Location" value={emp.workLocation || ''} onChange={(e) => setEmp({ ...emp!, workLocation: e.target.value })} />
        </div>
        <div className="grid-2">
          <select className="input" value={emp.employmentType || ''} onChange={(e) => setEmp({ ...emp!, employmentType: e.target.value })}>
            <option value="">Employment Type</option>
            <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Intern</option>
          </select>
          <input className="input" placeholder="Reporting Manager" value={emp.manager || ''} onChange={(e) => setEmp({ ...emp!, manager: e.target.value })} />
        </div>
        <div className="grid-2">
          <input className="input" placeholder="Salary" value={emp.salary || ''} onChange={(e) => setEmp({ ...emp!, salary: e.target.value })} />
          <input className="input" placeholder="Address (optional)" value={emp.address || ''} onChange={(e) => setEmp({ ...emp!, address: e.target.value })} />
        </div>
        <div>
          <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 4 }}>Bio</div>
          <textarea className="input" rows={4} value={emp.bio || ''} onChange={(e) => setEmp({ ...emp!, bio: e.target.value })} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Employee'}</button>
        <button className="btn" onClick={() => navigate('/admin/employees')}>Cancel</button>
      </div>
    </div>
  );
}
