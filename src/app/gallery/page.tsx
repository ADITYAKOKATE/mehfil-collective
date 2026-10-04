import { getSiteSettings } from "@/lib/settings";
import GalleryClient from "./GalleryClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GalleryPage() {
  const settings = await getSiteSettings();
  
  return <GalleryClient initialItems={settings.globalGallery} />;
}
