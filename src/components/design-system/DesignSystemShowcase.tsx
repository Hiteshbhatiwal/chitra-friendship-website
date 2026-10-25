import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  PartyPopper,
  Flame
} from 'lucide-react';
import { PolaroidPreview } from './PolaroidPreview';
import { siteContent } from '../../data/content';
import { initialPhotoMemories } from '../../data/memories';
import '../../styles/design-system.css';

export const DesignSystemShowcase: React.FC = () => {
  // Interactive state demos
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Trigger pastel confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F8C8DC', '#DCCBFF', '#FFF2B2', '#E889AC', '#C8E6C9']
    });
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    triggerConfetti();
  };

  const copyToken = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  // Color tokens
  const colorTokens = [
    { name: 'Baby Pink', hex: '#F8C8DC', token: '--color-pink-baby', role: 'Hero accents & tape', textDark: true },
    { name: 'Rose Pink', hex: '#E889AC', token: '--color-pink-rose', role: 'Primary buttons & badges', textDark: false },
    { name: 'Soft Lavender', hex: '#DCCBFF', token: '--color-lavender-soft', role: 'Cards & secondary tape', textDark: true },
    { name: 'Cream Paper', hex: '#FFF8EF', token: '--color-cream-paper', role: 'Scrapbook background', textDark: true },
    { name: 'White', hex: '#FFFFFF', token: '--color-white', role: 'Polaroids & paper sheets', textDark: true },
    { name: 'Deep Plum', hex: '#493448', token: '--color-text-main', role: 'Primary readable text (8.2:1)', textDark: false },
    { name: 'Muted Plum', hex: '#735671', token: '--color-text-muted', role: 'Subtitles & timestamps', textDark: false },
    { name: 'Pastel Mint', hex: '#C8E6C9', token: '--color-mint-pastel', role: 'Accent washi tape', textDark: true },
    { name: 'Butter Yellow', hex: '#FFF2B2', token: '--color-butter-yellow', role: 'Cake flames & stars', textDark: true },
  ];

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Top Banner */}
      <header style={{
        background: 'linear-gradient(180deg, rgba(248, 200, 220, 0.4) 0%, transparent 100%)',
        padding: '3rem 1rem 2rem 1rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="washi-tape washi-pink tape-center" style={{ width: 140, height: 26 }} />
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }} className="sticker-badge">
          <Sparkles size={16} className="sparkle-icon" />
          <span>Design System & Pattern Library</span>
          <span>•</span>
          <span>Phase 1 Scaffolding</span>
        </div>

        <h1 className="heading-hero" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          A Little World of Chitra 💌
        </h1>
        <p className="heading-sub" style={{ maxWidth: 600, margin: '0 auto' }}>
          Cute Pastel Friendship Scrapbook Design System • Tokens, Typography & Component Specs
        </p>
      </header>

      <main className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginTop: '1.5rem' }}>

        {/* 1. COLOR TOKENS */}
        <section className="scrapbook-sheet">
          <div className="washi-tape washi-lavender tape-left" />
          <h2 className="heading-section" style={{ display: 'block', textAlign: 'left', marginBottom: '1rem' }}>
            🎨 1. Color Palette & Accessibility Tokens
          </h2>
          <p className="text-body-readable" style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
            Carefully curated pastel tones designed for a soft, warm aesthetic while maintaining strict WCAG AA contrast (Deep Plum #493448 provides 8.2:1 contrast against cream paper).
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem'
          }}>
            {colorTokens.map((c) => (
              <div
                key={c.token}
                onClick={() => copyToken(c.token)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  boxShadow: 'var(--shadow-subtle)',
                  border: '1px solid var(--color-border-delicate)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                title="Click to copy CSS token"
              >
                <div style={{
                  height: 64,
                  backgroundColor: c.hex,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(73, 52, 72, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: c.textDark ? '#493448' : '#ffffff'
                }}>
                  {copiedToken === c.token ? 'Copied! ✓' : c.hex}
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{c.name}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-pink-deep)' }}>{c.token}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. TYPOGRAPHY SCALE */}
        <section className="scrapbook-sheet">
          <div className="washi-tape washi-mint tape-right" />
          <h2 className="heading-section" style={{ display: 'block', textAlign: 'left', marginBottom: '1rem' }}>
            ✍️ 2. Typography Scale & Fonts
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px dashed var(--color-border-delicate)', paddingBottom: '1rem' }}>
              <span className="sticker-badge" style={{ marginBottom: 6 }}>Display Font: 'Caveat' (Handwritten Script)</span>
              <div className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text-main)', fontWeight: 700 }}>
                A Little World of Chitra 💌 — School memories kept safe forever
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed var(--color-border-delicate)', paddingBottom: '1rem' }}>
              <span className="sticker-badge" style={{ marginBottom: 6 }}>Playful Font: 'Gaegu' (Cute Handwriting)</span>
              <div className="font-playful" style={{ fontSize: '1.5rem', color: 'var(--color-pink-deep)', fontWeight: 700 }}>
                Certified Pagal-Panti Department • Chapter One • Open Your Gift Box 🎀
              </div>
            </div>

            <div>
              <span className="sticker-badge" style={{ marginBottom: 6 }}>Body Font: 'Nunito' & 'Quicksand' (Soft, High-Contrast Body)</span>
              <p className="text-body-readable" style={{ maxWidth: 680 }}>
                Designed for comfortable, effortless reading on small mobile phone screens. Generous 1.6x line height prevents eye strain during longer reading sections like the birthday apology letter.
              </p>
            </div>
          </div>
        </section>

        {/* 3. BUTTONS & INTERACTION STATES */}
        <section className="scrapbook-sheet">
          <div className="washi-tape washi-butter tape-center" />
          <h2 className="heading-section" style={{ display: 'block', textAlign: 'left', marginBottom: '1.25rem' }}>
            🔘 3. Button Styles & Interactive States
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={triggerConfetti}>
              <PartyPopper size={18} />
              <span>Primary Button (Tap for Confetti)</span>
            </button>

            <button className="btn btn-secondary">
              <Sparkles size={18} />
              <span>Secondary Button</span>
            </button>

            <button className={`btn btn-pill ${musicPlaying ? 'active' : ''}`} onClick={() => setMusicPlaying(!musicPlaying)}>
              {musicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>Music: {musicPlaying ? 'Playing 🎵' : 'Muted 🔇'}</span>
            </button>

            <button className="btn btn-icon" aria-label="Love this memory" onClick={triggerConfetti}>
              <Heart size={20} fill="var(--color-pink-rose)" color="var(--color-pink-rose)" />
            </button>
          </div>
          <p style={{ marginTop: '0.85rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            All buttons have minimum 44px touch targets for mobile accessibility, visible focus outlines for keyboard navigation, and micro-bounce press feedback.
          </p>
        </section>

        {/* 4. POLAROID PHOTO SPECIMEN */}
        <section className="scrapbook-sheet">
          <div className="washi-tape washi-pink tape-left" />
          <h2 className="heading-section" style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem' }}>
            📸 4. Polaroid Photo Card Pattern
          </h2>
          <p className="text-body-readable" style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Polaroids feature subtle scrapbook tilts, realistic drop shadows, washi tape bindings, and automatic graceful SVG placeholders if images are not yet copied to <code>public/media/photos/</code>.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            maxWidth: 700,
            margin: '0 auto'
          }}>
            <PolaroidPreview memory={initialPhotoMemories[0]} />
            <PolaroidPreview memory={initialPhotoMemories[1]} />
          </div>
        </section>

        {/* 5. STATIONERY LINED PAPER SPECIMEN (APOLOGY LETTER) */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <span className="sticker-badge" style={{ marginBottom: 6 }}>Preview of Section 7</span>
            <h2 className="heading-section" style={{ display: 'block' }}>
              💌 5. Apology Letter Stationery Pattern
            </h2>
          </div>

          <div className="stationery-paper" style={{ maxWidth: 660, margin: '0 auto' }}>
            <div className="washi-tape washi-pink tape-center" style={{ top: -12 }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span className="sticker-badge">{siteContent.apologyLetter.badge}</span>
            </div>

            <div className="font-display" style={{ fontSize: '1.85rem', color: 'var(--color-pink-deep)', fontWeight: 700, marginBottom: '0.75rem' }}>
              {siteContent.apologyLetter.greeting}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {siteContent.apologyLetter.paragraphs.map((p, idx) => (
                <p key={idx} className="text-body-readable" style={{ fontSize: '1.05rem', color: 'var(--color-text-main)' }}>
                  {p}
                </p>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <div className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>
                {siteContent.apologyLetter.closing}
              </div>
              <div className="font-display" style={{ fontSize: '2rem', color: 'var(--color-pink-deep)', fontWeight: 700 }}>
                {siteContent.apologyLetter.signature}
              </div>
            </div>
          </div>
        </section>

        {/* 6. BIRTHDAY CAKE & CANDLE ANIMATION */}
        <section className="scrapbook-sheet" style={{ textAlign: 'center' }}>
          <div className="washi-tape washi-butter tape-center" />
          <h2 className="heading-section" style={{ display: 'block', marginBottom: '0.5rem' }}>
            🎂 6. Birthday Cake & Candle Interaction
          </h2>
          <p className="text-body-readable" style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Flickering SVG flame that can be blown out by Chitra, triggering celebration confetti!
          </p>

          <div className="cake-wrapper" style={{ margin: '1rem auto' }}>
            {/* Candle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
              <div className={`candle-flame ${candlesBlown ? 'extinguished' : ''}`} />
              <div style={{
                width: 10,
                height: 28,
                background: 'repeating-linear-gradient(45deg, #F8C8DC, #F8C8DC 4px, #ffffff 4px, #ffffff 8px)',
                borderRadius: '3px 3px 0 0',
                boxShadow: '0 2px 4px rgba(73, 52, 72, 0.1)'
              }} />
            </div>

            {/* Cake Tiers */}
            <div style={{
              width: 140,
              height: 44,
              backgroundColor: '#FFF2B2',
              borderRadius: '12px 12px 0 0',
              border: '2px solid #F3DDE5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(73, 52, 72, 0.05)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '1.25rem' }}>🍓 🌸 🍓</span>
            </div>
            <div style={{
              width: 180,
              height: 52,
              backgroundColor: '#F8C8DC',
              borderRadius: '0 0 16px 16px',
              border: '2px solid #F3DDE5',
              borderTop: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 14px rgba(73, 52, 72, 0.08)'
            }}>
              <span className="font-display" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#493448' }}>
                Happy Birthday!
              </span>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            {!candlesBlown ? (
              <button className="btn btn-primary" onClick={handleBlowCandles}>
                <Flame size={18} />
                <span>{siteContent.birthday.makeWishButton}</span>
              </button>
            ) : (
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span className="sticker-badge" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                  {siteContent.birthday.wishMadeText}
                </span>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', marginTop: 4 }}
                  onClick={() => setCandlesBlown(false)}
                >
                  Relight Candles 🕯️
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 7. FRIENDSHIP PEEK CARDS */}
        <section className="scrapbook-sheet">
          <div className="washi-tape washi-lavender tape-right" />
          <h2 className="heading-section" style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem' }}>
            🌷 7. Friendship Peek Cards Specimen
          </h2>
          <p className="text-body-readable" style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Tactile cards that can be tapped to reveal private friendship appreciation notes.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}>
            {siteContent.friendshipCards.map((card) => {
              const isOpened = activeCardId === card.id;
              return (
                <div
                  key={card.id}
                  className={`friendship-card ${isOpened ? 'opened' : ''}`}
                  onClick={() => setActiveCardId(isOpened ? null : card.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpened}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveCardId(isOpened ? null : card.id);
                    }
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>{card.icon}</div>
                  <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {card.title}
                  </div>
                  <div className="font-playful" style={{ fontSize: '0.9rem', color: 'var(--color-pink-deep)', marginBottom: 8 }}>
                    {card.tagline}
                  </div>

                  {isOpened ? (
                    <div style={{
                      marginTop: 10,
                      paddingTop: 10,
                      borderTop: '1px dashed var(--color-pink-rose)',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      color: 'var(--color-text-main)'
                    }}>
                      {card.secretMessage}
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Tap to open message ✨
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. MOBILE VIEWPORT BREAKPOINTS SPEC */}
        <section className="scrapbook-sheet" style={{ background: '#FFFAF4' }}>
          <h2 className="heading-section" style={{ display: 'block', textAlign: 'left', marginBottom: '0.75rem' }}>
            📱 8. Responsive Design & Accessibility Verification
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '12px', background: 'white', borderRadius: 10, border: '1px solid var(--color-border-delicate)' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-pink-deep)' }}>320px - 375px</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Compact Mobile (iPhone SE)</div>
              <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Single column polaroids, responsive fonts via clamp(). Zero horizontal overflow.</div>
            </div>

            <div style={{ padding: '12px', background: 'white', borderRadius: 10, border: '1px solid var(--color-border-delicate)' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-pink-deep)' }}>390px - 430px</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Standard / Pro Mobile</div>
              <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Full padding, comfortable 44px tap targets, optimized touch gestures.</div>
            </div>

            <div style={{ padding: '12px', background: 'white', borderRadius: 10, border: '1px solid var(--color-border-delicate)' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-pink-deep)' }}>768px - 1024px+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tablet & Desktop</div>
              <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Multi-column polaroid scatter grid, stationery margin, rich hover lifts.</div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
