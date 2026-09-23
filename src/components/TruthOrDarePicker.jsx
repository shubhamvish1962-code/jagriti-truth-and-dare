import React from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function TruthOrDarePicker({ roundNumber, questionTitle, onSelectMode }) {
  return (
    <div className="glass-split-card" id={`tod-picker-round-${roundNumber}`}>
      <div className="card-showcase">
        <div className="avatar-halo">
          <span className="avatar-emoji">🎭</span>
        </div>
        <div className="speech-bubble">
          "Jagriti! Round {roundNumber} is here! Truth or Dare, what do you pick?"
        </div>
        <div className="character-tag">Fate Arbiter for Jagriti</div>
      </div>

      <div className="card-main" style={{ textAlign: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '520px' }}>
          <div className="question-badge" style={{ margin: '0 auto 1rem' }}>
            <Sparkles size={13} />
            Round 0{roundNumber} • Jagriti's Choice
          </div>

          <h1 className="question-title" style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>
            Truth or Dare, Jagriti?
          </h1>

          <p className="question-subtitle" style={{ marginBottom: '2.2rem' }}>
            Pick your path for this question. No backing out, Jagriti! Both paths are crafted just for you...
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* TRUTH CARD */}
            <button
              id="choose-truth-btn"
              type="button"
              className="option-card"
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem 1.4rem',
                border: '2px solid rgba(157, 78, 221, 0.4)',
                background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.12), rgba(14, 14, 28, 0.6))',
                cursor: 'pointer',
              }}
              onClick={() => {
                sounds.playDing();
                onSelectMode('truth');
              }}
            >
              <span style={{ fontSize: '3.5rem', marginBottom: '0.6rem', display: 'inline-block', animation: 'floatAvatar 2.5s infinite' }}>
                🔮
              </span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#c77dff', marginBottom: '0.35rem' }}>
                TRUTH
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Reveal your true honest thoughts without holding back, Jagriti!
              </div>
              <span
                style={{
                  marginTop: '1rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'rgba(157, 78, 221, 0.4)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                }}
              >
                Choose Truth 🔮
              </span>
            </button>

            {/* DARE CARD */}
            <button
              id="choose-dare-btn"
              type="button"
              className="option-card"
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem 1.4rem',
                border: '2px solid rgba(255, 77, 141, 0.4)',
                background: 'linear-gradient(135deg, rgba(255, 77, 141, 0.12), rgba(14, 14, 28, 0.6))',
                cursor: 'pointer',
              }}
              onClick={() => {
                sounds.playWhoosh();
                onSelectMode('dare');
              }}
            >
              <span style={{ fontSize: '3.5rem', marginBottom: '0.6rem', display: 'inline-block', animation: 'floatAvatar 2.5s infinite' }}>
                🔥
              </span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#ff75a0', marginBottom: '0.35rem' }}>
                DARE
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Be bold, fearless & take on the cheeky challenge, Jagriti!
              </div>
              <span
                style={{
                  marginTop: '1rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'rgba(255, 77, 141, 0.4)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                }}
              >
                Choose Dare 🔥
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
