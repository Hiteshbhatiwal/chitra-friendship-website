/**
 * Automated Security & Authentication Test Suite for "A Little World of Chitra 💌"
 */

const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('🧪 Starting Security & Authorization Test Suite...\n');
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

  // 1. Unauthenticated direct access to private media
  console.log('--- Test 1: Direct Private Media Access Without Cookie ---');
  const mediaUnauthRes = await fetch(`${BASE_URL}/api/media/secret-test-memory.txt`);
  assert(mediaUnauthRes.status === 401, 'Unauthenticated request to /api/media/secret-test-memory.txt returns 401 Unauthorized');
  const mediaUnauthJson = await mediaUnauthRes.json();
  assert(mediaUnauthJson.error && mediaUnauthJson.error.includes('Private memories are locked'), 'Error message clearly explains access is locked without leaking sensitive details');

  // 2. Unauthenticated auth status
  console.log('\n--- Test 2: Auth Status When Logged Out ---');
  const statusLoggedOutRes = await fetch(`${BASE_URL}/api/auth/status`);
  const statusLoggedOutJson = await statusLoggedOutRes.json();
  assert(statusLoggedOutJson.authenticated === false, 'GET /api/auth/status returns { authenticated: false }');

  // 3. Failed authentication with incorrect passphrase
  console.log('\n--- Test 3: Failed Login Attempt ---');
  const loginFailRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passphrase: 'wrong-passphrase' })
  });
  assert(loginFailRes.status === 401, 'POST /api/auth/login with wrong passphrase returns 401 Unauthorized');
  const loginFailJson = await loginFailRes.json();
  assert(loginFailJson.success === false, 'Response indicates success: false');

  // 4. Successful authentication with correct passphrase
  console.log('\n--- Test 4: Successful Login Attempt ---');
  const loginSuccessRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passphrase: 'chitra-birthday-2026' })
  });
  assert(loginSuccessRes.status === 200, 'POST /api/auth/login with correct passphrase returns 200 OK');
  const rawSetCookie = loginSuccessRes.headers.get('set-cookie');
  assert(rawSetCookie && rawSetCookie.includes('chitra_session='), 'Set-Cookie header sets chitra_session');
  assert(rawSetCookie && rawSetCookie.includes('HttpOnly'), 'Cookie has HttpOnly flag for XSS protection');
  assert(rawSetCookie && rawSetCookie.includes('SameSite=Strict'), 'Cookie has SameSite=Strict for CSRF protection');

  const sessionCookie = rawSetCookie.split(';')[0];

  // 5. Authenticated status check
  console.log('\n--- Test 5: Auth Status With Valid Cookie ---');
  const statusAuthRes = await fetch(`${BASE_URL}/api/auth/status`, {
    headers: { Cookie: sessionCookie }
  });
  const statusAuthJson = await statusAuthRes.json();
  assert(statusAuthJson.authenticated === true, 'GET /api/auth/status returns { authenticated: true }');

  // 6. Authenticated private media access
  console.log('\n--- Test 6: Private Media Access With Valid Cookie ---');
  const mediaAuthRes = await fetch(`${BASE_URL}/api/media/secret-test-memory.txt`, {
    headers: { Cookie: sessionCookie }
  });
  assert(mediaAuthRes.status === 200, 'GET /api/media/secret-test-memory.txt returns 200 OK when authenticated');
  const mediaContent = await mediaAuthRes.text();
  assert(mediaContent.includes('Top Secret Friendship Memory'), 'Media content stream delivered successfully');
  const cacheControl = mediaAuthRes.headers.get('cache-control');
  assert(cacheControl && cacheControl.includes('no-store'), 'Cache-Control header enforces private, no-store');

  // 7. Path traversal attack prevention
  console.log('\n--- Test 7: Path Traversal Attack Defense ---');
  const traversalRes = await fetch(`${BASE_URL}/api/media/%2E%2E%2F%2E%2E%2Fpackage.json`, {
    headers: { Cookie: sessionCookie }
  });
  assert(traversalRes.status === 403, 'Path traversal request (%2E%2E%2F) is caught and returned 403 Forbidden');

  // 8. Logout
  console.log('\n--- Test 8: Logout & Session Clearing ---');
  const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: sessionCookie }
  });
  assert(logoutRes.status === 200, 'POST /api/auth/logout returns 200 OK');
  const logoutCookie = logoutRes.headers.get('set-cookie');
  assert(logoutCookie && logoutCookie.includes('Max-Age=0'), 'Set-Cookie clears cookie with Max-Age=0');

  // 9. Verification of access denial after logout
  console.log('\n--- Test 9: Verify Re-locking After Logout ---');
  const postLogoutStatus = await fetch(`${BASE_URL}/api/auth/status`);
  const postLogoutJson = await postLogoutStatus.json();
  assert(postLogoutJson.authenticated === false, 'Session is terminated; status is authenticated: false');

  console.log(`\n========================================`);
  console.log(`Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================`);

  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test script crashed:', err);
  process.exit(1);
});
