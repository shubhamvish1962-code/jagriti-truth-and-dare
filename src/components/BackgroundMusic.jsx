import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    // Browser policy: start on first user interaction
    const handleFirstInteraction = () => {
      if (!hasStarted) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(() => {
          // Autoplay was prevented, user can click the button
        });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasStarted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(console.error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}bgm.mp3`}
        loop
        preload="auto"
      />
      
      {/* Floating Bottom BGM Pill */}
      <div
        id="bgm-player-pill"
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 100,
          background: 'rgba(14, 14, 28, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 105, 180, 0.4)',
          borderRadius: '9999px',
          padding: '0.45rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 77, 141, 0.25)',
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            background: isPlaying ? 'var(--accent-pink)' : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={isPlaying ? 'Pause Song' : 'Play Song'}
          aria-label="Toggle Background Music"
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>
            Finding Her 🎵
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            Kushagra, Bharath
          </span>
        </div>

        {isPlaying && (
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '14px', marginLeft: '0.2rem' }}>
            <span style={{ width: '2px', height: '100%', background: 'var(--accent-pink)', borderRadius: '2px', animation: 'bounceSoft 0.8s infinite' }} />
            <span style={{ width: '2px', height: '60%', background: 'var(--accent-rose)', borderRadius: '2px', animation: 'bounceSoft 0.6s infinite 0.2s' }} />
            <span style={{ width: '2px', height: '80%', background: 'var(--accent-purple)', borderRadius: '2px', animation: 'bounceSoft 0.7s infinite 0.4s' }} />
          </div>
        )}
      </div>
    </>
  );
}
