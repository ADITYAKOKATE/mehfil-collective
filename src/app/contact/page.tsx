import { getSiteSettings } from "@/lib/settings";
import ContactClient from "./ContactClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ContactPage() {
  const settings = await getSiteSettings();
  
  return (
    <ContactClient 
      contactEmail={settings.contactEmail}
      contactLocation={settings.contactLocation}
      whatsappNumber={settings.whatsappNumber}
      whatsappEnabled={settings.whatsappEnabled !== false}
    />
  );
}
