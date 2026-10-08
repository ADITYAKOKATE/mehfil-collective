"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewArtistPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    bio: "",
    category: "Singer",
    performanceType: "Solo",
    profileImage: "",
    instagram: "",
    youtube: "",
    spotify: "",
    gallery: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        socialLinks: {
          instagram: formData.instagram,
          youtube: formData.youtube,
          spotify: formData.spotify,
        },
        gallery: formData.gallery.split(",").map((g) => g.trim()).filter(Boolean),
      };

      const res = await fetch("/api/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create artist");
      }

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

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <Link href="/admin/artists" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", background: "#f5f5f5", borderRadius: "50%", color: "#333", textDecoration: "none" }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#111", margin: 0 }}>Add New Artist</h1>
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
            <input name="name" required value={formData.name} onChange={handleChange} style={inputStyle} placeholder="e.g. Arjun Sharma" />
          </div>
          <div>
            <label style={labelStyle}>Tagline *</label>
            <input name="tagline" required value={formData.tagline} onChange={handleChange} style={inputStyle} placeholder="e.g. Sufi & Folk Fusion" />
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
          <textarea name="bio" required value={formData.bio} onChange={handleChange} style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} placeholder="Artist biography..." />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Profile Image URL *</label>
          <input name="profileImage" required value={formData.profileImage} onChange={handleChange} style={inputStyle} placeholder="https://..." />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "2rem", padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" }}>
          <div>
            <label style={labelStyle}>Instagram Profile</label>
            <input name="instagram" value={formData.instagram} onChange={handleChange} style={inputStyle} placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label style={labelStyle}>YouTube Channel</label>
            <input name="youtube" value={formData.youtube} onChange={handleChange} style={inputStyle} placeholder="https://youtube.com/..." />
          </div>
          <div>
            <label style={labelStyle}>Spotify Profile</label>
            <input name="spotify" value={formData.spotify} onChange={handleChange} style={inputStyle} placeholder="https://open.spotify.com/..." />
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={labelStyle}>Gallery Images (comma-separated URLs)</label>
          <textarea name="gallery" value={formData.gallery} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="https://image1.jpg, https://image2.jpg" />
          <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.25rem" }}>Paste image URLs separated by commas.</p>
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
          {loading ? "Creating Artist..." : "Create Artist"}
        </button>
      </form>
    </div>
  );
}
