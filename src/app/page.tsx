import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";
import Artist from "@/models/Artist";
import HomePageClient from "./HomePageClient";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  await connectToDatabase();

  // Fetch upcoming events
  const upcomingEvents = await Event.find({ status: "upcoming" }).sort({ date: 1 }).limit(4);

  // Fetch featured artists (just picking the first 4 for now, or based on a specific criteria if added)
  const featuredArtists = await Artist.find().limit(4);

  // Fetch past events
  const pastEvents = await Event.find({ status: "past" }).sort({ date: -1 }).limit(3);

  // Fetch Instagram URL from CMS settings
  const settings = await getSiteSettings();
  const socialLinks = (settings.socialLinks as any[]) || [];
  const instagramLink = socialLinks.find((s: any) => s.platform === "instagram");
  const instagramUrl = instagramLink?.url || "https://instagram.com/mehfilcollective";

  // Convert to plain JS objects to pass to Client Component
  const serializedUpcoming = JSON.parse(JSON.stringify(upcomingEvents));
  const serializedArtists = JSON.parse(JSON.stringify(featuredArtists));
  const serializedPast = JSON.parse(JSON.stringify(pastEvents));

  return (
    <HomePageClient
      upcomingEvents={serializedUpcoming}
      featuredArtists={serializedArtists}
      pastEvents={serializedPast}
      instagramUrl={instagramUrl}
    />
  );
}
