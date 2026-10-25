/**
 * Client-side Authentication Service
 * Communicates with backend endpoints (/api/auth/*) using HttpOnly secure cookies.
 */

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function checkAuthStatus(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/status', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!res.ok) return false;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return false;

    const data = await res.json().catch(() => null);
    return Boolean(data && data.authenticated);
  } catch (err) {
    console.error('[Auth Status Error]', err);
    return false;
  }
}

export async function loginWithPassphrase(passphrase: string): Promise<AuthResponse> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ passphrase })
    });

    let data: any = null;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error('[Auth Parse Error]', jsonErr);
        data = null;
      }
    }

    if (!res.ok) {
      // Log technical details to console for developer debugging
      console.error(`[Auth Request Failed] Status ${res.status}:`, data);

      let errorMessage = 'Incorrect passphrase. Please try again! 🌸';

      if (res.status === 401) {
        // Specifically invalid password credentials
        if (data && typeof data.error === 'string') {
          errorMessage = data.error;
        } else {
          errorMessage = 'Incorrect passphrase. Please try again! 🌸';
        }
      } else if (res.status === 429) {
        // Rate limiting
        if (data && typeof data.error === 'string') {
          errorMessage = data.error;
        } else {
          errorMessage = 'Too many attempts. Please wait a minute and try again.';
        }
      } else {
        // Server unreachable, 404, or 500 configuration issue
        // Show friendly public message while keeping tech details in console
        errorMessage = "We're having trouble opening your scrapbook. Please try again in a moment.";
      }

      return {
        success: false,
        error: String(errorMessage)
      };
    }

    const message = typeof data?.message === 'string' ? data.message : undefined;
    return {
      success: true,
      message
    };
  } catch (err) {
    console.error('[Auth Network Error]', err);
    return {
      success: false,
      error: "We're having trouble opening your scrapbook. Please try again in a moment."
    };
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    });
    return res.ok;
  } catch (err) {
    console.error('[Auth Logout Error]', err);
    return false;
  }
}
