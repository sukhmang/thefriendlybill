// Easy-to-edit constants for the memorial site
export const MEMORIAL_DATA = {
  name: "Baljit Grewal",
  birthYear: 1953,
  deathYear: 2026,
  welcomeMessage: "We invite you to join us in celebrating the life and legacy of Baljit Grewal. This memorial site serves as a place to remember, honor, and share memories of a life well-lived.",
  portraitImage: "/portrait.png", // Portrait image in public folder
}

// Event details - Update these with actual funeral information
export const EVENT_DATA = {
  // Main Funeral Service
  // Event date and time (ISO format: YYYY-MM-DDTHH:MM:SSZ in UTC)
  // 11:30 AM MST = 18:30 UTC (MST is UTC-7)
  eventDateTime: "2026-01-22T18:30:00Z",
  
  // Display date (human-readable format)
  displayDate: "Thursday, January 22, 2026",
  displayTime: "11:30 a.m. MST",
  
  // Location details for Funeral Service
  venueName: "Park Place Funeral Home Chapel & Crematorium Ltd",
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
  livestreamNote: "Live stream will begin at 11:30am.",
  
  // Program PDF
  // Place PDF file in public/ folder and reference it here
  programPdfUrl: "/program.pdf", // Replace with actual PDF path
  
  // Additional Events
  additionalEvents: [
    {
      name: "Bhog & Antim Ardas",
      date: "Monday, January 19, 2026",
      time: "1:00 p.m. MST",
      venueName: "Nanaksar Gurdwara Gursikh Temple Edmonton",
      address: {
        street: "1410 Horsehill Road Northwest",
        city: "Edmonton",
        state: "AB",
        zip: "T5Y 6G6",
        country: "Canada",
        full: "1410 Horsehill Road Northwest, Edmonton, AB T5Y 6G6, Canada"
      },
      isPast: true // This event has already started
    }
  ]
}

// Gallery items are now loaded from CSV file
// See: public/gallery.csv and GALLERY_CSV_GUIDE.md for details
// The Gallery component automatically loads items from /gallery.csv
