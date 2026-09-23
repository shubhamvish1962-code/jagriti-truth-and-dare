import React from 'react';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Navbar({ currentStage, audioEnabled, setAudioEnabled }) {
  const toggleSound = () => {
    const newState = sounds.toggle();
    setAudioEnabled(newState);
    if (newState) {
      sounds.playDing();
    }
  };

  const getStageLabel = () => {
    switch (currentStage) {
      case 'choose-q1': return { text: 'Round 1: Truth or Dare, Jagriti?', icon: '🎭' };
      case 'q1': return { text: 'Question 1 of 5', icon: '🎂' };
      case 'game1': return { text: 'Mini Game 1: Dare Wheel', icon: '🎡' };
      case 'choose-q2': return { text: 'Round 2: Truth or Dare, Jagriti?', icon: '🎭' };
      case 'q2': return { text: 'Question 2 of 5', icon: '💌' };
      case 'choose-q3': return { text: 'Round 3: Truth or Dare, Jagriti?', icon: '🎭' };
      case 'q3': return { text: 'Question 3 of 5', icon: '🔒' };
      case 'game2': return { text: 'Mini Game 2: Heart Catcher', icon: '🎮' };
      case 'choose-q4': return { text: 'Round 4: Truth or Dare, Jagriti?', icon: '🎭' };
      case 'q4': return { text: 'Question 4 of 5', icon: '🦋' };
      case 'choose-q5': return { text: 'The Final Round, Jagriti!', icon: '💍' };
      case 'q5': return { text: 'The Grand Finale', icon: '💖' };
      default: return { text: 'Truth & Dare for Jagriti', icon: '✨' };
    }
  };

  const stageInfo = getStageLabel();

  return (
    <header className="liquid-nav" role="banner">
      <div className="brand-badge" style={{ cursor: 'default' }}>
        <span className="brand-icon">💖</span>
        <span>For <span style={{ color: 'var(--accent-pink)', fontWeight: 800 }}>Jagriti</span></span>
      </div>

      <div className="nav-actions">
        <div className="stage-pill">
          <span>{stageInfo.icon}</span>
          <span>{stageInfo.text}</span>
        </div>

        <button 
          className="nav-icon-btn" 
          onClick={toggleSound}
          title={audioEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          aria-label="Toggle Sound"
        >
          {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </header>
  );
}
