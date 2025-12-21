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
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [questions, setQuestions] = useState<QA[]>([]);
  const [count, setCount] = useState<number>(0);

  const uploadRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getJSON<Subtitle>(`/subtitles/${id}`).then((s) => {
      setSub(s);
      setTitle(s.title);
      setContent(s.content || '');
      setPrice(s.price || '');
      setFiles(s.files || []);
      setQuestions(normalizeQuestions(s.questions || []));
      setCount((s.questions || []).length);
    });
  }, [id]);

  function normalizeQuestions(list: QA[]) {
    return (list || []).map((q) => ({
      question: q.question || '',
      answer: q.answer || '',
      format: q.format || 'written',
      table: q.table || undefined,
      files: q.files || []
    }));
  }

  useEffect(() => {
    const next = [...questions];
    if (count > next.length) {
      for (let i = next.length; i < count; i++) {
        next.push({ question: '', answer: '', format: 'written', files: [] });
      }
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

  async function uploadQuestionFiles(idx: number, filesList: FileList | null) {
    if (!filesList || filesList.length === 0) return;
    const form = new FormData();
    Array.from(filesList).forEach((f) => form.append('files', f));
    const updated = await sendForm<Subtitle>(`/subtitles/${id}/questions/${idx}/files`, form, 'POST');
    setQuestions(normalizeQuestions(updated.questions || []));
  }

  async function removeQuestionFile(idx: number, fid: string) {
    const updated = await delJSON<Subtitle>(`/subtitles/${id}/questions/${idx}/files/${fid}`);
    setQuestions(normalizeQuestions(updated.questions || []));
  }

  async function saveAll() {
    const updated = await sendJSON<Subtitle>(
      `/subtitles/${id}`,
      { title, content, price, questions },
      'PUT'
    );
    setSub(updated);
    alert('Saved');
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button className="btn" onClick={() => sub && navigate(`/admin/titles/${sub.parentTitleId}`)}>
        ← Back
      </button>
          {/* SUBTITLE INFO */}
          <div className="card" style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Subtitle Information</div>
              {sub && (
                <button
                  className="btn"
                  style={{ color: '#DC2626' }}
                  onClick={async () => {
                    if (!confirm('Delete this subtitle?')) return;
                    await delJSON(`/subtitles/${id}`);
                    navigate(`/admin/titles/${sub.parentTitleId}`);
                  }}
                >
                  Delete
                </button>
              )}
            </div>

            <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <div className="grid-1-2">
              <textarea
                className="input"
                rows={4}
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input
                className="input"
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <input
              ref={uploadRef}
              type="file"
              multiple
              accept="image/*,application/pdf"
              hidden
              onChange={(e) => uploadFiles(e.target.files)}
            />
            <button className="btn" onClick={() => uploadRef.current?.click()}>
              Upload Files
            </button>

            {files.length > 0 && (
              <div className="grid-2">
                {files.map((f) => (
                  <div key={f._id} className="card">
                    <div style={{ fontSize: 13 }}>{f.filename}</div>
                    <button className="btn" style={{ color: '#DC2626' }} onClick={() => removeFile(f._id!)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QUESTIONS */}
          <div className="card" style={{ display: 'grid', gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Questions & Answers</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={() => setCount(count + 1)}>+ Add Question</button>
              {count > 0 && <button className="btn" onClick={() => setCount(Math.max(0, count - 1))}>Remove Last</button>}
            </div>

            {questions.map((qa, idx) => (
              <div key={idx} className="card">
                <textarea
                  className="input"
                  rows={3}
                  value={qa.question}
                  onChange={(e) => {
                    const next = [...questions];
                    next[idx] = { ...qa, question: e.target.value };
                    setQuestions(next);
                  }}
                />
                <textarea
                  className="input"
                  rows={4}
                  value={qa.answer}
                  onChange={(e) => {
                    const next = [...questions];
                    next[idx] = { ...qa, answer: e.target.value };
                    setQuestions(next);
                  }}
                />
                <select
                  className="input"
                  value={qa.format || 'written'}
                  onChange={(e) => {
                    const next = [...questions];
                    next[idx] = { ...qa, format: e.target.value as QA['format'] };
                    setQuestions(next);
                  }}
                >
                  <option value="written">Written</option>
                  <option value="table">Table</option>
                  <option value="both">Both</option>
                </select>
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={(e) => uploadQuestionFiles(idx, e.target.files)}
                />
                {qa.files && qa.files.length > 0 && (
                  <div className="grid-2">
                    {qa.files.map((f) => (
                      <div key={f._id} className="card">
                        <div style={{ fontSize: 13 }}>{f.filename}</div>
                        <button className="btn" style={{ color: '#DC2626' }} onClick={() => removeQuestionFile(idx, f._id!)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn"
                    onClick={() => {
                      const next = [...questions];
                      next.splice(idx, 1);
                      setQuestions(next);
                      setCount(next.length);
                    }}
                    style={{ color: '#DC2626' }}
                  >
                    Delete Question
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn primary" onClick={saveAll}>
              Save All Changes
            </button>
            <button className="btn" onClick={() => sub && navigate(`/admin/titles/${sub.parentTitleId}`)}>
              Cancel
            </button>
          </div>
    </div>
  );
}
