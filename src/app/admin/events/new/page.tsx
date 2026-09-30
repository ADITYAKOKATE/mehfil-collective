"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    city: "",
    venue: "",
    category: "Sufi Nights",
    description: "",
    coverImage: "",
    status: "upcoming",
    ticketType: "tickets",
    ticketLink: "",
    artists: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        artists: formData.artists.split(",").map((a) => a.trim()).filter(Boolean),
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#444",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <Link href="/admin/events" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", background: "#f5f5f5", borderRadius: "50%", color: "#333", textDecoration: "none" }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#111", margin: 0 }}>Add New Event</h1>
      </div>

      {error && (
        <div style={{ background: "#fff5f5", color: "#dc3545", padding: "1rem", borderRadius: "6px", marginBottom: "1.5rem", border: "1px solid #ffcaca", fontFamily: "'Outfit', sans-serif" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={labelStyle}>Event Title *</label>
            <input name="title" required value={formData.title} onChange={handleChange} style={inputStyle} placeholder="e.g. Sufi Mehfil Unplugged" />
          </div>
          <div>
            <label style={labelStyle}>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="Sufi Nights">Sufi Nights</option>
              <option value="Bollywood Nights">Bollywood Nights</option>
              <option value="Bhajan Jamming">Bhajan Jamming</option>
              <option value="Cultural Concert">Cultural Concert</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Private Event">Private Event</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={labelStyle}>Date *</label>
            <input name="date" required value={formData.date} onChange={handleChange} style={inputStyle} placeholder="e.g. Oct 15, 2024" />
          </div>
          <div>
            <label style={labelStyle}>Time *</label>
            <input name="time" required value={formData.time} onChange={handleChange} style={inputStyle} placeholder="e.g. 7:30 PM Onwards" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={labelStyle}>City *</label>
            <input name="city" required value={formData.city} onChange={handleChange} style={inputStyle} placeholder="e.g. Mumbai" />
          </div>
          <div>
            <label style={labelStyle}>Venue *</label>
            <input name="venue" required value={formData.venue} onChange={handleChange} style={inputStyle} placeholder="e.g. Royal Opera House" />
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Description *</label>
          <textarea name="description" required value={formData.description} onChange={handleChange} style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} placeholder="Event description..." />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Cover Image URL *</label>
          <input name="coverImage" required value={formData.coverImage} onChange={handleChange} style={inputStyle} placeholder="https://..." />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Artists (comma-separated slugs)</label>
          <input name="artists" value={formData.artists} onChange={handleChange} style={inputStyle} placeholder="e.g. arjun-sharma, meera-kapoor" />
          <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.25rem" }}>Enter the slugs of the artists performing, separated by commas.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "2rem", padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" }}>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Ticket Type</label>
            <select name="ticketType" value={formData.ticketType} onChange={handleChange} style={inputStyle}>
              <option value="tickets">Tickets (Paid)</option>
              <option value="register">Register (Free)</option>
              <option value="enquire">Enquire (Private)</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Ticket / RSVP Link</label>
            <input name="ticketLink" value={formData.ticketLink} onChange={handleChange} style={inputStyle} placeholder="https://bookmyshow.com/..." />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 24px",
            background: "#111",
            color: "#c9a84c",
            border: "none",
            borderRadius: "6px",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
