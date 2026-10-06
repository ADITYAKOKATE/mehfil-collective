import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Event from "@/models/Event";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
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

    // Create a slug from the title if not provided
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const newEvent = await Event.create(body);
    
    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    console.error("API POST /events ERROR:", error);
    return NextResponse.json({ error: error.message || "Failed to create event" }, { status: 500 });
  }
}
