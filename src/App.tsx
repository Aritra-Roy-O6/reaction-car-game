import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import { createGlobalStyle } from 'styled-components';
import '@fontsource/orbitron';
import '@fontsource/jetbrains-mono';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'JetBrains Mono', monospace;
    background: #0a0a0a;
    color: #ffffff;
    overflow-x: hidden;
  }

  h1, h2, h3 {
    font-family: 'Orbitron', sans-serif;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
