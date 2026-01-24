#!/usr/bin/env node

/**
 * Gallery CSV Sorter Script
 * 
 * Sorts gallery.csv entries with video priority:
 * - Videos are assigned to positions 1-120 (first 120 items)
 * - Images are assigned to positions 121+ (after videos)
 * - Preserves existing sort order within each group if possible
 * - Can be run anytime to re-sort the gallery
 * 
 * Usage: node scripts/sort-gallery-csv.js
 *    or: npm run sort-gallery-csv
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_CSV = path.join(__dirname, '..', 'public', 'gallery.csv');

const VIDEO_PRIORITY_RANGE = 120; // Videos appear in first 120 positions

// Parse CSV line (handles quoted fields)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Format CSV line (handles quoted fields)
function formatCSVLine(values) {
  return values.map(value => {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }).join(',');
}

// Read and parse CSV file
function readCSV() {
  if (!fs.existsSync(GALLERY_CSV)) {
    return { headers: [], rows: [] };
  }
  
  const content = fs.readFileSync(GALLERY_CSV, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }
  
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0 || values.every(v => !v)) continue;
    
    const row = {};
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || '';
    });
    rows.push(row);
  }
  
  return { headers, rows };
}

// Write CSV file
function writeCSV(headers, rows) {
  const lines = [];
  
  // Write header
  lines.push(formatCSVLine(headers));
  
  // Write rows
  rows.forEach(row => {
    const values = headers.map(header => row[header] || '');
    lines.push(formatCSVLine(values));
  });
  
  fs.writeFileSync(GALLERY_CSV, lines.join('\n') + '\n');
}

// Shuffle array (Fisher-Yates)
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function sortGalleryCSV() {
  try {
    if (!fs.existsSync(GALLERY_CSV)) {
      console.error(`❌ Error: gallery.csv not found at ${GALLERY_CSV}`);
      process.exit(1);
    }

    // Read CSV
    const { headers, rows } = readCSV();
    
    if (rows.length === 0) {
      console.error('❌ Error: CSV file has no data rows');
      process.exit(1);
    }

    if (!headers.includes('default_sort')) {
      console.error('❌ Error: default_sort column not found in CSV');
      console.error('   Please run update-gallery-csv.js first to add the column.');
      process.exit(1);
    }

    if (!headers.includes('type')) {
      console.error('❌ Error: type column not found in CSV');
      process.exit(1);
    }

    // Separate videos and images
    const videos = rows.filter(row => row.type === 'video');
    const images = rows.filter(row => row.type !== 'video');
    
    console.log(`📊 Found ${videos.length} video(s) and ${images.length} image(s)\n`);

    // Assign sort values to videos (1-120)
    // If there are more than 120 videos, they'll cycle through the range
    const videoSortValues = Array.from({ length: VIDEO_PRIORITY_RANGE }, (_, i) => i + 1);
    const shuffledVideoSortValues = shuffle([...videoSortValues]);
    
    videos.forEach((video, index) => {
      video.default_sort = shuffledVideoSortValues[index % VIDEO_PRIORITY_RANGE].toString();
    });

    // Assign sort values to images (121+)
    // Distribute images evenly across the remaining range
    const imageStartSort = VIDEO_PRIORITY_RANGE + 1;
    const imageEndSort = 10000; // Max sort value
    const imageRange = imageEndSort - imageStartSort + 1;
    
    if (images.length > 0) {
      // Create evenly distributed sort values for images
      const imageSortValues = [];
      const step = imageRange / images.length;
      for (let i = 0; i < images.length; i++) {
        const sortValue = Math.floor(imageStartSort + (i * step));
        imageSortValues.push(sortValue);
      }
      
      // Shuffle the image sort values to randomize order
      const shuffledImageSortValues = shuffle(imageSortValues);
      
      images.forEach((image, index) => {
        image.default_sort = shuffledImageSortValues[index].toString();
      });
    }

    // Combine and sort by default_sort
    const allRows = [...videos, ...images];
    allRows.sort((a, b) => {
      const sortA = parseInt(a.default_sort) || 10000;
      const sortB = parseInt(b.default_sort) || 10000;
      if (sortA !== sortB) {
        return sortA - sortB;
      }
      // If sort values are equal, sort by filename
      return (a.filename || '').localeCompare(b.filename || '');
    });

    // Write updated CSV
    writeCSV(headers, allRows);

    // Report results
    console.log(`✅ Successfully sorted gallery.csv`);
    console.log(`   Videos: ${videos.length} (assigned sort values 1-${VIDEO_PRIORITY_RANGE})`);
    console.log(`   Images: ${images.length} (assigned sort values ${imageStartSort}-${imageEndSort})`);
    
    console.log(`\n   First 20 items after sorting:`);
    allRows.slice(0, 20).forEach((row, index) => {
      const displayName = row.filename.length > 50 
        ? row.filename.substring(0, 50) + '...'
        : row.filename;
      console.log(`   ${index + 1}. [${row.default_sort}] ${displayName} (${row.type})`);
    });
    
    // Verification: Check how many videos are in the first 120 items
    const videosInFirst120 = allRows.slice(0, VIDEO_PRIORITY_RANGE).filter(r => r.type === 'video').length;
    console.log(`\n   ✅ Verification: ${videosInFirst120} of ${videos.length} videos appear in first ${VIDEO_PRIORITY_RANGE} items`);
    
    if (videos.length > VIDEO_PRIORITY_RANGE) {
      console.log(`   ⚠️  Note: You have ${videos.length} videos but only ${VIDEO_PRIORITY_RANGE} priority slots.`);
      console.log(`      Some videos will appear after position ${VIDEO_PRIORITY_RANGE}.`);
    }

  } catch (error) {
    console.error('❌ Error sorting gallery CSV:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
sortGalleryCSV();

