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
      setQuestions(normalizeQuestions(s.questions || []));
      setCount((s.questions || []).length);
    });
  }, [id]);

  useEffect(() => {
    const next = [...questions];
    if (count > next.length) {
      for (let i = next.length; i < count; i++) next.push({ question: '', answer: '', format: 'written', files: [] });
    } else if (count < next.length) {
      next.length = count;
    }
    setQuestions(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function normalizeQuestions(list: QA[]) {
    return (list || []).map((q) => ({
      question: q.question || '',
      answer: q.answer || '',
      format: q.format || 'written',
      table: q.table || undefined,
      files: q.files || []
    }));
  }

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
    const next = normalizeQuestions(updated.questions || []);
    setQuestions(next);
  }

  async function removeQuestionFile(idx: number, fid: string) {
    const updated = await delJSON<Subtitle>(`/subtitles/${id}/questions/${idx}/files/${fid}`);
    const next = normalizeQuestions(updated.questions || []);
    setQuestions(next);
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Subtitle Information</div>
          {sub && (
            <button
              className="btn"
              onClick={async () => {
                if (!confirm('Delete this subtitle?')) return;
                await delJSON(`/subtitles/${id}`);
                navigate(`/admin/titles/${sub.parentTitleId}`);
              }}
              style={{ color: '#DC2626' }}
            >
              Delete
            </button>
          )}
        </div>
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
              <div style={{ marginTop: 8 }}>
                <label style={{ fontSize: 13, color: '#6B7280', marginBottom: 4, display: 'block' }}>Format</label>
                <select className="input" value={qa.format || 'written'} onChange={(e) => {
                  const next = [...questions];
                  const fmt = e.target.value as QA['format'];
                  let table = qa.table;
                  if ((fmt === 'table' || fmt === 'both') && !table) {
                    table = { headers: ['Column 1', 'Column 2'], rows: [['', ''], ['', '']] };
                  }
                  next[idx] = { ...qa, format: fmt, table };
                  setQuestions(next);
                }}>
                  <option value="table">Table</option>
                  <option value="written">Written</option>
                  <option value="both">Both</option>
                </select>
              </div>
              {(qa.format === 'written' || qa.format === 'both') && (
                <>
                  <div style={{ fontSize: 13, color: '#6B7280', marginTop: 12, marginBottom: 8 }}>Written Answer</div>
                  <textarea className="input" rows={4} value={qa.answer} onChange={(e) => {
                    const next = [...questions];
                    next[idx] = { ...qa, answer: e.target.value };
                    setQuestions(next);
                  }} />
                </>
              )}
              {(qa.format === 'table' || qa.format === 'both') && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: 13, color: '#6B7280' }}>Table Builder</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <label style={{ fontSize: 12, color: '#6B7280' }}>Columns</label>
                      <input
                        type="number"
                        min={1}
                        className="input"
                        style={{ width: 72 }}
                        value={(qa.table?.headers.length || 0)}
                        onChange={(e) => {
                          const cols = Math.max(1, Number(e.target.value));
                          const next = [...questions];
                          const tbl = qa.table || { headers: [], rows: [] };
                          const headers = [...(tbl.headers || [])];
                          if (cols > headers.length) {
                            for (let i = headers.length; i < cols; i++) headers.push(`Column ${i + 1}`);
                          } else {
                            headers.length = cols;
                          }
                          const rows = (tbl.rows || []).map((r) => {
                            const rr = [...r];
                            if (cols > rr.length) {
                              for (let i = rr.length; i < cols; i++) rr.push('');
                            } else {
                              rr.length = cols;
                            }
                            return rr;
                          });
                          next[idx] = { ...qa, table: { headers, rows } };
                          setQuestions(next);
                        }}
                      />
                      <label style={{ fontSize: 12, color: '#6B7280' }}>Rows</label>
                      <input
                        type="number"
                        min={1}
                        className="input"
                        style={{ width: 72 }}
                        value={(qa.table?.rows.length || 0) || 2}
                        onChange={(e) => {
                          const rowsCount = Math.max(1, Number(e.target.value));
                          const next = [...questions];
                          const tbl = qa.table || { headers: ['Column 1'], rows: [] };
                          const cols = (tbl.headers?.length || 1);
                          const rows = [...(tbl.rows || [])];
                          if (rowsCount > rows.length) {
                            for (let i = rows.length; i < rowsCount; i++) rows.push(new Array(cols).fill(''));
                          } else {
                            rows.length = rowsCount;
                          }
                          next[idx] = { ...qa, table: { headers: tbl.headers || ['Column 1'], rows } };
                          setQuestions(next);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="table" style={{ minWidth: '100%' }}>
                      <thead>
                        <tr>
                          {(qa.table?.headers || []).map((h, cidx) => (
                            <th key={cidx} className="th">
                              <input
                                className="input"
                                value={h}
                                onChange={(e) => {
                                  const next = [...questions];
                                  const tbl = qa.table || { headers: [], rows: [] };
                                  const headers = [...(tbl.headers || [])];
                                  headers[cidx] = e.target.value;
                                  next[idx] = { ...qa, table: { headers, rows: tbl.rows || [] } };
                                  setQuestions(next);
                                }}
                              />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(qa.table?.rows || []).map((row, ridx) => (
                          <tr key={ridx}>
                            {row.map((cell, cidx) => (
                              <td key={cidx} className="td">
                                <input
                                  className="input"
                                  value={cell}
                                  onChange={(e) => {
                                    const next = [...questions];
                                    const tbl = qa.table || { headers: [], rows: [] };
                                    const rows = tbl.rows ? tbl.rows.map((r) => [...r]) : [];
                                    rows[ridx][cidx] = e.target.value;
                                    next[idx] = { ...qa, table: { headers: tbl.headers || [], rows } };
                                    setQuestions(next);
                                  }}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div style={{ marginTop: 8 }}>
                <input
                  id={`qfile-${idx}`}
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  hidden
                  onChange={(e) => uploadQuestionFiles(idx, e.target.files)}
                />
                <button className="btn" onClick={() => document.getElementById(`qfile-${idx}`)?.click()}>Upload Files</button>
              </div>
              {qa.files && qa.files.length > 0 && (
                <div className="grid-2" style={{ marginTop: 8 }}>
                  {qa.files.map((f) => (
                    <div key={f._id} style={{ border: '1px solid var(--border-light)', borderRadius: 10, padding: 8 }}>
                      {f.mimetype?.includes('image') ? (
                        <img src={f.url} alt={f.filename} style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
                      ) : (
                        <div style={{ height: 96, display: 'grid', placeItems: 'center', fontSize: 13, color: '#6B7280' }}>PDF</div>
                      )}
                      <div style={{ marginTop: 8, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.filename}</div>
                      <button className="btn" style={{ marginTop: 8, color: '#DC2626' }} onClick={() => removeQuestionFile(idx, f._id!)}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
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
