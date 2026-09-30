// Mock data for Mehfil Collective

export type Event = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  state: string;
  category: string;
  genre: string[];
  description: string;
  longDescription: string;
  coverImage: string;
  gallery: string[];
  artists: string[]; // artist slugs
  ticketUrl: string;
  ticketType: "tickets" | "register" | "enquire";
  status: "upcoming" | "past";
  featured: boolean;
};

export type Artist = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  profileImage: string;
  gallery: string[];
  category: string;
  genres: string[];
  performanceType: string;
  events: string[]; // event slugs
  socialLinks: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    website?: string;
  };
  featured: boolean;
};

export const events: Event[] = [
  {
    id: "1",
    slug: "sufi-mehfil-pune",
    title: "Sufi Mehfil",
    subtitle: "An Evening of Soulful Devotion",
    date: "October 18, 2026",
    time: "7:00 PM onwards",
    venue: "The Grand Auditorium, Koregaon Park",
    city: "Pune",
    state: "Maharashtra",
    category: "Sufi",
    genre: ["Sufi", "Devotional", "Qawwali"],
    description: "An enchanting evening of Sufi music and poetry that transcends the ordinary.",
    longDescription:
      "Step into an evening where music becomes a bridge between the earthly and the divine. Sufi Mehfil brings together some of India's finest Sufi performers for a night of soulful qawwali, ghazals and devotional poetry. As the night unfolds, let the music guide you through a journey of love, longing and surrender. This is not just a concert — it is a gathering of souls.",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
      "https://images.unsplash.com/photo-1501386761578-eaa54b4e3bcd?w=600&q=80",
    ],
    artists: ["arjun-sharma", "meera-kapoor"],
    ticketUrl: "#",
    ticketType: "tickets",
    status: "upcoming",
    featured: true,
  },
  {
    id: "2",
    slug: "bollywood-night-mumbai",
    title: "Bollywood Raat",
    subtitle: "Lights, Music, Magic",
    date: "November 8, 2026",
    time: "8:00 PM onwards",
    venue: "NSCI Dome, Worli",
    city: "Mumbai",
    state: "Maharashtra",
    category: "Bollywood",
    genre: ["Bollywood", "Retro", "Dance"],
    description: "Mumbai's biggest Bollywood night featuring live performances and an electrifying atmosphere.",
    longDescription:
      "Bollywood Raat is the night Mumbai has been waiting for. From timeless retro classics to the latest chartbusters, this live entertainment extravaganza will have you singing, dancing and reliving the magic of Bollywood. Featuring multiple live artists, a stunning stage production and an atmosphere that only Mumbai can create — this is an evening you will carry with you forever.",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    ],
    artists: ["kavya-nair", "rahul-dev"],
    ticketUrl: "#",
    ticketType: "tickets",
    status: "upcoming",
    featured: true,
  },
  {
    id: "3",
    slug: "bhajan-sandhya-jaipur",
    title: "Bhajan Sandhya",
    subtitle: "Devotion Under Open Skies",
    date: "November 22, 2026",
    time: "6:30 PM onwards",
    venue: "Albert Hall Museum Grounds",
    city: "Jaipur",
    state: "Rajasthan",
    category: "Devotional",
    genre: ["Bhajan", "Devotional", "Kirtan"],
    description: "A sacred gathering of devotional music set against the historic backdrop of Jaipur.",
    longDescription:
      "Bhajan Sandhya is an intimate gathering that celebrates the spiritual power of devotional music. Set against the magnificent backdrop of Jaipur's Albert Hall, this evening of bhajans and kirtans will create a space for reflection, gratitude and community. Come as you are — all are welcome to this musical offering.",
    coverImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=600&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    ],
    artists: ["arjun-sharma"],
    ticketUrl: "#",
    ticketType: "register",
    status: "upcoming",
    featured: true,
  },
  {
    id: "4",
    slug: "indie-sessions-bangalore",
    title: "Indie Sessions",
    subtitle: "Raw. Real. Live.",
    date: "December 5, 2026",
    time: "7:30 PM onwards",
    venue: "Koramangala Social",
    city: "Bangalore",
    state: "Karnataka",
    category: "Live Music",
    genre: ["Indie", "Fusion", "Acoustic"],
    description: "An intimate live music session celebrating India's independent music scene.",
    longDescription:
      "Indie Sessions is Mehfil Collective's platform for independent artists who are redefining Indian music. In an intimate venue setting, experience raw acoustic performances, genre-defying fusion and the kind of honest storytelling that only live music can deliver. This is where emerging voices meet discerning ears.",
    coverImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598387993441-a364f854cfaa?w=600&q=80",
      "https://images.unsplash.com/photo-1571689936114-b05f2a0bdd82?w=600&q=80",
    ],
    artists: ["rahul-dev"],
    ticketUrl: "#",
    ticketType: "tickets",
    status: "upcoming",
    featured: false,
  },
  {
    id: "5",
    slug: "classical-fusion-delhi",
    title: "Raag & Rhythm",
    subtitle: "Classical Meets Contemporary",
    date: "September 10, 2026",
    time: "7:00 PM",
    venue: "Siri Fort Auditorium",
    city: "Delhi",
    state: "Delhi",
    category: "Classical",
    genre: ["Classical", "Fusion", "Hindustani"],
    description: "A stunning fusion of Hindustani classical music with contemporary world sounds.",
    longDescription:
      "Raag & Rhythm was a landmark evening where tradition met innovation. India's finest classical musicians shared the stage with contemporary world music artists to create something entirely new — a sound that honours the depth of Indian classical tradition while embracing the spirit of musical adventure.",
    coverImage: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
    gallery: [],
    artists: ["meera-kapoor"],
    ticketUrl: "#",
    ticketType: "tickets",
    status: "past",
    featured: false,
  },
  {
    id: "6",
    slug: "corporate-gala-hyderabad",
    title: "Gala Evening — TechPulse",
    subtitle: "Entertainment for Excellence",
    date: "August 28, 2026",
    time: "7:00 PM",
    venue: "Hyderabad International Convention Centre",
    city: "Hyderabad",
    state: "Telangana",
    category: "Corporate",
    genre: ["Bollywood", "Live Music", "Jazz"],
    description: "A curated corporate entertainment evening for TechPulse's annual gala.",
    longDescription:
      "Mehfil Collective curated a world-class entertainment experience for TechPulse's annual awards gala. Featuring live music across multiple genres, the evening balanced sophistication with celebration, leaving attendees with an unforgettable memory of an extraordinary night.",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    gallery: [],
    artists: ["kavya-nair", "rahul-dev"],
    ticketUrl: "#",
    ticketType: "enquire",
    status: "past",
    featured: false,
  },
];

export const artists: Artist[] = [
  {
    id: "1",
    slug: "arjun-sharma",
    name: "Arjun Sharma",
    tagline: "Singer • Sufi • Devotional",
    bio: "Arjun Sharma is one of India's most celebrated Sufi vocalists, whose voice carries the weight of centuries of devotional tradition. Born into a family of musicians in Varanasi, Arjun grew up immersed in the classical tradition before finding his own path through Sufi music and poetry. His performances are known for their raw emotional depth and the rare ability to transport audiences into a state of meditative presence.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      "https://images.unsplash.com/photo-1559181567-c3190bba9c2c?w=600&q=80",
    ],
    category: "Vocalist",
    genres: ["Sufi", "Devotional", "Ghazal", "Qawwali"],
    performanceType: "Solo, Ensemble",
    events: ["sufi-mehfil-pune", "bhajan-sandhya-jaipur"],
    socialLinks: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
    featured: true,
  },
  {
    id: "2",
    slug: "meera-kapoor",
    name: "Meera Kapoor",
    tagline: "Singer • Bollywood • Classical",
    bio: "Meera Kapoor is a versatile vocalist who moves effortlessly between Bollywood, classical and contemporary music. Trained in Hindustani classical music from the age of six, Meera brings a depth and refinement to every performance that distinguishes her as one of the most sought-after live performers of her generation. Her ability to connect with audiences across age groups makes every Mehfil she performs at truly special.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    ],
    category: "Vocalist",
    genres: ["Bollywood", "Classical", "Fusion"],
    performanceType: "Solo, Collaborative",
    events: ["sufi-mehfil-pune", "classical-fusion-delhi"],
    socialLinks: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      spotify: "https://spotify.com",
    },
    featured: true,
  },
  {
    id: "3",
    slug: "kavya-nair",
    name: "Kavya Nair",
    tagline: "Singer • Indie • Folk",
    bio: "Kavya Nair is a trailblazing independent artist from Kerala who blends Kerala folk traditions with contemporary indie sensibilities. Her music is a celebration of stories — stories of love, land, people and the quiet moments in between. Having performed at major music festivals across South and West India, Kavya brings an earthy authenticity and infectious joy to every stage she inhabits.",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=600&q=80",
    ],
    category: "Artist",
    genres: ["Indie", "Folk", "Fusion"],
    performanceType: "Solo, Band",
    events: ["bollywood-night-mumbai", "corporate-gala-hyderabad"],
    socialLinks: {
      instagram: "https://instagram.com",
      spotify: "https://spotify.com",
    },
    featured: true,
  },
  {
    id: "4",
    slug: "rahul-dev",
    name: "Rahul Dev",
    tagline: "Musician • Composer • Guitarist",
    bio: "Rahul Dev is a composer and multi-instrumentalist who has been at the heart of India's independent music scene for over a decade. Known for his intricate guitar work and genre-defying compositions, Rahul has collaborated with artists across Bollywood, classical and world music. His live sets are a testament to the power of spontaneous creation and the magic that happens when brilliant musicians share a stage.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    ],
    category: "Musician",
    genres: ["Indie", "Jazz", "Bollywood", "Fusion"],
    performanceType: "Solo, Band, Collaborative",
    events: ["bollywood-night-mumbai", "indie-sessions-bangalore", "corporate-gala-hyderabad"],
    socialLinks: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      website: "https://example.com",
    },
    featured: true,
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getArtistsBySlug(slugs: string[]): Artist[] {
  return artists.filter((a) => slugs.includes(a.slug));
}

export function getEventsByArtistSlug(slug: string): Event[] {
  return events.filter((e) => e.artists.includes(slug));
}

export function getFeaturedEvents(): Event[] {
  return events.filter((e) => e.featured && e.status === "upcoming");
}

export function getFeaturedArtists(): Artist[] {
  return artists.filter((a) => a.featured);
}
