import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Artist from "@/models/Artist";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const artist = await Artist.findById(id);
    if (!artist) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(artist);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch artist" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();

    const updatedArtist = await Artist.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedArtist) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(updatedArtist);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update artist" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const deletedArtist = await Artist.findByIdAndDelete(id);
    if (!deletedArtist) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete artist" }, { status: 500 });
  }
}
