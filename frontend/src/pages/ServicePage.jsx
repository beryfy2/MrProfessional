import React from 'react'
import { useParams, Link } from 'react-router-dom'
import servicesData from '../data/servicesData'

function slugVariants(slug) {
  return [slug, `${slug}-registration`, `${slug.replace(/-company$/, '')}-registration`];
}

const ServicePage = () => {
  const { slug } = useParams();
  const variants = slugVariants(slug || '');
  let data = null;
  for (const v of variants) {
    if (servicesData[v]) {
      data = servicesData[v];
      break;
    }
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <p className="mt-4">We couldn't find content for <strong>{slug}</strong>.</p>
        <p className="mt-4"><Link to="/">Return home</Link></p>
      </div>
    )
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
