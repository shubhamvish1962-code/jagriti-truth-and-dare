import React, { useMemo } from 'react';

const EMOJIS = ['💖', '🧸', '✨', '🌸', '🎀', '💌', '🍓', '💘', '🐣', '🍭', '⭐', '🥰'];

export default function FloatingEmojis() {
  const items = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: `${(i * 5.5 + Math.random() * 5) % 95}%`,
      duration: `${14 + (i % 6) * 3}s`,
      delay: `${(i * 1.2) % 10}s`,
      size: `${1.4 + (i % 4) * 0.4}rem`,
    }));
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {items.map((item) => (
        <span
          key={item.id}
          className="floating-emoji"
          style={{
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay,
            fontSize: item.size,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
