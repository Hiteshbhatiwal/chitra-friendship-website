/**
 * Phase 3 Interaction & Endpoint Verification Test Suite
 */

const BASE_URL = 'http://localhost:5173';

async function runInteractionTests() {
  console.log('🧪 Starting Phase 3 Core Feature & API Verification Tests...\n');
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

  // 1. Verify index HTML delivery
  console.log('--- Test 1: Web Page Shell Verification ---');
  const indexRes = await fetch(`${BASE_URL}/`);
  assert(indexRes.status === 200, 'GET / returns 200 OK');
  const html = await indexRes.text();
  assert(html.includes('A Little World of Chitra 💌'), 'Page contains correct brand title');
  assert(html.includes('Caveat') && html.includes('Gaegu') && html.includes('Nunito'), 'Page preconnects and loads required Google Fonts');

  // 2. Unauthenticated media lock verification
  console.log('\n--- Test 2: Unauthenticated Phase 3 Media Request Blocking ---');
  const photoRes = await fetch(`${BASE_URL}/api/media/photo-1.jpg`);
  assert(photoRes.status === 401, 'Direct request to /api/media/photo-1.jpg returns 401 Unauthorized');

  const videoRes = await fetch(`${BASE_URL}/api/media/video-1.mp4`);
  assert(videoRes.status === 401, 'Direct request to /api/media/video-1.mp4 returns 401 Unauthorized');

  const audioRes = await fetch(`${BASE_URL}/api/media/background-melody.mp3`);
  assert(audioRes.status === 401, 'Direct request to /api/media/background-melody.mp3 returns 401 Unauthorized');

  // 3. Authenticate to test protected media responses
  console.log('\n--- Test 3: Authenticated Phase 3 Media Responses ---');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passphrase: 'chitra-birthday-2026' })
  });
  const cookie = loginRes.headers.get('set-cookie').split(';')[0];

  // When authenticated, if photo is not yet uploaded, server correctly returns 404
  const photoAuthRes = await fetch(`${BASE_URL}/api/media/photo-1.jpg`, {
    headers: { Cookie: cookie }
  });
  assert(photoAuthRes.status === 404, 'Authenticated request to non-existent photo returns 404 (frontend will render graceful SVG fallback)');

  // Verify real secret memory file still streams when authenticated
  const secretRes = await fetch(`${BASE_URL}/api/media/secret-test-memory.txt`, {
    headers: { Cookie: cookie }
  });
  assert(secretRes.status === 200, 'Authenticated request to real private file returns 200 OK stream');

  console.log(`\n========================================`);
  console.log(`Interaction Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================`);

  if (failed > 0) process.exit(1);
}

runInteractionTests().catch(err => {
  console.error('Test script failed:', err);
  process.exit(1);
});
