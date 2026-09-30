import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import SiteSettings from "@/models/Settings";

export async function GET() {
  try {
    await connectToDatabase();
    // There is always exactly one settings document. Find or create it.
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("GET /api/settings ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      await SiteSettings.findByIdAndUpdate(settings._id, body, { new: true });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT /api/settings ERROR:", error);
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
