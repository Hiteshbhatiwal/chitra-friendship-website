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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      backgroundColor: 'var(--color-cream-paper)',
      backgroundImage: `radial-gradient(var(--color-pink-baby) 1px, transparent 1px),
                        radial-gradient(var(--color-lavender-soft) 1px, var(--color-cream-paper) 1px)`,
      backgroundSize: '28px 28px',
      backgroundPosition: '0 0, 14px 14px'
    }}>
      <div
        className={`scrapbook-sheet ${shake ? 'shake-animation' : ''}`}
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem 2rem 2.25rem 2rem',
          textAlign: 'center',
          position: 'relative',
          boxShadow: 'var(--shadow-polaroid)',
          border: '1.5px solid var(--color-border-card)',
          borderRadius: 'var(--radius-xl)'
        }}
      >
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
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div>
            <label
              htmlFor="passphrase-input"
              style={{
                display: 'block',
                fontFamily: 'var(--font-playful)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-text-main)',
                marginBottom: '0.4rem'
              }}
            >
              Secret Passphrase 🔑
            </label>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                id="passphrase-input"
                type={showPassword ? 'text' : 'password'}
                value={passphrase}
                onChange={(e) => {
                  setPassphrase(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Enter secret passphrase..."
                autoComplete="current-password"
                disabled={isLoading}
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? 'error-msg' : undefined}
                style={{
                  width: '100%',
                  padding: '0.85rem 2.85rem 0.85rem 1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-text-main)',
                  backgroundColor: 'var(--color-white)',
                  border: errorMessage ? '2px solid #e74c3c' : '2px solid var(--color-border-card)',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={0}
                aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errorMessage && (
              <p
                id="error-msg"
                role="alert"
                style={{
                  color: '#d63031',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>⚠️</span>
                <span>{typeof errorMessage === 'string' ? errorMessage : 'Incorrect passphrase. Please try again! 🌸'}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '1.05rem',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
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

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .shake-animation {
          animation: shake 0.45s ease-in-out;
        }
      `}</style>
    </div>
  );
};
