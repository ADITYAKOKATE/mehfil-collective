import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Settings | Admin — Mehfil Collective",
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return <SettingsClient />;
}
