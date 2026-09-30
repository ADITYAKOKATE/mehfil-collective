import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArtist extends Document {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  profileImage: string;
  bio: string;
  genres: string[];
  performanceType: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    website?: string;
  };
  gallery: string[];
}

const ArtistSchema: Schema<IArtist> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    tagline: { type: String, required: true },
    profileImage: { type: String, required: true },
    bio: { type: String, required: true },
    genres: [{ type: String }],
    performanceType: { type: String, required: true },
    socialLinks: {
      instagram: { type: String },
      youtube: { type: String },
      spotify: { type: String },
      website: { type: String },
    },
    gallery: [{ type: String }],
  },
  { timestamps: true }
);

const Artist: Model<IArtist> = mongoose.models.Artist || mongoose.model<IArtist>("Artist", ArtistSchema);

export default Artist;
