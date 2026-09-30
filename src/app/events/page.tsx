import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";
import EventsClient from "./EventsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Mehfil Collective",
  description: "Discover live music, cultural gatherings, Sufi evenings, and more curated by Mehfil Collective.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function EventsPage() {
  await connectToDatabase();
  const events = await Event.find().sort({ date: 1 });
  
  // Convert to plain JS objects to pass to Client Component
  const serializedEvents = JSON.parse(JSON.stringify(events));

  return <EventsClient initialEvents={serializedEvents} />;
}
