import React, { useState } from 'react';
import { ArrowRight, Sparkles, Flame } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function DobQuestion({ onNext, answers, setAnswers, mode = 'truth' }) {
  const [dobText, setDobText] = useState(answers.dob || '');
  const isDare = mode === 'dare';

  const handleNext = () => {
    if (!dobText.trim()) return;
    sounds.playChime();
    setAnswers((prev) => ({
      ...prev,
      dob: dobText.trim(),
      q1Mode: mode,
    }));
    onNext();
  };

  return (
    <div className="glass-split-card" id="question-1-card">
      <div className="card-showcase">
        <div className="avatar-halo">
          <span className="avatar-emoji">{isDare ? '🔥' : '🔮'}</span>
        </div>
        <div className="speech-bubble">
          {isDare
            ? "Jagriti! Dare accepted! Write out your real birthdate below so I can calculate our cosmic chemistry! 💍"
            : "Jagriti, you chose Truth! Write down the exact date you were born—no hiding! ✨"}
        </div>
        <div className="character-tag">
          {isDare ? 'Dare Challenge for Jagriti' : 'Truth Keeper for Jagriti'}
        </div>
      </div>

      <div className="card-main">
        <div>
          <div className="question-badge" style={{ borderColor: isDare ? 'var(--accent-pink)' : 'var(--accent-purple)' }}>
            {isDare ? <Flame size={13} /> : <Sparkles size={13} />}
            Question 01 of 05 • {isDare ? 'DARE MODE 🔥' : 'TRUTH MODE 🔮'}
          </div>

          <h1 className="question-title">
            {isDare
              ? "Jagriti, I dare you to write your date of birth! 🔥"
              : "Jagriti, what’s your date of birth? 🔮"}
          </h1>

          <p className="question-subtitle">
            {isDare
              ? "This dare requires total honesty! Write your birthdate in the blank below:"
              : "Tell the honest truth, Jagriti! Write your date of birth in the blank below:"}
          </p>

          <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <label 
              htmlFor="dob-blank-input"
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
              Your Date of Birth:
            </label>
            <input
              id="dob-blank-input"
              type="text"
              className="dob-input"
              style={{
                width: '100%',
                padding: '1.1rem 1.3rem',
                fontSize: '1.1rem',
                borderRadius: '16px',
                background: 'rgba(18, 18, 34, 0.85)',
                border: '2px solid rgba(255, 105, 180, 0.3)',
                color: '#fff',
                outline: 'none',
              }}
              placeholder="Write your date of birth here, Jagriti..."
              value={dobText}
              onChange={(e) => setDobText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && dobText.trim()) handleNext();
              }}
              autoFocus
            />
          </div>
        </div>

        <div className="card-footer-actions">
          <div className="progress-dots">
            <span className="progress-dot active" />
            <span className="progress-dot" />
            <span className="progress-dot" />
            <span className="progress-dot" />
            <span className="progress-dot" />
          </div>

          <button
            id="dob-submit-btn"
            className="btn-glass-primary"
            onClick={handleNext}
            disabled={!dobText.trim()}
          >
            <span>{dobText.trim() ? 'Lock in Answer & Play Dare Wheel 🎡' : 'Write Answer Above'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
