import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { photoMemories, videoMemories } from '../src/data/memories.ts';

console.log('🧪 Starting Public Scrapbook Verification Suite...\n');

// Test 1: App.tsx directly renders ScrapbookExperience without ProtectedGate
{
  console.log('--- Test 1: Entry Point Verification ---');
  const appCode = fs.readFileSync(path.resolve('src/App.tsx'), 'utf8');
  assert.ok(!appCode.includes('ProtectedGate'), 'App.tsx must not contain ProtectedGate');
  assert.ok(appCode.includes('<ScrapbookExperience />') || appCode.includes('<ScrapbookExperience/>'), 'App.tsx must directly render ScrapbookExperience');
  assert.ok(!appCode.includes('SITE_PASSPHRASE'), 'App.tsx must not reference passphrases');
  console.log('✅ PASS: ScrapbookExperience is the default direct entry point');
}

// Test 2: Verify all 8 photos are in public/media/photos/ and valid
{
  console.log('\n--- Test 2: Public Photo Assets ---');
  assert.strictEqual(photoMemories.length, 8, 'Must have exactly 8 photos');
  const photoDir = path.resolve('public/media/photos');

  for (const memory of photoMemories) {
    assert.ok(memory.src.startsWith('/media/photos/'), `Photo ${memory.id} must be in public /media/photos/`);
    const filename = decodeURIComponent(memory.src.replace('/media/photos/', ''));
    const filePath = path.join(photoDir, filename);
    assert.ok(fs.existsSync(filePath), `Photo file must exist: ${filename}`);
    const stats = fs.statSync(filePath);
    assert.ok(stats.size > 1000, `Photo file must have valid size: ${filename} (${stats.size} bytes)`);
  }
  console.log('✅ PASS: All 8 photos exist and are publicly accessible');
}

// Test 3: Public Video & Audio paths
{
  console.log('\n--- Test 3: Video & Audio Public Asset Paths ---');
  assert.ok(videoMemories[0].src.startsWith('/media/videos/'), 'Video must point to public /media/videos/ path');
  assert.ok(!videoMemories[0].src.startsWith('/api/'), 'Video must not depend on /api/ endpoints');

  const audioPlayerCode = fs.readFileSync(path.resolve('src/components/scrapbook/AmbientAudioPlayer.tsx'), 'utf8');
  assert.ok(audioPlayerCode.includes('/media/audio/background-melody.mp3'), 'Audio player must use public audio asset path');
  assert.ok(!audioPlayerCode.includes('/api/media/'), 'Audio player must not use /api/media/ path');
  console.log('✅ PASS: Video and audio paths use clean public static asset routes');
}

// Test 4: Verify vercel.json is clean static SPA config
{
  console.log('\n--- Test 4: Vercel Static Deployment Configuration ---');
  const vercelConfig = JSON.parse(fs.readFileSync(path.resolve('vercel.json'), 'utf8'));
  assert.ok(Array.isArray(vercelConfig.rewrites), 'vercel.json must have rewrites array');
  assert.strictEqual(vercelConfig.rewrites[0].source, '/(.*)', 'Must rewrite all client routes to /index.html');
  assert.strictEqual(vercelConfig.rewrites[0].destination, '/index.html', 'Destination must be /index.html');
  assert.strictEqual(vercelConfig.functions, undefined, 'vercel.json must not require serverless functions');
  console.log('✅ PASS: vercel.json is optimized for static edge deployment without 500 errors');
}

// Test 5: Verify vite.config.ts has no server middleware
{
  console.log('\n--- Test 5: Vite Client Configuration ---');
  const viteConfig = fs.readFileSync(path.resolve('vite.config.ts'), 'utf8');
  assert.ok(!viteConfig.includes('authMiddleware'), 'vite.config.ts must not import authMiddleware');
  assert.ok(!viteConfig.includes('chitra-auth-and-media-gate'), 'vite.config.ts must not have auth plugin');
  console.log('✅ PASS: vite.config.ts is clean and serverless-independent');
}

// Test 6: Verify no obsolete auth files exist in src/
{
  console.log('\n--- Test 6: Clean Codebase Verification ---');
  assert.ok(!fs.existsSync(path.resolve('src/components/auth/ProtectedGate.tsx')), 'ProtectedGate.tsx must be removed');
  assert.ok(!fs.existsSync(path.resolve('src/services/auth.ts')), 'services/auth.ts must be removed');
  assert.ok(!fs.existsSync(path.resolve('api')), 'api/ directory must be removed');
  assert.ok(!fs.existsSync(path.resolve('server')), 'server/ directory must be removed');
  console.log('✅ PASS: All obsolete authentication components and endpoints are cleanly removed');
}

console.log('\n========================================');
console.log('Public Scrapbook Suite: ALL 6 TESTS PASSED');
console.log('========================================\n');
