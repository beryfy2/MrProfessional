import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Employee } from '../../../common/types';
import { getJSON, sendForm } from '../lib/api';

export default function EmployeeDetail() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isNew = id === 'new';

  const [emp, setEmp] = useState<Employee | null>(() =>
    isNew
      ? ({
          firstName: '',
          lastName: '',
          name: '',
          email: '',
          position: '',
          designation: '',
          department: '',
          phone: '',
          address: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          gender: '',
          bloodGroup: '',
          maritalStatus: '',
          bio: '',
          dob: '',
          joinDate: '',
          manager: '',
          salary: '',
          employeeId: '',
          employmentType: '',
          workLocation: ''
        } as Employee)
      : null
  );

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

    const missing = required
      .filter(([, v]) => !String(v || '').trim())
      .map(([k]) => k);

    const nameCandidate =
      `${(emp.firstName || '').trim()} ${(emp.lastName || '').trim()}`.trim() ||
      (emp.name || '').trim();

    if (!nameCandidate) missing.unshift('Name');

    if (missing.length > 0) {
      alert(`Please fill required fields: ${missing.join(', ')}`);
      return;
    }

    const form = new FormData();
    Object.entries(emp).forEach(([k, v]) => {
      if (v !== undefined && v !== null && k !== '_id') {
        form.append(k, String(v));
      }
    });

    const combinedName = `${emp.firstName || ''}${
      emp.firstName && emp.lastName ? ' ' : ''
    }${emp.lastName || ''}`.trim();

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
      alert('Failed to save employee.');
    } finally {
      setSaving(false);
    }
  }

  if (!emp) return <div>Loading...</div>;

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={() => navigate('/admin/employees')}>
        ← Back to Employees
      </button>

      {/* PHOTO */}
      <div className="grid-1-2">
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 16,
            background: '#EEF2FF',
            color: '#4F46E5',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
            fontSize: 28
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            emp.firstName?.[0] || emp.name?.[0] || 'A'
          )}
        </div>

        <label>
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            hidden
          />
          <span className="btn">Upload Photo</span>
        </label>

        <div style={{ color: '#6B7280', fontSize: 12 }}>
          Square image, at least 400×400px
        </div>
      </div> {/* ✅ THIS CLOSING DIV FIXES THE ERROR */}

      {/* CONTACT INFORMATION */}
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>
          Contact Information
        </div>

        <div className="grid-2">
          <input
            className="input"
            placeholder="Email Address"
            value={emp.email || ''}
            onChange={(e) => setEmp({ ...emp, email: e.target.value })}
          />
          <input
            className="input"
            placeholder="Phone Number"
            value={emp.phone || ''}
            onChange={(e) => setEmp({ ...emp, phone: e.target.value })}
          />
        </div>
      </div>

      {/* SAVE */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          className="btn primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Employee'}
        </button>
        <button className="btn" onClick={() => navigate('/admin/employees')}>
          Cancel
        </button>
      </div>
    </div>
  );
}
