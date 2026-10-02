"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Home, Info, Phone, Briefcase, Loader } from "lucide-react";

const tabs = [
  { id: "homepage", label: "Homepage", icon: Home },
  { id: "about", label: "About Page", icon: Info },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "contact", label: "Contact Info", icon: Phone },
  { id: "social", label: "Social Media", icon: Globe },
];

// Platform icons as inline SVGs
const PlatformIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  ),
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.9rem",
  color: "#111",
  background: "#fff",
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
        // Migrate old flat fields to socialLinks if needed
        if (!data.socialLinks || data.socialLinks.length === 0) {
          data.socialLinks = [
            { platform: "instagram", label: "Instagram", url: data.instagramUrl || "", enabled: true },
            { platform: "youtube",   label: "YouTube",   url: data.youtubeUrl || "",   enabled: false },
            { platform: "linkedin",  label: "LinkedIn",  url: "",                       enabled: false },
            { platform: "facebook",  label: "Facebook",  url: "",                       enabled: false },
            { platform: "twitter",   label: "Twitter / X", url: "",                     enabled: false },
          ];
        }
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

  // Social link handlers
  const handleSocialUrl = (index: number, value: string) => {
    const updated = [...(form.socialLinks || [])];
    updated[index] = { ...updated[index], url: value };
    setForm({ ...form, socialLinks: updated });
  };

  const handleSocialToggle = (index: number) => {
    const updated = [...(form.socialLinks || [])];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    setForm({ ...form, socialLinks: updated });
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
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "2px solid #f0f0f0", flexWrap: "wrap" }}>
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

      {/* Tab: Social Media Manager */}
      {activeTab === "social" && (
        <div style={{ maxWidth: "700px" }}>
          {/* Site Tagline */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={labelStyle}>Site Tagline (used in Footer & SEO)</label>
            <input name="siteTagline" value={form.siteTagline || ""} onChange={handleChange} style={inputStyle} placeholder="Where Music Meets People." />
          </div>

          <div style={{ borderTop: "1px solid #eee", paddingTop: "1.5rem" }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#333", marginBottom: "0.4rem" }}>
              Social Media Accounts
            </h3>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: "#888", marginBottom: "1.5rem" }}>
              Toggle the switch to show or hide a platform on the public website. Only enabled accounts appear in the Footer.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {(form.socialLinks || []).map((link: any, index: number) => (
                <div
                  key={link.platform}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    border: `1px solid ${link.enabled ? "#c9a84c" : "#eee"}`,
                    borderRadius: "8px",
                    background: link.enabled ? "#fffdf5" : "#fafafa",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Icon + Platform Name */}
                  <div style={{
                    width: "40px", height: "40px",
                    borderRadius: "8px",
                    background: link.enabled ? "rgba(201,168,76,0.12)" : "#f0f0f0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: link.enabled ? "#c9a84c" : "#aaa",
                    flexShrink: 0,
                  }}>
                    {PlatformIcons[link.platform] || <Globe size={20} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#333", marginBottom: "0.4rem" }}>
                      {link.label}
                    </div>
                    <input
                      value={link.url || ""}
                      onChange={(e) => handleSocialUrl(index, e.target.value)}
                      placeholder={`https://${link.platform}.com/yourpage`}
                      disabled={!link.enabled}
                      style={{
                        ...inputStyle,
                        background: link.enabled ? "#fff" : "#f5f5f5",
                        color: link.enabled ? "#111" : "#aaa",
                        cursor: link.enabled ? "text" : "not-allowed",
                        fontSize: "0.82rem",
                        padding: "8px 10px",
                      }}
                    />
                  </div>

                  {/* Toggle Switch */}
                  <div
                    onClick={() => handleSocialToggle(index)}
                    style={{
                      width: "46px", height: "26px",
                      borderRadius: "13px",
                      background: link.enabled ? "#c9a84c" : "#ddd",
                      cursor: "pointer",
                      position: "relative",
                      flexShrink: 0,
                      transition: "background 0.25s ease",
                    }}
                  >
                    <div style={{
                      position: "absolute",
                      top: "3px",
                      left: link.enabled ? "23px" : "3px",
                      width: "20px", height: "20px",
                      borderRadius: "50%",
                      background: "#fff",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      transition: "left 0.25s ease",
                    }} />
                  </div>

                  {/* Status badge */}
                  <div style={{
                    flexShrink: 0,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: link.enabled ? "#16a34a" : "#aaa",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    minWidth: "50px",
                    textAlign: "center",
                  }}>
                    {link.enabled ? "Live" : "Off"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
