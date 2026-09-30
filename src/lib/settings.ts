import connectToDatabase from "@/lib/db";
import SiteSettings, { ISiteSettings } from "@/models/Settings";

export async function getSiteSettings(): Promise<ISiteSettings> {
  await connectToDatabase();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    const created = await SiteSettings.create({});
    settings = created.toObject();
  }
  return settings as ISiteSettings;
}

