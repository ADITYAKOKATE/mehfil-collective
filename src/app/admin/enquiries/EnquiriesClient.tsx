"use client";

import { useState } from "react";
import { MessageSquare, Mail, Phone, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnquiriesClient({ initialEnquiries }: { initialEnquiries: any[] }) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.map((enq) => (enq._id === id ? { ...enq, status: newStatus } : enq)));
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    setUpdating(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((enq) => enq._id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete enquiry", error);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#111", margin: 0 }}>Enquiries Inbox</h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>Manage contact and collaboration requests.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {enquiries.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#888", fontFamily: "'Outfit', sans-serif", background: "#f9f9f9", borderRadius: "8px" }}>
            <MessageSquare size={32} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
            No enquiries found.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div key={enq._id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#111", margin: "0 0 0.25rem 0" }}>{enq.subject}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Mail size={14} /> {enq.email}</span>
                    {enq.phone && <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Phone size={14} /> {enq.phone}</span>}
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Calendar size={14} /> {new Date(enq.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    fontSize: "0.75rem", 
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    background: enq.type === "contact" ? "#e3f2fd" : "#fff3e0",
                    color: enq.type === "contact" ? "#1976d2" : "#f57c00"
                  }}>
                    {enq.type}
                  </span>
                </div>
              </div>

              <div style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "6px", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: "#444", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                <p style={{ margin: "0 0 0.5rem 0", fontWeight: 600, color: "#111" }}>From: {enq.name}</p>
                {enq.message}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666", fontWeight: 500 }}>Status:</span>
                  <select
                    value={enq.status}
                    onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                    disabled={updating === enq._id}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      outline: "none",
                      cursor: updating === enq._id ? "not-allowed" : "pointer",
                      background: enq.status === "new" ? "#fff" : enq.status === "in-progress" ? "#fff8e1" : "#e8f5e9",
                      color: enq.status === "new" ? "#111" : enq.status === "in-progress" ? "#f57f17" : "#2e7d32",
                      borderColor: enq.status === "new" ? "#ddd" : enq.status === "in-progress" ? "#fbc02d" : "#a5d6a7"
                    }}
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  {updating === enq._id && <span style={{ fontSize: "0.8rem", color: "#888" }}>Saving...</span>}
                </div>
                <button
                  onClick={() => handleDelete(enq._id)}
                  disabled={updating === enq._id}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#dc3545",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: updating === enq._id ? "not-allowed" : "pointer",
                    padding: "6px 12px",
                    opacity: updating === enq._id ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
