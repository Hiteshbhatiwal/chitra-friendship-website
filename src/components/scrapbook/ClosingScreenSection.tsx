import React from 'react';
import { Heart, Sparkles, ArrowUp, Camera } from 'lucide-react';
import { siteContent } from '../../data/content';

export const ClosingScreenSection: React.FC = () => {
  const { closing, meta } = siteContent;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToMemories = () => {
    const el = document.getElementById('memories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="closing-section" style={{ margin: '5rem auto 3rem auto', maxWidth: '780px', padding: '0 1rem' }}>
      <div className="closing-scrapbook-sheet">
        <div className="washi-tape washi-lavender tape-center" style={{ top: -12 }} />

        {/* Decorative Badge */}
        <div className="sticker-badge" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} className="sparkle-icon" />
          <span>Final Keepsake Page 📖</span>
        </div>

        {/* Big Heart Icon */}
        <div style={{
          width: 70,
          height: 70,
          borderRadius: '50%',
          backgroundColor: 'var(--color-pink-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
          boxShadow: 'var(--shadow-subtle)',
          border: '2px solid var(--color-pink-rose)'
        }}>
          <Heart size={34} color="var(--color-pink-deep)" fill="var(--color-pink-rose)" />
        </div>

        {/* Heading */}
        <h2 className="heading-hero" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
          {closing.heading}
        </h2>

        {/* Warm Message */}
        <p className="text-body-readable" style={{ fontSize: '1.2rem', color: 'var(--color-text-main)', maxWidth: '580px', margin: '0 auto 1.25rem auto', lineHeight: 1.6 }}>
          {closing.message}
        </p>

        <p className="heading-sub" style={{ fontSize: '1.15rem', color: 'var(--color-pink-deep)', marginBottom: '2.25rem' }}>
          "{closing.subheading}"
        </p>

        {/* Navigation Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={scrollToMemories}>
            <Camera size={18} />
            <span>{closing.buttonBackToMemories}</span>
          </button>

          <button className="btn btn-secondary" onClick={scrollToTop}>
            <ArrowUp size={18} />
            <span>Back to Top 💌</span>
          </button>
        </div>

        {/* Scrapbook Stamp Signature */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px dashed var(--color-border-delicate)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4
        }}>
          <span className="font-display" style={{ fontSize: '1.45rem', color: 'var(--color-text-muted)' }}>
            Handcrafted with love for
          </span>
          <span className="font-display" style={{ fontSize: '2.2rem', color: 'var(--color-pink-deep)', fontWeight: 700 }}>
            {meta.recipientName} 🌸✨
          </span>
        </div>
      </div>
    </section>
  );
};
