import { getSiteSettings } from "@/lib/settings";
import CollaborateClient from "./CollaborateClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CollaboratePage() {
  const settings = await getSiteSettings();
  
  return (
    <CollaborateClient 
      whatsappNumber={settings.whatsappNumber}
      whatsappEnabled={settings.whatsappEnabled !== false}
    />
  );
}
