import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Eye, EyeOff, Sparkles, Heart, LogOut } from 'lucide-react';
import { checkAuthStatus, loginWithPassphrase, logoutUser } from '../../services/auth';

interface ProtectedGateProps {
  children: React.ReactNode;
}

export const ProtectedGate: React.FC<ProtectedGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passphrase, setPassphrase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setIsAuthenticated((current) => (current === null ? false : current));
      }
    }, 2500);

    checkAuthStatus()
      .then((authenticated) => {
        if (isMounted) {
          setIsAuthenticated(authenticated);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim()) {
      setErrorMessage('Please enter our secret passphrase 🌸');
      triggerShake();
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const result = await loginWithPassphrase(passphrase);
    setIsLoading(false);

    if (result.success) {
      setIsAuthenticated(true);
      setPassphrase('');
    } else {
      // Prevent React error #31: Ensure error is guaranteed to be a string
      const rawError = result.error;
      let displayError = 'Incorrect passphrase. Please try again! 🌸';
      if (typeof rawError === 'string') {
        displayError = rawError;
      } else if (rawError && typeof rawError === 'object') {
        displayError = (rawError as any).message || (rawError as any).error || JSON.stringify(rawError);
      }
      setErrorMessage(displayError);
      triggerShake();
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Initial checking state
  if (isAuthenticated === null) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-cream-paper)',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text-muted)'
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'var(--color-pink-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          animation: 'pulse-sparkle 1.5s infinite ease-in-out'
        }}>
          <Sparkles size={24} color="var(--color-pink-deep)" />
        </div>
        <p style={{ fontWeight: 600 }}>Opening Chitra's Little World...</p>
      </div>
    );
  }

  // Authenticated state: Render protected children + Logout button in corner
  if (isAuthenticated) {
    return (
      <>
        {/* Floating Logout Button */}
        <div style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 9999
        }}>
          <button
            onClick={handleLogout}
            className="btn btn-pill"
            style={{
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-card)',
              border: '1.5px solid var(--color-border-card)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
            title="Lock Scrapbook & Sign Out"
            aria-label="Lock Scrapbook and Sign Out"
          >
            <LogOut size={14} color="var(--color-text-muted)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Lock Scrapbook
            </span>
          </button>
        </div>

        {children}
      </>
    );
  }

  // Unauthenticated Lock Screen (Cute Pastel Scrapbook Gate)
  return (
    <div className="unlock-screen-wrapper">
      <div className={`unlock-card ${shake ? 'shake-animation' : ''}`}>
        {/* Cute Top Washi Tape */}
        <div className="washi-tape washi-pink tape-center" style={{ top: -14, width: 110 }} />

        {/* Lock Badge Icon */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: 'var(--color-pink-soft)',
          border: '2px dashed var(--color-pink-rose)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <Lock size={30} color="var(--color-pink-deep)" />
        </div>

        {/* Sticker Badge */}
        <div className="sticker-badge" style={{ marginBottom: '0.85rem' }}>
          <Sparkles size={14} className="sparkle-icon" />
          <span>Private Friendship Sanctuary</span>
        </div>

        {/* Heading */}
        <h1 className="heading-hero" style={{ fontSize: '2.4rem', marginBottom: '0.5rem', lineHeight: 1.15 }}>
          A Little World of Chitra 💌
        </h1>

        <p className="text-body-readable" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
          This scrapbook contains private school photographs, personal memories, and a special birthday message. Please enter the secret passphrase to unlock it.
        </p>

        {/* Password Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <div className="unlock-input-wrapper">
            <input
              id="passphrase-input"
              type={showPassword ? 'text' : 'password'}
              value={passphrase}
              onChange={(e) => {
                setPassphrase(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Enter the secret passphrase…"
              aria-label="Secret Passphrase"
              autoComplete="current-password"
              disabled={isLoading}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={errorMessage ? 'error-msg' : undefined}
              className={`unlock-input ${errorMessage ? 'input-has-error' : ''}`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={0}
              aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
              className="unlock-eye-btn"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Dedicated error slot keeps layout 100% stable without jump */}
          <div className="unlock-error-slot" aria-live="polite">
            {errorMessage && (
              <p id="error-msg" role="alert" className="unlock-error-message">
                <span>🌸</span>
                <span>{typeof errorMessage === 'string' ? errorMessage : 'Incorrect passphrase. Please try again! 🌸'}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="unlock-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Unlocking Scrapbook... ✨</span>
            ) : (
              <>
                <Unlock size={18} />
                <span>Unlock Scrapbook 💖</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1rem',
          borderTop: '1px dashed var(--color-border-delicate)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          color: 'var(--color-text-muted)',
          fontSize: '0.825rem'
        }}>
          <Heart size={14} color="var(--color-pink-rose)" fill="var(--color-pink-rose)" />
          <span>Made with love for Chitra Sharma</span>
        </div>
      </div>
    </div>
  );
};
