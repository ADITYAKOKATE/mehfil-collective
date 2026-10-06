import { getSiteSettings } from "@/lib/settings";
import GalleryClient from "./GalleryClient";

export const revalidate = 60;

export default async function GalleryPage() {
  const settings = await getSiteSettings();
  const s = JSON.parse(JSON.stringify(settings));

  return (
    <GalleryClient
      initialItems={s.globalGallery || []}
      heroLabel={s.galleryHeroLabel || "Visual Stories"}
      heroTitle={s.galleryHeroTitle || "Gallery"}
      heroSubtitle={s.galleryHeroSubtitle || "A visual window into the world of Mehfil Collective — events, artists, audiences and the moments in between."}
    />
  );
}
