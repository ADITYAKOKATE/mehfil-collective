"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        width: "100%",
        padding: "10px",
        background: "transparent",
        border: "1px solid rgba(220,53,69,0.5)",
        color: "#ff6b6b",
        borderRadius: "4px",
        cursor: "pointer",
        fontFamily: "'Outfit', sans-serif",
        fontSize: "0.85rem",
        transition: "all 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "rgba(220,53,69,0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <LogOut size={16} /> Logout
    </button>
  );
}
