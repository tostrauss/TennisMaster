// src/components/Menu.jsx
import React from 'react';
import useGameStore from '../stores/gameStore';

function Menu() {
  const { setGamePhase } = useGameStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#28a745' }}>
      <h1 style={{ color: 'white', fontSize: '4rem', marginBottom: '2rem' }}>TennisMaster</h1>
      <button onClick={() => setGamePhase('select')} style={{ padding: '1rem 2rem', fontSize: '1.5rem', cursor: 'pointer' }}>
        Start Game
      </button>
    </div>
  );
}

export default Menu;