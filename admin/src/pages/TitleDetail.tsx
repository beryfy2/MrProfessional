import { useEffect, useState } from 'react';
import type { Title, Subtitle } from '../../../common/types';
import { getJSON, sendJSON, delJSON } from '../lib/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function TitleDetail() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [t, setT] = useState<Title | null>(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [subs, setSubs] = useState<Subtitle[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newSubtitleTitle, setNewSubtitleTitle] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getJSON<Title>(`/titles/${id}`).then((ti) => {
      setT(ti);
      setName(ti.title);
      setContent(ti.content || '');
    });
    getJSON<Subtitle[]>(`/titles/${id}/subtitles`).then(setSubs);
  }, [id]);

  async function saveTitle() {
    if (!t) return;
    const updated = await sendJSON<Title>(`/titles/${id}`, { title: name, content }, 'PUT');
    setT(updated);
    alert('Title saved');
  }

  function addSubtitle() {
    setShowAdd(true);
    setNewSubtitleTitle('');
  }

  async function saveNewSubtitle() {
    const s = newSubtitleTitle.trim();
    if (!s) return;
    try {
      setSaving(true);
      const created = await sendJSON<Subtitle>(`/titles/${id}/subtitles`, { title: s }, 'POST');
      setSubs((prev) => [created, ...prev]);
      setShowAdd(false);
      navigate(`/admin/subtitles/${created._id}`);
    } catch (e) {
      alert('Failed to add subtitle');
    } finally {
      setSaving(false);
    }
  }

  async function removeSubtitle(sid: string) {
    if (!confirm('Delete this subtitle?')) return;
    await delJSON(`/subtitles/${sid}`);
    setSubs((prev) => prev.filter((x) => x._id !== sid));
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={() => t && navigate(`/admin/nav-items/${t.navItem}`)}>← Back to Nav Item</button>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Title</div>
          {t && (
            <button
              className="btn"
              onClick={async () => {
                if (!confirm('Delete this title and all its subtitles?')) return;
                await delJSON(`/titles/${id}`);
                navigate(`/admin/nav-items/${t.navItem}`);
              }}
              style={{ color: '#DC2626' }}
            >
              Delete
            </button>
          )}
        </div>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="input" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
        <div>
          <button className="btn primary" onClick={saveTitle}>Save</button>
        </div>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Subtitles</div>
          {!showAdd ? (
            <button className="btn primary" onClick={addSubtitle}>Add Subtitle</button>
          ) : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input className="input" placeholder="Subtitle title" value={newSubtitleTitle} onChange={(e) => setNewSubtitleTitle(e.target.value)} style={{ width: 260 }} />
              <button className="btn success" onClick={saveNewSubtitle} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <button className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          )}
        </div>
        {subs.length === 0 ? (
          <div style={{ color: '#6B7280', marginTop: 12 }}>No subtitles yet</div>
        ) : (
          <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
            {subs.map((s) => (
              <div key={s._id} style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ cursor: 'pointer', flex: 1 }} onClick={() => navigate(`/admin/subtitles/${s._id}`)}>
                  <div style={{ fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{(s.content || '').slice(0, 80)}</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn" onClick={() => navigate(`/admin/subtitles/${s._id}`)} style={{ color: '#0f4260', fontWeight: 500 }}>Edit</button>
                  <button className="btn" onClick={() => removeSubtitle(s._id!)} style={{ color: '#DC2626' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

