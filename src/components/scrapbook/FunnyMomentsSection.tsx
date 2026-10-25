import React, { useState } from 'react';
import { Laugh, Shuffle } from 'lucide-react';
import { siteContent } from '../../data/content';

export const FunnyMomentsSection: React.FC = () => {
  const { funnyMoments } = siteContent;
  const quotes = funnyMoments.randomQuotes;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const rollNextQuote = () => {
    // Pick a different random quote so it doesn't repeat back-to-back
    let nextIndex = Math.floor(Math.random() * quotes.length);
    if (nextIndex === currentIndex && quotes.length > 1) {
      nextIndex = (currentIndex + 1) % quotes.length;
    }
    setCurrentIndex(nextIndex);
    setAnimKey((prev) => prev + 1);
  };

  return (
    <section id="funny-section" style={{ margin: '4rem auto', maxWidth: '780px', padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="sticker-badge" style={{ marginBottom: '0.75rem' }}>
          <Laugh size={14} className="sparkle-icon" />
          <span>Chaos & Giggles 🤡</span>
        </div>

        <h2 className="heading-section" style={{ display: 'block', marginBottom: '0.5rem' }}>
          {funnyMoments.heading}
        </h2>

        <p className="heading-sub" style={{ maxWidth: 540, margin: '0 auto' }}>
          {funnyMoments.subheading}
        </p>
      </div>

      {/* Main Quote Card */}
      <div className="scrapbook-sheet" style={{ position: 'relative', textAlign: 'center', padding: '2.5rem 1.75rem' }}>
        <div className="washi-tape washi-mint tape-center" style={{ top: -12 }} />

        {/* Bubble content with aria-live for accessibility */}
        <div
          className="pagal-panti-bubble"
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            key={animKey}
            className="pagal-panti-quote-anim"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
          >
            <span style={{ fontSize: '2rem' }}>🤪</span>
            <p
              className="text-body-readable"
              style={{
                fontFamily: 'var(--font-playful)',
                fontSize: '1.45rem',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                lineHeight: 1.45,
                maxWidth: '560px'
              }}
            >
              "{quotes[currentIndex]}"
            </p>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-pink-deep)', fontWeight: 600 }}>
              Memory #{currentIndex + 1} of {quotes.length}
            </span>
          </div>
        </div>

        {/* Roll Button */}
        <div style={{ marginTop: '1.75rem' }}>
          <button
            className="btn btn-primary"
            onClick={rollNextQuote}
            aria-label="Generate another funny school memory"
            style={{
              padding: '0.85rem 1.85rem',
              fontSize: '1.05rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Shuffle size={18} />
            <span>{funnyMoments.rollButtonText}</span>
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.85rem' }}>
          Tap the button to shuffle through our favorite school memories! ✨
        </p>
      </div>
    </section>
  );
};
