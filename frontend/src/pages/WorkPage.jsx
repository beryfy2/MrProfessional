import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const IMG_BASE = API_BASE.replace("/api", "");

const WorkPage = () => {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`${API_BASE}/public/works/${id}`);
        setWork(response.data);
      } catch (error) {
        setError("Work not found");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchWork();
  }, [id]);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1220]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading work...</p>
        </div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (error || !work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1220]">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-2">Work Not Found</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link
            to="/works"
            className="text-teal-400 hover:text-teal-300 font-medium"
          >
            ← Back to Works
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1220] px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back link */}
        <Link
          to="/works"
          className="inline-block mb-6 text-teal-400 hover:text-teal-300 font-medium"
        >
          ← Back to Works
        </Link>

        {/* Main Card */}
        <div className="bg-[#101a2e] rounded-2xl shadow-xl overflow-hidden border border-[#1f2a44]">

          {/* Image */}
          <img
            src={`${IMG_BASE}${work.photo}`}
            alt={work.title}
            className="w-full h-72 md:h-[420px] object-cover"
          />

          {/* Content */}
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {work.title}
            </h1>

            <p className="text-sm text-gray-400 mb-6">
              {new Date(work.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="space-y-5 text-gray-300 leading-relaxed text-lg">
              {work.content.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
