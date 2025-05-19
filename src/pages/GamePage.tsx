import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- Retro Animations ---
const roadMoveUp = keyframes`
  0% { background-position-y: 0; }
  100% { background-position-y: -600px; }
`;
const signAppear = keyframes`
  0% { opacity: 0; transform: scale(0.7); }
  100% { opacity: 1; transform: scale(1); }
`;

// --- Styled Components ---
const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  background: #181c2b;
  overflow: hidden;
  z-index: 0;
`;
const Road = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
  & > .road-center {
    width: 100vw;
    height: 100vh;
    background:
      repeating-linear-gradient(0deg, #444 0 8px, transparent 8px 48px),
      linear-gradient(90deg, #23272f 0 20%, #333 20% 80%, #23272f 80% 100%);
    background-size: 100% 48px, 100% 100%;
    background-repeat: repeat-y, no-repeat;
    animation: ${roadMoveUp} 2s linear infinite;
    opacity: 0.6;
    margin: 0 auto;
  }
`;
const CenterStack = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;
const BottomCenter = styled.div`
  margin-top: 32px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`;
const Car = styled(motion.img)`
  margin-top: 0;
  width: 340px;
  height: auto;
  filter: drop-shadow(0 8px 32px #00fff799);
`;
const Dashboard = styled.div`
  position: fixed;
  bottom: 2.5vh;
  right: 2vw;
  width: 340px;
  background: rgba(24, 28, 43, 0.97);
  border-radius: 24px;
  border: 2px solid #00fff7;
  box-shadow: 0 0 32px #00fff799;
  padding: 1.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
`;
const Speedo = styled.div`
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  font-size: 2.2rem;
  color: #00fff7;
  text-shadow: 0 0 16px #00fff7, 0 0 8px #fff;
  margin-bottom: 0.5rem;
`;
const Label = styled.div`
  font-family: 'JetBrains Mono', monospace;
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;
const Best = styled.div`
  color: #ff00cc;
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;
const Recent = styled.div`
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const RecentItem = styled.div`
  background: #222;
  color: #00fff7;
  border-radius: 8px;
  padding: 0.2rem 0.7rem;
  font-size: 1rem;
  min-width: 48px;
  text-align: center;
`;
const ResetButton = styled.button`
  margin-top: 0.7rem;
  background: linear-gradient(90deg, #ff00cc, #00fff7 80%);
  color: #181c2b;
  border: none;
  border-radius: 20px;
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  box-shadow: 0 0 16px #ff00cc99;
  transition: 0.2s;
  &:hover { color: #fff; background: #ff00cc; }
`;
const StopSign = styled(motion.div)`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${signAppear} 0.5s ease;
`;
const StopImg = styled.img`
  width: 140px;
  height: 140px;
  display: block;
`;
const Message = styled(motion.div)`
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  color: #fff;
  text-shadow: 0 0 24px #ff00cc, 0 0 8px #00fff7;
  background: rgba(24, 28, 43, 0.85);
  border-radius: 18px;
  padding: 0.7rem 1.2rem;
  z-index: 20;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(24, 28, 43, 0.92);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  background: #181c2b;
  border: 2px solid #00fff7;
  border-radius: 24px;
  box-shadow: 0 0 48px #00fff799;
  padding: 2.5rem 3rem;
  text-align: center;
  color: #fff;
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  min-width: 340px;
`;
const ModalTitle = styled.div`
  font-size: 2.2rem;
  color: #00fff7;
  margin-bottom: 1.2rem;
`;
const ModalStat = styled.div`
  font-size: 1.3rem;
  margin: 0.7rem 0;
`;
const ModalAge = styled.div`
  font-size: 1.5rem;
  color: #ff00cc;
  margin: 1.2rem 0 0.7rem 0;
`;
const ModalButton = styled.button`
  margin-top: 1.5rem;
  background: linear-gradient(90deg, #00fff7, #ff00cc 80%);
  color: #181c2b;
  border: none;
  border-radius: 20px;
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.7rem 2.2rem;
  cursor: pointer;
  box-shadow: 0 0 16px #00fff799;
  transition: 0.2s;
  &:hover { color: #fff; background: #00fff7; }
`;
const MusicButton = styled.button`
  position: fixed;
  top: 2.5vh;
  right: 2vw;
  background: rgba(24, 28, 43, 0.97);
  border: 2px solid #00fff7;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 16px #00fff799;
  transition: 0.2s;
  z-index: 3;

  &:hover {
    background: #00fff7;
    color: #181c2b;
  }

  svg {
    width: 32px;
    height: 32px;
    fill: currentColor;
  }
`;
const TREE_COUNT = 3;
const TREE_WIDTH = 150;
const TREE_HEIGHT = 350;
const TREE_ANIMATION_DURATION = 3; // seconds, matches roadMoveUp

const TreesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 2;
`;
const TreeImg = styled.img<{ left: string }>`
  position: absolute;
  width: ${TREE_WIDTH}px;
  height: ${TREE_HEIGHT}px;
  left: ${props => props.left};
  filter: drop-shadow(0 4px 16px #0008);
  user-select: none;
`;

// --- Age Mapping ---
function getReactionAge(avg: number) {
  if (avg <= 50) return 'CAT!';
  if (avg <= 120) return 'Can dodge a bullet';
  if (avg <= 250) return 'Max Verstappen?';
  if (avg <= 350) return '18-24 years';
  if (avg <= 430) return '25-34 years';
  if (avg <= 530) return '35-44 years';
  if (avg <= 620) return '45-54 years';
  if (avg <= 750) return '55-64 years';
  if (avg <= 900) return '64-75 years';
  if (avg <= 1200) return '75 years+';
  return 'Bruh.';
}

// --- Main Component ---
const ATTEMPTS = 10;
const RECENT_COUNT = 5;

const GamePage = () => {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'clicked' | 'tooSoon'>('waiting');
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [showStop, setShowStop] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.play().catch(error => {
      console.log('Audio autoplay failed:', error);
      setIsMusicPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle music toggle
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // Load best time from localStorage on mount
  useEffect(() => {
    const savedBestTime = localStorage.getItem('bestTime');
    if (savedBestTime && !isNaN(Number(savedBestTime))) {
      setBestTime(parseFloat(savedBestTime));
    }
  }, []);

  // Start a new round
  const startNewRound = () => {
    setGameState('waiting');
    setShowStop(false);
    setReactionTime(null);
    const delay = Math.random() * 3000 + 2000;
    timeoutRef.current = window.setTimeout(() => {
      setGameState('ready');
      setShowStop(true);
      setStartTime(Date.now());
    }, delay);
  };

  useEffect(() => {
    startNewRound();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  // Handle click or key
  useEffect(() => {
    const onKey = () => {
      if (['waiting', 'ready'].includes(gameState)) handleClick();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState]);

  const handleClick = () => {
    if (gameState === 'waiting') {
      setGameState('tooSoon');
      setShowStop(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setTimeout(() => startNewRound(), 1200);
      return;
    }
    if (gameState === 'ready') {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setGameState('clicked');
      setShowStop(false);
      setAttempts(a => a + 1);
      setHistory(prev => [time, ...prev].slice(0, ATTEMPTS));
      setBestTime(prev => {
        if (prev === null || time < prev) {
          localStorage.setItem('bestTime', time.toString());
          return time;
        }
        return prev;
      });
      setTimeout(() => {
        if (attempts + 1 >= ATTEMPTS) {
          setShowModal(true);
        } else {
          startNewRound();
        }
      }, 1800);
    }
  };

  // Reset all
  const handleReset = () => {
    localStorage.removeItem('bestTime');
    setBestTime(null);
    setHistory([]);
    setAttempts(0);
    setShowModal(false);
    startNewRound();
  };

  // Stats for modal
  const top5 = history.slice(0, RECENT_COUNT);
  const avg = top5.length ? Math.round(top5.reduce((a, b) => a + b, 0) / top5.length) : 0;
  const age = getReactionAge(avg);

  return (
    <Container onClick={handleClick}>
      <MusicButton onClick={toggleMusic} title={isMusicPlaying ? 'Mute Music' : 'Unmute Music'}>
        {isMusicPlaying ? (
          <svg viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        )}
      </MusicButton>
      <Road><div className="road-center" /></Road>
      <TreesContainer>
        {[...Array(TREE_COUNT)].map((_, i) => (
          <TreeImg
            key={`left-${i}`}
            src="/tree.png"
            left="calc(28vw - 80px)"
            style={{
              top: `calc(${(i / TREE_COUNT) * 100}% - ${TREE_HEIGHT / 2}px)`,
              animation: `treeMove ${TREE_ANIMATION_DURATION}s linear infinite`,
              animationDelay: `${(i / TREE_COUNT) * TREE_ANIMATION_DURATION}s`,
            }}
            alt="Tree"
          />
        ))}
        {[...Array(TREE_COUNT)].map((_, i) => (
          <TreeImg
            key={`right-${i}`}
            src="/tree.png"
            left="calc(62vw + 20px)"
            style={{
              top: `calc(${(i / TREE_COUNT) * 100}% - ${TREE_HEIGHT / 2}px)`,
              animation: `treeMove ${TREE_ANIMATION_DURATION}s linear infinite`,
              animationDelay: `${(i / TREE_COUNT) * TREE_ANIMATION_DURATION}s`,
            }}
            alt="Tree"
          />
        ))}
      </TreesContainer>
      <CenterStack>
        <Car src="/car.png" alt="Retro Car" initial={{ y: 40 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 80 }} />
        {showStop && (
          <StopSign initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <StopImg src="/stop.png" alt="Stop Sign" />
          </StopSign>
        )}
        {!showStop && (
          <BottomCenter>
            <AnimatePresence>
              {gameState === 'waiting' && (
                <Message
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  Get ready to stop the car...
                </Message>
              )}
              {gameState === 'tooSoon' && (
                <Message
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  Too soon!<br />Try again
                </Message>
              )}
              {gameState === 'clicked' && reactionTime !== null && (
                <Message
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  {reactionTime}ms
                </Message>
              )}
            </AnimatePresence>
          </BottomCenter>
        )}
      </CenterStack>
      <Dashboard>
        <Speedo>
          {gameState === 'clicked' && reactionTime !== null
            ? `${reactionTime}ms`
            : gameState === 'tooSoon'
            ? 'Too Soon!'
            : '---'}
        </Speedo>
        <Label>Reaction Time</Label>
        <Best>Best: {bestTime !== null ? `${bestTime}ms` : '---'}</Best>
        <Label>Recent:</Label>
        <Recent>
          {history.slice(0, RECENT_COUNT).map((t, i) => (
            <RecentItem key={i}>{t}ms</RecentItem>
          ))}
        </Recent>
        <ResetButton onClick={e => { e.stopPropagation(); handleReset(); }}>Reset</ResetButton>
      </Dashboard>
      {showModal && (
        <Overlay>
          <Modal>
            <ModalTitle>Stats</ModalTitle>
            <ModalStat>Best Time: <b>{Math.min(...history)}ms</b></ModalStat>
            <ModalStat>Average (Top 5): <b>{avg}ms</b></ModalStat>
            <ModalAge>Your reaction age: <b>{age}</b></ModalAge>
            <ModalButton onClick={handleReset}>Play Again</ModalButton>
            <ModalButton style={{marginLeft: 16}} onClick={() => { setShowModal(false); startNewRound(); }}>Close</ModalButton>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

// Add global keyframes for treeMove
const style = document.createElement('style');
style.innerHTML = `
@keyframes treeMove {
  0% { top: 100vh; }
  100% { top: -${TREE_HEIGHT}px; }
}`;
document.head.appendChild(style);

export default GamePage; 