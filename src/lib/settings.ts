import connectToDatabase from "@/lib/db";
import SiteSettings, { ISiteSettings } from "@/models/Settings";

let cachedSettings: ISiteSettings | null = null;

export async function getSiteSettings(): Promise<ISiteSettings> {
  // Use in-memory cache to avoid repeated DB calls during SSR
  if (cachedSettings) return cachedSettings;

  await connectToDatabase();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    // Bootstrap with defaults on first run
    const created = await SiteSettings.create({});
    settings = created.toObject();
  }

  cachedSettings = settings as ISiteSettings;
  return cachedSettings;
}

export function invalidateSettingsCache() {
  cachedSettings = null;
}
