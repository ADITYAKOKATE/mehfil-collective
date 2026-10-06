"use client";

import { useState } from "react";

interface GalleryItem {
  src: string;
  category: string;
  caption: string;
}

export default function GalleryClient({ initialItems = [], heroLabel, heroTitle, heroSubtitle }: { initialItems: GalleryItem[], heroLabel?: string, heroTitle?: string, heroSubtitle?: string }) {
  const [selected, setSelected] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Compute categories dynamically based on the items provided
  const baseCategories = ["All"];
  const itemCategories = Array.from(new Set(initialItems.map((item) => item.category).filter(Boolean)));
  const categories = [...baseCategories, ...itemCategories];

  const filtered = selected === "All" ? initialItems : initialItems.filter((g) => g.category === selected);



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
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>{heroLabel || "Visual Stories"}</span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            {heroTitle || "Gallery"}
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            {heroSubtitle || "A visual window into the world of Mehfil Collective — events, artists, audiences and the moments in between."}
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem 2rem 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            style={{
              padding: "8px 20px",
              border: `1px solid ${selected === cat ? "#c9a84c" : "rgba(255,255,255,0.1)"}`,
              background: selected === cat ? "rgba(201,168,76,0.12)" : "transparent",
              color: selected === cat ? "#c9a84c" : "#888880",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem 2rem 5rem",
          columns: "4 240px",
          columnGap: "1rem",
        }}
      >
        {filtered.map((item, i) => (
          <div
            key={i}
            onClick={() => setLightbox(item.src)}
            style={{
              marginBottom: "1rem",
              overflow: "hidden",
              cursor: "zoom-in",
              position: "relative",
              breakInside: "avoid",
            }}
            onMouseEnter={(e) => {
              const img = (e.currentTarget as HTMLElement).querySelector("img");
              const overlay = (e.currentTarget as HTMLElement).querySelector(".gallery-overlay") as HTMLElement;
              if (img) img.style.transform = "scale(1.05)";
              if (overlay) overlay.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const img = (e.currentTarget as HTMLElement).querySelector("img");
              const overlay = (e.currentTarget as HTMLElement).querySelector(".gallery-overlay") as HTMLElement;
              if (img) img.style.transform = "scale(1)";
              if (overlay) overlay.style.opacity = "0";
            }}
          >
            <img
              src={item.src}
              alt={item.caption}
              style={{ width: "100%", display: "block", transition: "transform 0.5s ease" }}
            />
            <div
              className="gallery-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 60%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "1rem",
              }}
            >
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "#c9a84c", marginBottom: "2px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {item.category}
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#f0ece4" }}>
                {item.caption}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "2rem",
          }}
        >
          <img
            src={lightbox}
            alt="Gallery"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "none",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#f0ece4",
              width: "44px",
              height: "44px",
              cursor: "pointer",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
