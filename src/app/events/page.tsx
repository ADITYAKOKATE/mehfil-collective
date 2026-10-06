import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";
import EventsClient from "./EventsClient";
import { getSiteSettings } from "@/lib/settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Mehfil Collective",
  description: "Discover live music, cultural gatherings, Sufi evenings, and more curated by Mehfil Collective.",
};

export const revalidate = 60;

export default async function EventsPage() {
  await connectToDatabase();
  const [events, settings] = await Promise.all([
    Event.find().sort({ date: 1 }),
    getSiteSettings(),
  ]);

  const s = JSON.parse(JSON.stringify(settings));
  return (
    <EventsClient
      initialEvents={JSON.parse(JSON.stringify(events))}
      heroLabel={s.eventsHeroLabel || "All Events"}
      heroTitle={s.eventsHeroTitle || "Discover Events"}
      heroSubtitle={s.eventsHeroSubtitle || "Live music, cultural gatherings, Sufi evenings, Bollywood nights and more — curated across India."}
    />
  );
}
