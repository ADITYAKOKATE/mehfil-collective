import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService {
  title: string;
  description: string;
  icon?: string;
}

export interface ISocialLink {
  platform: string;   // "instagram" | "youtube" | "linkedin" | "facebook" | "twitter"
  label: string;      // Display name e.g. "Instagram"
  url: string;
  enabled: boolean;
}

export interface IGalleryImage {
  src: string;
  category: string;
  caption: string;
}

export interface ISiteSettings extends Document {
  // Homepage
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeHeroDescription: string;
  homeHeroCtaPrimary: string;
  homeHeroCtaSecondary: string;

  // About Page
  aboutWhoWeAreTitle: string;
  aboutWhoWeAreText: string;
  aboutPhilosophyTitle: string;
  aboutPhilosophyText: string;

  // Services
  services: IService[];

  // Collaborate Page
  collaborateTitle: string;
  collaborateSubtitle: string;

  // Global Contact Info
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  whatsappNumber: string;
  whatsappEnabled: boolean;

  // Social Media Links (replaces flat instagramUrl/youtubeUrl)
  socialLinks: ISocialLink[];

  // SEO & Brand
  siteTagline: string;

  // Global Gallery
  globalGallery: IGalleryImage[];
}

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "" },
});

const SocialLinkSchema = new Schema({
  platform: { type: String, required: true },
  label: { type: String, required: true },
  url: { type: String, default: "" },
  enabled: { type: Boolean, default: false },
});

const GalleryImageSchema = new Schema({
  src: { type: String, required: true },
  category: { type: String, required: true },
  caption: { type: String, default: "" },
});

const SiteSettingsSchema: Schema<ISiteSettings> = new Schema(
  {
    // Homepage
    homeHeroTitle: { type: String, default: "MEHFIL COLLECTIVE" },
    homeHeroSubtitle: { type: String, default: "Where Music Meets People." },
    homeHeroDescription: {
      type: String,
      default: "Creating Moments. Curating Experiences. Live music, Bollywood, Sufi and cultural events across India.",
    },
    homeHeroCtaPrimary: { type: String, default: "Explore Events" },
    homeHeroCtaSecondary: { type: String, default: "Work With Us" },

    // About Page
    aboutWhoWeAreTitle: { type: String, default: "Who We Are" },
    aboutWhoWeAreText: {
      type: String,
      default:
        "Mehfil Collective brings together music, artists, culture and people to create meaningful live experiences. We are passionate about the art of gathering — the mehfil — and everything it represents.",
    },
    aboutPhilosophyTitle: { type: String, default: "Our Philosophy" },
    aboutPhilosophyText: {
      type: String,
      default:
        "The word \"mehfil\" means a gathering, an assembly of people brought together by music, poetry and culture. We believe that live music has the power to transcend the everyday and create moments that people carry with them forever.",
    },

    // Services
    services: {
      type: [ServiceSchema],
      default: [
        { title: "Live Event Production", description: "Complete planning and execution of live entertainment experiences." },
        { title: "Artist Management", description: "Artist booking, coordination and management." },
        { title: "Event Curation", description: "Concept development and programming for unique events." },
        { title: "Corporate Events", description: "Entertainment solutions for corporate gatherings and private functions." },
        { title: "Brand Collaborations", description: "Music and cultural experiences designed around brands." },
        { title: "Private Events", description: "Curated entertainment for weddings, celebrations and private gatherings." },
      ],
    },

    // Collaborate Page
    collaborateTitle: { type: String, default: "Let's Create Something Together." },
    collaborateSubtitle: {
      type: String,
      default: "Whether you're a brand, venue, event organizer or sponsor, we'd love to hear from you.",
    },

    // Global Contact Info
    contactEmail: { type: String, default: "hello@mehfilcollective.com" },
    contactPhone: { type: String, default: "+91 98765 43210" },
    contactLocation: { type: String, default: "Mumbai, Maharashtra, India" },
    whatsappNumber: { type: String, default: "+919372433632" },
    whatsappEnabled: { type: Boolean, default: true },

    // Social Media Links
    socialLinks: {
      type: [SocialLinkSchema],
      default: [
        { platform: "instagram", label: "Instagram", url: "https://instagram.com/mehfilcollective", enabled: true },
        { platform: "youtube",   label: "YouTube",   url: "https://youtube.com/@mehfilcollective",  enabled: false },
        { platform: "linkedin",  label: "LinkedIn",  url: "",                                        enabled: false },
        { platform: "facebook",  label: "Facebook",  url: "",                                        enabled: false },
        { platform: "twitter",   label: "Twitter / X", url: "",                                      enabled: false },
      ],
    },

    // Brand
    siteTagline: { type: String, default: "Where Music Meets People." },

    // Global Gallery
    globalGallery: {
      type: [GalleryImageSchema],
      default: [
        { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", category: "Events", caption: "Bollywood Raat — Mumbai" },
        { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80", category: "Artists", caption: "Live performance" },
        { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", category: "Events", caption: "Sufi Mehfil — Pune" },
        { src: "https://images.unsplash.com/photo-1501386761578-eaa54b4e3bcd?w=800&q=80", category: "Audience", caption: "The crowd comes alive" },
        { src: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80", category: "Events", caption: "Concert night" },
        { src: "https://images.unsplash.com/photo-1515978022489-f9d0e2545d8c?w=800&q=80", category: "Artists", caption: "On stage" },
        { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", category: "Events", caption: "Lights and music" },
        { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80", category: "Venues", caption: "The venue" },
        { src: "https://images.unsplash.com/photo-1598387993441-a364f854cfaa?w=800&q=80", category: "Behind the Scenes", caption: "Sound check" },
        { src: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80", category: "Artists", caption: "Classical performance" },
        { src: "https://images.unsplash.com/photo-1571689936114-b05f2a0bdd82?w=800&q=80", category: "Behind the Scenes", caption: "Backstage" },
        { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80", category: "Audience", caption: "Together in music" },
        { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", category: "Events", caption: "Corporate gala" },
        { src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", category: "Artists", caption: "The artist" },
        { src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80", category: "Audience", caption: "Shared moments" },
        { src: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80", category: "Venues", caption: "The stage is set" },
      ],
    },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
