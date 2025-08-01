// src/App.jsx
import React from 'react';
import useGameStore from './stores/gameStore';
import Menu from './components/Menu';
import PlayerSelect from './components/PlayerSelect';
import Game from './components/Game';

function App() {
  const { gamePhase } = useGameStore();

  const renderPhase = () => {
    switch (gamePhase) {
      case 'menu':
        return <Menu />;
      case 'select':
        return <PlayerSelect />;
      case 'playing':
        return <Game />;
      default:
        return <Menu />;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {renderPhase()}
    </div>
  );
}

export default App;