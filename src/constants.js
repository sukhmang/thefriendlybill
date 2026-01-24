// Easy-to-edit constants for the memorial site
export const MEMORIAL_DATA = {
  name: "Baljit Singh Grewal",
  birthDate: "January 1, 1953",
  deathDate: "January 16, 2026",
  birthYear: 1953,
  deathYear: 2026,
  welcomeMessage: "We invite you to join us in celebrating the life and legacy of Baljit Singh Grewal. This memorial site serves as a place to remember, honor, and share memories of a life well-lived.",
  portraitImage: "/portrait.png", // Portrait image in public folder
}

// Event details - Update these with actual funeral information
export const EVENT_DATA = {
  // Main Funeral Service
  // Event date and time (ISO format: YYYY-MM-DDTHH:MM:SSZ in UTC)
  // 12:00 PM MST = 19:00 UTC (MST is UTC-7)
  eventDateTime: "2026-01-22T19:00:00Z",
  
  // Display date (human-readable format)
  displayDate: "Thursday, January 22nd, 2026",
  displayTime: "12:00 PM MST",
  
  // Livestream start time (separate from event time)
  // Livestream begins at 11:00 AM MST = 18:00 UTC (MST is UTC-7)
  livestreamDateTime: "2026-01-22T18:00:00Z",
  livestreamDisplayTime: "11:00 AM MST",
  
  // Location details for Funeral Service
  venueName: "Park Place Funeral Home",
  address: {
    street: "51 Broadway Blvd",
    city: "Sherwood Park",
    state: "AB",
    zip: "T8H 2C1",
    country: "Canada",
    full: "51 Broadway Blvd, Sherwood Park, AB T8H 2C1, Canada" // Full address for Google Maps
  },
  
  // YouTube Livestream
  // Video ID extracted from: https://www.youtube.com/live/CtLesw1JaBA?si=1mYuQgum65R4k9eY
  youtubeVideoId: "CtLesw1JaBA", // YouTube live stream video ID
  // Slideshow video (extracted from: https://www.youtube.com/watch?v=Rg4KB7H9cRw)
  youtubeLoopVideoId: "Rg4KB7H9cRw", // YouTube video ID for slideshow video
  livestreamNote: "Livestream and Updates - www.baljitgrewal.ca",
  livestreamWebsite: "www.baljitgrewal.ca",
  
  // Program PDF
  // Place PDF file in public/ folder and reference it here
  programPdfUrl: "/images/program/program.JPG", // Program image file
  
  // Additional events (e.g., Bhog, Celebration of Life)
  additionalEvents: [
    {
      title: "Bhog & Antim Ardas",
      displayDate: "Monday, January 19th, 2026",
      displayTime: "1:00 PM MST",
      venueName: "Nanaksar Gurdwara Gursikh Temple Edmonton",
      address: {
        street: "1410 Horsehill Road Northwest",
        city: "Edmonton",
        state: "AB",
        zip: "T5Y 6G6",
        country: "Canada",
        full: "1410 Horsehill Road Northwest, Edmonton, AB T5Y 6G6, Canada"
      },
      note: "Followed by the Funeral Service on January 22nd",
      isPast: true, // Mark as past event
    },
    {
      title: "Celebration of Life in Vancouver",
      displayDate: "Sunday, January 25th, 2026",
      displayTime: "12:00 - 4:30 PM PST",
      venueName: "Our Home",
      address: {
        street: "20-6061 Boundary Drive West",
        city: "Surrey",
        state: "BC",
        zip: "V3X2A6",
        country: "Canada",
        full: "20-6061 Boundary Drive West, Surrey, BC V3X2A6, Canada"
      },
      note: "Open House Style - people can drop in any time and it's very casual",
      rsvp: {
        phone: "604-209-4571",
        textPreferred: true,
        note: "Text preferred",
        name: "Varinder",
      },
      hasRSVP: true,
    }
  ],
  
  // Mark main event as past (for recorded content)
  isMainEventPast: true,
}

// Home Videos - YouTube videos with metadata
// Add your home videos here with YouTube video IDs
export const HOME_VIDEOS = [
  {
    id: "CZsx-pHoSw8", // Varinder's First Birthday
    title: "Varinder's First Birthday",
    description: "Celebrating Varinder's first birthday with family, capturing the joy and excitement of this special milestone.",
    location: "Edmonton",
    year: 1983,
    appearances: ["Baljit Grewal", "Varinder", "Family"],
  },
  {
    id: "53mAlFbB_0s", // Varinder's Birthday 1989
    title: "Varinder's Birthday 1989",
    description: "Celebrating Varinder's birthday with family and friends, filled with laughter, cake, and cherished moments.",
    location: "Edmonton",
    year: 1989,
    appearances: ["Baljit Grewal", "Varinder", "Family"],
  },
]
