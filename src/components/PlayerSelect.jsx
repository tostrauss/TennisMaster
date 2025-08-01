// src/components/PlayerSelect.jsx
import React from 'react';
import useGameStore from '../stores/gameStore';
import { players } from '../data/players';

function PlayerSelect() {
  const { setGamePhase, setPlayer1, setPlayer2 } = useGameStore();

  const handlePlayerSelect = (player) => {
    setPlayer1(player);
    // For now, let's assign a default opponent
    setPlayer2(players.find(p => p.id !== player.id));
    setGamePhase('playing');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#007bff' }}>
      <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '2rem' }}>Select Your Player</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {players.map((player) => (
          <div key={player.id} onClick={() => handlePlayerSelect(player)} style={{ padding: '2rem', border: '2px solid white', borderRadius: '10px', color: 'white', cursor: 'pointer' }}>
            <h2>{player.name}</h2>
            <p>Speed: {player.speed}</p>
            <p>Power: {player.power}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerSelect;