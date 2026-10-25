import assert from 'assert';
import statusHandler from '../api/auth/status.ts';
import loginHandler from '../api/auth/login.ts';
import logoutHandler from '../api/auth/logout.ts';
import mediaHandler from '../api/media/[filename].ts';
import { EventEmitter } from 'events';

console.log('🧪 Starting Vercel Serverless Endpoints Unit Test Suite...\n');

// Mock request and response helpers
function createMockReq({ method = 'GET', url = '/', headers = {}, body = null, query = {} } = {}) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.headers = { ...headers };
  req.socket = { remoteAddress: '127.0.0.1' };
  req.query = query;
  req.body = body;
  return req;
}

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    end(chunk) {
      if (chunk) this.body += chunk;
      this.emit?.('finish');
    }
  };
  return res;
}

let sessionCookie = '';

async function runTests() {
  // Test 1: GET /api/auth/status when unauthenticated
  {
    console.log('--- Test 1: GET /api/auth/status (unauthenticated) ---');
    const req = createMockReq({ method: 'GET', url: '/api/auth/status' });
    const res = createMockRes();
    await statusHandler(req, res);

    assert.strictEqual(res.statusCode, 200, 'Status should be 200');
    const data = JSON.parse(res.body);
    assert.strictEqual(data.authenticated, false, 'Should not be authenticated');
    console.log('✅ PASS: /api/auth/status returns { authenticated: false }');
  }

  // Test 2: POST /api/auth/login with wrong passphrase
  {
    console.log('\n--- Test 2: POST /api/auth/login (wrong password) ---');
    const req = createMockReq({
      method: 'POST',
      url: '/api/auth/login',
      headers: { 'content-type': 'application/json' },
      body: { passphrase: 'wrong-passphrase' }
    });
    const res = createMockRes();
    await loginHandler(req, res);

    assert.strictEqual(res.statusCode, 401, 'Status should be 401');
    const data = JSON.parse(res.body);
    assert.strictEqual(data.success, false);
    assert.strictEqual(typeof data.error, 'string', 'Error must be a string');
    console.log('✅ PASS: Wrong password returns 401 with string error message');
  }

  // Test 3: POST /api/auth/login with correct passphrase
  {
    console.log('\n--- Test 3: POST /api/auth/login (correct password) ---');
    const correctPassphrase = process.env.SITE_PASSPHRASE || 'chitra-birthday-2026';
    const req = createMockReq({
      method: 'POST',
      url: '/api/auth/login',
      headers: { 'content-type': 'application/json' },
      body: { passphrase: correctPassphrase }
    });
    const res = createMockRes();
    await loginHandler(req, res);

    assert.strictEqual(res.statusCode, 200, 'Status should be 200');
    const data = JSON.parse(res.body);
    assert.strictEqual(data.success, true);
    assert.ok(res.headers['set-cookie'], 'Set-Cookie header must be present');
    assert.ok(res.headers['set-cookie'].includes('chitra_session='), 'Cookie must contain chitra_session');
    assert.ok(res.headers['set-cookie'].includes('HttpOnly'), 'Cookie must be HttpOnly');
    assert.ok(res.headers['set-cookie'].includes('SameSite=Strict'), 'Cookie must be SameSite=Strict');

    sessionCookie = res.headers['set-cookie'].split(';')[0];
    console.log('✅ PASS: Correct password returns 200 and sets secure session cookie');
  }

  // Test 4: GET /api/auth/status with valid session cookie
  {
    console.log('\n--- Test 4: GET /api/auth/status (authenticated) ---');
    const req = createMockReq({
      method: 'GET',
      url: '/api/auth/status',
      headers: { cookie: sessionCookie }
    });
    const res = createMockRes();
    await statusHandler(req, res);

    assert.strictEqual(res.statusCode, 200);
    const data = JSON.parse(res.body);
    assert.strictEqual(data.authenticated, true, 'Should be authenticated');
    console.log('✅ PASS: /api/auth/status returns { authenticated: true } with valid cookie');
  }

  // Test 5: GET /api/media/* unauthenticated returns 401
  {
    console.log('\n--- Test 5: GET /api/media/* (unauthenticated) ---');
    const req = createMockReq({
      method: 'GET',
      url: '/api/media/secret-test-memory.txt',
      query: { filename: 'secret-test-memory.txt' }
    });
    const res = createMockRes();
    await mediaHandler(req, res);

    assert.strictEqual(res.statusCode, 401);
    const data = JSON.parse(res.body);
    assert.ok(data.error.includes('Unauthorized'), 'Should return unauthorized error');
    console.log('✅ PASS: Unauthenticated access to /api/media/ is rejected with 401');
  }

  // Test 6: GET /api/media/* path traversal attempt returns 403
  {
    console.log('\n--- Test 6: GET /api/media/* (path traversal attempt) ---');
    const req = createMockReq({
      method: 'GET',
      url: '/api/media/%2E%2E%2Fpackage.json',
      query: { filename: '..%2Fpackage.json' },
      headers: { cookie: sessionCookie }
    });
    const res = createMockRes();
    await mediaHandler(req, res);

    assert.strictEqual(res.statusCode, 403);
    const data = JSON.parse(res.body);
    assert.ok(data.error.includes('Forbidden'), 'Should reject path traversal');
    console.log('✅ PASS: Path traversal is blocked with 403 Forbidden');
  }

  // Test 7: POST /api/auth/logout
  {
    console.log('\n--- Test 7: POST /api/auth/logout ---');
    const req = createMockReq({ method: 'POST', url: '/api/auth/logout' });
    const res = createMockRes();
    await logoutHandler(req, res);

    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.headers['set-cookie'].includes('Max-Age=0'), 'Cookie must be expired');
    console.log('✅ PASS: /api/auth/logout clears session cookie');
  }

  console.log('\n========================================');
  console.log('Vercel Endpoints Test: ALL 7 TESTS PASSED');
  console.log('========================================\n');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
