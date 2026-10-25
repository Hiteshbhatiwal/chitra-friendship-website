import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { siteContent } from '../../data/content';

export const FriendshipCardsSection: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="cards-section" style={{ margin: '4rem auto', maxWidth: '920px', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="sticker-badge" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} className="sparkle-icon" />
          <span>Little Notes of Appreciation 🌷</span>
        </div>

        <h2 className="heading-section" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Why You're Special 💖
        </h2>

        <p className="heading-sub" style={{ maxWidth: 540, margin: '0 auto' }}>
          Tap each friendship card to reveal a little message of gratitude.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem'
      }}>
        {siteContent.friendshipCards.map((card) => {
          const isOpened = activeCardId === card.id;

          return (
            <div
              key={card.id}
              className={`friendship-card ${isOpened ? 'opened' : ''}`}
              onClick={() => toggleCard(card.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpened}
              aria-label={`${card.title}: ${card.tagline}. ${isOpened ? 'Opened' : 'Click to read message'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCard(card.id);
                }
              }}
              style={{
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1.75rem 1.25rem'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                {card.icon}
              </div>

              <div className="font-display" style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {card.title}
              </div>

              <div className="font-playful" style={{ fontSize: '1rem', color: 'var(--color-pink-deep)', marginBottom: '0.75rem' }}>
                {card.tagline}
              </div>

              {isOpened ? (
                <div style={{
                  marginTop: '0.5rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px dashed var(--color-pink-rose)',
                  fontSize: '0.95rem',
                  lineHeight: 1.55,
                  color: 'var(--color-text-main)',
                  animation: 'fadeIn 0.3s ease-out'
                }}>
                  {card.secretMessage}
                </div>
              ) : (
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <Heart size={12} color="var(--color-pink-rose)" />
                  <span>Tap to reveal note ✨</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
