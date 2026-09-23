import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FloatingEmojis from './components/FloatingEmojis';
import BackgroundMusic from './components/BackgroundMusic';
import TruthOrDarePicker from './components/TruthOrDarePicker';
import DobQuestion from './components/questions/DobQuestion';
import WheelGame from './components/games/WheelGame';
import CrushQuestion from './components/questions/CrushQuestion';
import BoyfriendQuestion from './components/questions/BoyfriendQuestion';
import HeartCatcherGame from './components/games/HeartCatcherGame';
import InterestQuestion from './components/questions/InterestQuestion';
import ProposalQuestion from './components/questions/ProposalQuestion';

export default function App() {
  const [currentStage, setStage] = useState('choose-q1');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Modes for each question ('truth' or 'dare')
  const [qModes, setQModes] = useState({
    q1: 'truth',
    q2: 'truth',
    q3: 'truth',
    q4: 'truth',
    q5: 'truth',
  });

  const [answers, setAnswers] = useState({
    dob: '',
    crushTitle: '',
    boyfriendTitle: '',
    interestText: '',
  });

  const handleSelectMode = (qKey, mode) => {
    setQModes((prev) => ({ ...prev, [qKey]: mode }));
    setStage(qKey);
  };

  return (
    <div className="app-container">
      {/* Ambient background glows */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Floating drifting cute emojis */}
      <FloatingEmojis />

      {/* Background Music: Finding Her by Kushagra, Bharath */}
      <BackgroundMusic />

      {/* Top Liquid Glass Pill Navbar */}
      <Navbar
        currentStage={currentStage}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* ROUND 1: TRUTH OR DARE PICKER -> Q1 */}
        {currentStage === 'choose-q1' && (
          <TruthOrDarePicker
            roundNumber={1}
            questionTitle="Date of Birth"
            onSelectMode={(mode) => handleSelectMode('q1', mode)}
          />
        )}
        {currentStage === 'q1' && (
          <DobQuestion
            answers={answers}
            setAnswers={setAnswers}
            mode={qModes.q1}
            onNext={() => setStage('game1')}
          />
        )}

        {/* MINI GAME 1: DARE WHEEL */}
        {currentStage === 'game1' && (
          <WheelGame
            onNext={() => setStage('choose-q2')}
          />
        )}

        {/* ROUND 2: TRUTH OR DARE PICKER -> Q2 */}
        {currentStage === 'choose-q2' && (
          <TruthOrDarePicker
            roundNumber={2}
            questionTitle="Do You Have a Crush?"
            onSelectMode={(mode) => handleSelectMode('q2', mode)}
          />
        )}
        {currentStage === 'q2' && (
          <CrushQuestion
            answers={answers}
            setAnswers={setAnswers}
            mode={qModes.q2}
            onNext={() => setStage('choose-q3')}
          />
        )}

        {/* ROUND 3: TRUTH OR DARE PICKER -> Q3 */}
        {currentStage === 'choose-q3' && (
          <TruthOrDarePicker
            roundNumber={3}
            questionTitle="Do You Have a Boyfriend?"
            onSelectMode={(mode) => handleSelectMode('q3', mode)}
          />
        )}
        {currentStage === 'q3' && (
          <BoyfriendQuestion
            answers={answers}
            setAnswers={setAnswers}
            mode={qModes.q3}
            onNext={() => setStage('game2')}
          />
        )}

        {/* MINI GAME 2: HEART CATCHER ARCADE */}
        {currentStage === 'game2' && (
          <HeartCatcherGame
            onNext={() => setStage('choose-q4')}
          />
        )}

        {/* ROUND 4: TRUTH OR DARE PICKER -> Q4 */}
        {currentStage === 'choose-q4' && (
          <TruthOrDarePicker
            roundNumber={4}
            questionTitle="Do You Have Any Interest In Me?"
            onSelectMode={(mode) => handleSelectMode('q4', mode)}
          />
        )}
        {currentStage === 'q4' && (
          <InterestQuestion
            answers={answers}
            setAnswers={setAnswers}
            mode={qModes.q4}
            onNext={() => setStage('choose-q5')}
          />
        )}

        {/* ROUND 5: TRUTH OR DARE PICKER -> Q5 */}
        {currentStage === 'choose-q5' && (
          <TruthOrDarePicker
            roundNumber={5}
            questionTitle="Give Me a Chance in the Future?"
            onSelectMode={(mode) => handleSelectMode('q5', mode)}
          />
        )}
        {currentStage === 'q5' && (
          <ProposalQuestion
            answers={answers}
            mode={qModes.q5}
            onFinish={() => {}}
          />
        )}
      </main>
    </div>
  );
}
