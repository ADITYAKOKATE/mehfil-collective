import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  id: string; // Storing string ID manually to match frontend interface if needed, or we use _id
  title: string;
  slug: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  state: string;
  coverImage: string;
  category: string;
  genre: string[];
  status: "upcoming" | "past";
  ticketUrl: string;
  ticketType: "tickets" | "register" | "enquire";
  description: string;
  longDescription: string;
  artists: string[]; // Slugs of associated artists
  gallery: string[];
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, default: "" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, default: "" },
    coverImage: { type: String, required: true },
    category: { type: String, required: true },
    genre: [{ type: String }],
    status: { type: String, enum: ["upcoming", "past"], required: true },
    ticketUrl: { type: String },
    ticketType: { type: String, enum: ["tickets", "register", "enquire"], required: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    artists: [{ type: String }],
    gallery: [{ type: String }],
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in Next.js development
const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
