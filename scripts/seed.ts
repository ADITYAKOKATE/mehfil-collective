import { config } from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/User";
import Event from "../src/models/Event";
import Artist from "../src/models/Artist";
import { artists, events } from "../src/lib/data";

// Load environment variables from .env.local
config({ path: resolve(__dirname, "../.env.local") });

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("Please define MONGODB_URI in .env.local");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");

    // Clear existing data
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Event.deleteMany({});
    await Artist.deleteMany({});

    // Create Admin User
    console.log("Creating admin user...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin User",
      email: "admin@mehfil.com",
      password: hashedPassword,
      role: "admin",
    });

    // Seed Artists
    console.log("Seeding artists...");
    const artistDocs = artists.map((a) => ({
      ...a,
    }));
    await Artist.insertMany(artistDocs);

    // Seed Events
    console.log("Seeding events...");
    const eventDocs = events.map((e) => ({
      ...e,
    }));
    await Event.insertMany(eventDocs);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seed();
