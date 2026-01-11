import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWork, createWork, updateWork } from "../lib/workApi";
import type { Work } from "../lib/workApi";

export default function WorkForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === "new";

  const [form, setForm] = useState({
    title: "",
    content: "",
    date: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isNew) {
      (async () => {
        try {
          const data: Work = await fetchWork(id!);
          setForm({
            title: data.title,
            content: data.content,
            date: data.date.split("T")[0], // Format for date input
          });
          setPhotoPreview(`http://localhost:5000${data.photo}`);
        } catch (err) {
          console.error("Failed to load work", err);
          navigate("/admin/works");
        }
      })();
    }
  }, [id, isNew, navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("date", form.date);

      if (photo) {
        formData.append("photo", photo);
      }

      console.log("Submitting work form...", { isNew, title: form.title });

      if (isNew) {
        await createWork(formData);
      } else {
        await updateWork(id!, formData);
      }

      console.log("Work saved successfully");
      navigate("/admin/works");
    } catch (err: any) {
      console.error("Failed to save work", err);
      alert(`Failed to save work: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{isNew ? "Add Work" : "Edit Work"}</h1>
          <p className="page-subtitle">
            {isNew ? "Create a new work entry" : "Update work details"}
          </p>
        </div>
        <button className="btn secondary" onClick={() => navigate("/admin/works")}>
          ← Back to Works
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              className="form-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content *</label>
            <textarea
              className="form-textarea"
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              className="form-input"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Photo *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="form-input"
              required={isNew}
            />
            {photoPreview && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover', borderRadius: 8 }}
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Saving..." : isNew ? "Create Work" : "Update Work"}
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate("/admin/works")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
