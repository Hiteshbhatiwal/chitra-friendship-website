import React from 'react';
import { WelcomeEnvelope } from './WelcomeEnvelope';
import { BirthdayCelebration } from './BirthdayCelebration';
import { FriendshipIntro } from './FriendshipIntro';
import { PhotoGallery } from './PhotoGallery';
import { VideoGallery } from './VideoGallery';
import { FriendshipCardsSection } from './FriendshipCardsSection';
import { ApologyLetterSection } from './ApologyLetterSection';
import { FunnyMomentsSection } from './FunnyMomentsSection';
import { SurpriseGiftSection } from './SurpriseGiftSection';
import { ClosingScreenSection } from './ClosingScreenSection';
import { ScrapbookNavbar } from './ScrapbookNavbar';
import { AmbientAudioPlayer } from './AmbientAudioPlayer';
import { Heart } from 'lucide-react';
import { siteContent } from '../../data/content';

export const ScrapbookExperience: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Audio Toggle */}
      <AmbientAudioPlayer />

      {/* Main Experience Header / Navigation */}
      <ScrapbookNavbar />

      <main className="container" style={{ flex: 1, paddingBottom: '6rem' }}>
        {/* Section 1: Welcome Envelope */}
        <WelcomeEnvelope />

        {/* Section 2: Birthday Celebration & Cake */}
        <BirthdayCelebration />

        {/* Section 3: Friendship Intro ("Our Crazy Little World") */}
        <FriendshipIntro />

        {/* Section 4: Photo Gallery (Memory Lane) */}
        <PhotoGallery />

        {/* Section 5: Video Memories */}
        <VideoGallery />

        {/* Section 6: Interactive Friendship Cards ("Why You're Special") */}
        <FriendshipCardsSection />

        {/* Section 7: Heartfelt Apology Letter */}
        <ApologyLetterSection />

        {/* Section 8: Funny Moments ("Certified Pagal-Panti Department") */}
        <FunnyMomentsSection />

        {/* Section 9: 3D Surprise Gift Unboxing */}
        <SurpriseGiftSection />

        {/* Section 10: Closing Screen */}
        <ClosingScreenSection />
      </main>

      {/* Cute Scrapbook Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2.5rem 1rem 3rem 1rem',
        borderTop: '1px dashed var(--color-border-card)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginTop: 'auto'
      }}>
        <div className="washi-tape washi-pink tape-center" style={{ top: -12 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
          <Heart size={16} fill="var(--color-pink-rose)" color="var(--color-pink-rose)" />
          <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {siteContent.closing.heading}
          </span>
          <Heart size={16} fill="var(--color-pink-rose)" color="var(--color-pink-rose)" />
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: 460, margin: '0 auto' }}>
          {siteContent.closing.subheading}
        </p>

        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-soft)', marginTop: 8 }}>
          Private Memory Sanctuary for {siteContent.meta.recipientName} ✨
        </p>
      </footer>
    </div>
  );
};
