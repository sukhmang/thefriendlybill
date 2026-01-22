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
  // Slideshow video (extracted from: https://youtu.be/nWrGLzfLkyY)
  youtubeLoopVideoId: "nWrGLzfLkyY", // YouTube video ID for slideshow video
  livestreamNote: "Livestream and Updates - www.baljitgrewal.ca",
  livestreamWebsite: "www.baljitgrewal.ca",
  
  // Program PDF
  // Place PDF file in public/ folder and reference it here
  programPdfUrl: "/images/program/program.JPG", // Program image file
  
  // Additional Events
  additionalEvents: [
    {
      name: "Bhog & Antim Ardas",
      date: "Thursday, January 22nd, 2026",
      time: "1:30 PM MST",
      note: "Followed by",
      venueName: "Nanaksar Gurdwara",
      address: {
        street: "1410 Horsehill Rd NW",
        city: "Edmonton",
        state: "AB",
        zip: "T5Y 6G6",
        country: "Canada",
        full: "1410 Horsehill Rd NW, Edmonton, AB T5Y 6G6, Canada"
      },
      isPast: false
    },
    {
      name: "Celebration of Life in Vancouver",
      date: "Sunday, January 25th, 2026",
      time: "12:00 - 4:30 PM PST",
      note: "Open House Style",
      venueName: "Our Home",
      address: {
        street: "20-6061 Boundary Drive West",
        city: "Surrey",
        state: "BC",
        zip: "V3X2A6",
        country: "Canada",
        full: "20-6061 Boundary Drive West, Surrey, BC V3X2A6, Canada"
      },
      rsvp: {
        name: "Varinder",
        phone: "604-209-4571"
      },
      isPast: false
    }
  ]
}

// Gallery items are now loaded from CSV file
// See: public/gallery.csv and GALLERY_CSV_GUIDE.md for details
// The Gallery component automatically loads items from /gallery.csv
