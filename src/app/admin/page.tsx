import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";
import Artist from "@/models/Artist";
import Enquiry from "@/models/Enquiry";
import { Calendar, Users, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  await connectToDatabase();

  const eventsCount = await Event.countDocuments();
  const artistsCount = await Artist.countDocuments();
  const enquiriesCount = await Enquiry.countDocuments();
  const newEnquiriesCount = await Enquiry.countDocuments({ status: "new" });

  const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);

  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#111", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>Dashboard Overview</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        <DashboardCard title="Total Events" value={eventsCount} icon={<Calendar size={24} color="#c9a84c" />} />
        <DashboardCard title="Total Artists" value={artistsCount} icon={<Users size={24} color="#c9a84c" />} />
        <DashboardCard title="Total Enquiries" value={enquiriesCount} subtitle={`${newEnquiriesCount} New`} icon={<MessageSquare size={24} color="#c9a84c" />} />
      </div>

      <div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.2rem", fontWeight: 600, color: "#333", marginBottom: "1rem" }}>Recent Enquiries</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9f9f9", borderBottom: "2px solid #eee", textAlign: "left" }}>
                <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Name</th>
                <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Subject</th>
                <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Type</th>
                <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Date</th>
                <th style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#888", fontFamily: "'Outfit', sans-serif" }}>No recent enquiries</td>
                </tr>
              ) : (
                recentEnquiries.map((enq) => (
                  <tr key={enq._id.toString()} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#111" }}>{enq.name}</td>
                    <td style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#333" }}>{enq.subject}</td>
                    <td style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", textTransform: "capitalize", color: "#666" }}>{enq.type}</td>
                    <td style={{ padding: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666" }}>{new Date(enq.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ 
                        padding: "4px 8px", 
                        borderRadius: "12px", 
                        fontSize: "0.75rem", 
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        background: enq.status === "new" ? "#fff3cd" : enq.status === "resolved" ? "#d4edda" : "#e2e3e5",
                        color: enq.status === "new" ? "#856404" : enq.status === "resolved" ? "#155724" : "#383d41"
                      }}>
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, subtitle, icon }: { title: string; value: number; subtitle?: string; icon: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "8px", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
      <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#666", marginBottom: "4px" }}>{title}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#111", lineHeight: 1 }}>{value}</div>
          {subtitle && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: "#ff6b6b", fontWeight: 500 }}>{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}
