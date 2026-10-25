import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart, ArrowDown } from 'lucide-react';
import { siteContent } from '../../data/content';

interface WelcomeEnvelopeProps {
  onOpenSurprise?: () => void;
}

export const WelcomeEnvelope: React.FC<WelcomeEnvelopeProps> = ({ onOpenSurprise }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (!isOpened) {
      setIsOpened(true);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#F8C8DC', '#DCCBFF', '#FFF2B2', '#E889AC']
      });

      // Smooth scroll after animation unfolds
      setTimeout(() => {
        onOpenSurprise?.();
        const nextSection = document.getElementById('birthday-section');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 950);
    }
  };

  return (
    <section id="welcome-section" className="envelope-screen">
      {/* Top sticker & greeting */}
      <div className="sticker-badge" style={{ marginBottom: '1rem' }}>
        <Sparkles size={14} className="sparkle-icon" />
        <span>{siteContent.welcome.envelopeBadge}</span>
      </div>

      <h1 className="heading-hero" style={{ marginBottom: '0.5rem' }}>
        {siteContent.meta.websiteTitle}
      </h1>

      <p className="heading-sub" style={{ maxWidth: 500, margin: '0 auto 1.5rem auto' }}>
        {siteContent.welcome.envelopeNote}
      </p>

      {/* 3D Opening Envelope */}
      <div
        className={`envelope-wrapper ${isOpened ? 'opened' : ''}`}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Open birthday surprise envelope"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <div className="envelope-flap" />
        <div className="envelope-left" />
        <div className="envelope-right" />
        <div className="envelope-bottom" />

        {/* Letter peaking inside */}
        <div className="envelope-letter-card">
          <Heart size={28} color="var(--color-pink-deep)" fill="var(--color-pink-baby)" style={{ marginBottom: 6 }} />
          <div className="font-display" style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            For Chitra 🌸
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
            Click to unfold surprise ✨
          </div>
        </div>

        {/* Wax Seal Button */}
        {!isOpened && (
          <button
            type="button"
            className="envelope-seal-button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            aria-label="Break wax seal to open envelope"
          >
            <Mail size={22} />
          </button>
        )}
      </div>

      {/* Open Button */}
      <div style={{ marginTop: '2rem' }}>
        {!isOpened ? (
          <button className="btn btn-primary" onClick={handleOpen} style={{ padding: '0.85rem 2rem', fontSize: '1.1rem' }}>
            <Sparkles size={18} />
            <span>{siteContent.welcome.openButtonText}</span>
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => {
              const el = document.getElementById('birthday-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Scroll Down to Cake</span>
            <ArrowDown size={16} />
          </button>
        )}
      </div>
    </section>
  );
};
