import React, { useState, useEffect } from 'react';

export const ScrapbookNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('welcome-section');

  useEffect(() => {
    const sectionIds = [
      'welcome-section',
      'birthday-section',
      'intro-section',
      'memories-section',
      'video-section',
      'cards-section',
      'apology-section',
      'funny-section',
      'gift-section',
      'closing-section'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="scrapbook-nav" aria-label="Scrapbook section navigation">
      <div className="scrapbook-nav-inner">
        <button
          onClick={() => scrollTo('welcome-section')}
          className={`scrapbook-nav-link ${activeSection === 'welcome-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          💌 Welcome
        </button>

        <button
          onClick={() => scrollTo('birthday-section')}
          className={`scrapbook-nav-link ${activeSection === 'birthday-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          🎂 Birthday
        </button>

        <button
          onClick={() => scrollTo('intro-section')}
          className={`scrapbook-nav-link ${activeSection === 'intro-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          🌸 Intro
        </button>

        <button
          onClick={() => scrollTo('memories-section')}
          className={`scrapbook-nav-link ${activeSection === 'memories-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          📸 Photos
        </button>

        <button
          onClick={() => scrollTo('video-section')}
          className={`scrapbook-nav-link ${activeSection === 'video-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          🎬 Videos
        </button>

        <button
          onClick={() => scrollTo('cards-section')}
          className={`scrapbook-nav-link ${activeSection === 'cards-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          🌷 Why You're Special
        </button>

        <button
          onClick={() => scrollTo('apology-section')}
          className={`scrapbook-nav-link ${activeSection === 'apology-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          💌 Apology Letter
        </button>

        <button
          onClick={() => scrollTo('funny-section')}
          className={`scrapbook-nav-link ${activeSection === 'funny-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          🤡 Pagal-Panti
        </button>

        <button
          onClick={() => scrollTo('gift-section')}
          className={`scrapbook-nav-link ${activeSection === 'gift-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          🎁 Surprise Gift
        </button>

        <button
          onClick={() => scrollTo('closing-section')}
          className={`scrapbook-nav-link ${activeSection === 'closing-section' ? 'active' : ''}`}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          💖 Closing
        </button>
      </div>
    </nav>
  );
};
