import React, { useState } from 'react';
import { Video, Sparkles } from 'lucide-react';
import { videoMemories } from '../../data/memories';

export const VideoGallery: React.FC = () => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentVideo = videoMemories[0];

  return (
    <section id="video-section" style={{ margin: '4rem auto', maxWidth: '820px', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="sticker-badge" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} className="sparkle-icon" />
          <span>Live Memories 🎬</span>
        </div>

        <h2 className="heading-section" style={{ display: 'block', marginBottom: '0.5rem' }}>
          School Video Memories 📹
        </h2>

        <p className="heading-sub" style={{ maxWidth: 540, margin: '0 auto' }}>
          Moving snapshots and live laughter keeping the school spirit alive.
        </p>
      </div>

      <div className="video-card-frame">
        <div className="washi-tape washi-lavender tape-center" style={{ top: -12 }} />

        <div className="video-container">
          {!videoError ? (
            <video
              src={currentVideo.src}
              controls
              preload="metadata"
              playsInline
              onWaiting={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
              onError={() => setVideoError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            >
              Your browser does not support HTML5 video playback.
            </video>
          ) : (
            /* Graceful Placeholder for Missing/Pending Video */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              color: 'var(--color-pink-baby)',
              gap: '12px',
              backgroundColor: '#352535'
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Video size={30} color="var(--color-pink-baby)" />
              </div>

              <div className="font-playful" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'white' }}>
                {currentVideo.title}
              </div>

              <p style={{ maxWidth: 440, fontSize: '0.85rem', color: '#e0d5df', lineHeight: 1.5 }}>
                Protected video memory placeholder. When ready, place your video into <code>private_media/video-1.mp4</code> and it will play here through the authenticated route!
              </p>

              <span className="sticker-badge" style={{ backgroundColor: '#473247', color: '#ffb8d1', borderColor: '#e889ac' }}>
                Ready for your video file 🎥
              </span>
            </div>
          )}

          {isLoading && !videoError && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.9rem'
            }}>
              Loading video buffer... ⏳
            </div>
          )}
        </div>

        {/* Video Caption */}
        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {currentVideo.caption}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
            🔒 Private stream • Audio only plays when you tap play
          </div>
        </div>
      </div>
    </section>
  );
};
