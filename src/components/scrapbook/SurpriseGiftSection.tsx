import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, RotateCcw } from 'lucide-react';
import { siteContent } from '../../data/content';

export const SurpriseGiftSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { giftBox } = siteContent;

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#F8C8DC', '#FFF2B2', '#DCCBFF', '#E889AC', '#C8E6C9']
      });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <section id="gift-section" style={{ margin: '4.5rem auto', maxWidth: '780px', padding: '0 1rem', textAlign: 'center' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="sticker-badge" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} className="sparkle-icon" />
          <span>A Secret Keepsake 🎁</span>
        </div>

        <h2 className="heading-section" style={{ display: 'block', marginBottom: '0.5rem' }}>
          {giftBox.heading}
        </h2>

        <p className="heading-sub" style={{ maxWidth: 540, margin: '0 auto' }}>
          {giftBox.subheading}
        </p>
      </div>

      {/* 3D Interactive Gift Box */}
      <div className="gift-scene">
        <div
          className={`gift-box-3d ${isOpen ? 'opened' : ''}`}
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Gift box opened. Click to close' : 'Gift box closed. Click to unbox your surprise'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          {/* 3D Lid */}
          <div className="gift-lid">
            <div className="gift-lid-ribbon" />
            <div className="gift-bow">🎀</div>
          </div>

          {/* Box Base */}
          <div className="gift-body">
            <div className="gift-body-ribbon-v" />
            <div className="gift-body-ribbon-h" />
          </div>

          {/* Revealed Secret Card */}
          <div className="gift-revealed-card">
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', backgroundColor: 'var(--color-pink-soft)', marginBottom: 8 }}>
              <Heart size={22} color="var(--color-pink-deep)" fill="var(--color-pink-rose)" />
            </div>

            <div className="font-display" style={{ fontSize: '1.55rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 6 }}>
              Special Surprise 🌸
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: 1.5, margin: 0 }}>
              {giftBox.openedMessage}
            </p>

            <div style={{ marginTop: 10, fontSize: '0.8rem', color: 'var(--color-pink-deep)', fontWeight: 700 }}>
              ✨ Happy Birthday Chitra! ✨
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ marginTop: '2rem' }}>
        {!isOpen ? (
          <button className="btn btn-primary" onClick={handleToggle}>
            <Gift size={18} />
            <span>{giftBox.promptText}</span>
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
            <RotateCcw size={16} />
            <span>Close Box / Open Again 🎀</span>
          </button>
        )}
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
        {!isOpen ? 'Click the gift box or button to pull the ribbon!' : 'You can open and close the box anytime.'}
      </p>
    </section>
  );
};
