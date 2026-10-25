import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, RotateCcw, Heart } from 'lucide-react';
import { siteContent } from '../../data/content';

export const BirthdayCelebration: React.FC = () => {
  // Individual candle state for 3 candles
  const [candles, setCandles] = useState([true, true, true]);
  const [allExtinguished, setAllExtinguished] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F8C8DC', '#DCCBFF', '#FFF2B2', '#E889AC', '#C8E6C9']
    });
  };

  const handleBlowAll = () => {
    setCandles([false, false, false]);
    setAllExtinguished(true);
    fireConfetti();
  };

  const handleToggleCandle = (index: number) => {
    const updated = [...candles];
    updated[index] = !updated[index];
    setCandles(updated);

    const isDone = updated.every((c) => !c);
    if (isDone && !allExtinguished) {
      setAllExtinguished(true);
      fireConfetti();
    } else if (!isDone) {
      setAllExtinguished(false);
    }
  };

  const handleRelight = () => {
    setCandles([true, true, true]);
    setAllExtinguished(false);
  };

  return (
    <section id="birthday-section" className="scrapbook-sheet" style={{ margin: '3rem auto', textAlign: 'center', maxWidth: '780px' }}>
      <div className="washi-tape washi-butter tape-center" />

      {/* Top Badge */}
      <div className="sticker-badge" style={{ marginBottom: '0.85rem' }}>
        <Sparkles size={14} className="sparkle-icon" />
        <span>Birthday Spotlight 🎂</span>
      </div>

      <h2 className="heading-section" style={{ display: 'block', marginBottom: '0.5rem' }}>
        {siteContent.birthday.heading}
      </h2>

      <p className="text-body-readable" style={{ maxWidth: 560, margin: '0 auto 2rem auto', color: 'var(--color-text-muted)' }}>
        {siteContent.birthday.subheading}
      </p>

      {/* Animated Layered Cake */}
      <div className="cake-wrapper" style={{ margin: '1.5rem auto' }} aria-label="Interactive birthday cake with candles">
        {/* 3 Candles Row */}
        <div style={{ display: 'flex', gap: '22px', alignItems: 'flex-end', marginBottom: 2 }}>
          {candles.map((isLit, i) => (
            <div
              key={i}
              onClick={() => handleToggleCandle(i)}
              role="button"
              tabIndex={0}
              aria-label={`Candle ${i + 1}: ${isLit ? 'Lit (tap to blow out)' : 'Extinguished (tap to relight)'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleCandle(i);
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div className={`candle-flame ${!isLit ? 'extinguished' : ''}`} />
              <div style={{
                width: 10,
                height: 28,
                background: i === 1 
                  ? 'repeating-linear-gradient(45deg, #F8C8DC, #F8C8DC 4px, #ffffff 4px, #ffffff 8px)'
                  : 'repeating-linear-gradient(-45deg, #DCCBFF, #DCCBFF 4px, #ffffff 4px, #ffffff 8px)',
                borderRadius: '3px 3px 0 0',
                boxShadow: '0 2px 4px rgba(73, 52, 72, 0.1)'
              }} />
            </div>
          ))}
        </div>

        {/* Top Cake Tier */}
        <div style={{
          width: 150,
          height: 48,
          backgroundColor: '#FFF2B2',
          borderRadius: '14px 14px 0 0',
          border: '2px solid #F3DDE5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(73, 52, 72, 0.05)',
          position: 'relative'
        }}>
          <span style={{ fontSize: '1.25rem' }}>🍓 🌸 🍓</span>
        </div>

        {/* Bottom Cake Tier */}
        <div style={{
          width: 210,
          height: 58,
          backgroundColor: '#F8C8DC',
          borderRadius: '0 0 18px 18px',
          border: '2px solid #F3DDE5',
          borderTop: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 18px rgba(73, 52, 72, 0.09)'
        }}>
          <span className="font-display" style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            Happy Birthday Chitra! 💖
          </span>
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
        Tip: You can tap each candle to blow it out individually! 🕯️
      </div>

      {/* Action Controls */}
      <div>
        {!allExtinguished ? (
          <button className="btn btn-primary" onClick={handleBlowAll}>
            <Flame size={18} />
            <span>{siteContent.birthday.makeWishButton}</span>
          </button>
        ) : (
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div className="sticker-badge" style={{ fontSize: '1.1rem', padding: '0.6rem 1.4rem', borderStyle: 'solid', borderColor: 'var(--color-pink-rose)' }}>
              <Heart size={16} fill="var(--color-pink-rose)" color="var(--color-pink-rose)" />
              <span>{siteContent.birthday.wishMadeText}</span>
            </div>

            <button className="btn btn-secondary" onClick={handleRelight} style={{ fontSize: '0.9rem' }}>
              <RotateCcw size={16} />
              <span>Relight Candles / Celebrate Again 🎂</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
