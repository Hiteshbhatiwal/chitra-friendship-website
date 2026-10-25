import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import type { MemoryItem } from '../../data/memories';

interface LightboxModalProps {
  memories: MemoryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  memories,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const [imageError, setImageError] = useState(false);

  const activeMemory = currentIndex !== null ? memories[currentIndex] : null;

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setImageError(false);
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < memories.length - 1) {
        setImageError(false);
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, memories.length, onClose, onNavigate]);

  if (currentIndex === null || !activeMemory) return null;

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view: ${activeMemory.title}`}
    >
      <div
        className="lightbox-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Washi tape at top */}
        <div className="washi-tape washi-pink tape-center" style={{ top: -12 }} />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="btn-icon"
          aria-label="Close photo preview"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Image / Fallback Container */}
        <div className="lightbox-image-wrap">
          {!imageError ? (
            <img
              src={activeMemory.src}
              alt={activeMemory.title}
              onError={() => setImageError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          ) : (
            <div className="polaroid-placeholder" style={{ padding: '2rem' }}>
              <Camera size={36} color="var(--color-pink-deep)" />
              <div style={{ fontFamily: 'var(--font-playful)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-text-main)' }}>
                {activeMemory.title}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Protected private photo placeholder. Once added to private_media/, the real image will appear here! 🌸
              </p>
            </div>
          )}
        </div>

        {/* Caption and Details */}
        <div style={{ marginTop: '1rem', textAlign: 'center', width: '100%' }}>
          <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {activeMemory.caption}
          </div>
          {activeMemory.date && (
            <div style={{ fontFamily: 'var(--font-playful)', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
              ✨ {activeMemory.date}
            </div>
          )}
        </div>

        {/* Next / Previous Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '1.25rem',
          paddingTop: '0.75rem',
          borderTop: '1px dashed var(--color-border-delicate)'
        }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              if (currentIndex > 0) {
                setImageError(false);
                onNavigate(currentIndex - 1);
              }
            }}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.4 : 1, padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            {currentIndex + 1} of {memories.length}
          </span>

          <button
            className="btn btn-secondary"
            onClick={() => {
              if (currentIndex < memories.length - 1) {
                setImageError(false);
                onNavigate(currentIndex + 1);
              }
            }}
            disabled={currentIndex === memories.length - 1}
            style={{ opacity: currentIndex === memories.length - 1 ? 0.4 : 1, padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
