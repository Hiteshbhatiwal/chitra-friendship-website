/**
 * A Little World of Chitra 💌 - Photo and Video Manifest
 * Real photos connected directly from public/media/photos/
 */

export interface MemoryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  caption: string;
  date?: string;
  tiltDeg: number; // Subtle scrapbook tilt
  washiTapeColor?: 'pink' | 'lavender' | 'mint' | 'butter';
  washiTapePosition?: 'center' | 'left' | 'right';
}

// Helper to safely format image URL with spaces and parentheses encoded
const getPhotoUrl = (filename: string): string => {
  return `/media/photos/${encodeURIComponent(filename)}`;
};

export const photoMemories: MemoryItem[] = [
  {
    id: "photo-1",
    type: "image",
    src: getPhotoUrl("WhatsApp Image 2026-10-25 at 5.05.08 PM.jpeg"),
    title: "School Days 🌸",
    caption: "A golden memory from our school days 💖",
    date: "School Memories",
    tiltDeg: -2,
    washiTapeColor: "pink",
    washiTapePosition: "center"
  },
  {
    id: "photo-2",
    type: "image",
    src: getPhotoUrl("WhatsApp Image 2026-10-25 at 5.05.09 PM.jpeg"),
    title: "Classroom Laughter ✨",
    caption: "The smiles that made every boring lecture bearable 😄",
    date: "Classroom Chronicles",
    tiltDeg: 3,
    washiTapeColor: "lavender",
    washiTapePosition: "left"
  },
  {
    id: "photo-3",
    type: "image",
    src: getPhotoUrl("WhatsApp Image 2026-10-25 at 5.05.09 PM (1).jpeg"),
    title: "Lunch Break Squad 🍱",
    caption: "Unfiltered joy and pure friendship 💖",
    date: "Corridor Times",
    tiltDeg: -1.5,
    washiTapeColor: "butter",
    washiTapePosition: "right"
  },
  {
    id: "photo-4",
    type: "image",
    src: getPhotoUrl("WhatsApp Image 2026-10-25 at 5.05.10 PM.jpeg"),
    title: "Event & Fest Fun 🎉",
    caption: "Dressed up, taking silly selfies, and having a blast!",
    date: "School Events",
    tiltDeg: 2.5,
    washiTapeColor: "mint",
    washiTapePosition: "center"
  },
  {
    id: "photo-5",
    type: "image",
    src: getPhotoUrl("WhatsApp Image 2026-10-25 at 5.05.10 PM (1).jpeg"),
    title: "Candid Vibes 📸",
    caption: "Caught mid-laugh — the best kind of picture! 🌷",
    date: "Pure Candids",
    tiltDeg: -3,
    washiTapeColor: "pink",
    washiTapePosition: "left"
  },
  {
    id: "photo-6",
    type: "image",
    src: getPhotoUrl("WhatsApp Image 2026-10-25 at 5.05.11 PM.jpeg"),
    title: "Study Sessions (Barely!) 📚",
    caption: "More gossiping than studying, as always 😜",
    date: "Library & Study",
    tiltDeg: 1.5,
    washiTapeColor: "lavender",
    washiTapePosition: "right"
  },
  {
    id: "photo-7",
    type: "image",
    src: getPhotoUrl("WhatsApp Image 2026-10-25 at 5.05.11 PM (1).jpeg"),
    title: "Golden Hour Glow ✨",
    caption: "A picture-perfect moment frozen in time 🌅",
    date: "Sunny Days",
    tiltDeg: -2,
    washiTapeColor: "butter",
    washiTapePosition: "center"
  },
  {
    id: "photo-8",
    type: "image",
    src: getPhotoUrl("WhatsApp Image 2026-10-25 at 5.05.11 PM (2).jpeg"),
    title: "Forever Friends 💗",
    caption: "Friends who turned school into home. Grateful for you!",
    date: "Best Memories",
    tiltDeg: 2,
    washiTapeColor: "mint",
    washiTapePosition: "center"
  }
];

export const videoMemories: MemoryItem[] = [
  {
    id: "video-1",
    type: "video",
    src: "/api/media/video-1.mp4",
    title: "School Memories Clip 🎬",
    caption: "A special moment capturing laughter, chatter, and school friendship.",
    date: "School Video Reel",
    tiltDeg: 0,
    washiTapeColor: "lavender",
    washiTapePosition: "center"
  }
];

export const initialPhotoMemories = photoMemories;
export const initialVideoMemories = videoMemories;
