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
    const data = await res.json();
    return Boolean(data.authenticated);
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

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Authentication failed. Please try again! 🌸'
      };
    }

    return {
      success: true,
      message: data.message
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
