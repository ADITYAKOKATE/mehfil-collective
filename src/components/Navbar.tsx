"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Artists", href: "/artists" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Collaborate", href: "/collaborate" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(8,8,8,0.95)"
            : "linear-gradient(to bottom, rgba(8,8,8,0.7), transparent)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
          padding: scrolled ? "14px 0" : "22px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  background: "linear-gradient(135deg, #c9a84c 0%, #e8cc7a 50%, #c9a84c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1,
                }}
              >
                Mehfil
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  color: "#888880",
                  textTransform: "uppercase",
                  marginTop: "1px",
                }}
              >
                Collective
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: pathname === link.href ? "#c9a84c" : "rgba(240,236,228,0.75)",
                  transition: "color 0.3s ease",
                  fontWeight: pathname === link.href ? 500 : 400,
                  borderBottom: pathname === link.href ? "1px solid #c9a84c" : "1px solid transparent",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLElement).style.color = "#c9a84c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLElement).style.color = "rgba(240,236,228,0.75)";
                  }
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/collaborate"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "10px 22px",
                border: "1px solid #c9a84c",
                color: "#c9a84c",
                transition: "all 0.3s ease",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#c9a84c";
                el.style.color = "#080808";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "#c9a84c";
              }}
            >
              Book / Collaborate
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#c9a84c",
              cursor: "pointer",
              padding: "4px",
              display: "none",
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          background: "rgba(8,8,8,0.98)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.2rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textDecoration: "none",
              color: pathname === link.href ? "#c9a84c" : "#f0ece4",
              transition: "color 0.3s ease",
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/collaborate"
          style={{
            marginTop: "1rem",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "14px 32px",
            border: "1px solid #c9a84c",
            color: "#c9a84c",
          }}
        >
          Book / Collaborate
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
