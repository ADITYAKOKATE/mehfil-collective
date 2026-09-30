"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
type Props = {
  artist: any;
};

export default function ArtistCard({ artist }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/artists/${artist.slug}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article
        style={{
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
          <img
            src={artist.profileImage}
            alt={artist.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.7s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              filter: hovered ? "brightness(0.7)" : "brightness(0.6) grayscale(0.2)",
            }}
          />
          {/* Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: hovered
                ? "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.4) 50%, rgba(201,168,76,0.1) 100%)"
                : "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)",
              transition: "all 0.4s ease",
            }}
          />

          {/* Content overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9a84c",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              {artist.category}
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#f0ece4",
                lineHeight: 1.1,
                marginBottom: "0.3rem",
              }}
            >
              {artist.name}
            </h3>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.78rem",
                color: "#888880",
              }}
            >
              {artist.tagline}
            </p>

            {/* Hover reveal CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.3s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  fontWeight: 500,
                }}
              >
                View Artist
              </span>
              <ArrowRight size={14} color="#c9a84c" />
            </div>

            {/* Genre pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginTop: hovered ? "0.75rem" : "0",
                maxHeight: hovered ? "60px" : "0",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              {artist.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  style={{
                    padding: "3px 10px",
                    border: "1px solid rgba(201,168,76,0.35)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#c9a84c",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
