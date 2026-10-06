import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";
import Artist from "@/models/Artist";
import HomePageClient from "./HomePageClient";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 60;

export default async function HomePage() {
  await connectToDatabase();

  const [upcomingEvents, featuredArtists, pastEvents, settings] = await Promise.all([
    Event.find({ status: "upcoming" }).sort({ date: 1 }).limit(4),
    Artist.find().limit(4),
    Event.find({ status: "past" }).sort({ date: -1 }).limit(3),
    getSiteSettings(),
  ]);

  const socialLinks = (settings.socialLinks as any[]) || [];
  const instagramLink = socialLinks.find((s: any) => s.platform === "instagram" && s.enabled);
  const instagramUrl = instagramLink?.url || "";

  const s = JSON.parse(JSON.stringify(settings));

  return (
    <HomePageClient
      upcomingEvents={JSON.parse(JSON.stringify(upcomingEvents))}
      featuredArtists={JSON.parse(JSON.stringify(featuredArtists))}
      pastEvents={JSON.parse(JSON.stringify(pastEvents))}
      settings={s}
      instagramUrl={instagramUrl}
      whatsappNumber={s.whatsappNumber}
      whatsappEnabled={s.whatsappEnabled !== false}
    />
  );
}
