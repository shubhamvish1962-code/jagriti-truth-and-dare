import React, { useState } from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function InterestQuestion({ onNext, answers, setAnswers, mode = 'truth' }) {
  const [interestText, setInterestText] = useState(answers.interestText || '');
  const isDare = mode === 'dare';

  const handleNext = () => {
    if (!interestText.trim()) return;
    sounds.playChime();
    setAnswers((prev) => ({
      ...prev,
      interestText: interestText.trim(),
      q4Mode: mode,
    }));
    onNext();
  };

  return (
    <div className="glass-split-card" id="interest-question-card">
      <div className="card-showcase">
        <div className="avatar-halo">
          <span className="avatar-emoji">{isDare ? '🔥' : '🦋'}</span>
        </div>
        <div className="speech-bubble">
          {isDare
            ? "Jagriti! I dare you to write down your honest interest in me without sugarcoating it!"
            : "Jagriti, truth time! Do you feel any butterflies or interest in me? Write it from your heart!"}
        </div>
        <div className="character-tag">
          {isDare ? 'Dare Challenge for Jagriti' : 'Interest-o-Meter for Jagriti'}
        </div>
      </div>

      <div className="card-main">
        <div>
          <div className="question-badge" style={{ borderColor: isDare ? 'var(--accent-pink)' : 'var(--accent-purple)' }}>
            {isDare ? <Flame size={13} /> : <Sparkles size={13} />}
            Question 04 of 05 • {isDare ? 'DARE MODE 🔥' : 'TRUTH MODE 🔮'}
          </div>

          <h1 className="question-title">
            {isDare
              ? "Jagriti, I dare you to write: do you have any interest in me? 🔥"
              : "Jagriti, do you have any interest in me? 🔮"}
          </h1>

          <p className="question-subtitle">
            {isDare
              ? "No chickening out, Jagriti! Write your real feelings and thoughts in the blank below:"
              : "Be 100% honest with me, Jagriti! Write down how you truly feel in the blank below:"}
          </p>

          <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <label 
              htmlFor="interest-blank-input"
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
              Your Honest Thoughts, Jagriti:
            </label>
            <textarea
              id="interest-blank-input"
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
              placeholder="Write your honest feelings here, Jagriti..."
              value={interestText}
              onChange={(e) => setInterestText(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="card-footer-actions">
          <div className="progress-dots">
            <span className="progress-dot completed" />
            <span className="progress-dot completed" />
            <span className="progress-dot completed" />
            <span className="progress-dot active" />
            <span className="progress-dot" />
          </div>

          <button
            id="interest-next-btn"
            className="btn-glass-primary"
            onClick={handleNext}
            disabled={!interestText.trim()}
          >
            <span>{interestText.trim() ? 'Lock in Answer & Go to The Finale' : 'Write Answer Above'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
