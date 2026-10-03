import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, Clock, MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";
import Artist from "@/models/Artist";
import { getSiteSettings } from "@/lib/settings";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  await connectToDatabase();
  const events = await Event.find({}, { slug: 1 });
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const event = await Event.findOne({ slug });
  if (!event) return {};
  return {
    title: `${event.title} — ${event.city} | Mehfil Collective`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Mehfil Collective`,
      description: event.description,
      images: [event.coverImage],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const event = await Event.findOne({ slug });
  if (!event) notFound();

  const performers = await Artist.find({ slug: { $in: event.artists } });
  const ticketLabel =
    event!.ticketType === "tickets"
      ? "Get Tickets"
      : event!.ticketType === "register"
      ? "Register Now"
      : "Enquire Now";

  const settings = await getSiteSettings();
  const whatsappNumber = (settings.whatsappNumber || "+919372433632").replace(/[^0-9]/g, "");
  const whatsappEnabled = settings.whatsappEnabled !== false;

  return (
    <div style={{ background: "#080808", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "520px", overflow: "hidden" }}>
        <img
          src={event!.coverImage}
          alt={event!.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.2) 100%)",
          }}
        />
        <div style={{ position: "absolute", bottom: "3rem", left: "2rem", right: "2rem" }}>
          <div style={{ maxWidth: "1400px" }}>
            <Link
              href="/events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#888880",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              <ArrowLeft size={14} /> Back to Events
            </Link>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.4)",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "1rem",
              }}
            >
              {event!.category}
            </div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 600,
                color: "#f0ece4",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              {event!.title}
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.3rem", color: "rgba(240,236,228,0.6)" }}>
              {event!.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "3rem 2rem 5rem",
          display: "grid",
          gridTemplateColumns: "1fr min(340px, 100%)",
          gap: "3rem",
          alignItems: "start",
        }}
        className="event-layout-grid"
      >
        {/* Left */}
        <div>
          {/* About */}
          <section style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
              About the Event
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", lineHeight: 1.85 }}>
              {event!.longDescription}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
              {event!.genre.map((g) => (
                <span key={g} style={{ padding: "5px 14px", border: "1px solid rgba(201,168,76,0.25)", fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c" }}>
                  {g}
                </span>
              ))}
            </div>
          </section>

          {/* Artists */}
          {performers.length > 0 && (
            <section style={{ marginBottom: "3.5rem" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
                Performing Artists
              </h2>
              <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "1.5rem" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                {performers.map((artist) => (
                  <Link key={artist._id.toString()} href={`/artists/${artist.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.3s ease" }}
                      className="artist-hover-card"
                    >
                      <img src={artist.profileImage} alt={artist.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} />
                      <div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "#f0ece4" }}>{artist.name}</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: "#c9a84c", marginTop: "2px" }}>{artist.category}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          {event!.gallery.length > 0 && (
            <section>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
                Gallery
              </h2>
              <div style={{ width: "40px", height: "1px", background: "#c9a84c", marginBottom: "1.5rem" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
                {event!.gallery.map((img, i) => (
                  <div key={i} style={{ aspectRatio: "4/3", overflow: "hidden" }} className="gallery-img-wrap">
                    <img
                      src={img}
                      alt={`${event!.title} gallery ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                      className="gallery-hover-img"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ position: "sticky", top: "100px" }}>
          <div style={{ background: "#111", border: "1px solid rgba(201,168,76,0.2)", padding: "2rem" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500, color: "#f0ece4", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              Event Details
            </h3>
            {[
              { icon: <Calendar size={16} />, label: "Date", value: event!.date },
              { icon: <Clock size={16} />, label: "Time", value: event!.time },
              { icon: <MapPin size={16} />, label: "Venue", value: event!.venue },
              { icon: <MapPin size={16} />, label: "City", value: `${event!.city}, ${event!.state}` },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem" }}>
                <div style={{ color: "#c9a84c", marginTop: "2px", flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: "2px" }}>{label}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#f0ece4" }}>{value}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href={event!.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "14px",
                  background: "linear-gradient(135deg, #c9a84c, #e8cc7a)",
                  color: "#080808",
                  textDecoration: "none",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {ticketLabel} <ExternalLink size={14} />
              </a>
              {whatsappEnabled && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "13px",
                  border: "1px solid rgba(201,168,76,0.4)",
                  color: "#c9a84c",
                  textDecoration: "none",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                WhatsApp Enquiry
              </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .event-layout-grid { grid-template-columns: 1fr !important; }
        }
        .gallery-img-wrap:hover .gallery-hover-img { transform: scale(1.05); }
        .artist-hover-card:hover { border-color: rgba(201,168,76,0.4) !important; }
      `}</style>
    </div>
  );
}
