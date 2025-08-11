// src/App.jsx
import React from 'react';
import useGameStore from './stores/gameStore';
import Menu from './components/Menu';
import PlayerSelect from './components/PlayerSelect';
import Game from './components/Game';
import Tournament from './components/Tournament'; // Assuming you might have a tournament mode

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
      case 'tournament':
        return <Tournament />;
      default:
        return <Menu />;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      {renderPhase()}
    </div>
  );
}

export default App;