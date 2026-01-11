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
        console.error("Error fetching work:", error);
        setError("Work not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWork();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading work...</p>
        </div>
      </div>
    );
  }

  if (error || !work) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Work Not Found</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/works" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Works
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/works" className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block">
          ← Back to Works
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={`${IMG_BASE}${work.photo}`}
            alt={work.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{work.title}</h1>
            <div className="text-sm text-gray-500 mb-6">
              {new Date(work.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="prose prose-lg max-w-none">
              {work.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
