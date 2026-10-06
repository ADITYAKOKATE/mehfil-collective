import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Artist from "@/models/Artist";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectToDatabase();
    const artists = await Artist.find().sort({ name: 1 });
    return NextResponse.json(artists);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    // Create a slug from the name if not provided
    if (!body.slug) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const newArtist = await Artist.create(body);
    
    revalidatePath("/");
    revalidatePath("/artists");

    return NextResponse.json(newArtist, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create artist" }, { status: 500 });
  }
}
