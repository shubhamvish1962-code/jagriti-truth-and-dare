import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gamepad2, ArrowRight, Play, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

const GAME_DURATION = 25; // seconds

export default function HeartCatcherGame({ onNext }) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [highScore, setHighScore] = useState(0);

  const gameState = useRef({
    basketX: 180,
    basketWidth: 70,
    items: [],
    lastSpawn: 0,
    keys: { left: false, right: false },
  });

  const startGame = () => {
    sounds.playWhoosh();
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    setIsPlaying(true);
    gameState.current.items = [];
    gameState.current.basketX = 180;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') gameState.current.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') gameState.current.keys.right = true;
    };
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') gameState.current.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') gameState.current.keys.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    gameState.current.basketX = Math.max(
      gameState.current.basketWidth / 2,
      Math.min(canvas.width - gameState.current.basketWidth / 2, x)
    );
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setGameOver(true);
          sounds.playCelebration();
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    let animationId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (gameState.current.keys.left) {
        gameState.current.basketX = Math.max(
          gameState.current.basketWidth / 2,
          gameState.current.basketX - 6
        );
      }
      if (gameState.current.keys.right) {
        gameState.current.basketX = Math.min(
          canvas.width - gameState.current.basketWidth / 2,
          gameState.current.basketX + 6
        );
      }

      if (timestamp - gameState.current.lastSpawn > 450) {
        gameState.current.lastSpawn = timestamp;
        const types = [
          { emoji: '💖', pts: 10, speed: 2.8, size: 24 },
          { emoji: '⭐', pts: 25, speed: 3.5, size: 26 },
          { emoji: '💌', pts: 50, speed: 4.2, size: 28 },
          { emoji: '💔', pts: -15, speed: 3.2, size: 24 },
        ];
        const rand = Math.random();
        let selectedType = types[0];
        if (rand > 0.85) selectedType = types[2];
        else if (rand > 0.65) selectedType = types[1];
        else if (rand > 0.5) selectedType = types[3];

        gameState.current.items.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          ...selectedType,
        });
      }

      const basketY = canvas.height - 35;
      const bLeft = gameState.current.basketX - gameState.current.basketWidth / 2;
      const bRight = gameState.current.basketX + gameState.current.basketWidth / 2;

      for (let i = gameState.current.items.length - 1; i >= 0; i--) {
        const item = gameState.current.items[i];
        item.y += item.speed;

        if (item.y >= basketY - 15 && item.y <= basketY + 25 && item.x >= bLeft && item.x <= bRight) {
          if (item.pts > 0) {
            sounds.playPop();
          } else {
            sounds.playDing();
          }
          setScore((s) => {
            const next = Math.max(0, s + item.pts);
            setHighScore((h) => Math.max(h, next));
            return next;
          });
          gameState.current.items.splice(i, 1);
          continue;
        }

        if (item.y > canvas.height + 30) {
          gameState.current.items.splice(i, 1);
          continue;
        }

        ctx.font = `${item.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.emoji, item.x, item.y);
      }

      const bx = gameState.current.basketX;
      ctx.save();
      ctx.shadowColor = 'rgba(255, 77, 141, 0.7)';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ffffff';

      ctx.beginPath();
      ctx.roundRect(bx - 35, basketY - 10, 70, 24, 12);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(bx - 16, basketY - 14, 16, 0, Math.PI * 2);
      ctx.arc(bx + 16, basketY - 14, 16, 0, Math.PI * 2);
      ctx.arc(bx, basketY - 18, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('☁️', bx, basketY);

      ctx.restore();

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);

  return (
    <div className="glass-split-card" id="arcade-game-card">
      <div className="card-showcase">
        <div className="avatar-halo">
          <span className="avatar-emoji">🎮</span>
        </div>
        <div className="speech-bubble">
          "Jagriti! Catch flying hearts and love letters with your cloud basket!"
        </div>
        <div className="character-tag">Heart Arcade for Jagriti</div>
      </div>

      <div className="card-main">
        <div>
          <div className="question-badge">
            <Gamepad2 size={13} />
            Mini Game 02 • Jagriti's Heart Catcher
          </div>
          <h1 className="question-title">Catch the Falling Hearts, Jagriti!</h1>
          <p className="question-subtitle">
            Move your cloud with mouse/finger/keys. Catch 💖 (+10), ⭐ (+25), 💌 (+50), and avoid 💔!
          </p>

          <div className="arcade-container">
            <div className="arcade-stats">
              <div>Score: <span style={{ color: 'var(--accent-pink)' }}>{score}</span> pts</div>
              <div>Time: <span style={{ color: timeLeft <= 5 ? '#ff4d4d' : 'var(--accent-yellow)' }}>{timeLeft}s</span></div>
              <div>Best: <span style={{ color: 'var(--accent-green)' }}>{highScore}</span></div>
            </div>

            <div style={{ position: 'relative' }}>
              <canvas
                ref={canvasRef}
                width={400}
                height={280}
                className="arcade-canvas"
                onPointerMove={isPlaying ? handlePointerMove : undefined}
              />

              {!isPlaying && !gameOver && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10, 10, 20, 0.75)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>
                    Ready to show your reflexes, Jagriti? ✨
                  </p>
                  <button 
                    id="start-arcade-btn"
                    className="btn-glass-primary" 
                    onClick={startGame}
                  >
                    <Play size={18} />
                    <span>Start Heart Catcher</span>
                  </button>
                </div>
              )}

              {gameOver && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10, 10, 20, 0.85)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    animation: 'zoomIn 0.3s ease',
                  }}
                >
                  <span style={{ fontSize: '3rem' }}>🏆</span>
                  <h2 style={{ fontSize: '1.4rem', color: '#fff' }}>Awesome Job, Jagriti!</h2>
                  <p style={{ color: 'var(--accent-pink)', fontSize: '1.1rem', fontWeight: 700 }}>
                    Final Score: {score} Points!
                  </p>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <button className="btn-glass-secondary" onClick={startGame}>
                      <RotateCcw size={16} />
                      <span>Play Again</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card-footer-actions" style={{ justifyContent: 'flex-end' }}>
          <button
            id="proceed-from-arcade-btn"
            className="btn-glass-primary"
            onClick={() => { sounds.playChime(); onNext(); }}
          >
            <span>Proceed to Question 4, Jagriti</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
