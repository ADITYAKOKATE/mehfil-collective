import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: "contact" | "collaborate";
  status: "new" | "in-progress" | "resolved";
}

const EnquirySchema: Schema<IEnquiry> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["contact", "collaborate"], required: true },
    status: { type: String, enum: ["new", "in-progress", "resolved"], default: "new" },
  },
  { timestamps: true }
);

const Enquiry: Model<IEnquiry> = mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;
