import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import servicesData from '../data/servicesData'

function slugVariants(slug) {
  return [slug, `${slug}-registration`, `${slug.replace(/-company$/, '')}-registration`];
}

const API_BASE = 'http://localhost:5000/api';

const ServicePage = () => {
  const { slug } = useParams();
  const variants = useMemo(() => slugVariants(slug || ''), [slug]);
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSub(null);
    setData(null);
    fetch(`${API_BASE}/subtitles/by-slug/${slug}`)
      .then((r) => r.ok ? r.json() : null)
      .then((json) => {
        if (cancelled) return;
        if (json && json._id) {
          setSub(json);
        } else {
          // Fallback to local data
          let local = null;
          // Try exact match first
          if (servicesData[slug]) {
            local = servicesData[slug];
          } else {
            // Try variants
            for (const v of variants) {
              if (servicesData[v]) {
                local = servicesData[v];
                break;
              }
            }
          }
          setData(local);
        }
      })
      .catch((e) => {
        console.error("Failed to load service page", e);
        // On error also try fallback
        let local = null;
        if (servicesData[slug]) {
           local = servicesData[slug];
        } else {
           for (const v of variants) {
             if (servicesData[v]) {
               local = servicesData[v];
               break;
             }
           }
        }
        setData(local);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!sub && !data) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <p className="mt-4">We couldn't find content for <strong>{slug}</strong>.</p>
        <p className="mt-4"><Link to="/">Return home</Link></p>
      </div>
    )
  }

  if (sub) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{sub.title}</h1>
            <ul className="mt-3 list-disc ml-5 text-sm">
              <li>Expert assistance available</li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded p-4">
            <div className="text-sm text-gray-600">Starting from</div>
            <div className="text-2xl font-semibold">{sub.price || 'Varies by entity'}</div>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Get Free Consultation</button>
          </div>
        </header>

        <main className="mt-6 space-y-10">
          {sub.content && (
            <section className="prose max-w-none">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-2">{sub.content}</p>
            </section>
          )}

          {Array.isArray(sub.files) && sub.files.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold">Attachments</h2>
              <div className="mt-3 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {sub.files.map((f) => (
                  <div key={f._id} className="border rounded p-3">
                    {String(f.mimetype || '').includes('image') ? (
                      <img src={f.url} alt={f.filename} className="w-full h-40 object-cover rounded" />
                    ) : (
                      <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-700 underline">View PDF</a>
                    )}
                    <div className="mt-2 text-sm text-gray-700">{f.filename}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {Array.isArray(sub.questions) && sub.questions.length > 0 && (
            <section id="faq">
              <h2 className="text-2xl font-semibold">Details & FAQs</h2>
              <div className="mt-3 space-y-8">
                {sub.questions.map((q, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-semibold">{q.question}</h3>
                    {(q.format === 'written' || q.format === 'both') && (
                      <div className="mt-2 text-sm">{q.answer}</div>
                    )}
                    {(q.format === 'table' || q.format === 'both') && q.table && (
                      <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full border">
                          <thead>
                            <tr>
                              {(q.table.headers || []).map((h, idx) => (
                                <th key={idx} className="border px-3 py-2 text-left">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(q.table.rows || []).map((row, ridx) => (
                              <tr key={ridx}>
                                {row.map((cell, cidx) => (
                                  <td key={cidx} className="border px-3 py-2">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {Array.isArray(q.files) && q.files.length > 0 && (
                      <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
                        {q.files.map((f) => (
                          <div key={f._id} className="border rounded p-3">
                            {String(f.mimetype || '').includes('image') ? (
                              <img src={f.url} alt={f.filename} className="w-full h-32 object-cover rounded" />
                            ) : (
                              <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-700 underline">View PDF</a>
                            )}
                            <div className="mt-2 text-sm text-gray-700">{f.filename}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Hero */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          {data.updated && <div className="text-sm text-gray-500 mt-1">{data.updated}</div>}
          {data.hero && (
            <ul className="mt-3 list-disc ml-5 text-sm">
              {data.hero.bullets && data.hero.bullets.map((b,i) => <li key={i}>{b}</li>)}
            </ul>
          )}
        </div>
        <div className="bg-gray-100 rounded p-4">
          <div className="text-sm text-gray-600">Starting from</div>
          <div className="text-2xl font-semibold">{data.hero?.price}</div>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Get Free Consultation</button>
        </div>
      </header>

      {/* TOC */}
      <nav className="mt-8 p-4 bg-sky-50 rounded">
        <h3 className="font-semibold">Table of Contents</h3>
        <ul className="mt-2 space-y-1">
          {data.sections && data.sections.map(s => (
            <li key={s.id}><a className="text-sky-700 hover:underline" href={`#${s.id}`}>{s.heading}</a></li>
          ))}
        </ul>
      </nav>

      {/* Content Sections */}
      <main className="mt-6 space-y-10">
        {data.sections && data.sections.map(s => (
          <section id={s.id} key={s.id} className="prose max-w-none">
            <h2 className="text-2xl font-semibold">{s.heading}</h2>
            <p className="mt-2">{s.content}</p>
          </section>
        ))}

        {/* Pricing */}
        {data.pricing && (
          <section id="pricing" className="">
            <h2 className="text-2xl font-semibold">Pricing</h2>
            <div className="mt-3 grid gap-4 grid-cols-1 md:grid-cols-2">
              {data.pricing.packages?.map((p, idx) => (
                <div key={idx} className="border rounded p-4">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xl mt-1">{p.price}</div>
                  {p.includes && <ul className="mt-2 list-disc ml-5 text-sm">{p.includes.map((inc,i)=> <li key={i}>{inc}</li>)}</ul>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {data.faqs && (
          <section id="faq">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-2">
              {data.faqs.map((f,i) => (
                <details key={i} className="border rounded p-3">
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <div className="mt-2 text-sm">{f.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default ServicePage
