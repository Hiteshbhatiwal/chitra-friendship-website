/**
 * Automated Photo Gallery Verification Test
 * Confirms all 8 photos in memories.ts exist on disk and resolve over HTTP with 200 OK.
 */

import fs from 'fs';
import path from 'path';
import { photoMemories } from '../src/data/memories.ts';

const BASE_URL = 'http://localhost:5173';
const PHOTO_DIR = path.resolve('public/media/photos');

console.log('🧪 Starting Photo Gallery Verification Test...\n');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

async function runPhotoTests() {
  assert(photoMemories.length === 8, `Gallery defines exactly 8 photos (found ${photoMemories.length})`);

  for (let i = 0; i < photoMemories.length; i++) {
    const memory = photoMemories[i];
    console.log(`\n--- Checking Photo ${i + 1}: ${memory.title} ---`);
    console.log(`URL: ${memory.src}`);

    // Extract filename from URL
    const rawFilename = decodeURIComponent(memory.src.replace('/media/photos/', ''));
    console.log(`Disk Filename: ${rawFilename}`);

    // Check disk existence
    const filePath = path.join(PHOTO_DIR, rawFilename);
    const fileExists = fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    assert(fileExists, `File exists in public/media/photos/: ${rawFilename}`);

    if (fileExists) {
      const stats = fs.statSync(filePath);
      assert(stats.size > 0, `File has valid size on disk: ${stats.size} bytes`);
    }

    // Check HTTP delivery
    const httpUrl = `${BASE_URL}${memory.src}`;
    const res = await fetch(httpUrl);
    assert(res.status === 200, `HTTP GET returns 200 OK for ${memory.src}`);
    const contentType = res.headers.get('content-type');
    assert(contentType && contentType.includes('image/jpeg'), `Content-Type is image/jpeg (${contentType})`);
  }

  console.log(`\n========================================`);
  console.log(`Photo Gallery Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================`);

  if (failed > 0) process.exit(1);
}

runPhotoTests().catch(err => {
  console.error('Test script crashed:', err);
  process.exit(1);
});
