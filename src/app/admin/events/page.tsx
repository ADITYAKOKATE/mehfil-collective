import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";
import EventsClient from "./EventsClient";

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  await connectToDatabase();
  const events = await Event.find().sort({ createdAt: -1 });

  const serializedEvents = JSON.parse(JSON.stringify(events));

  return <EventsClient initialEvents={serializedEvents} />;
}
