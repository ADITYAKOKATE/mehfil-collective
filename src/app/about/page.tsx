"use client";

import Link from "next/link";


const services = [
  { icon: "🎵", title: "Live Event Production", desc: "End-to-end planning and execution of live entertainment experiences — from intimate gatherings to large-scale productions." },
  { icon: "🎤", title: "Artist Management", desc: "Artist booking, coordination and growth management, ensuring every performance is delivered with excellence." },
  { icon: "✨", title: "Event Curation", desc: "Concept development and programming for events that are unique, memorable and deeply resonant." },
  { icon: "🏢", title: "Corporate Events", desc: "Premium entertainment solutions for corporate gatherings, award nights and private functions." },
  { icon: "🤝", title: "Brand Collaborations", desc: "Music and cultural experiences designed around brands that want to connect with audiences in meaningful ways." },
  { icon: "🎊", title: "Private Events", desc: "Curated entertainment for weddings, celebrations and exclusive private gatherings." },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "420px", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1501386761578-eaa54b4e3bcd?w=1800&q=80"
          alt="Mehfil Collective live performance"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.2) saturate(0.7)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "2rem",
            right: "2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>
              Our Story
            </span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 500, color: "#f0ece4", lineHeight: 1.1 }}>
            About Mehfil Collective
          </h1>
        </div>
      </div>

      {/* Who We Are */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>Who We Are</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "#f0ece4", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Where Music Finds Its Home
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", lineHeight: 1.85, marginBottom: "1.2rem" }}>
              Mehfil Collective was born from a simple but powerful belief — that live music and cultural experiences have the unique ability to bring people together, to create communities and to leave lasting impressions on the human soul.
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", lineHeight: 1.85, marginBottom: "1.2rem" }}>
              We are a live entertainment and cultural events company focused on creating and managing experiences around live music, Bollywood, Sufi, devotional jamming, cultural gatherings, artist performances and curated events across India.
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", lineHeight: 1.85 }}>
              From intimate Sufi evenings to large-scale productions, every Mehfil we create is a world unto itself — carefully conceptualized, beautifully executed and deeply felt.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&q=80"
              alt="Live music performance"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", filter: "brightness(0.85)" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                width: "120px",
                height: "120px",
                border: "1px solid rgba(201,168,76,0.3)",
                background: "rgba(8,8,8,0.8)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "#c9a84c" }}>50+</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888880", textAlign: "center" }}>Events Curated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section
        style={{
          position: "relative",
          padding: "6rem 2rem",
          textAlign: "center",
          overflow: "hidden",
          background: "#0a0900",
          borderTop: "1px solid rgba(201,168,76,0.08)",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>Our Philosophy</span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "2rem" }}>
            The Idea of a Mehfil
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", color: "#888880", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            A <span style={{ color: "#c9a84c", fontStyle: "italic" }}>mehfil</span> is more than a gathering. It is a space where music and poetry become bridges — between strangers, between cultures, between the ordinary and the extraordinary.
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", color: "#888880", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            Everything we do at Mehfil Collective is guided by this spirit. We do not just organize events — we create environments where people can lose themselves in music, discover artists, and leave with something that stays with them long after the last note has faded.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.3rem", color: "#f0ece4" }}>
            &ldquo;Every gathering has the potential to become something sacred.&rdquo;
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", border: "1px solid rgba(201,168,76,0.1)", background: "rgba(201,168,76,0.1)" }}>
          {[
            { number: "50+", label: "Events Produced" },
            { number: "100+", label: "Artists Managed" },
            { number: "15+", label: "Cities Reached" },
            { number: "50K+", label: "Audience Members" },
          ].map(({ number, label }) => (
            <div
              key={label}
              style={{
                padding: "2.5rem",
                textAlign: "center",
                background: "#080808",
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 600, color: "#c9a84c", lineHeight: 1 }}>
                {number}
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888880", marginTop: "0.5rem" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>What We Do</span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "#f0ece4" }}>
            Our Services
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                padding: "2rem",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)")}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{icon}</div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#f0ece4", marginBottom: "0.75rem" }}>{title}</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "#888880", lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 2rem", textAlign: "center", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
          Ready to Create Something?
        </h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Whether you are an artist, a venue, a brand or an event organizer — we would love to hear from you.
        </p>
        <Link
          href="/collaborate"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "14px 32px",
            background: "linear-gradient(135deg, #c9a84c, #e8cc7a)",
            color: "#080808",
            textDecoration: "none",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.82rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Let&apos;s Collaborate
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
