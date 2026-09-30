"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

function SvgInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "contact" }),
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

  return (
    <div style={{ background: "#080808", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Header */}
      <div
        style={{
          position: "relative",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>Reach Out</span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            Contact Us
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", maxWidth: "450px", margin: "0 auto", lineHeight: 1.7 }}>
            Have an event in mind? Let&apos;s talk.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem 6rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="contact-grid">
        {/* Contact Info */}
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            Get In Touch
          </h2>
          <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "2.5rem" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {[
              { icon: <Mail size={20} />, label: "Email", value: "hello@mehfilcollective.com", href: "mailto:hello@mehfilcollective.com" },
              { icon: <Phone size={20} />, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
              { icon: <MapPin size={20} />, label: "Location", value: "Mumbai, Maharashtra, India", href: undefined },
              { icon: <SvgInstagram size={20} />, label: "Instagram", value: "@mehfilcollective", href: "https://instagram.com/mehfilcollective" },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1px solid rgba(201,168,76,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c9a84c",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: "4px" }}>
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: "#f0ece4", textDecoration: "none", transition: "color 0.3s ease" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a84c")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#f0ece4")}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: "#f0ece4" }}>{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "13px 26px",
              background: "#25d366",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              transition: "opacity 0.3s ease",
              marginBottom: "2.5rem",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>

          {/* Map placeholder */}
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.15)",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.75rem",
              background: "rgba(255,255,255,0.02)",
              minHeight: "160px",
            }}
          >
            <MapPin size={24} color="#c9a84c" />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#888880", textAlign: "center" }}>
              Mumbai, Maharashtra, India<br />
              <span style={{ fontSize: "0.75rem", color: "#555" }}>Google Maps integration available on request</span>
            </span>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            Send a Message
          </h2>
          <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "2rem" }} />

          {submitted ? (
            <div style={{ padding: "3rem", border: "1px solid rgba(201,168,76,0.3)", textAlign: "center", background: "rgba(201,168,76,0.04)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✨</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#f0ece4", marginBottom: "0.75rem" }}>Message Received!</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: "#888880", lineHeight: 1.7 }}>
                Thank you for reaching out. We will get back to you very soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div>
                <label htmlFor="contact-name" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888880", display: "block", marginBottom: "0.5rem" }}>Name *</label>
                <input id="contact-name" name="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888880", display: "block", marginBottom: "0.5rem" }}>Email *</label>
                <input id="contact-email" name="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <div>
                <label htmlFor="contact-subject" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888880", display: "block", marginBottom: "0.5rem" }}>Subject</label>
                <input id="contact-subject" name="subject" type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="What is this about?" style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <div>
                <label htmlFor="contact-message" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888880", display: "block", marginBottom: "0.5rem" }}>Message *</label>
                <textarea id="contact-message" name="message" required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Your message..." style={{ ...inputStyle, resize: "vertical" }}
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
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
