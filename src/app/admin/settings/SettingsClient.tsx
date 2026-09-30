"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Home, Info, Phone, Briefcase, Loader } from "lucide-react";

const tabs = [
  { id: "homepage", label: "Homepage", icon: Home },
  { id: "about", label: "About Page", icon: Info },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "contact", label: "Contact Info", icon: Phone },
  { id: "social", label: "Social & Brand", icon: Globe },
];

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "#444",
} as const;

const textareaStyle = {
  ...inputStyle,
  minHeight: "120px",
  resize: "vertical" as const,
};

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState("homepage");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updated = [...(form.services || [])];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, services: updated });
  };

  const addService = () => {
    setForm({
      ...form,
      services: [...(form.services || []), { title: "", description: "" }],
    });
  };

  const removeService = (index: number) => {
    const updated = (form.services || []).filter((_: any, i: number) => i !== index);
    setForm({ ...form, services: updated });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px", gap: "1rem", fontFamily: "'Outfit', sans-serif", color: "#888" }}>
        <Loader size={20} style={{ animation: "spin 1s linear infinite" }} /> Loading settings...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#111", margin: 0 }}>
          Site Settings
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "10px 24px",
            background: saving ? "#888" : "#111",
            color: "#c9a84c",
            border: "none", borderRadius: "6px",
            fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 600,
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      {/* Feedback */}
      {success && (
        <div style={{ background: "#f0fdf4", color: "#16a34a", padding: "1rem", borderRadius: "6px", marginBottom: "1.5rem", border: "1px solid #bbf7d0", fontFamily: "'Outfit', sans-serif" }}>
          ✅ Settings saved successfully! Changes are now live on the website.
        </div>
      )}
      {error && (
        <div style={{ background: "#fff5f5", color: "#dc3545", padding: "1rem", borderRadius: "6px", marginBottom: "1.5rem", border: "1px solid #ffcaca", fontFamily: "'Outfit', sans-serif" }}>
          {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "2px solid #f0f0f0", paddingBottom: "0" }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "10px 18px",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #c9a84c" : "2px solid transparent",
                background: "none",
                fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? "#c9a84c" : "#666",
                cursor: "pointer",
                marginBottom: "-2px",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab: Homepage */}
      {activeTab === "homepage" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px" }}>
          <div>
            <label style={labelStyle}>Hero Title (large heading)</label>
            <input name="homeHeroTitle" value={form.homeHeroTitle || ""} onChange={handleChange} style={inputStyle} placeholder="MEHFIL COLLECTIVE" />
          </div>
          <div>
            <label style={labelStyle}>Hero Subtitle (below title)</label>
            <input name="homeHeroSubtitle" value={form.homeHeroSubtitle || ""} onChange={handleChange} style={inputStyle} placeholder="Where Music Meets People." />
          </div>
          <div>
            <label style={labelStyle}>Hero Description (short paragraph)</label>
            <textarea name="homeHeroDescription" value={form.homeHeroDescription || ""} onChange={handleChange} style={textareaStyle} placeholder="Creating Moments. Curating Experiences..." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Primary CTA Button Text</label>
              <input name="homeHeroCtaPrimary" value={form.homeHeroCtaPrimary || ""} onChange={handleChange} style={inputStyle} placeholder="Explore Events" />
            </div>
            <div>
              <label style={labelStyle}>Secondary CTA Button Text</label>
              <input name="homeHeroCtaSecondary" value={form.homeHeroCtaSecondary || ""} onChange={handleChange} style={inputStyle} placeholder="Work With Us" />
            </div>
          </div>
        </div>
      )}

      {/* Tab: About Page */}
      {activeTab === "about" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px" }}>
          <div>
            <label style={labelStyle}>Who We Are — Section Title</label>
            <input name="aboutWhoWeAreTitle" value={form.aboutWhoWeAreTitle || ""} onChange={handleChange} style={inputStyle} placeholder="Who We Are" />
          </div>
          <div>
            <label style={labelStyle}>Who We Are — Body Text</label>
            <textarea name="aboutWhoWeAreText" value={form.aboutWhoWeAreText || ""} onChange={handleChange} style={{ ...textareaStyle, minHeight: "160px" }} />
          </div>
          <div>
            <label style={labelStyle}>Philosophy — Section Title</label>
            <input name="aboutPhilosophyTitle" value={form.aboutPhilosophyTitle || ""} onChange={handleChange} style={inputStyle} placeholder="Our Philosophy" />
          </div>
          <div>
            <label style={labelStyle}>Philosophy — Body Text</label>
            <textarea name="aboutPhilosophyText" value={form.aboutPhilosophyText || ""} onChange={handleChange} style={{ ...textareaStyle, minHeight: "160px" }} />
          </div>
          <div>
            <label style={labelStyle}>Collaborate Page — Main Title</label>
            <input name="collaborateTitle" value={form.collaborateTitle || ""} onChange={handleChange} style={inputStyle} placeholder="Let's Create Something Together." />
          </div>
          <div>
            <label style={labelStyle}>Collaborate Page — Subtitle</label>
            <textarea name="collaborateSubtitle" value={form.collaborateSubtitle || ""} onChange={handleChange} style={textareaStyle} />
          </div>
        </div>
      )}

      {/* Tab: Services */}
      {activeTab === "services" && (
        <div style={{ maxWidth: "800px" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666", marginBottom: "1.5rem" }}>
            These services appear on your About page. You can add, edit or remove them.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {(form.services || []).map((service: any, index: number) => (
              <div key={index} style={{ padding: "1.5rem", border: "1px solid #eee", borderRadius: "8px", background: "#fafafa" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#333" }}>Service #{index + 1}</span>
                  <button
                    onClick={() => removeService(index)}
                    style={{ background: "#fff5f5", color: "#dc3545", border: "1px solid #ffcaca", borderRadius: "4px", padding: "4px 12px", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem" }}
                  >
                    Remove
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Service Title</label>
                    <input value={service.title || ""} onChange={(e) => handleServiceChange(index, "title", e.target.value)} style={inputStyle} placeholder="e.g. Live Event Production" />
                  </div>
                  <div>
                    <label style={labelStyle}>Service Description</label>
                    <textarea value={service.description || ""} onChange={(e) => handleServiceChange(index, "description", e.target.value)} style={textareaStyle} placeholder="Brief description..." />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addService}
              style={{ padding: "12px", border: "2px dashed #ddd", borderRadius: "8px", background: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", color: "#888", fontSize: "0.9rem" }}
            >
              + Add New Service
            </button>
          </div>
        </div>
      )}

      {/* Tab: Contact Info */}
      {activeTab === "contact" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "600px" }}>
          <div>
            <label style={labelStyle}>Contact Email</label>
            <input name="contactEmail" value={form.contactEmail || ""} onChange={handleChange} style={inputStyle} placeholder="hello@mehfilcollective.com" />
          </div>
          <div>
            <label style={labelStyle}>Contact Phone</label>
            <input name="contactPhone" value={form.contactPhone || ""} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" />
          </div>
          <div>
            <label style={labelStyle}>WhatsApp Number (with country code, no spaces)</label>
            <input name="whatsappNumber" value={form.whatsappNumber || ""} onChange={handleChange} style={inputStyle} placeholder="+919876543210" />
            <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "4px" }}>Used for the WhatsApp floating button and contact links.</p>
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <input name="contactLocation" value={form.contactLocation || ""} onChange={handleChange} style={inputStyle} placeholder="Mumbai, Maharashtra, India" />
          </div>
        </div>
      )}

      {/* Tab: Social & Brand */}
      {activeTab === "social" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "600px" }}>
          <div>
            <label style={labelStyle}>Site Tagline (used in Footer & SEO)</label>
            <input name="siteTagline" value={form.siteTagline || ""} onChange={handleChange} style={inputStyle} placeholder="Where Music Meets People." />
          </div>
          <div>
            <label style={labelStyle}>Instagram Profile URL</label>
            <input name="instagramUrl" value={form.instagramUrl || ""} onChange={handleChange} style={inputStyle} placeholder="https://instagram.com/mehfilcollective" />
          </div>
          <div>
            <label style={labelStyle}>YouTube Channel URL</label>
            <input name="youtubeUrl" value={form.youtubeUrl || ""} onChange={handleChange} style={inputStyle} placeholder="https://youtube.com/@mehfilcollective" />
          </div>
        </div>
      )}
    </div>
  );
}
