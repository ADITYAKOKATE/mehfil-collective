import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newEnquiry = await Enquiry.create(body);
    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
