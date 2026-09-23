import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, ArrowRight, RotateCw } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const SEGMENTS = [
  { label: 'Sing 10s Love Song 🎤', type: 'DARE', color: '#ff4d8d', text: '#fff' },
  { label: 'First Impression of Me? 🫣', type: 'TRUTH', color: '#9d4edd', text: '#fff' },
  { label: 'Do Your Cutest Pout 🥺', type: 'DARE', color: '#ff75a0', text: '#fff' },
  { label: 'Ever Blushed Over Me? 🙈', type: 'TRUTH', color: '#6a0dad', text: '#fff' },
  { label: 'Send Unfiltered Selfie 📸', type: 'DARE', color: '#ff2a70', text: '#fff' },
  { label: 'Favorite Thing About Me? 💕', type: 'TRUTH', color: '#c77dff', text: '#fff' },
  { label: 'Give Me a Cute Nickname 🧸', type: 'DARE', color: '#f72585', text: '#fff' },
  { label: 'Rate My Vibe 1-100 💘', type: 'TRUTH', color: '#7209b7', text: '#fff' },
];

export default function WheelGame({ onNext }) {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const drawWheel = (angleOffset = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const numSegs = SEGMENTS.length;
    const arc = (2 * Math.PI) / numSegs;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = centerX - 12;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    SEGMENTS.forEach((seg, i) => {
      const angle = angleOffset + i * arc;
      ctx.beginPath();
      ctx.fillStyle = seg.color;
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + arc);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = seg.text;
      ctx.font = 'bold 12px "Outfit", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      ctx.fillText(seg.label, radius - 20, 4);
      ctx.restore();
    });

    // Center jewel
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f0f1e';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 77, 141, 0.8)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', centerX, centerY);
  };

  useEffect(() => {
    drawWheel(0);
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedSegment(null);
    sounds.playWhoosh();

    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const randomStopIndex = Math.floor(Math.random() * SEGMENTS.length);
    const numSegs = SEGMENTS.length;
    const arc = (2 * Math.PI) / numSegs;

    const targetAngle = (3 * Math.PI) / 2 - (randomStopIndex + 0.5) * arc;
    const totalRotation = extraSpins * 2 * Math.PI + targetAngle;

    const startTime = performance.now();
    const duration = 4000;
    let lastTickAngle = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentAngle = ease * totalRotation;

      drawWheel(currentAngle);

      if (Math.floor(currentAngle / arc) > Math.floor(lastTickAngle / arc)) {
        sounds.playWheelTick();
      }
      lastTickAngle = currentAngle;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const winner = SEGMENTS[randomStopIndex];
        setSelectedSegment(winner);
        sounds.playCelebration();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff4d8d', '#a855f7', '#ffd166', '#ffffff'],
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="glass-split-card" id="wheel-game-card">
      <div className="card-showcase">
        <div className="avatar-halo">
          <span className="avatar-emoji">🎡</span>
        </div>
        <div className="speech-bubble">
          "Jagriti! Spin the wheel to unlock your special dare or spicy truth!"
        </div>
        <div className="character-tag">Wheel of Destiny for Jagriti</div>
      </div>

      <div className="card-main">
        <div>
          <div className="question-badge">
            <Trophy size={13} />
            Mini Game 01 • Jagriti's Dare Wheel
          </div>
          <h1 className="question-title">Spin The Wheel of Dares, Jagriti!</h1>
          <p className="question-subtitle">
            Dare to spin, Jagriti? Fulfill whichever cute dare or truth the wheel picks for you!
          </p>

          <div className="wheel-container">
            <div className="wheel-stage">
              <div className="wheel-pointer" />
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                className="wheel-canvas"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                id="spin-wheel-btn"
                className="btn-glass-primary"
                onClick={spinWheel}
                disabled={isSpinning}
              >
                <RotateCw size={18} className={isSpinning ? 'spin-anim' : ''} />
                <span>{isSpinning ? 'Spinning for Jagriti...' : 'Spin The Wheel! 🎯'}</span>
              </button>
            </div>
          </div>

          {selectedSegment && (
            <div 
              style={{
                marginTop: '1.5rem',
                background: 'linear-gradient(135deg, rgba(255, 77, 141, 0.2), rgba(157, 78, 221, 0.2))',
                border: '1px solid var(--accent-pink)',
                borderRadius: '18px',
                padding: '1.25rem',
                textAlign: 'center',
                animation: 'fadeIn 0.4s ease'
              }}
            >
              <span 
                style={{
                  display: 'inline-block',
                  background: selectedSegment.type === 'DARE' ? 'var(--accent-pink)' : 'var(--accent-purple)',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  marginBottom: '0.5rem'
                }}
              >
                {selectedSegment.type}
              </span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
                {selectedSegment.label}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#ffb3cf' }}>
                "Jagriti, complete your challenge before proceeding!" 🙈
              </p>
            </div>
          )}
        </div>

        <div className="card-footer-actions" style={{ justifyContent: 'flex-end' }}>
          <button 
            id="proceed-from-wheel-btn"
            className="btn-glass-primary"
            onClick={() => { sounds.playChime(); onNext(); }}
          >
            <span>Proceed to Question 2, Jagriti</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
