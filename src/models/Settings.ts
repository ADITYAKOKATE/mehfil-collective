import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService {
  title: string;
  description: string;
  icon?: string;
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
  instagramUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;

  // SEO & Brand
  siteTagline: string;
}

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "" },
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
      default:
        "Whether you're a brand, venue, event organizer or sponsor, we'd love to hear from you.",
    },

    // Global Contact Info
    contactEmail: { type: String, default: "hello@mehfilcollective.com" },
    contactPhone: { type: String, default: "+91 98765 43210" },
    contactLocation: { type: String, default: "Mumbai, Maharashtra, India" },
    instagramUrl: { type: String, default: "https://instagram.com/mehfilcollective" },
    youtubeUrl: { type: String, default: "https://youtube.com/@mehfilcollective" },
    whatsappNumber: { type: String, default: "+919372433632" },

    // Brand
    siteTagline: { type: String, default: "Where Music Meets People." },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
