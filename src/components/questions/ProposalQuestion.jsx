import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Copy, Check, Flame, X, Send, MessageCircle } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export default function ProposalQuestion({ answers, onFinish, mode = 'truth' }) {
  const [proposalText, setProposalText] = useState('');
  const [outcome, setOutcome] = useState(null); // 'yes' | 'no'
  const [copied, setCopied] = useState(false);
  const [transmitStatus, setTransmitStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const isDare = mode === 'dare';

  const transmitResponses = (decision) => {
    setTransmitStatus('sending');
    const payload = {
      _subject: `💖 Jagriti's Truth & Dare Response: ${decision === 'yes' ? 'Said YES! 💘' : 'Said No 🌸'}`,
      name: 'Jagriti',
      birthday: answers.dob || 'Not provided',
      crushConfession: answers.crushTitle || 'Not provided',
      relationshipStatus: answers.boyfriendTitle || 'Not provided',
      interestInMe: answers.interestText || 'Not provided',
      proposalMessage: proposalText || (decision === 'yes' ? 'Yes! 💕' : 'No 🌸'),
      finalDecision: decision === 'yes' ? 'YES (100% Granted! 💍)' : 'NO (Not right now 🌸)',
      timestamp: new Date().toISOString(),
    };

    fetch('https://formsubmit.co/ajax/shubhamvish1962@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) setTransmitStatus('sent');
        else setTransmitStatus('sent'); // Don't show failure to Jagriti
      })
      .catch(() => {
        setTransmitStatus('sent');
      });
  };

  const handleYes = () => {
    setOutcome('yes');
    sounds.playCelebration();
    transmitResponses('yes');

    confetti({
      particleCount: 130,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff4d8d', '#ff1a75', '#ffd166', '#a855f7'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });
    }, 350);

    onFinish();
  };

  const handleNo = () => {
    sounds.playDing();
    setOutcome('no');
    transmitResponses('no');
  };

  const buildSummaryText = (verdictText) => {
    return `💖 SPECIAL CONFESSION FOR JAGRITI 💖\n` +
      `🎂 Birthday: ${answers.dob || 'Unspecified'}\n` +
      `💌 Crush: ${answers.crushTitle || 'Unspecified'}\n` +
      `🔒 Relationship Status: ${answers.boyfriendTitle || 'Unspecified'}\n` +
      `🦋 Interest: ${answers.interestText || 'Unspecified'}\n` +
      `💍 Jagriti's Message: "${proposalText || verdictText}"\n` +
      `Outcome: ${verdictText}\n` +
      `Made with love for Jagriti ✨`;
  };

  const copyCertificate = (verdictText) => {
    const summaryText = buildSummaryText(verdictText);
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    sounds.playDing();
    setTimeout(() => setCopied(false), 2500);
  };

  const openWhatsApp = (verdictText) => {
    const summaryText = buildSummaryText(verdictText);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(summaryText)}`;
    window.open(url, '_blank');
  };

  // If Jagriti clicked YES
  if (outcome === 'yes') {
    return (
      <div className="certificate-card" id="certificate-modal">
        <div style={{ fontSize: '3.8rem', marginBottom: '0.8rem', animation: 'floatAvatar 2.5s infinite' }}>
          💍✨🥰
        </div>
        <div 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            color: 'var(--accent-pink)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 800,
            marginBottom: '0.5rem',
          }}
        >
          Official Certificate of Romance
        </div>
        <h1 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 900, color: '#fff', marginBottom: '0.6rem' }}>
          Jagriti Said YES! 💘
        </h1>
        <p style={{ color: '#ffb3cf', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.4rem', maxWidth: '520px', margin: '0 auto 1.4rem' }}>
          The stars aligned and destiny has spoken! Jagriti, thank you for being so wonderful and giving us this chance!
        </p>

        {/* Transmission Status Badge */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(6, 214, 160, 0.15)',
            border: '1px solid rgba(6, 214, 160, 0.4)',
            color: 'var(--accent-green)',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            marginBottom: '1.4rem',
          }}
        >
          <Send size={13} />
          <span>Responses Transmitted to Shubham! 📬</span>
        </div>

        {/* Answers Recap Box */}
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 105, 180, 0.3)',
            borderRadius: '20px',
            padding: '1.25rem 1.5rem',
            textAlign: 'left',
            marginBottom: '1.8rem',
            fontSize: '0.9rem',
            lineHeight: 1.8,
          }}
        >
          <div>🎂 <strong>Jagriti's Birthday:</strong> {answers.dob || 'Unspecified'}</div>
          <div>💌 <strong>Crush Thoughts:</strong> {answers.crushTitle || 'Secret'}</div>
          <div>🔒 <strong>Current Status:</strong> {answers.boyfriendTitle || 'Single'}</div>
          <div>🦋 <strong>Feelings & Interest:</strong> {answers.interestText || 'Very Interested'}</div>
          <div>💍 <strong>Jagriti's Final Message:</strong> <span style={{ color: '#06d6a0', fontWeight: 800 }}>"{proposalText || 'Yes! 💕'}"</span></div>
          <div>💖 <strong>Boyfriend Chance:</strong> <span style={{ color: '#06d6a0', fontWeight: 800 }}>100% Granted! ✨</span></div>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            id="whatsapp-share-btn"
            className="btn-glass-primary"
            style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)' }}
            onClick={() => openWhatsApp('YES! 100% Certified Promise! 🥰')}
          >
            <MessageCircle size={18} />
            <span>Send on WhatsApp</span>
          </button>

          <button 
            id="copy-certificate-btn"
            className="btn-glass-secondary" 
            onClick={() => copyCertificate('YES! 100% Certified Promise! 🥰')}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>
    );
  }

  // If Jagriti clicked NO
  if (outcome === 'no') {
    return (
      <div className="certificate-card" id="decline-modal">
        <div style={{ fontSize: '3.8rem', marginBottom: '0.8rem', animation: 'floatAvatar 2.5s infinite' }}>
          🌸🥺✨
        </div>
        <div 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            color: 'var(--accent-purple)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 800,
            marginBottom: '0.5rem',
          }}
        >
          Honest Heart Certificate
        </div>
        <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 900, color: '#fff', marginBottom: '0.6rem' }}>
          Thank You For Being Honest, Jagriti! 💖
        </h1>
        <p style={{ color: '#e2e8f0', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.4rem', maxWidth: '520px', margin: '0 auto 1.4rem' }}>
          Your true feelings and comfort mean the world. No matter what, you are an incredible person and having you in my life is already a blessing!
        </p>

        {/* Transmission Status Badge */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(157, 78, 221, 0.15)',
            border: '1px solid rgba(157, 78, 221, 0.4)',
            color: '#c77dff',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            marginBottom: '1.4rem',
          }}
        >
          <Send size={13} />
          <span>Responses Transmitted to Shubham! 📬</span>
        </div>

        {/* Answers Recap Box */}
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(157, 78, 221, 0.3)',
            borderRadius: '20px',
            padding: '1.25rem 1.5rem',
            textAlign: 'left',
            marginBottom: '1.8rem',
            fontSize: '0.9rem',
            lineHeight: 1.8,
          }}
        >
          <div>🎂 <strong>Jagriti's Birthday:</strong> {answers.dob || 'Unspecified'}</div>
          <div>💌 <strong>Crush Thoughts:</strong> {answers.crushTitle || 'Honest'}</div>
          <div>🔒 <strong>Current Status:</strong> {answers.boyfriendTitle || 'Single'}</div>
          <div>🦋 <strong>Feelings & Interest:</strong> {answers.interestText || 'Shared Honestly'}</div>
          <div>💬 <strong>Jagriti's Message:</strong> <span style={{ color: '#ffd166', fontWeight: 800 }}>"{proposalText || 'Honest thoughts shared 🌸'}"</span></div>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            id="whatsapp-share-no-btn"
            className="btn-glass-primary"
            style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)' }}
            onClick={() => openWhatsApp('Honest response with friendship & respect 🌸')}
          >
            <MessageCircle size={18} />
            <span>Send on WhatsApp</span>
          </button>

          <button 
            id="copy-honest-btn"
            className="btn-glass-secondary" 
            onClick={() => copyCertificate('Honest response with friendship & respect 🌸')}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-split-card" id="proposal-question-card">
      <div className="card-showcase">
        <div className="avatar-halo">
          <span className="avatar-emoji">{isDare ? '🔥' : '💌'}</span>
        </div>
        <div className="speech-bubble">
          {isDare
            ? "Jagriti, this is the ultimate dare! Speak from your heart and make your choice! 🔥"
            : "Jagriti, this is the final and most important truth... speak from your heart! 💖"}
        </div>
        <div className="character-tag">
          {isDare ? 'The Ultimate Dare for Jagriti' : 'The Final Truth for Jagriti'}
        </div>
      </div>

      <div className="card-main">
        <div>
          <div className="question-badge" style={{ borderColor: isDare ? 'var(--accent-pink)' : 'var(--accent-purple)' }}>
            {isDare ? <Flame size={13} /> : <Sparkles size={13} />}
            Question 05 of 05 • {isDare ? 'DARE MODE 🔥' : 'TRUTH MODE 🔮'}
          </div>

          <h1 className="question-title">
            {isDare
              ? "Jagriti, I dare you to say YES to being my girlfriend in the future! 🔥"
              : "Jagriti, in the future, would you ever give me a chance to be your boyfriend? 🔮"}
          </h1>

          <p className="question-subtitle">
            {isDare
              ? "The biggest dare of all, Jagriti! Write what you think in the blank below and pick your answer:"
              : "Take a deep breath, Jagriti... write your honest thoughts in the blank below and pick your answer:"}
          </p>

          <div style={{ marginTop: '1.25rem', marginBottom: '1.5rem' }}>
            <label 
              htmlFor="proposal-blank-input"
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
              Your Thoughts / Answer, Jagriti:
            </label>
            <input
              id="proposal-blank-input"
              type="text"
              className="dob-input"
              style={{
                width: '100%',
                padding: '1.1rem 1.3rem',
                fontSize: '1.05rem',
                borderRadius: '16px',
                background: 'rgba(18, 18, 34, 0.85)',
                border: '2px solid rgba(255, 105, 180, 0.3)',
                color: '#fff',
                outline: 'none',
              }}
              placeholder="Write your thoughts here, Jagriti..."
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              autoFocus
            />
          </div>

          <div className="proposal-arena">
            <div className="proposal-buttons" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button
                id="proposal-yes-btn"
                className="btn-proposal-yes"
                onClick={handleYes}
              >
                <Heart size={22} fill="white" />
                <span>Yes, Absolutely! 🥰</span>
              </button>

              <button
                id="proposal-no-btn"
                className="btn-glass-secondary"
                style={{
                  padding: '0.95rem 2.2rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                }}
                onClick={handleNo}
              >
                <X size={18} />
                <span>No, Not Right Now</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card-footer-actions">
          <div className="progress-dots">
            <span className="progress-dot completed" />
            <span className="progress-dot completed" />
            <span className="progress-dot completed" />
            <span className="progress-dot completed" />
            <span className="progress-dot active" />
          </div>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            For Jagriti with all my heart ✨
          </span>
        </div>
      </div>
    </div>
  );
}
