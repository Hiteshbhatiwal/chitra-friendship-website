# Private Media Storage 🔒

**IMPORTANT:**
This folder is located OUTSIDE the public web root (`public/`).
Files in this folder are **NEVER served directly** by any web server or static CDN.

Every request for files in this folder is routed through the secure API:
`GET /api/media/:filename`

The server enforces:
1. Valid, non-expired `chitra_session` cookie signed with `SESSION_SECRET`.
2. Path traversal sanitization (prevents directory traversal exploits like `../`).
3. Explicit `Cache-Control: private, no-cache, no-store, must-revalidate` headers.
4. Immediate `401 Unauthorized` for anyone attempting to view or download files without logging in.

When you are ready to add real photographs in Phase 3, place them here:
- `private_media/photo-1.jpg`
- `private_media/photo-2.jpg`
- etc.
