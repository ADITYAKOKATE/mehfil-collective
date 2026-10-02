import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AuthProvider from "@/components/AuthProvider";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Mehfil Collective — Where Music Meets People",
  description:
    "Mehfil Collective is a premium live entertainment and cultural events platform curating live music, Bollywood nights, Sufi evenings, bhajan sessions, concerts and cultural gatherings across India.",
  keywords: [
    "Mehfil Collective",
    "live music events",
    "Bollywood nights",
    "Sufi evenings",
    "cultural events India",
    "artist management",
    "live entertainment",
    "bhajan sessions",
    "concerts India",
  ],
  openGraph: {
    title: "Mehfil Collective — Where Music Meets People",
    description:
      "Premium live entertainment and cultural events platform curating unforgettable experiences across India.",
    url: "https://mehfilcollective.com",
    siteName: "Mehfil Collective",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer
            contactEmail={settings.contactEmail}
            contactPhone={settings.contactPhone}
            contactLocation={settings.contactLocation}
            tagline={settings.siteTagline}
            socialLinks={(settings.socialLinks as any) || []}
          />
          <WhatsAppFloat whatsappNumber={settings.whatsappNumber} />
        </AuthProvider>
      </body>
    </html>
  );
}
