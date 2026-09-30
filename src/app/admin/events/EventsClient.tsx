"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventsClient({ initialEvents }: { initialEvents: any[] }) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e._id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#111", margin: 0 }}>Manage Events</h1>
        <Link href="/admin/events/new" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#111", color: "#c9a84c", padding: "10px 16px", borderRadius: "4px", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>
          <Plus size={16} /> Add Event
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9f9f9", borderBottom: "2px solid #eee", textAlign: "left" }}>
              <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Event</th>
              <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Date & City</th>
              <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Status</th>
              <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "#888", fontFamily: "'Outfit', sans-serif" }}>No events found</td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id.toString()} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <img src={event.coverImage} alt={event.title} style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                      <div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "#111" }}>{event.title}</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: "#666" }}>{event.category}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#333" }}>{event.date}</div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "#888" }}>{event.city}</div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ 
                      padding: "4px 8px", 
                      borderRadius: "12px", 
                      fontSize: "0.75rem", 
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      background: event.status === "upcoming" ? "#e6f4ea" : "#f1f3f4",
                      color: event.status === "upcoming" ? "#137333" : "#5f6368"
                    }}>
                      {event.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <Link href={`/admin/events/${event._id}`} style={{ padding: "6px", color: "#666", background: "#f5f5f5", borderRadius: "4px", display: "inline-flex" }}>
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => handleDelete(event._id)} style={{ padding: "6px", color: "#dc3545", background: "#fff5f5", borderRadius: "4px", border: "none", cursor: "pointer", display: "inline-flex" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
