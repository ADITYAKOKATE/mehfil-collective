import connectToDatabase from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import EnquiriesClient from "./EnquiriesClient";

export const dynamic = 'force-dynamic';

export default async function AdminEnquiriesPage() {
  await connectToDatabase();
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });

  const serializedEnquiries = JSON.parse(JSON.stringify(enquiries));

  return <EnquiriesClient initialEnquiries={serializedEnquiries} />;
}
