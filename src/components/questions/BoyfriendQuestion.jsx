import React, { useState } from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function BoyfriendQuestion({ onNext, answers, setAnswers, mode = 'truth' }) {
  const [statusText, setStatusText] = useState(answers.boyfriendTitle || '');
  const isDare = mode === 'dare';

  const handleNext = () => {
    if (!statusText.trim()) return;
    sounds.playChime();
    setAnswers((prev) => ({
      ...prev,
      boyfriendTitle: statusText.trim(),
      q3Mode: mode,
    }));
    onNext();
  };

  return (
    <div className="glass-split-card" id="boyfriend-question-card">
      <div className="card-showcase">
        <div className="avatar-halo">
          <span className="avatar-emoji">{isDare ? '🔥' : '🔒'}</span>
        </div>
        <div className="speech-bubble">
          {isDare
            ? "Jagriti, I dare you to state your relationship status right here in writing!"
            : "Jagriti, truth time! Are you single, taken, or is there a special someone? Write it out honestly!"}
        </div>
        <div className="character-tag">
          {isDare ? 'Dare Challenge for Jagriti' : 'Love Lie Detector for Jagriti'}
        </div>
      </div>

      <div className="card-main">
        <div>
          <div className="question-badge" style={{ borderColor: isDare ? 'var(--accent-pink)' : 'var(--accent-purple)' }}>
            {isDare ? <Flame size={13} /> : <Sparkles size={13} />}
            Question 03 of 05 • {isDare ? 'DARE MODE 🔥' : 'TRUTH MODE 🔮'}
          </div>

          <h1 className="question-title">
            {isDare
              ? "Jagriti, I dare you to state: do you have a boyfriend? 🔥"
              : "Jagriti, do you have a boyfriend? 🔮"}
          </h1>

          <p className="question-subtitle">
            {isDare
              ? "I dare you to tell me the real deal: are you off the market or is there a golden opening? Write it below, Jagriti:"
              : "State your actual status honestly, Jagriti! Write your answer in the blank below:"}
          </p>

          <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <label 
              htmlFor="boyfriend-blank-input"
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '0.6rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Your Relationship Status, Jagriti:
            </label>
            <textarea
              id="boyfriend-blank-input"
              className="dob-input"
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1.1rem 1.3rem',
                fontSize: '1.05rem',
                lineHeight: 1.6,
                borderRadius: '16px',
                background: 'rgba(18, 18, 34, 0.85)',
                border: '2px solid rgba(255, 105, 180, 0.3)',
                color: '#fff',
                outline: 'none',
                resize: 'none',
              }}
              placeholder="Write your answer here, Jagriti (e.g. single, taken, waiting for someone...)..."
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="card-footer-actions">
          <div className="progress-dots">
            <span className="progress-dot completed" />
            <span className="progress-dot completed" />
            <span className="progress-dot active" />
            <span className="progress-dot" />
            <span className="progress-dot" />
          </div>

          <button
            id="boyfriend-next-btn"
            className="btn-glass-primary"
            onClick={handleNext}
            disabled={!statusText.trim()}
          >
            <span>{statusText.trim() ? 'Lock in Answer & Play Heart Catcher 🎮' : 'Write Answer Above'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
