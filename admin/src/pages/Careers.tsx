import { useEffect, useState } from 'react';
import { getJSON, sendJSON, delJSON } from '../lib/api';
import type { Job } from '../../../common/types';
import { useNavigate } from 'react-router-dom';

export default function Careers() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<Job | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [experience, setExperience] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [location, setLocation] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [qualificationsText, setQualificationsText] = useState('');

  useEffect(() => {
    getJSON<Job[]>('/jobs').then(setJobs);
  }, []);

  function startCreate() {
    setEditing(null);
    setTitle('');
    setDescription('');
    setType('');
    setExperience('');
    setUrgent(false);
    setExperienceLevel('');
    setLocation('');
    setResponsibilitiesText('');
    setQualificationsText('');
  }

  function startEdit(j: Job) {
    setEditing(j);
    setTitle(j.title || '');
    setDescription(j.description || '');
    setType(j.type || '');
    setExperience(j.experience || '');
    setUrgent(!!j.urgent);
    setExperienceLevel(j.experienceLevel || '');
    setLocation(j.location || '');
    setResponsibilitiesText(Array.isArray(j.responsibilities) ? j.responsibilities.join('\n') : '');
    setQualificationsText(Array.isArray(j.qualifications) ? j.qualifications.join('\n') : '');
  }

  async function removeJob(id: string) {
    if (!confirm('Delete this job?')) return;
    await delJSON(`/jobs/${id}`);
    setJobs((prev) => prev.filter((x) => x._id !== id));
  }

  async function saveJob() {
    if (!title.trim() || !description.trim()) {
      alert('Title and description are required');
      return;
    }
    const responsibilities = responsibilitiesText.split('\n').map((s) => s.trim()).filter(Boolean);
    const qualifications = qualificationsText.split('\n').map((s) => s.trim()).filter(Boolean);
    const payload = {
      title: title.trim(),
      description: description.trim(),
      type: type.trim(),
      experience: experience.trim(),
      urgent,
      experienceLevel: experienceLevel.trim(),
      location: location.trim(),
      responsibilities,
      qualifications
    };
    if (editing && editing._id) {
      const updated = await sendJSON<Job>(`/jobs/${editing._id}`, payload, 'PUT');
      setJobs((prev) => prev.map((x) => (x._id === updated._id ? updated : x)));
      setEditing(null);
    } else {
      const created = await sendJSON<Job>('/jobs', payload, 'POST');
      setJobs((prev) => [created, ...prev]);
    }
    setTitle('');
    setDescription('');
    setType('');
    setExperience('');
    setUrgent(false);
    setExperienceLevel('');
    setLocation('');
    setResponsibilitiesText('');
    setQualificationsText('');
  }

  const filtered = jobs.filter((j) => j.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="page">
      <div className="page-header">
        <h1>Careers</h1>
        <p className="page-subtitle">Manage job openings shown on the Careers page</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => navigate('/admin/dashboard')}>← Back</button>
          <button className="btn primary" onClick={startCreate}>+ Add Job</button>
        </div>
      </div>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{editing ? 'Edit Job' : 'Create Job'}</div>
          {editing && (
            <button className="btn" onClick={() => { setEditing(null); setTitle(''); setDescription(''); setType(''); setExperience(''); setUrgent(false); }}>Cancel</button>
          )}
        </div>
        <input className="input" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input className="input" placeholder="Employment Type (e.g., Full-time)" value={type} onChange={(e) => setType(e.target.value)} />
          <input className="input" placeholder="Experience (e.g., 2-4 years)" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input className="input" placeholder="Experience Level (e.g., Junior/Mid/Senior)" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} />
          <input className="input" placeholder="Location (e.g., New Delhi)" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
          <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
          Urgent Hiring
        </label>
        <textarea className="input" rows={4} placeholder="Key Responsibilities (one per line)" value={responsibilitiesText} onChange={(e) => setResponsibilitiesText(e.target.value)} />
        <textarea className="input" rows={4} placeholder="Qualifications & Skills (one per line)" value={qualificationsText} onChange={(e) => setQualificationsText(e.target.value)} />
        <textarea className="input" rows={4} placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div>
          <button className="btn primary" onClick={saveJob}>{editing ? 'Save Changes' : 'Create Job'}</button>
        </div>
      </div>

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs..." className="input" />

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Title</th>
              <th className="th">Type</th>
              <th className="th">Experience</th>
              <th className="th">Urgent</th>
              <th className="th">Description</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((j) => (
              <tr key={j._id}>
                <td className="td">{j.title}</td>
                <td className="td">{j.type || '-'}</td>
                <td className="td">{j.experience || '-'}</td>
                <td className="td">{j.urgent ? 'Yes' : 'No'}</td>
                <td className="td">{j.description.slice(0, 120)}</td>
                <td className="td" style={{ display: 'flex', gap: 8 }}>
                  <button className="btn" onClick={() => startEdit(j)} style={{ color: '#0f4260', fontWeight: 500 }}>Edit</button>
                  <button className="btn" onClick={() => removeJob(j._id!)} style={{ color: '#DC2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
