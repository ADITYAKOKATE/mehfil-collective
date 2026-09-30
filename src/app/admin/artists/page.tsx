import connectToDatabase from "@/lib/db";
import Artist from "@/models/Artist";
import ArtistsClient from "./ArtistsClient";

export const dynamic = 'force-dynamic';

export default async function AdminArtistsPage() {
  await connectToDatabase();
  const artists = await Artist.find().sort({ createdAt: -1 });

  const serializedArtists = JSON.parse(JSON.stringify(artists));

  return <ArtistsClient initialArtists={serializedArtists} />;
}
