"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

// SVG icons for each platform
const PlatformSvg: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  ),
};

interface SocialLink {
  platform: string;
  label: string;
  url: string;
  enabled: boolean;
}

interface FooterProps {
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
  tagline?: string;
  socialLinks?: SocialLink[];
}

export default function Footer({ contactEmail, contactPhone, contactLocation, tagline, socialLinks = [] }: FooterProps) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const enabledSocials = socialLinks.filter((s) => s.enabled && s.url);

  return (
    <footer style={{ background: "#060606", borderTop: "1px solid rgba(201,168,76,0.12)", padding: "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, letterSpacing: "0.08em", background: "linear-gradient(135deg, #c9a84c 0%, #e8cc7a 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Mehfil
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.55rem", letterSpacing: "0.35em", color: "#888880", textTransform: "uppercase" }}>
                Collective
              </div>
            </div>
            <p style={{ color: "#888880", fontSize: "0.88rem", lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", maxWidth: "260px" }}>
              Creating moments and curating experiences around music, culture, artists and people across India.
            </p>

            {/* Dynamic social icons — only enabled ones */}
            {enabledSocials.length > 0 && (
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                {enabledSocials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{ width: "38px", height: "38px", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#888880", textDecoration: "none", transition: "all 0.3s ease", borderRadius: "4px" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#c9a84c"; el.style.color = "#c9a84c"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.3)"; el.style.color = "#888880"; }}
                  >
                    {PlatformSvg[social.platform] || (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.2rem", fontWeight: 500 }}>
              Navigate
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Home", href: "/" },
                { label: "Events", href: "/events" },
                { label: "Artists", href: "/artists" },
                { label: "Gallery", href: "/gallery" },
                { label: "About Us", href: "/about" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} style={{ color: "#888880", textDecoration: "none", fontSize: "0.88rem", fontFamily: "'Outfit', sans-serif", transition: "color 0.3s ease" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a84c")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#888880")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.2rem", fontWeight: 500 }}>
              What We Do
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Live Event Production", "Artist Management", "Corporate Events", "Brand Collaborations", "Private Events", "Event Curation"].map((service) => (
                <li key={service} style={{ color: "#888880", fontSize: "0.88rem", fontFamily: "'Outfit', sans-serif" }}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.2rem", fontWeight: 500 }}>
              Get In Touch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { icon: <Mail size={14} />, text: contactEmail || "hello@mehfilcollective.com" },
                { icon: <Phone size={14} />, text: contactPhone || "+91 98765 43210" },
                { icon: <MapPin size={14} />, text: contactLocation || "Mumbai, India" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#888880" }}>
                  <span style={{ color: "#c9a84c" }}>{icon}</span>
                  <span style={{ fontSize: "0.88rem", fontFamily: "'Outfit', sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ color: "#444", fontSize: "0.78rem", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Mehfil Collective. All rights reserved.
          </p>
          <p style={{ color: "#444", fontSize: "0.78rem", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em" }}>
            {tagline || "Where Music Meets People."}
          </p>
        </div>
      </div>
    </footer>
  );
}
