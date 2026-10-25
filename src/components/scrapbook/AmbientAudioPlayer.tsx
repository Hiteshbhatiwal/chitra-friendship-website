import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If no audio file is present or playback fails, show friendly guide
          setIsPlaying(false);
          setShowNotice(true);
          setTimeout(() => setShowNotice(false), 4500);
        });
    }
  };

  return (
    <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 1000 }}>
      {/* Hidden audio element pointing to public media path */}
      <audio
        ref={audioRef}
        src="/media/audio/background-melody.mp3"
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />

      <button
        onClick={toggleAudio}
        className={`btn btn-pill ${isPlaying ? 'active' : ''}`}
        aria-label={isPlaying ? 'Mute ambient melody' : 'Play ambient melody'}
        style={{
          boxShadow: '0 4px 14px rgba(73, 52, 72, 0.12)',
          backgroundColor: 'white',
          border: '1.5px solid var(--color-border-card)',
          cursor: 'pointer'
        }}
      >
        {isPlaying ? (
          <>
            <Volume2 size={16} color="var(--color-pink-deep)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-pink-deep)' }}>
              Music: ON 🎵
            </span>
          </>
        ) : (
          <>
            <VolumeX size={16} color="var(--color-text-muted)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Music: OFF 🔇
            </span>
          </>
        )}
      </button>

      {/* Friendly missing audio notice */}
      {showNotice && (
        <div style={{
          position: 'absolute',
          top: '44px',
          right: '0',
          width: '240px',
          backgroundColor: 'white',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          boxShadow: 'var(--shadow-card)',
          border: '1.5px solid var(--color-pink-rose)',
          fontSize: '0.8rem',
          color: 'var(--color-text-main)',
          animation: 'fadeIn 0.25s ease-out',
          textAlign: 'left'
        }}>
          <p style={{ fontWeight: 700, color: 'var(--color-pink-deep)', marginBottom: 2 }}>
            Music track ready to be added 🎵
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
            Place your MP3 into <code>public/media/audio/background-melody.mp3</code> to hear soft background music!
          </p>
        </div>
      )}
    </div>
  );
};
