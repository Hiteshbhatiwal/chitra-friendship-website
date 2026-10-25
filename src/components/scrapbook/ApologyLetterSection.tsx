import React from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { siteContent } from '../../data/content';

export const ApologyLetterSection: React.FC = () => {
  const { apologyLetter } = siteContent;

  return (
    <section id="apology-section" style={{ margin: '4.5rem auto 3.5rem auto', maxWidth: '780px', padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="sticker-badge" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} className="sparkle-icon" />
          <span>A Sincere Note 💌</span>
        </div>

        <h2 className="heading-section" style={{ display: 'block', marginBottom: '0.5rem' }}>
          {apologyLetter.heading}
        </h2>

        <p className="heading-sub" style={{ maxWidth: 540, margin: '0 auto' }}>
          From my heart to yours — because our friendship matters.
        </p>
      </div>

      {/* Stationery Lined Paper Sheet */}
      <div className="stationery-paper" style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div className="washi-tape washi-pink tape-center" style={{ top: -12 }} />

        {/* Top Paper Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <span className="sticker-badge">{apologyLetter.badge}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            <Mail size={14} />
            <span>Private Letter</span>
          </div>
        </div>

        {/* Greeting */}
        <div className="font-display" style={{ fontSize: '2rem', color: 'var(--color-pink-deep)', fontWeight: 700, marginBottom: '1rem' }}>
          {apologyLetter.greeting}
        </div>

        {/* Letter Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {apologyLetter.paragraphs.map((p, index) => (
            <p
              key={index}
              className="text-body-readable"
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-main)',
                lineHeight: 1.8
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div style={{ marginTop: '2.75rem', textAlign: 'right', paddingBottom: '1rem' }}>
          <div className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', lineHeight: 1.2 }}>
            {apologyLetter.closing}
          </div>
          <div className="font-display" style={{ fontSize: '2.1rem', color: 'var(--color-pink-deep)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6, lineHeight: 1.3, marginTop: 4 }}>
            <span>{apologyLetter.signature}</span>
            <Heart size={20} fill="var(--color-pink-rose)" color="var(--color-pink-rose)" />
          </div>
        </div>
      </div>
    </section>
  );
};
