"use client";

import { useState } from "react";
import type { Metadata } from "next";

const collaborationTypes = [
  "Artist Booking",
  "Event Sponsorship",
  "Brand Collaboration",
  "Venue Partnership",
  "Corporate Event",
  "Private Event",
  "Media & Press",
  "Other",
];

export default function CollaborateClient({ whatsappNumber, whatsappEnabled }: { whatsappNumber?: string; whatsappEnabled?: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.type} - ${formData.company || formData.name}`,
          message: formData.message,
          type: "collaborate",
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit", error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f0ece4",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const labelStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "#888880",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>Work With Us</span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            Let&apos;s Create Something Together
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", maxWidth: "550px", margin: "0 auto", lineHeight: 1.7 }}>
            Brands, artists, event organizers, venues and sponsors — if you have a vision, we have the team and the passion to bring it to life.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem 6rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="collab-grid">
        {/* Who We Work With */}
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            Who We Work With
          </h2>
          <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "2rem" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "🎤", label: "Artists & Performers", desc: "Get booked for Mehfil Collective events and grow your performance career." },
              { icon: "🏢", label: "Brands & Companies", desc: "Leverage the power of live music and culture for your brand activations." },
              { icon: "📍", label: "Venues & Spaces", desc: "Partner with us to bring extraordinary events to your venue." },
              { icon: "🎪", label: "Event Organizers", desc: "Collaborate on large-scale productions and curated cultural events." },
              { icon: "💼", label: "Corporate Clients", desc: "Elevate your corporate events with world-class entertainment." },
              { icon: "🌟", label: "Sponsors", desc: "Associate your brand with premium live entertainment experiences." },
            ].map(({ icon, label, desc }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1.2rem",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)")}
              >
                <span style={{ fontSize: "1.4rem" }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.92rem", fontWeight: 600, color: "#f0ece4", marginBottom: "0.25rem" }}>{label}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: "#888880", lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp */}
          {whatsappEnabled && (
          <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: "#888880", marginBottom: "1rem" }}>
              Prefer a quicker conversation?
            </div>
            <a
              href={`https://wa.me/${(whatsappNumber || "+919372433632").replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "12px 24px",
                background: "#25d366",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 600,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
          )}
        </div>

        {/* Form */}
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            Send an Enquiry
          </h2>
          <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "2rem" }} />

          {submitted ? (
            <div
              style={{
                padding: "3rem",
                border: "1px solid rgba(201,168,76,0.3)",
                textAlign: "center",
                background: "rgba(201,168,76,0.04)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✨</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#f0ece4", marginBottom: "0.75rem" }}>
                Thank You!
              </h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: "#888880", lineHeight: 1.7 }}>
                We have received your enquiry and will get back to you within 24 hours. We look forward to creating something beautiful together.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>Full Name *</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your name" style={inputStyle}
                    onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div>
                  <label htmlFor="company" style={labelStyle}>Company / Organization</label>
                  <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Your company" style={inputStyle}
                    onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle}
                    onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div>
                  <label htmlFor="phone" style={labelStyle}>Phone</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle}
                    onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                    onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" style={labelStyle}>Collaboration Type *</label>
                <select id="type" name="type" required value={formData.type} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                >
                  <option value="" disabled>Select a type...</option>
                  {collaborationTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your vision, event idea, or how you'd like to work together..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "15px",
                  background: "linear-gradient(135deg, #c9a84c, #e8cc7a)",
                  border: "none",
                  color: "#080808",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.82rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (!loading && ((e.target as HTMLElement).style.opacity = "0.85"))}
                onMouseLeave={(e) => (!loading && ((e.target as HTMLElement).style.opacity = "1"))}
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .collab-grid { grid-template-columns: 1fr !important; }
        }
        select option { background: #111; color: #f0ece4; }
      `}</style>
    </div>
  );
}
