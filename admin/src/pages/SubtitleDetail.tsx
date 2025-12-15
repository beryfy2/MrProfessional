import { useEffect, useRef, useState } from 'react';
import type { FileMeta, QA, Subtitle } from '../../../common/types';
import { getJSON, sendJSON, sendForm, delJSON } from '../lib/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function SubtitleDetail() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [sub, setSub] = useState<Subtitle | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [questions, setQuestions] = useState<QA[]>([]);
  const [count, setCount] = useState<number>(0);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getJSON<Subtitle>(`/subtitles/${id}`).then((s) => {
      setSub(s);
      setTitle(s.title);
      setContent(s.content || '');
      setFiles(s.files || []);
      setQuestions(s.questions || []);
      setCount((s.questions || []).length);
    });
  }, [id]);

  useEffect(() => {
    const next = [...questions];
    if (count > next.length) {
      for (let i = next.length; i < count; i++) next.push({ question: '', answer: '' });
    } else if (count < next.length) {
      next.length = count;
    }
    setQuestions(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  async function uploadFiles(filesList: FileList | null) {
    if (!filesList || filesList.length === 0) return;
    const form = new FormData();
    Array.from(filesList).forEach((f) => form.append('files', f));
    const updated = await sendForm<Subtitle>(`/subtitles/${id}/files`, form, 'POST');
    setFiles(updated.files || []);
  }

  async function removeFile(fid: string) {
    const updated = await delJSON<Subtitle>(`/subtitles/${id}/files/${fid}`);
    setFiles(updated.files || []);
  }

  async function saveAll() {
    const updated = await sendJSON<Subtitle>(`/subtitles/${id}`, { title, content, questions }, 'PUT');
    setSub(updated);
    alert('Saved');
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={() => sub && navigate(`/admin/titles/${sub.parentTitleId}`)}>← Back</button>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Subtitle Information</div>
        <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="input" rows={4} placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <div>
          <input ref={uploadRef} type="file" multiple accept="image/*,application/pdf" hidden onChange={(e) => uploadFiles(e.target.files)} />
          <button className="btn" onClick={() => uploadRef.current?.click()}>Upload Files</button>
        </div>
        {files.length > 0 && (
          <div className="grid-2">
            {files.map((f) => (
              <div key={f._id} style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 8 }}>
                {f.mimetype?.includes('image') ? (
                  <img src={f.url} alt={f.filename} style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
                ) : (
                  <div style={{ height: 96, display: 'grid', placeItems: 'center', fontSize: 13, color: '#6B7280' }}>PDF</div>
                )}
                <div style={{ marginTop: 8, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.filename}</div>
                <button className="btn" style={{ marginTop: 8, color: '#DC2626' }} onClick={() => removeFile(f._id!)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Questions & Answers</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontSize: 14, color: '#374151' }}>Number of questions</label>
          <input type="number" min={0} className="input" style={{ width: 96 }} value={count} onChange={(e) => setCount(Number(e.target.value))} />
          <div style={{ fontSize: 13, color: '#6B7280' }}>Total: {questions.length}</div>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {questions.map((qa, idx) => (
            <div key={idx} style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>Question {idx + 1}</div>
              <textarea className="input" rows={3} value={qa.question} onChange={(e) => {
                const next = [...questions];
                next[idx] = { ...qa, question: e.target.value };
                setQuestions(next);
              }} />
              <div style={{ fontSize: 13, color: '#6B7280', marginTop: 12, marginBottom: 8 }}>Answer</div>
              <textarea className="input" rows={4} value={qa.answer} onChange={(e) => {
                const next = [...questions];
                next[idx] = { ...qa, answer: e.target.value };
                setQuestions(next);
              }} />
              <div style={{ marginTop: 8 }}>
                <button className="btn" style={{ color: '#DC2626', fontSize: 13 }} onClick={() => {
                  const next = questions.filter((_, i) => i !== idx);
                  setQuestions(next);
                  setCount(next.length);
                }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn primary" onClick={saveAll}>Save All Changes</button>
        <button className="btn" onClick={() => sub && navigate(`/admin/titles/${sub.parentTitleId}`)}>Cancel</button>
      </div>
    </div>
  );
}
