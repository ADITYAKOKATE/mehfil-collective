"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808", padding: "1rem" }}>
      <div style={{ background: "#111", padding: "3rem", borderRadius: "8px", border: "1px solid rgba(201,168,76,0.2)", width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Lock size={32} color="#c9a84c" style={{ margin: "0 auto 1rem" }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#f0ece4", margin: 0 }}>Admin Login</h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#888880", marginTop: "0.5rem" }}>Secure access to Mehfil Collective CMS</p>
        </div>

        {error && (
          <div style={{ background: "rgba(220,53,69,0.1)", border: "1px solid rgba(220,53,69,0.3)", color: "#ff6b6b", padding: "0.75rem", borderRadius: "4px", marginBottom: "1.5rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888880", marginBottom: "0.5rem" }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0ece4", fontFamily: "'Outfit', sans-serif", outline: "none", transition: "border-color 0.3s ease" }}
              onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888880", marginBottom: "0.5rem" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0ece4", fontFamily: "'Outfit', sans-serif", outline: "none", transition: "border-color 0.3s ease" }}
              onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: "1rem", width: "100%", padding: "14px", background: "linear-gradient(135deg, #c9a84c, #e8cc7a)", border: "none", color: "#080808", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
