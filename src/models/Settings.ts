import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService {
  title: string;
  description: string;
  icon?: string;
}

export interface ISocialLink {
  platform: string;
  label: string;
  url: string;
  enabled: boolean;
}

export interface IGalleryImage {
  src: string;
  category: string;
  caption: string;
}

export interface ISiteSettings extends Document {
  // ─── Homepage ──────────────────────────────────────────────────────────────
  homeHeroBgImage: string;
  homeHeroEyebrow: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeHeroDescription: string;
  homeHeroCtaPrimary: string;
  homeHeroCtaSecondary: string;

  homeUpcomingLabel: string;
  homeUpcomingTitle: string;
  homeUpcomingSubtitle: string;

  homePhilosophyQuote: string;
  homePhilosophyLabel: string;

  homeArtistsLabel: string;
  homeArtistsTitle: string;
  homeArtistsSubtitle: string;

  homeServicesLabel: string;
  homeServicesTitle: string;

  homePastLabel: string;
  homePastTitle: string;
  homePastSubtitle: string;

  homeInstagramLabel: string;
  homeInstagramTitle: string;
  homeInstagramSubtitle: string;

  homeLetsConnectBgImage: string;
  homeLetsConnectTitle: string;
  homeLetsConnectSubtitle: string;

  // ─── About Page ────────────────────────────────────────────────────────────
  aboutHeroBgImage: string;
  aboutHeroLabel: string;
  aboutHeroTitle: string;

  aboutWhoWeAreTitle: string;
  aboutWhoWeAreSubtitle: string;
  aboutWhoWeAreText: string;
  aboutWhoWeAreImage: string;
  aboutWhoWeAreStat: string;
  aboutWhoWeAreStatLabel: string;

  aboutPhilosophyTitle: string;
  aboutPhilosophySubtitle: string;
  aboutPhilosophyText: string;

  aboutStat1Number: string;
  aboutStat1Label: string;
  aboutStat2Number: string;
  aboutStat2Label: string;
  aboutStat3Number: string;
  aboutStat3Label: string;
  aboutStat4Number: string;
  aboutStat4Label: string;

  aboutServicesLabel: string;
  aboutServicesTitle: string;

  aboutCtaTitle: string;
  aboutCtaSubtitle: string;

  // ─── Events Page ───────────────────────────────────────────────────────────
  eventsHeroLabel: string;
  eventsHeroTitle: string;
  eventsHeroSubtitle: string;

  // ─── Artists Page ──────────────────────────────────────────────────────────
  artistsHeroLabel: string;
  artistsHeroTitle: string;
  artistsHeroSubtitle: string;
  artistsCtaTitle: string;
  artistsCtaSubtitle: string;

  // ─── Gallery Page ──────────────────────────────────────────────────────────
  galleryHeroLabel: string;
  galleryHeroTitle: string;
  galleryHeroSubtitle: string;

  // ─── Collaborate Page ──────────────────────────────────────────────────────
  collaborateTitle: string;
  collaborateSubtitle: string;

  // ─── Global Contact Info ───────────────────────────────────────────────────
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  whatsappNumber: string;
  whatsappEnabled: boolean;

  // ─── Social Media ──────────────────────────────────────────────────────────
  socialLinks: ISocialLink[];

  // ─── SEO & Brand ───────────────────────────────────────────────────────────
  siteTagline: string;

  // ─── Services ──────────────────────────────────────────────────────────────
  services: IService[];

  // ─── Global Gallery ────────────────────────────────────────────────────────
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

const DEFAULT_HERO_BG = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1800&q=85";
const DEFAULT_ABOUT_BG = "https://images.unsplash.com/photo-1501386761578-eaa54b4e3bcd?w=1800&q=80";
const DEFAULT_WHO_WE_ARE_IMG = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&q=80";

const SiteSettingsSchema: Schema<ISiteSettings> = new Schema(
  {
    // ─── Homepage ─────────────────────────────────────────────────────────────
    homeHeroBgImage: { type: String, default: DEFAULT_HERO_BG },
    homeHeroEyebrow: { type: String, default: "Live Entertainment & Cultural Events" },
    homeHeroTitle: { type: String, default: "MEHFIL COLLECTIVE" },
    homeHeroSubtitle: { type: String, default: "Where Music Meets People." },
    homeHeroDescription: { type: String, default: "Creating Moments. Curating Experiences. Live music, Bollywood, Sufi and cultural events across India." },
    homeHeroCtaPrimary: { type: String, default: "Explore Events" },
    homeHeroCtaSecondary: { type: String, default: "Work With Us" },

    homeUpcomingLabel: { type: String, default: "What's Happening" },
    homeUpcomingTitle: { type: String, default: "Upcoming Events" },
    homeUpcomingSubtitle: { type: String, default: "Carefully curated live experiences across India. Find the ones that speak to your soul." },

    homePhilosophyQuote: { type: String, default: "Mehfil Collective is not just selling events. It is creating experiences around music, culture, artists and people." },
    homePhilosophyLabel: { type: String, default: "Our Philosophy" },

    homeArtistsLabel: { type: String, default: "The Performers" },
    homeArtistsTitle: { type: String, default: "Featured Artists" },
    homeArtistsSubtitle: { type: String, default: "Extraordinary talent from across India, handpicked by Mehfil Collective." },

    homeServicesLabel: { type: String, default: "Our Expertise" },
    homeServicesTitle: { type: String, default: "What We Create" },

    homePastLabel: { type: String, default: "The Archive" },
    homePastTitle: { type: String, default: "Past Events" },
    homePastSubtitle: { type: String, default: "A look at some of the memorable evenings we have had the privilege of creating." },

    homeInstagramLabel: { type: String, default: "Follow The Mehfil" },
    homeInstagramTitle: { type: String, default: "Join Our Community" },
    homeInstagramSubtitle: { type: String, default: "Stay updated with our latest events, behind-the-scenes moments and artist stories. Follow us on Instagram for the full Mehfil experience." },

    homeLetsConnectBgImage: { type: String, default: DEFAULT_ABOUT_BG },
    homeLetsConnectTitle: { type: String, default: "Have an event in mind?" },
    homeLetsConnectSubtitle: { type: String, default: "Whether you're an artist, a venue, a brand or someone with a vision — let's talk and create something extraordinary together." },

    // ─── About Page ───────────────────────────────────────────────────────────
    aboutHeroBgImage: { type: String, default: DEFAULT_ABOUT_BG },
    aboutHeroLabel: { type: String, default: "Our Story" },
    aboutHeroTitle: { type: String, default: "About Mehfil Collective" },

    aboutWhoWeAreTitle: { type: String, default: "Who We Are" },
    aboutWhoWeAreSubtitle: { type: String, default: "Where Music Finds Its Home" },
    aboutWhoWeAreText: { type: String, default: "Mehfil Collective brings together music, artists, culture and people to create meaningful live experiences. We are passionate about the art of gathering — the mehfil — and everything it represents." },
    aboutWhoWeAreImage: { type: String, default: DEFAULT_WHO_WE_ARE_IMG },
    aboutWhoWeAreStat: { type: String, default: "50+" },
    aboutWhoWeAreStatLabel: { type: String, default: "Events Curated" },

    aboutPhilosophyTitle: { type: String, default: "Our Philosophy" },
    aboutPhilosophySubtitle: { type: String, default: "The Idea of a Mehfil" },
    aboutPhilosophyText: { type: String, default: "The word \"mehfil\" means a gathering, an assembly of people brought together by music, poetry and culture. We believe that live music has the power to transcend the everyday and create moments that people carry with them forever." },

    aboutStat1Number: { type: String, default: "50+" },
    aboutStat1Label: { type: String, default: "Events Produced" },
    aboutStat2Number: { type: String, default: "100+" },
    aboutStat2Label: { type: String, default: "Artists Managed" },
    aboutStat3Number: { type: String, default: "15+" },
    aboutStat3Label: { type: String, default: "Cities Reached" },
    aboutStat4Number: { type: String, default: "50K+" },
    aboutStat4Label: { type: String, default: "Audience Members" },

    aboutServicesLabel: { type: String, default: "What We Do" },
    aboutServicesTitle: { type: String, default: "Our Services" },

    aboutCtaTitle: { type: String, default: "Ready to Create Something?" },
    aboutCtaSubtitle: { type: String, default: "Whether you are an artist, a venue, a brand or an event organizer — we would love to hear from you." },

    // ─── Events Page ──────────────────────────────────────────────────────────
    eventsHeroLabel: { type: String, default: "All Events" },
    eventsHeroTitle: { type: String, default: "Discover Events" },
    eventsHeroSubtitle: { type: String, default: "Live music, cultural gatherings, Sufi evenings, Bollywood nights and more — curated across India." },

    // ─── Artists Page ─────────────────────────────────────────────────────────
    artistsHeroLabel: { type: String, default: "The Performers" },
    artistsHeroTitle: { type: String, default: "Our Artists" },
    artistsHeroSubtitle: { type: String, default: "Extraordinary talent from across India, handpicked and presented by Mehfil Collective to create unforgettable live experiences." },
    artistsCtaTitle: { type: String, default: "Are you an artist?" },
    artistsCtaSubtitle: { type: String, default: "Mehfil Collective is always looking for extraordinary talent. Reach out to us and let's create something together." },

    // ─── Gallery Page ─────────────────────────────────────────────────────────
    galleryHeroLabel: { type: String, default: "Visual Stories" },
    galleryHeroTitle: { type: String, default: "Gallery" },
    galleryHeroSubtitle: { type: String, default: "A visual window into the world of Mehfil Collective — events, artists, audiences and the moments in between." },

    // ─── Collaborate Page ─────────────────────────────────────────────────────
    collaborateTitle: { type: String, default: "Let's Create Something Together." },
    collaborateSubtitle: { type: String, default: "Whether you're a brand, venue, event organizer or sponsor, we'd love to hear from you." },

    // ─── Global Contact Info ──────────────────────────────────────────────────
    contactEmail: { type: String, default: "hello@mehfilcollective.com" },
    contactPhone: { type: String, default: "+91 98765 43210" },
    contactLocation: { type: String, default: "Mumbai, Maharashtra, India" },
    whatsappNumber: { type: String, default: "+919372433632" },
    whatsappEnabled: { type: Boolean, default: true },

    // ─── Social Media Links ───────────────────────────────────────────────────
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

    // ─── Brand ────────────────────────────────────────────────────────────────
    siteTagline: { type: String, default: "Where Music Meets People." },

    // ─── Services ─────────────────────────────────────────────────────────────
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

    // ─── Global Gallery ───────────────────────────────────────────────────────
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
