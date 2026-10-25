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
    console.error('Failed to check auth status:', err);
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
      } catch {
        data = null;
      }
    }

    if (!res.ok) {
      // Meaningful fallback based on HTTP status code
      let errorMessage = 'Incorrect passphrase. Please try again! 🌸';
      if (res.status === 404) {
        errorMessage = 'Verification server not reached (404). Please ensure serverless functions are configured.';
      } else if (res.status === 429) {
        errorMessage = 'Too many attempts. Please wait a minute and try again.';
      } else if (res.status === 500) {
        errorMessage = 'Server configuration error. Please verify SITE_PASSPHRASE in environment variables.';
      }

      // Safely extract error string even if data.error is an object (preventing React error #31)
      if (data) {
        if (typeof data.error === 'string') {
          errorMessage = data.error;
        } else if (data.error && typeof data.error === 'object' && typeof data.error.message === 'string') {
          errorMessage = data.error.message;
        } else if (typeof data.message === 'string') {
          errorMessage = data.message;
        }
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
    return {
      success: false,
      error: 'Network error connecting to verification server.'
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
    console.error('Failed to logout:', err);
    return false;
  }
}
