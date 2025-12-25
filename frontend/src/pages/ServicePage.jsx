import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import servicesData from "../data/servicesData";
import NavBar from "../components/Navbar";
import FloatingContactButtons from "../components/FloatingContactButtons";
import HeroBg from "../assets/hero-bg.png";
import TocImg from "../assets/toc-illustration.png";
import WhyCompanySection from "./WhyUs";
import TestimonialsSection from './TestimonialsSection'
import TrustedBy from "../components/TrustBy";
import Footer from "../components/Footer";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Get backend base URL (without /api)
const getBackendBase = () => {
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
  // Remove /api from the end if present
  if (apiBase.endsWith('/api')) {
    return apiBase.slice(0, -4);
  }
  if (apiBase.endsWith('/api/')) {
    return apiBase.slice(0, -5);
  }
  // If no /api found, assume it's already the base or extract protocol+host
  try {
    const url = new URL(apiBase);
    return `${url.protocol}//${url.host}`;
  } catch {
    // Fallback: try to extract base manually
    const match = apiBase.match(/^(https?:\/\/[^/]+)/);
    return match ? match[1] : 'http://localhost:5000';
  }
};

/* -------------------------- helpers -------------------------- */

function slugVariants(slug) {
  return [
    slug,
    `${slug}-registration`,
    `${slug.replace(/-company$/, "")}-registration`,
  ];
}

/* -------------------------- components -------------------------- */

const StickyConsultationCard = ({ price, title }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  async function submit() {
    setNotice('');
    if (!name || !email || !mobile) {
      setNotice('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append('companyName', title || 'Website Visitor');
      form.append('contactPerson', name);
      form.append('email', email);
      form.append('subject', `Request Callback: ${title || 'Service'}`);
      form.append('message', `Callback requested for ${title || 'Service'}\nMobile: ${mobile}`);
      const res = await fetch(`${API_BASE}/enquiries`, { method: 'POST', body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error((data && (data.error || data.message)) || 'Failed to submit');
      }
      setNotice('Request submitted successfully');
      setName('');
      setEmail('');
      setMobile('');
    } catch (e) {
      const msg = typeof e === 'object' && e && 'message' in e ? String(e.message) : 'Failed to submit';
      setNotice(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-[420px]">

      {/* Title */}
      <h3 className="text-2xl font-bold text-[#0f4260] mb-6 text-center">
        Get Expert Consultation
      </h3>

      {/* Inputs */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full
            px-4 py-3
            border border-slate-300
            rounded-md
            text-slate-700
            placeholder-slate-400
            focus:outline-none
            focus:border-[#0f4260]
          "
        />

        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            px-4 py-3
            border border-slate-300
            rounded-md
            text-slate-700
            placeholder-slate-400
            focus:outline-none
            focus:border-[#0f4260]
          "
        />

        <input
          type="tel"
          placeholder="Mobile *"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="
            w-full
            px-4 py-3
            border border-slate-300
            rounded-md
            text-slate-700
            placeholder-slate-400
            focus:outline-none
            focus:border-[#0f4260]
          "
        />
      </div>

      {/* CTA Button */}
      <button
        onClick={submit}
        disabled={loading}
        className="
          w-full
          mt-6
          bg-[#33cc33]
          hover:bg-[#2eb82e]
          text-white
          py-3
          rounded-md
          font-semibold
          text-sm
          tracking-wide
          transition
        "
      >
        {loading ? 'Submitting...' : 'REQUEST A CALLBACK'}
      </button>

      {notice && (
        <p className="text-center text-sm mt-3">{notice}</p>
      )}

      {/* Price */}
      {price && (
        <p className="text-center text-sm text-slate-500 mt-4">
          Starting from <span className="font-semibold">{price}</span>
        </p>
      )}
    </div>
  );
};

/* -------------------------- page -------------------------- */

const ServicePage = () => {
  const { slug } = useParams();
  const variants = useMemo(() => slugVariants(slug || ""), [slug]);

  const [sub, setSub] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSub(null);
    setData(null);

    fetch(`${API_BASE}/subtitles/by-slug/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled) return;

        if (json && json._id) {
          setSub(json);
        } else {
          let local = servicesData[slug];
          if (!local) {
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
      .catch(() => {
        let local = servicesData[slug];
        if (!local) {
          for (const v of variants) {
            if (servicesData[v]) {
              local = servicesData[v];
              break;
            }
          }
        }
        setData(local);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => (cancelled = true);
  }, [slug, variants]);

  if (loading) {
    return <div className="p-10 text-xl">Loading…</div>;
  }

  if (!sub && !data) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Link to="/" className="text-blue-600 underline">
          Go Home
        </Link>
      </div>
    );
  }

  const page = sub || data;

  return (
    <>
      <NavBar />

      {/* HERO */}
      <section className="relative overflow-hidden">

        {/* PARALLAX BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{
            backgroundImage: `url(${HeroBg})`,
          }}
        />

        {/* DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0f4260]/80 to-[#0b3550]/80 z-10" />

        {/* CONTENT */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

            {/* LEFT */}
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">
                {page.title}
              </h1>

              {/* <p className="text-green-400 text-lg font-semibold mb-6">
                Get your Company Registration starts @ ₹8,499 Only!
              </p> */}
              <div className="text-green-400 text-lg font-semibold mb-6">
                <h1 >
                  Get your Company Registration starts ₹{page.price} Only!
                </h1>

              </div>


              <ul className="space-y-3 text-lg">
                <li>✅ Lowest Price Guarantee</li>
                <li>✅ Quick and Hassle-Free Process</li>
                <li>✅ Incorporation Certificate in 7 Days</li>
                <li>✅ Expert Assistance Without the Hassle</li>
              </ul>

              <div className="mt-6 font-semibold">
                Google Rating 4.9 ★★★★★
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center md:justify-end md:sticky md:top-28">
              <StickyConsultationCard title={page.title} />
            </div>

          </div>
        </div>
      </section>


      {/* OVERVIEW + CERTIFICATE */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* LEFT CONTENT */}
        <div>
          {page.updated && (
            <p className="text-sm text-slate-500 mb-4">
              Updated on {page.updated}
            </p>
          )}

          <h2 className="text-3xl font-bold mb-4">
            {page.title} – Process, Fees & Documents Required
          </h2>

          <p className="text-slate-700 leading-relaxed">
            {page.content}
          </p>
        </div>

        {/* RIGHT CERTIFICATE PDF */}
        <div className="border rounded-xl p-4 bg-white shadow">
          <h3 className="font-semibold mb-3">
            Company Registration Certificate [Sample]
          </h3>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {["Pvt Ltd", "LLP", "OPC", "Public Ltd", "Section 8"].map((t) => (
              <button
                key={t}
                className="px-3 py-1 border rounded text-sm hover:bg-[#0f4260] hover:text-white transition"
              >
                {t}
              </button>
            ))}
          </div>

          {/* PDF PREVIEW */}
          {(() => {
            // Find the first PDF file
            const pdfFile = page?.files?.find(
              (f) =>
                f.mimetype === 'application/pdf' ||
                f.filename?.toLowerCase().endsWith('.pdf') ||
                f.url?.toLowerCase().endsWith('.pdf')
            );

            // Construct the PDF URL
            let pdfUrl = null;
            const backendBase = getBackendBase();
            
            if (pdfFile?.url) {
              // If URL starts with /uploads, prepend the backend base URL
              if (pdfFile.url.startsWith('/uploads')) {
                pdfUrl = `${backendBase}${pdfFile.url}`;
              } else if (pdfFile.url.startsWith('http://') || pdfFile.url.startsWith('https://')) {
                // Already absolute URL
                pdfUrl = pdfFile.url;
              } else {
                // Relative URL, prepend backend base
                pdfUrl = `${backendBase}${pdfFile.url.startsWith('/') ? '' : '/'}${pdfFile.url}`;
              }
            } else {
              // Fallback to default sample PDF
              pdfUrl = "/certificate-sample.pdf";
            }

            return (
              <>
                <div className="border rounded-lg overflow-hidden h-[420px] bg-slate-100">
                  <iframe
                    src={pdfUrl}
                    title="Company Registration Certificate"
                    className="w-full h-full"
                    type="application/pdf"
                  />
                </div>

                {/* Open in new tab */}
                <div className="mt-3 text-center text-sm">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Certificate in New Tab
                  </a>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* TABLE OF CONTENT */}
      {(page.faqs || page.questions)?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="border rounded-2xl p-8 grid md:grid-cols-2 gap-10 bg-gray-100">

            {/* LEFT */}
            <div>
              <h2 className="text-2xl font-bold mb-6 relative inline-block">
                Table of Content
                <span className="absolute left-0 -bottom-2 w-14 h-1 bg-green-500 rounded"></span>
              </h2>

              <ul className="space-y-3 text-slate-700">
                {( page.questions).map((f, index) => {
                  const question =  f.question;
                  const id = `q-${question
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")}`;

                  return (
                    <li key={index} className="flex gap-2">
                      <span className="text-green-500">•</span>
                      <a
                        href={`#${id}`}
                        className="hover:underline hover:text-[#0f4260]"
                      >
                        {question}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center items-center">
              <img
                src={TocImg}
                alt="Table of content illustration"
                className="max-w-sm w-full"
              />
            </div>

          </div>
        </section>
      )}

      {/* QUESTIONS AS NORMAL SECTIONS */}
      {( page.questions)?.length > 0 && (
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">

          {(page.questions).map((f, index, arr) => {
            const question = f.question;
            const answer = f.answer;

            const id = `q-${question
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")}`;

            return (
              <section
                key={index}
                id={id}
                className="scroll-mt-32"
              >
                {/* QUESTION HEADING */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0f4260]">
                  {question}
                </h2>

                {/* GREEN UNDERLINE */}
                <div className="flex justify-center mt-3 mb-8">
                  <span className="w-14 h-1 bg-green-500 rounded"></span>
                </div>

                {/* ANSWER */}
                <div className="max-w-5xl mx-auto text-slate-700 leading-relaxed space-y-4 text-[17px]">
                  {answer?.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* PRO DIVIDER */}
                {index !== arr.length - 1 && (
                  <div className="flex items-center gap-4 mt-14 opacity-40">
                    <div className="flex-1 h-px bg-slate-300"></div>
                    <span className="font-bold text-slate-300">PRO</span>
                    <div className="flex-1 h-px bg-slate-300"></div>
                  </div>
                )}
              </section>
            );
          })}

        </main>
      )}



      {/* CONTENT SECTIONS */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {page.sections?.map((s) => (
          <section id={s.id} key={s.id}>
            <h2 className="text-3xl font-bold mb-4">
              {s.heading}
            </h2>
            <p className="text-slate-700 max-w-4xl leading-relaxed">
              {s.content}
            </p>
          </section>
        ))}

        {/* FAQs */}
        {(page.faqs || page.questions) && (
          <section id="faq">
            <h2 className="text-3xl font-bold mb-6">FAQs</h2>

            <div className="space-y-4 max-w-4xl">
              {(page.faqs || page.questions)?.map((f, i) => (
                <details
                  key={i}
                  className="border rounded-lg p-4 bg-white"
                >
                  <summary className="font-medium cursor-pointer">
                    {f.q || f.question}
                  </summary>
                  <p className="mt-2 text-slate-600">
                    {f.a || f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>
      <FloatingContactButtons />

      <WhyCompanySection />
      <TestimonialsSection />
      <TrustedBy />
      <Footer />


    </>
  );
};

export default ServicePage;
