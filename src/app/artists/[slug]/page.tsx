import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Globe, ExternalLink } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Artist from "@/models/Artist";
import Event from "@/models/Event";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  await connectToDatabase();
  const artists = await Artist.find({}, { slug: 1 });
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const artist = await Artist.findOne({ slug });
  if (!artist) return {};
  return {
    title: `${artist.name} — ${artist.tagline} | Mehfil Collective`,
    description: artist.bio.slice(0, 155),
    openGraph: {
      title: `${artist.name} | Mehfil Collective`,
      description: artist.bio.slice(0, 155),
      images: [artist.profileImage],
    },
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const artist = await Artist.findOne({ slug });
  if (!artist) notFound();

  const artistEvents = await Event.find({ artists: slug }).sort({ date: -1 });

  const socialIcons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96C1 8.12 1 12 1 12s0 3.88.46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95C23 15.88 23 12 23 12s0-3.88-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    spotify: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14.5c2.5-1 5.5-1 8 0"/>
        <path d="M6.5 12c3.5-1.5 7.5-1.5 11 0"/>
        <path d="M7.5 9.5c3-1.5 6.5-1.5 9.5 0"/>
      </svg>
    ),
    website: <Globe size={18} />,
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "480px", overflow: "hidden" }}>
        <img
          src={artist!.profileImage}
          alt={artist!.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "brightness(0.3) saturate(0.8)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "3rem", left: "2rem", right: "2rem" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <Link href="/artists" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#888880", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.3s ease" }} className="social-link-hover">
                <ArrowLeft size={16} /> Back to Artists
              </Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ padding: "6px 14px", background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,204,122,0.05))", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "4px", fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8cc7a", fontWeight: 500 }}>
                {artist!.category}
              </div>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 600, color: "#f0ece4", lineHeight: 1.0, marginBottom: "0.5rem" }}>
              {artist!.name}
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#c9a84c", letterSpacing: "0.05em" }}>
              {artist!.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 2rem 5rem", display: "grid", gridTemplateColumns: "1fr min(320px, 100%)", gap: "3rem", alignItems: "start" }}
        className="artist-layout-grid"
      >
        {/* Left */}
        <div>
          <section style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>About</h2>
            <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", lineHeight: 1.85 }}>{artist!.bio}</p>
          </section>

          {artist!.gallery.length > 0 && (
            <section style={{ marginBottom: "3.5rem" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>Gallery</h2>
              <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "1.5rem" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
                {artist!.gallery.map((img, i) => (
                  <div key={i} style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }} className="gallery-img-wrap">
                    {img.includes("youtube.com") || img.includes("youtu.be") ? (
                      <iframe style={{ width: "100%", height: "100%", border: "none" }} src={`https://www.youtube.com/embed/${img.includes("v=") ? img.split("v=")[1]?.split("&")[0] : img.split("/").pop()}`} allowFullScreen />
                    ) : img.match(/\.(mp4|webm)$/i) ? (
                      <video src={img} controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <img src={img} alt={`${artist!.name} ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} className="gallery-hover-img" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {artistEvents.length > 0 && (
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>Events</h2>
              <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "1.5rem" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {artistEvents.map((event) => (
                  <Link key={event._id.toString()} href={`/events/${event.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.2rem", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.3s ease" }} className="event-hover-card">
                      <img src={event.coverImage} alt={event.title} style={{ width: "70px", height: "50px", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "#f0ece4" }}>{event.title}</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "#888880", marginTop: "2px" }}>{event.date} • {event.city}</div>
                      </div>
                      <div style={{ padding: "4px 10px", background: event.status === "upcoming" ? "rgba(201,168,76,0.12)" : "rgba(100,100,100,0.15)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: event.status === "upcoming" ? "#c9a84c" : "#666", fontFamily: "'Outfit', sans-serif" }}>
                        {event.status}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ position: "sticky", top: "100px" }}>
          <div style={{ background: "#111", border: "1px solid rgba(201,168,76,0.2)", padding: "1.8rem", marginBottom: "1.5rem" }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.2rem", fontWeight: 600 }}>Genres</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {artist!.genres.map((g) => (
                <span key={g} style={{ padding: "5px 12px", border: "1px solid rgba(201,168,76,0.25)", fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c" }}>{g}</span>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.75rem", fontWeight: 600 }}>Performance Type</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", color: "#888880" }}>{artist!.performanceType}</p>
            </div>
          </div>

          {artist?.socialLinks && Object.values(artist.socialLinks).some((url) => !!url) && (
            <div style={{ background: "#111", border: "1px solid rgba(201,168,76,0.2)", padding: "1.8rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.2rem", fontWeight: 600 }}>Follow & Listen</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {Object.entries(artist.socialLinks)
                  .filter(([_, url]) => !!url)
                  .map(([platform, url]) => (
                  <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#888880", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", textTransform: "capitalize", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    className="social-link-hover"
                  >
                    <span style={{ color: "#c9a84c" }}>{socialIcons[platform]}</span>
                    {platform}
                    <ExternalLink size={12} style={{ marginLeft: "auto" }} />
                  </a>
                ))}
              </div>
            </div>
          )}

          <a href="/collaborate" style={{ display: "block", textAlign: "center", padding: "15px", background: "linear-gradient(135deg, #c9a84c, #e8cc7a)", color: "#080808", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
            Book This Artist
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .artist-layout-grid { grid-template-columns: 1fr !important; }
        }
        .gallery-img-wrap:hover .gallery-hover-img { transform: scale(1.05); }
        .event-hover-card:hover { border-color: rgba(201,168,76,0.4) !important; }
        .social-link-hover:hover { color: #c9a84c !important; }
      `}</style>
    </div>
  );
}
