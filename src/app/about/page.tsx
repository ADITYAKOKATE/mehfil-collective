import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Mehfil Collective",
  description: "Learn about Mehfil Collective — our story, philosophy and the team behind the experiences.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const s = settings as any;
  const services = s.services || [];

  return (
    <div style={{ background: "#080808", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "420px", overflow: "hidden" }}>
        <img
          src={s.aboutHeroBgImage || "https://images.unsplash.com/photo-1501386761578-eaa54b4e3bcd?w=1800&q=80"}
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
              {s.aboutHeroLabel || "Our Story"}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 500, color: "#f0ece4", lineHeight: 1.1 }}>
            {s.aboutHeroTitle || "About Mehfil Collective"}
          </h1>
        </div>
      </div>

      {/* Who We Are */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>
                {s.aboutWhoWeAreTitle || "Who We Are"}
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "#f0ece4", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              {s.aboutWhoWeAreSubtitle || "Where Music Finds Its Home"}
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
              {s.aboutWhoWeAreText}
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src={s.aboutWhoWeAreImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&q=80"}
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
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "#c9a84c" }}>{s.aboutWhoWeAreStat || "50+"}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888880", textAlign: "center" }}>{s.aboutWhoWeAreStatLabel || "Events Curated"}</div>
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
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>
              {s.aboutPhilosophyTitle || "Our Philosophy"}
            </span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "2rem" }}>
            {s.aboutPhilosophySubtitle || "The Idea of a Mehfil"}
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", color: "#888880", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
            {s.aboutPhilosophyText}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", border: "1px solid rgba(201,168,76,0.1)", background: "rgba(201,168,76,0.1)" }}>
          {[
            { number: s.aboutStat1Number || "50+", label: s.aboutStat1Label || "Events Produced" },
            { number: s.aboutStat2Number || "100+", label: s.aboutStat2Label || "Artists Managed" },
            { number: s.aboutStat3Number || "15+", label: s.aboutStat3Label || "Cities Reached" },
            { number: s.aboutStat4Number || "50K+", label: s.aboutStat4Label || "Audience Members" },
          ].map(({ number, label }) => (
            <div key={label} style={{ padding: "2.5rem", textAlign: "center", background: "#080808" }}>
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

      {/* What We Do — Dynamic from CMS */}
      {services.length > 0 && (
        <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem 5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>{s.aboutServicesLabel || "What We Do"}</span>
              <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "#f0ece4" }}>
              {s.aboutServicesTitle || "Our Services"}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {services.map((svc: any, i: number) => (
              <div
                key={i}
                style={{
                  padding: "2rem",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "border-color 0.3s ease",
                }}
                className="service-card"
              >
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#f0ece4", marginBottom: "0.75rem" }}>{svc.title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "#888880", lineHeight: 1.75 }}>{svc.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: "5rem 2rem", textAlign: "center", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
          {s.aboutCtaTitle || "Ready to Create Something?"}
        </h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          {s.aboutCtaSubtitle || "Whether you are an artist, a venue, a brand or an event organizer — we would love to hear from you."}
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
        .service-card:hover { border-color: rgba(201,168,76,0.35) !important; }
      `}</style>
    </div>
  );
}
