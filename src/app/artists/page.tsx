import ArtistCard from "@/components/ArtistCard";
import connectToDatabase from "@/lib/db";
import Artist from "@/models/Artist";
import { getSiteSettings } from "@/lib/settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artists | Mehfil Collective",
  description: "Meet the extraordinary talent performing at Mehfil Collective events.",
};

export const revalidate = 60;

export default async function ArtistsPage() {
  await connectToDatabase();
  const [dbArtists, settings] = await Promise.all([
    Artist.find().sort({ name: 1 }),
    getSiteSettings(),
  ]);

  const artists = JSON.parse(JSON.stringify(dbArtists));
  const s = JSON.parse(JSON.stringify(settings));

  return (
    <div style={{ background: "#080808", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Page Hero */}
      <div
        style={{
          position: "relative",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>
              {s.artistsHeroLabel || "The Performers"}
            </span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            {s.artistsHeroTitle || "Our Artists"}
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            {s.artistsHeroSubtitle || "Extraordinary talent from across India, handpicked and presented by Mehfil Collective to create unforgettable live experiences."}
          </p>
        </div>
      </div>

      {/* Artists Grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "3rem 2rem 5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {artists.map((artist: any) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: "center",
          padding: "4rem 2rem",
          borderTop: "1px solid rgba(201,168,76,0.08)",
          background: "#0a0a0a",
        }}
      >
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 500, color: "#f0ece4", marginBottom: "0.75rem" }}>
          {s.artistsCtaTitle || "Are you an artist?"}
        </h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: "#888880", marginBottom: "2rem", lineHeight: 1.7, maxWidth: "450px", margin: "0 auto 2rem" }}>
          {s.artistsCtaSubtitle || "Mehfil Collective is always looking for extraordinary talent. Reach out to us and let's create something together."}
        </p>
        <a
          href="/collaborate"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "13px 30px",
            border: "1px solid #c9a84c",
            color: "#c9a84c",
            textDecoration: "none",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 500,
            transition: "all 0.3s ease",
          }}
        >
          Get In Touch
        </a>
      </div>
    </div>
  );
}
