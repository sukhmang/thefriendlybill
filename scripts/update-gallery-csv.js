#!/usr/bin/env node

/**
 * Gallery CSV Updater Script
 * 
 * Syncs gallery.csv with actual files in public/images/
 * - Removes entries for files that no longer exist
 * - Adds entries for new files (images, MP4s, GIFs)
 * - Sets default_sort to 10000 for new entries or entries without sort value
 * 
 * Usage: npm run update-gallery-csv
 *    or: node scripts/update-gallery-csv.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const GALLERY_CSV = path.join(__dirname, '..', 'public', 'gallery.csv');

// Supported extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];
const ALL_EXTENSIONS = [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS];

// Default sort value for new entries or entries without sort
const DEFAULT_SORT = 10000;

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
    // If value contains comma, quote, or newline, wrap in quotes and escape quotes
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
    if (values.length === 0 || values.every(v => !v)) continue; // Skip empty rows
    
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

// Get file type from extension
function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (VIDEO_EXTENSIONS.includes(ext)) {
    return 'video';
  } else if (ext === '.gif') {
    return 'gif';
  } else {
    return 'image';
  }
}

function updateGalleryCSV() {
  try {
    // Check if images directory exists
    if (!fs.existsSync(IMAGES_DIR)) {
      console.error(`❌ Error: Images directory not found at ${IMAGES_DIR}`);
      process.exit(1);
    }

    // Read existing CSV
    const { headers, rows: existingRows } = readCSV();
    
    // Ensure required headers exist
    const requiredHeaders = ['filename', 'type', 'alt', 'category', 'year', 'date', 'tags', 'default_sort'];
    const allHeaders = [...new Set([...requiredHeaders, ...headers])];
    
    // Get all files in images directory
    const files = fs.readdirSync(IMAGES_DIR);
    const mediaFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ALL_EXTENSIONS.includes(ext);
      })
      .filter(file => {
        // Exclude thumbnails directory and JSON files
        return !file.startsWith('thumbnails') && !file.endsWith('.json');
      });

    console.log(`📁 Found ${mediaFiles.length} media file(s) in ${IMAGES_DIR}\n`);

    // Create a map of existing CSV entries by filename
    const existingMap = new Map();
    existingRows.forEach(row => {
      if (row.filename) {
        existingMap.set(row.filename, row);
      }
    });

    // Step 1: Remove entries for files that no longer exist
    const removedFiles = [];
    const validRows = existingRows.filter(row => {
      if (!row.filename) return false;
      
      const filePath = path.join(IMAGES_DIR, row.filename);
      const exists = fs.existsSync(filePath);
      
      if (!exists) {
        removedFiles.push(row.filename);
        return false;
      }
      
      return true;
    });

    if (removedFiles.length > 0) {
      console.log(`🗑️  Removed ${removedFiles.length} entry/entries for deleted files:`);
      removedFiles.forEach(file => console.log(`   - ${file}`));
      console.log('');
    }

    // Step 2: Add new files that aren't in CSV
    const newFiles = [];
    const updatedRows = [...validRows];
    
    mediaFiles.forEach(filename => {
      if (!existingMap.has(filename)) {
        // New file - add to CSV
        const fileType = getFileType(filename);
        const baseName = filename.replace(/\.[^/.]+$/, '');
        
        const newRow = {
          filename: filename,
          type: fileType,
          alt: baseName,
          category: '',
          year: '',
          date: '',
          tags: '',
          default_sort: DEFAULT_SORT.toString()
        };
        
        // Fill in any other headers with empty strings
        allHeaders.forEach(header => {
          if (!newRow[header]) {
            newRow[header] = '';
          }
        });
        
        updatedRows.push(newRow);
        newFiles.push(filename);
      } else {
        // Existing file - ensure it has a default_sort value
        const existingRow = existingMap.get(filename);
        if (!existingRow.default_sort || existingRow.default_sort.trim() === '') {
          existingRow.default_sort = DEFAULT_SORT.toString();
        }
      }
    });

    if (newFiles.length > 0) {
      console.log(`➕ Added ${newFiles.length} new file(s):`);
      newFiles.forEach(file => console.log(`   - ${file} (default_sort: ${DEFAULT_SORT})`));
      console.log('');
    }

    // Step 3: Ensure all rows have default_sort values
    updatedRows.forEach(row => {
      if (!row.default_sort || row.default_sort.trim() === '') {
        row.default_sort = DEFAULT_SORT.toString();
      }
    });

    // Sort rows by default_sort (ascending), then by filename
    updatedRows.sort((a, b) => {
      const sortA = parseInt(a.default_sort) || DEFAULT_SORT;
      const sortB = parseInt(b.default_sort) || DEFAULT_SORT;
      
      if (sortA !== sortB) {
        return sortA - sortB;
      }
      
      // If sort values are equal, sort by filename
      return (a.filename || '').localeCompare(b.filename || '');
    });

    // Write updated CSV
    writeCSV(allHeaders, updatedRows);

    // Report results
    console.log(`✅ Successfully updated gallery.csv`);
    console.log(`   Total entries: ${updatedRows.length}`);
    console.log(`   - Existing entries: ${validRows.length}`);
    if (removedFiles.length > 0) {
      console.log(`   - Removed entries: ${removedFiles.length}`);
    }
    if (newFiles.length > 0) {
      console.log(`   - New entries: ${newFiles.length}`);
    }
    
    // Show breakdown by type
    const imageCount = updatedRows.filter(r => r.type === 'image').length;
    const videoCount = updatedRows.filter(r => r.type === 'video').length;
    const gifCount = updatedRows.filter(r => r.type === 'gif').length;
    
    console.log(`\n   Breakdown:`);
    console.log(`   - Images: ${imageCount}`);
    console.log(`   - Videos: ${videoCount}`);
    console.log(`   - GIFs: ${gifCount}`);

  } catch (error) {
    console.error('❌ Error updating gallery CSV:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
updateGalleryCSV();

