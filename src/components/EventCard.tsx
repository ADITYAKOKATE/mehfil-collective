"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
type Props = {
  event: any;
};

const categoryColors: Record<string, string> = {
  Sufi: "#9b59b6",
  Bollywood: "#e74c3c",
  Devotional: "#e67e22",
  "Live Music": "#27ae60",
  Classical: "#2980b9",
  Corporate: "#34495e",
  Festival: "#f39c12",
};

export default function EventCard({ event }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/events/${event.slug}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article
        style={{
          position: "relative",
          background: "#111",
          border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.06)"}`,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.1)"
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
          <img
            src={event.coverImage}
            alt={event.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.2) 60%, transparent 100%)",
            }}
          />
          {/* Status badge */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              padding: "4px 12px",
              fontSize: "0.65rem",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
              background: event.status === "upcoming" ? "rgba(201,168,76,0.9)" : "rgba(100,100,100,0.8)",
              color: event.status === "upcoming" ? "#080808" : "#aaa",
            }}
          >
            {event.status === "upcoming" ? "Upcoming" : "Past"}
          </div>
          {/* Category badge */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "14px",
              padding: "4px 10px",
              fontSize: "0.65rem",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              background: categoryColors[event.category] || "#555",
              color: "#fff",
            }}
          >
            {event.category}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.4rem" }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.45rem",
              fontWeight: 600,
              color: "#f0ece4",
              marginBottom: "0.3rem",
              lineHeight: 1.2,
            }}
          >
            {event.title}
          </h3>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.8rem",
              color: "#c9a84c",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
            }}
          >
            {event.subtitle}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Calendar size={13} color="#c9a84c" />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: "#888880" }}>
                {event.date}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={13} color="#c9a84c" />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: "#888880" }}>
                {event.city}, {event.state}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#c9a84c",
                fontWeight: 500,
              }}
            >
              View Event
            </span>
            <div
              style={{
                width: "28px",
                height: "28px",
                border: "1px solid rgba(201,168,76,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                background: hovered ? "#c9a84c" : "transparent",
              }}
            >
              <ArrowRight size={14} color={hovered ? "#080808" : "#c9a84c"} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
