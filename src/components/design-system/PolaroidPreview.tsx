import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import type { MemoryItem } from '../../data/memories';

interface PolaroidPreviewProps {
  memory: MemoryItem;
  onClick?: () => void;
}

export const PolaroidPreview: React.FC<PolaroidPreviewProps> = ({ memory, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const tapeColorClass = {
    pink: 'washi-pink',
    lavender: 'washi-lavender',
    mint: 'washi-mint',
    butter: 'washi-butter'
  }[memory.washiTapeColor || 'pink'];

  const tapePosClass = {
    center: 'tape-center',
    left: 'tape-left',
    right: 'tape-right'
  }[memory.washiTapePosition || 'center'];

  return (
    <div
      className="polaroid"
      style={{
        transform: `rotate(${memory.tiltDeg}deg)`,
        margin: '0 auto',
        maxWidth: '300px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${memory.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Decorative Washi Tape */}
      <div className={`washi-tape ${tapeColorClass} ${tapePosClass}`} aria-hidden="true" />

      {/* Photo Container */}
      <div className="polaroid-media-container">
        {!imageError ? (
          <img
            src={memory.src}
            alt={memory.title}
            onError={() => setImageError(true)}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              display: 'block'
            }}
          />
        ) : (
          /* Graceful Scrapbook Placeholder when image is not yet copied */
          <div className="polaroid-placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #fde8f0 0%, #f4efff 100%)' }}>
            <div style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-subtle)',
              marginBottom: 4
            }}>
              <Camera size={26} color="var(--color-pink-deep)" />
            </div>
            <span style={{ fontFamily: 'var(--font-playful)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-main)' }}>
              {memory.title}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Drop into /media/photos/
            </span>
          </div>
        )}
      </div>

      {/* Caption & Date */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
        <div className="polaroid-caption" style={{ marginTop: 0 }}>
          {memory.caption}
        </div>
        {memory.date && (
          <div style={{
            textAlign: 'center',
            fontFamily: 'var(--font-playful)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            marginTop: 4
          }}>
            ✨ {memory.date}
          </div>
        )}
      </div>
    </div>
  );
};
