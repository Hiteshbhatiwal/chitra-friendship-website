import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { photoMemories, type MemoryItem } from '../../data/memories';
import { PolaroidPreview } from '../design-system/PolaroidPreview';
import { LightboxModal } from './LightboxModal';

export const PhotoGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  return (
    <section id="memories-section" style={{ margin: '4rem auto', maxWidth: '1080px', padding: '0 1rem' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="sticker-badge" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} className="sparkle-icon" />
          <span>Chapter Two 📸</span>
        </div>

        <h2 className="heading-section" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Memory Lane 🌸
        </h2>

        <p className="heading-sub" style={{ maxWidth: 560, margin: '0 auto' }}>
          A scrapbook collection of polaroids, school hallways, smiles, and golden moments.
        </p>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 8 }}>
          Tap any polaroid to enlarge and read memories in full screen ✨
        </p>
      </div>

      {/* Polaroid Grid Layout */}
      <div className="grid-polaroid">
        {photoMemories.map((memory: MemoryItem, index: number) => (
          <PolaroidPreview
            key={memory.id}
            memory={memory}
            onClick={() => setSelectedPhotoIndex(index)}
          />
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      <LightboxModal
        memories={photoMemories}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(newIndex) => setSelectedPhotoIndex(newIndex)}
      />
    </section>
  );
};
