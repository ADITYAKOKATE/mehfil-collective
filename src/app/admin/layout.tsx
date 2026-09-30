import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { LayoutDashboard, Calendar, Users, MessageSquare, LogOut, Settings } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // If no session, likely on the login page, so just render children
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "#111", color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#c9a84c", fontWeight: 600 }}>Mehfil CMS</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: "#888", marginTop: "4px" }}>Admin Panel</div>
        </div>

        <nav style={{ flex: 1, padding: "2rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <NavLink href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavLink href="/admin/events" icon={<Calendar size={18} />} label="Events" />
          <NavLink href="/admin/artists" icon={<Users size={18} />} label="Artists" />
          <NavLink href="/admin/enquiries" icon={<MessageSquare size={18} />} label="Enquiries" />
        </nav>

        <div style={{ padding: "2rem 1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", padding: "0 1rem" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#c9a84c", color: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontFamily: "'Outfit', sans-serif" }}>
              {session.user?.name?.[0]}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 500, whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{session.user?.name}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "#888" }}>{session.user?.email}</div>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", minHeight: "calc(100vh - 4rem)", padding: "2rem" }}>
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "10px 16px", borderRadius: "6px", textDecoration: "none", color: "#ccc", transition: "all 0.2s" }} className="admin-nav-link">
      <span style={{ color: "#c9a84c" }}>{icon}</span>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem" }}>{label}</span>
      <style>{`
        .admin-nav-link:hover { background: rgba(255,255,255,0.05); color: #fff; }
      `}</style>
    </Link>
  );
}
