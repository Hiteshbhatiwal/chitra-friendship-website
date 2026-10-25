import React from 'react';
import { BookOpen, Heart } from 'lucide-react';
import { siteContent } from '../../data/content';

export const FriendshipIntro: React.FC = () => {
  return (
    <section id="intro-section" className="scrapbook-sheet" style={{ margin: '3.5rem auto', maxWidth: '780px', position: 'relative' }}>
      <div className="washi-tape washi-lavender tape-left" />
      <div className="washi-tape washi-mint tape-right" />

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div className="sticker-badge" style={{ marginBottom: '0.75rem' }}>
          <BookOpen size={14} className="sparkle-icon" />
          <span>{siteContent.friendshipIntro.badge}</span>
        </div>

        <h2 className="heading-section" style={{ display: 'block' }}>
          {siteContent.friendshipIntro.heading}
        </h2>
      </div>

      <div style={{
        backgroundColor: '#fffdfa',
        padding: '1.75rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-card)',
        boxShadow: 'var(--shadow-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative'
      }}>
        {/* Decorative corner pin */}
        <div style={{
          position: 'absolute',
          top: -10,
          right: 20,
          width: 22,
          height: 22,
          borderRadius: '50%',
          backgroundColor: 'var(--color-pink-deep)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          border: '2px solid white'
        }} />

        <p className="text-body-readable" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
          {siteContent.friendshipIntro.paragraph1}
        </p>

        <p className="text-body-readable" style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
          {siteContent.friendshipIntro.paragraph2}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 6,
          color: 'var(--color-pink-deep)',
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 600,
          marginTop: '0.5rem'
        }}>
          <Heart size={18} fill="var(--color-pink-rose)" color="var(--color-pink-rose)" />
          <span>Always your friend</span>
        </div>
      </div>
    </section>
  );
};
