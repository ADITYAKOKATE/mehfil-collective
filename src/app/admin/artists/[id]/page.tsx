"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    bio: "",
    category: "",
    performanceType: "",
    profileImage: "",
    instagram: "",
    youtube: "",
    spotify: "",
  });

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch(`/api/artists/${id}`);
        if (!res.ok) throw new Error("Artist not found");
        const data = await res.json();
        
        setFormData({
          name: data.name || "",
          tagline: data.tagline || "",
          bio: data.bio || "",
          category: data.category || "Singer",
          performanceType: data.performanceType || "Solo",
          profileImage: data.profileImage || "",
          instagram: data.instagram || "",
          youtube: data.youtube || "",
          spotify: data.spotify || "",
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchArtist();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/artists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update artist");

      router.push("/admin/artists");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#444",
  };

  if (fetching) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <Link href="/admin/artists" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", background: "#f5f5f5", borderRadius: "50%", color: "#333", textDecoration: "none" }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#111", margin: 0 }}>Edit Artist</h1>
      </div>

      {error && (
        <div style={{ background: "#fff5f5", color: "#dc3545", padding: "1rem", borderRadius: "6px", marginBottom: "1.5rem", border: "1px solid #ffcaca", fontFamily: "'Outfit', sans-serif" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={labelStyle}>Artist Name *</label>
            <input name="name" required value={formData.name} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Tagline *</label>
            <input name="tagline" required value={formData.tagline} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="Singer">Singer</option>
              <option value="Band">Band</option>
              <option value="Instrumentalist">Instrumentalist</option>
              <option value="DJ">DJ</option>
              <option value="Dancer">Dancer</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Performance Type *</label>
            <select name="performanceType" value={formData.performanceType} onChange={handleChange} style={inputStyle}>
              <option value="Solo">Solo</option>
              <option value="Duo">Duo</option>
              <option value="Group / Band">Group / Band</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Biography *</label>
          <textarea name="bio" required value={formData.bio} onChange={handleChange} style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Profile Image URL *</label>
          <input name="profileImage" required value={formData.profileImage} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "2rem", padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" }}>
          <div>
            <label style={labelStyle}>Instagram Profile</label>
            <input name="instagram" value={formData.instagram} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>YouTube Channel</label>
            <input name="youtube" value={formData.youtube} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Spotify Profile</label>
            <input name="spotify" value={formData.spotify} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 24px",
            background: "#111",
            color: "#c9a84c",
            border: "none",
            borderRadius: "6px",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
