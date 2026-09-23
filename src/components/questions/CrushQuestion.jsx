import React, { useState } from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function CrushQuestion({ onNext, answers, setAnswers, mode = 'truth' }) {
  const [crushText, setCrushText] = useState(answers.crushTitle || '');
  const isDare = mode === 'dare';

  const handleNext = () => {
    if (!crushText.trim()) return;
    sounds.playChime();
    setAnswers((prev) => ({
      ...prev,
      crushTitle: crushText.trim(),
      q2Mode: mode,
    }));
    onNext();
  };

  return (
    <div className="glass-split-card" id="crush-question-card">
      <div className="card-showcase">
        <div className="avatar-halo">
          <span className="avatar-emoji">{isDare ? '🔥' : '🤫'}</span>
        </div>
        <div className="speech-bubble">
          {isDare
            ? "Jagriti, this dare requires total courage! Write out who your crush is or if you have one!"
            : "Jagriti, truth time! Spilling your secrets is safe here... who has been on your mind? 💖"}
        </div>
        <div className="character-tag">
          {isDare ? 'Dare Keeper for Jagriti' : 'Truth Oracle for Jagriti'}
        </div>
      </div>

      <div className="card-main">
        <div>
          <div className="question-badge" style={{ borderColor: isDare ? 'var(--accent-pink)' : 'var(--accent-purple)' }}>
            {isDare ? <Flame size={13} /> : <Sparkles size={13} />}
            Question 02 of 05 • {isDare ? 'DARE MODE 🔥' : 'TRUTH MODE 🔮'}
          </div>

          <h1 className="question-title">
            {isDare
              ? "Jagriti, I dare you to confess: do you have a crush on anyone? 🔥"
              : "Jagriti, do you have a crush on anyone? 🔮"}
          </h1>

          <p className="question-subtitle">
            {isDare
              ? "No dodging allowed! Write your answer freely in the blank below, Jagriti:"
              : "Speak from the heart, Jagriti! Write your honest thoughts in the blank below:"}
          </p>

          <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <label 
              htmlFor="crush-blank-input"
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
              Your Answer, Jagriti:
            </label>
            <textarea
              id="crush-blank-input"
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
              placeholder="Write your honest confession here, Jagriti..."
              value={crushText}
              onChange={(e) => setCrushText(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="card-footer-actions">
          <div className="progress-dots">
            <span className="progress-dot completed" />
            <span className="progress-dot active" />
            <span className="progress-dot" />
            <span className="progress-dot" />
            <span className="progress-dot" />
          </div>

          <button
            id="crush-next-btn"
            className="btn-glass-primary"
            onClick={handleNext}
            disabled={!crushText.trim()}
          >
            <span>{crushText.trim() ? 'Lock in Answer & Go to Question 3' : 'Write Answer Above'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
