/**
 * Public Scrapbook Interaction & Shell Verification Test Suite
 * Validates that the site is publicly accessible without login/authentication gates.
 */

const BASE_URL = 'http://localhost:5173';

async function runInteractionTests() {
  console.log('🧪 Starting Public Scrapbook Interaction & Accessibility Tests...\n');
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

  // 2. Verify no auth barriers in public shell
  console.log('\n--- Test 2: Verify Absence of Authentication Barriers ---');
  assert(!html.includes('Unlock Scrapbook'), 'No "Unlock Scrapbook" button in initial page source');
  assert(!html.includes('Private Sanctuary'), 'No "Private Sanctuary" auth badge');
  assert(!html.includes('Secret Passphrase'), 'No secret passphrase input prompt');

  // 3. Verify public media accessibility
  console.log('\n--- Test 3: Public Asset Accessibility ---');
  const photoUrl = `${BASE_URL}/media/photos/WhatsApp%20Image%202026-10-25%20at%205.05.08%20PM.jpeg`;
  const photoRes = await fetch(photoUrl);
  assert(photoRes.status === 200, 'Direct public request to photo asset returns 200 OK without cookies or auth headers');

  console.log(`\n========================================`);
  console.log(`Public Verification Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================`);

  if (failed > 0) process.exit(1);
}

runInteractionTests().catch(err => {
  console.error('Test script failed:', err);
  process.exit(1);
});

