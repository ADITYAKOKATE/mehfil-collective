"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import EventCard from "@/components/EventCard";
import ArtistCard from "@/components/ArtistCard";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#c9a84c",
          fontWeight: 600,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(2rem, 4vw, 3.2rem)",
        fontWeight: 500,
        color: "#f0ece4",
        lineHeight: 1.15,
        marginBottom: "1rem",
      }}
    >
      {children}
    </h2>
  );
}

export default function HomePageClient({ upcomingEvents, featuredArtists, pastEvents }: { upcomingEvents: any[], featuredArtists: any[], pastEvents: any[] }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ background: "#080808" }}>
      {/* ─── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "640px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image with parallax */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1800&q=85"
            alt="Live performance at Mehfil Collective"
            style={{
              width: "100%",
              height: "115%",
              objectFit: "cover",
              filter: "brightness(0.35)",
            }}
          />
        </div>

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%), linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.1) 40%, rgba(8,8,8,0.6) 80%, rgba(8,8,8,1) 100%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: "900px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#c9a84c",
                fontWeight: 500,
              }}
            >
              Live Entertainment & Cultural Events
            </span>
            <div style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
          </div>

          {/* Main title */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.9s ease 0.4s",
            }}
          >
            <span
              style={{
                display: "block",
                background: "linear-gradient(135deg, #c9a84c 0%, #e8cc7a 40%, #f5e09a 60%, #c9a84c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mehfil
            </span>
            <span
              style={{
                display: "block",
                color: "#f0ece4",
                fontSize: "0.55em",
                fontWeight: 300,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginTop: "0.3em",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Collective
            </span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              color: "rgba(240,236,228,0.75)",
              marginBottom: "3rem",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.65s",
            }}
          >
            Where Music Meets People.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.85s",
            }}
          >
            <Link
              href="/events"
              style={{
                padding: "15px 36px",
                background: "linear-gradient(135deg, #c9a84c, #e8cc7a)",
                color: "#080808",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Explore Events <ArrowRight size={16} />
            </Link>
            <Link
              href="/collaborate"
              style={{
                padding: "15px 36px",
                border: "1px solid rgba(201,168,76,0.6)",
                color: "#c9a84c",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(201,168,76,0.1)";
                el.style.borderColor = "#c9a84c";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(201,168,76,0.6)";
              }}
            >
              Work With Us
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: heroLoaded ? 0.6 : 0,
            transition: "opacity 0.8s ease 1.2s",
            animation: "bounce 2s infinite 2s",
          }}
        >
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#888880",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, #c9a84c, transparent)",
              animation: "pulse-line 2s infinite",
            }}
          />
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ────────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <SectionLabel>What&apos;s Happening</SectionLabel>
            <SectionTitle>Upcoming Events</SectionTitle>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                color: "#888880",
                maxWidth: "500px",
                lineHeight: 1.7,
              }}
            >
              Carefully curated live experiences across India. Find the ones that speak to your soul.
            </p>
          </div>
          <Link
            href="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#c9a84c",
              textDecoration: "none",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              borderBottom: "1px solid rgba(201,168,76,0.3)",
              paddingBottom: "2px",
              transition: "border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#c9a84c";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)";
            }}
          >
            View All Events <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {upcomingEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>

      {/* ─── PHILOSOPHY BANNER ─────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "6rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #0d0900 0%, #111008 50%, #0a0a0a 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Decorative horizontal lines */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "4rem",
              color: "rgba(201,168,76,0.15)",
              lineHeight: 1,
              marginBottom: "-1rem",
            }}
          >
            ❝
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.3rem, 3vw, 2rem)",
              color: "#f0ece4",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            Mehfil Collective is not just selling events.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c9a84c, #e8cc7a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              It is creating experiences
            </span>{" "}
            around music, culture, artists and people.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#888880",
              }}
            >
              Our Philosophy
            </span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
        </div>
      </section>

      {/* ─── FEATURED ARTISTS ──────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <SectionLabel>The Performers</SectionLabel>
            <SectionTitle>Featured Artists</SectionTitle>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                color: "#888880",
                maxWidth: "500px",
                lineHeight: 1.7,
              }}
            >
              Extraordinary talent from across India, handpicked by Mehfil Collective.
            </p>
          </div>
          <Link
            href="/artists"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#c9a84c",
              textDecoration: "none",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              borderBottom: "1px solid rgba(201,168,76,0.3)",
              paddingBottom: "2px",
            }}
          >
            Meet All Artists <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      </section>

      {/* ─── SERVICES STRIP ────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "#0c0c0c",
          borderTop: "1px solid rgba(201,168,76,0.08)",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel>Our Expertise</SectionLabel>
            <SectionTitle>What We Create</SectionTitle>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              { icon: "🎵", title: "Live Event Production", desc: "End-to-end production of unforgettable live experiences." },
              { icon: "🎤", title: "Artist Management", desc: "Booking, coordination and growth management for artists." },
              { icon: "✨", title: "Event Curation", desc: "Concept development and programming for unique events." },
              { icon: "🏢", title: "Corporate Events", desc: "Premium entertainment solutions for corporate functions." },
              { icon: "🤝", title: "Brand Collaborations", desc: "Cultural experiences designed around your brand." },
              { icon: "🎊", title: "Private Events", desc: "Curated entertainment for weddings and private celebrations." },
            ].map(({ icon, title, desc }) => (
              <ServiceCard key={title} icon={icon} title={title} desc={desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PAST EVENTS ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionLabel>The Archive</SectionLabel>
          <SectionTitle>Past Events</SectionTitle>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "#888880",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            A look at some of the memorable evenings we have had the privilege of creating.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {pastEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>

      {/* ─── INSTAGRAM CTA ─────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          background: "#080808",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <SectionLabel>Follow The Mehfil</SectionLabel>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 500,
              color: "#f0ece4",
              marginBottom: "1rem",
            }}
          >
            Join Our Community
          </h2>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "#888880",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Stay updated with our latest events, behind-the-scenes moments and artist stories. Follow us on Instagram for the full Mehfil experience.
          </p>
          <a
            href="https://instagram.com/mehfilcollective"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "14px 32px",
              border: "1px solid rgba(201,168,76,0.5)",
              color: "#c9a84c",
              textDecoration: "none",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.82rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(201,168,76,0.1)";
              el.style.borderColor = "#c9a84c";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(201,168,76,0.5)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Follow @mehfilcollective
          </a>
        </div>
      </section>

      {/* ─── CONTACT CTA ───────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "6rem 2rem",
          textAlign: "center",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1501386761578-eaa54b4e3bcd?w=1800&q=80"
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, rgba(8,8,8,0.7) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
          <SectionLabel>Let&apos;s Connect</SectionLabel>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 500,
              color: "#f0ece4",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            Have an event in mind?
          </h2>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "#888880",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Whether you&apos;re an artist, a venue, a brand or someone with a vision — let&apos;s talk and create something extraordinary together.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link
              href="/collaborate"
              style={{
                padding: "15px 36px",
                background: "linear-gradient(135deg, #c9a84c, #e8cc7a)",
                color: "#080808",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 700,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Start a Conversation
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "15px 36px",
                background: "#25d366",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.8rem",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.05)"}`,
        background: hovered ? "rgba(201,168,76,0.04)" : "transparent",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{icon}</div>
      <h3
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#f0ece4",
          marginBottom: "0.5rem",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.83rem",
          color: "#888880",
          lineHeight: 1.7,
        }}
      >
        {desc}
      </p>
    </div>
  );
}
