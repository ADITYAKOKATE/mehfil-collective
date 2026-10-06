"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import EventCard from "@/components/EventCard";

export default function EventsClient({ initialEvents, heroLabel, heroTitle, heroSubtitle }: { initialEvents: any[], heroLabel?: string, heroTitle?: string, heroSubtitle?: string }) {
  const cities = ["All Cities", ...Array.from(new Set(initialEvents.map((e) => e.city)))];
  const categories = ["All Categories", ...Array.from(new Set(initialEvents.map((e) => e.category)))];

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "past">("all");

  const filtered = initialEvents.filter((e) => {
    const matchSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    const matchCity = selectedCity === "All Cities" || e.city === selectedCity;
    const matchCategory = selectedCategory === "All Categories" || e.category === selectedCategory;
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchCity && matchCategory && matchStatus;
  });

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
              {heroLabel || "All Events"}
            </span>
            <div style={{ width: "30px", height: "1px", background: "#c9a84c" }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, color: "#f0ece4", marginBottom: "1rem" }}>
            {heroTitle || "Discover Events"}
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#888880", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            {heroSubtitle || "Live music, cultural gatherings, Sufi evenings, Bollywood nights and more — curated across India."}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem 2rem 0",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <Search size={16} color="#888880" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search events, cities, genres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px 14px 44px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f0ece4",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.9rem",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.5)")}
            onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        {/* Filter row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem", alignItems: "center" }}>
          <Filter size={14} color="#c9a84c" />
          
          {/* Status */}
          {(["all", "upcoming", "past"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "7px 18px",
                border: `1px solid ${statusFilter === s ? "#c9a84c" : "rgba(255,255,255,0.1)"}`,
                background: statusFilter === s ? "rgba(201,168,76,0.12)" : "transparent",
                color: statusFilter === s ? "#c9a84c" : "#888880",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}

          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />

          {/* City filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: "7px 14px",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f0ece4",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "7px 14px",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f0ece4",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Result count */}
          <span style={{ marginLeft: "auto", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "#888880" }}>
            {filtered.length} event{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Events Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#555", fontStyle: "italic" }}>
              No events found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
              paddingBottom: "4rem",
            }}
          >
            {filtered.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
