import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const gridMove = keyframes`
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 100px 100px, 100px 100px; }
`;

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #181c2b;
  overflow: hidden;
  z-index: 0;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
      repeating-linear-gradient(0deg, #00fff7 0 2px, transparent 2px 25px),
      repeating-linear-gradient(90deg, #00fff7 0 2px, transparent 2px 25px);
    opacity: 0.15;
    animation: ${gridMove} 8s linear infinite;
  }
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 3rem 3.5rem;
  background: rgba(24, 28, 43, 0.85);
  border-radius: 32px;
  border: 2px solid #00fff7;
  box-shadow: 0 0 48px 0 #00fff799, 0 0 0 8px #181c2b;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  color: #00fff7;
  text-shadow: 0 0 32px #00fff7, 0 0 8px #fff;
  letter-spacing: 0.08em;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: #fff;
  text-shadow: 0 0 8px #00fff7;
  max-width: 500px;
`;

const StartButton = styled(motion.button)`
  padding: 1.5rem 4rem;
  font-size: 2rem;
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  background: linear-gradient(90deg, #00fff7, #ff00cc 80%);
  border: none;
  border-radius: 50px;
  color: #181c2b;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-weight: bold;
  box-shadow: 0 0 32px 0 #00fff799;
  text-shadow: 0 0 12px #00fff7;
  transition: all 0.3s cubic-bezier(.4,2,.3,1);
  &:hover {
    transform: scale(1.09);
    box-shadow: 0 0 64px 0 #ff00cc99;
    color: #fff;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 18px;
  left: 0;
  width: 100vw;
  text-align: center;
  color: #00fff7;
  font-size: 1rem;
  opacity: 0.7;
  z-index: 2;
  font-family: 'JetBrains Mono', monospace;
`;

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #181c2b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const LoadingText = styled(motion.div)`
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  font-size: 2rem;
  color: #00fff7;
  text-shadow: 0 0 32px #00fff7, 0 0 8px #fff;
  margin-bottom: 2rem;
  text-align: center;
`;

const LoadingBar = styled(motion.div)`
  width: 300px;
  height: 4px;
  background: rgba(0, 255, 247, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #00fff7;
    box-shadow: 0 0 16px #00fff7;
    transform-origin: left;
  }
`;

const loadingQuotes = [
  "Filling up gas...",
  "Loading trunk...",
  "Checking tires...",
  "Warming up...",
  "Buckle up!",
  "Revving engine..."
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const handleStart = () => {
    setIsLoading(true);
    let quoteIndex = 0;
    
    const quoteInterval = setInterval(() => {
      quoteIndex = (quoteIndex + 1) % loadingQuotes.length;
      setCurrentQuote(quoteIndex);
    }, 600);

    setTimeout(() => {
      clearInterval(quoteInterval);
      navigate('/game');
    }, 5000);
  };

  return (
    <Container>
      <Content
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Reaction Speedometer
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          TEST your REFLEXES. <br />
          STOP your car FAST. <br />
          BEAT your best SCORE. <br />
          SEE your ghost REPLAY. <br />
          KNOW your reaction AGE.
        </Subtitle>
        <StartButton
          onClick={handleStart}
          whileHover={{ scale: 1.09 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          VROOOOM!
        </StartButton>
      </Content>
      <Footer>
        <p>Age data taken from justpark.com</p> 
      </Footer>

      <AnimatePresence>
        {isLoading && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingText
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {loadingQuotes[currentQuote]}
            </LoadingText>
            <LoadingBar
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </LoadingOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default LandingPage; 