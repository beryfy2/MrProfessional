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
  const [faqs, setFaqs] = useState<QA[]>([]);
  const [faqCount, setFaqCount] = useState<number>(0);
  const [batchCount, setBatchCount] = useState<number>(0);
  const [batchNames, setBatchNames] = useState<string[]>([]);
  const [batchError, setBatchError] = useState<string>('');

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
      setFaqs(normalizeQuestions(s.faqs || []));
      setFaqCount((s.faqs || []).length);
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

  useEffect(() => {
    const next = [...faqs];
    if (faqCount > next.length) {
      for (let i = next.length; i < faqCount; i++) {
        next.push({ question: '', answer: '', format: 'written', files: [] });
      }
    } else if (faqCount < next.length) {
      next.length = faqCount;
    }
    setFaqs(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqCount]);

  async function uploadFiles(filesList: FileList | null) {
    if (!filesList || filesList.length === 0) return;
    const form = new FormData();
    Array.from(filesList).forEach((f) => form.append('files', f));
    const updated = await sendForm<Subtitle>(`/subtitles/${id}/files`, form, 'POST');
    setFiles(updated.files || []);
  }
  async function uploadBatch(filesList: FileList | null) {
    setBatchError('');
    if (!filesList || filesList.length === 0) return;
    const count = Number(batchCount) || 0;
    if (count <= 0) {
      setBatchError('Enter number of files');
      return;
    }
    if (filesList.length !== count) {
      setBatchError('Selected files count does not match');
      return;
    }
    const names = Array.from({ length: count }, (_, i) => String(batchNames[i] || '').trim());
    if (names.some((n) => !n)) {
      setBatchError('Enter name for each file');
      return;
    }
    const form = new FormData();
    Array.from(filesList).forEach((f, idx) => {
      form.append('files', f);
      form.append(`customName_${idx}`, names[idx]);
    });
    const updated = await sendForm<Subtitle>(`/subtitles/${id}/files`, form, 'POST');
    setFiles(updated.files || []);
    setBatchCount(0);
    setBatchNames([]);
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
      { title, content, price, questions, faqs },
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
            <div className="grid-1-2">
              <div className="card" style={{ display: 'grid', gap: 8 }}>
                <div style={{ fontWeight: 600 }}>Batch PDF Upload</div>
                <input
                  className="input"
                  type="number"
                  placeholder="Number of files"
                  value={batchCount || ''}
                  onChange={(e) => setBatchCount(Number(e.target.value || 0))}
                />
                {Array.from({ length: batchCount || 0 }).map((_, idx) => (
                  <input
                    key={idx}
                    className="input"
                    placeholder={`File ${idx + 1} name`}
                    value={batchNames[idx] || ''}
                    onChange={(e) => {
                      const next = [...batchNames];
                      next[idx] = e.target.value;
                      setBatchNames(next);
                    }}
                  />
                ))}
                <input
                  className="input"
                  type="file"
                  multiple
                  accept="application/pdf"
                  onChange={(e) => uploadBatch(e.target.files)}
                />
                {batchError && <div style={{ color: '#DC2626' }}>{batchError}</div>}
              </div>
            </div>

            {files.length > 0 && (
              <div className="grid-2">
                {files.map((f) => (
                  <div key={f._id} className="card">
                    <div style={{ fontSize: 13 }}>{f.customName || f.label || f.filename}</div>
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
                <select
                  className="input"
                  value={qa.format || 'written'}
                  onChange={(e) => {
                    const next = [...questions];
                    const fmt = e.target.value as QA['format'];
                    if (fmt === 'table' || fmt === 'both') {
                      const base = qa.table && Array.isArray(qa.table.headers) && Array.isArray(qa.table.rows)
                        ? qa.table
                        : { headers: ['Column 1'], rows: [['']] };
                      next[idx] = { ...qa, format: fmt, table: base };
                    } else {
                      next[idx] = { ...qa, format: fmt, table: undefined };
                    }
                    setQuestions(next);
                  }}
                >
                  <option value="written">Written</option>
                  <option value="table">Table</option>
                  <option value="both">Both</option>
                </select>
                {(qa.format === 'table' || qa.format === 'both') && (
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ fontWeight: 600 }}>Table Headers</div>
                    <div className="grid-2">
                      {(qa.table?.headers || []).map((h, hIdx) => (
                        <div key={hIdx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <input
                            className="input"
                            value={h}
                            onChange={(e) => {
                              const next = [...questions];
                              const t = next[idx].table || { headers: [], rows: [] };
                              t.headers = [...(t.headers || [])];
                              t.headers[hIdx] = e.target.value;
                              next[idx] = { ...next[idx], table: t };
                              setQuestions(next);
                            }}
                          />
                          <button
                            className="btn"
                            onClick={() => {
                              const next = [...questions];
                              const t = next[idx].table || { headers: [], rows: [] };
                              const col = hIdx;
                              t.headers = (t.headers || []).filter((_, i) => i !== col);
                              t.rows = (t.rows || []).map((r) => r.filter((_, i) => i !== col));
                              next[idx] = { ...next[idx], table: t };
                              setQuestions(next);
                            }}
                            style={{ color: '#DC2626' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn"
                      onClick={() => {
                        const next = [...questions];
                        const t = next[idx].table || { headers: [], rows: [] };
                        t.headers = [...(t.headers || []), `Column ${((t.headers || []).length + 1)}`];
                        t.rows = (t.rows || []).map((r) => [...r, '']);
                        next[idx] = { ...next[idx], table: t };
                        setQuestions(next);
                      }}
                    >
                      + Add Column
                    </button>
                    <div style={{ fontWeight: 600 }}>Table Rows</div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {(qa.table?.rows || []).map((row, rIdx) => (
                        <div key={rIdx} style={{ display: 'grid', gap: 8 }}>
                          <div className="grid-2">
                            {(row || []).map((cell, cIdx) => (
                              <input
                                key={cIdx}
                                className="input"
                                value={cell}
                                onChange={(e) => {
                                  const next = [...questions];
                                  const t = next[idx].table || { headers: [], rows: [] };
                                  const rows = (t.rows || []).map((r) => [...r]);
                                  if (!rows[rIdx]) rows[rIdx] = [];
                                  rows[rIdx][cIdx] = e.target.value;
                                  next[idx] = { ...next[idx], table: { headers: t.headers || [], rows } };
                                  setQuestions(next);
                                }}
                              />
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              className="btn"
                              onClick={() => {
                                const next = [...questions];
                                const t = next[idx].table || { headers: [], rows: [] };
                                const rows = (t.rows || []).filter((_, i) => i !== rIdx);
                                next[idx] = { ...next[idx], table: { headers: t.headers || [], rows } };
                                setQuestions(next);
                              }}
                              style={{ color: '#DC2626' }}
                            >
                              Remove Row
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn"
                      onClick={() => {
                        const next = [...questions];
                        const t = next[idx].table || { headers: [], rows: [] };
                        const cols = (t.headers || []).length;
                        const newRow = Array.from({ length: cols || 1 }, () => '');
                        const rows = [...(t.rows || []), newRow];
                        next[idx] = { ...next[idx], table: { headers: t.headers || ['Column 1'], rows } };
                        setQuestions(next);
                      }}
                    >
                      + Add Row
                    </button>
                  </div>
                )}
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

          <div className="card" style={{ display: 'grid', gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Frequently Asked Questions</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={() => setFaqCount(faqCount + 1)}>+ Add FAQ</button>
              {faqCount > 0 && <button className="btn" onClick={() => setFaqCount(Math.max(0, faqCount - 1))}>Remove Last</button>}
            </div>
            {faqs.map((qa, idx) => (
              <div key={idx} className="card">
                <textarea
                  className="input"
                  rows={3}
                  value={qa.question}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[idx] = { ...qa, question: e.target.value };
                    setFaqs(next);
                  }}
                />
                <select
                  className="input"
                  value={qa.format || 'written'}
                  onChange={(e) => {
                    const next = [...faqs];
                    const fmt = e.target.value as QA['format'];
                    if (fmt === 'table' || fmt === 'both') {
                      const base = qa.table && Array.isArray(qa.table.headers) && Array.isArray(qa.table.rows)
                        ? qa.table
                        : { headers: ['Column 1'], rows: [['']] };
                      next[idx] = { ...qa, format: fmt, table: base };
                    } else {
                      next[idx] = { ...qa, format: fmt, table: undefined };
                    }
                    setFaqs(next);
                  }}
                >
                  <option value="written">Written</option>
                  <option value="table">Table</option>
                  <option value="both">Both</option>
                </select>
                {(qa.format === 'table' || qa.format === 'both') && (
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ fontWeight: 600 }}>Table Headers</div>
                    <div className="grid-2">
                      {(qa.table?.headers || []).map((h, hIdx) => (
                        <div key={hIdx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <input
                            className="input"
                            value={h}
                            onChange={(e) => {
                              const next = [...faqs];
                              const t = next[idx].table || { headers: [], rows: [] };
                              t.headers = [...(t.headers || [])];
                              t.headers[hIdx] = e.target.value;
                              next[idx] = { ...next[idx], table: t };
                              setFaqs(next);
                            }}
                          />
                          <button
                            className="btn"
                            onClick={() => {
                              const next = [...faqs];
                              const t = next[idx].table || { headers: [], rows: [] };
                              const col = hIdx;
                              t.headers = (t.headers || []).filter((_, i) => i !== col);
                              t.rows = (t.rows || []).map((r) => r.filter((_, i) => i !== col));
                              next[idx] = { ...next[idx], table: t };
                              setFaqs(next);
                            }}
                            style={{ color: '#DC2626' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn"
                      onClick={() => {
                        const next = [...faqs];
                        const t = next[idx].table || { headers: [], rows: [] };
                        t.headers = [...(t.headers || []), `Column ${((t.headers || []).length + 1)}`];
                        t.rows = (t.rows || []).map((r) => [...r, '']);
                        next[idx] = { ...next[idx], table: t };
                        setFaqs(next);
                      }}
                    >
                      + Add Column
                    </button>
                    <div style={{ fontWeight: 600 }}>Table Rows</div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {(qa.table?.rows || []).map((row, rIdx) => (
                        <div key={rIdx} style={{ display: 'grid', gap: 8 }}>
                          <div className="grid-2">
                            {(row || []).map((cell, cIdx) => (
                              <input
                                key={cIdx}
                                className="input"
                                value={cell}
                                onChange={(e) => {
                                  const next = [...faqs];
                                  const t = next[idx].table || { headers: [], rows: [] };
                                  const rows = (t.rows || []).map((r) => [...r]);
                                  if (!rows[rIdx]) rows[rIdx] = [];
                                  rows[rIdx][cIdx] = e.target.value;
                                  next[idx] = { ...next[idx], table: { headers: t.headers || [], rows } };
                                  setFaqs(next);
                                }}
                              />
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              className="btn"
                              onClick={() => {
                                const next = [...faqs];
                                const t = next[idx].table || { headers: [], rows: [] };
                                const rows = (t.rows || []).filter((_, i) => i !== rIdx);
                                next[idx] = { ...next[idx], table: { headers: t.headers || [], rows } };
                                setFaqs(next);
                              }}
                              style={{ color: '#DC2626' }}
                            >
                              Remove Row
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn"
                      onClick={() => {
                        const next = [...faqs];
                        const t = next[idx].table || { headers: [], rows: [] };
                        const cols = (t.headers || []).length;
                        const newRow = Array.from({ length: cols || 1 }, () => '');
                        const rows = [...(t.rows || []), newRow];
                        next[idx] = { ...next[idx], table: { headers: t.headers || ['Column 1'], rows } };
                        setFaqs(next);
                      }}
                    >
                      + Add Row
                    </button>
                  </div>
                )}
                <textarea
                  className="input"
                  rows={4}
                  value={qa.answer}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[idx] = { ...qa, answer: e.target.value };
                    setFaqs(next);
                  }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn"
                    onClick={() => {
                      const next = [...faqs];
                      next.splice(idx, 1);
                      setFaqs(next);
                      setFaqCount(next.length);
                    }}
                    style={{ color: '#DC2626' }}
                  >
                    Delete FAQ
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
