"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ArtistsClient({ initialArtists }: { initialArtists: any[] }) {
  const router = useRouter();
  const [artists, setArtists] = useState(initialArtists);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) return;
    try {
      const res = await fetch(`/api/artists/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArtists((prev) => prev.filter((a) => a._id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete artist", error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#111", margin: 0 }}>Manage Artists</h1>
        <Link href="/admin/artists/new" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#111", color: "#c9a84c", padding: "10px 16px", borderRadius: "4px", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>
          <Plus size={16} /> Add Artist
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9f9f9", borderBottom: "2px solid #eee", textAlign: "left" }}>
              <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Artist</th>
              <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Performance Type</th>
              <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artists.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: "2rem", textAlign: "center", color: "#888", fontFamily: "'Outfit', sans-serif" }}>No artists found</td>
              </tr>
            ) : (
              artists.map((artist) => (
                <tr key={artist._id.toString()} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <img src={artist.profileImage} alt={artist.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }} />
                      <div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "#111" }}>{artist.name}</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: "#666" }}>{artist.category}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#333" }}>{artist.performanceType}</div>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <Link href={`/admin/artists/${artist._id}`} style={{ padding: "6px", color: "#666", background: "#f5f5f5", borderRadius: "4px", display: "inline-flex" }}>
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => handleDelete(artist._id)} style={{ padding: "6px", color: "#dc3545", background: "#fff5f5", borderRadius: "4px", border: "none", cursor: "pointer", display: "inline-flex" }}>
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
