// srfunction PlayerSelect() {
  const { setGamePhase, setPlayer1, setPlayer2, resetGame } = useGameStore();
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);
  const [error, setError] = useState(null);

  const validatePlayer = (player) => {
    if (!player || !player.id || !player.attributes) {
      throw new Error('Invalid player data');
    }
    return true;
  };

  const handlePlayerSelect = (player) => {
    try {
      setError(null);
      if (!player) return;
      
      validatePlayer(player);
      
      if (!selectedPlayer1) {
        setSelectedPlayer1(player);
      } else {
        // Don't allow selecting the same player twice
        if (player.id === selectedPlayer1.id) {
          setError("Can't select the same player twice!");
          return;
        }
        
        // Ensure both players are properly set before changing game phase
        validatePlayer(selectedPlayer1);
        validatePlayer(player);
        
        setPlayer1(selectedPlayer1);
        setPlayer2(player);
        resetGame(); // Reset the game state before starting
        
        // Small delay to ensure store is updated
        setTimeout(() => setGamePhase('playing'), 100);
      }
    } catch (error) {
      console.error('Error selecting players:', error);
      setError(error.message);
      setSelectedPlayer1(null);
    }
  };ponents/PlayerSelect.jsx
import React, { useState } from 'react';
import useGameStore from '../stores/gameStore';
import { topPlayers } from '../data/players';

function PlayerSelect() {
  const { setGamePhase, setPlayer1, setPlayer2 } = useGameStore();
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);

  const handlePlayerSelect = (player) => {
    if (!player) return;
    
    if (!selectedPlayer1) {
      setSelectedPlayer1(player);
    } else {
      // Don't allow selecting the same player twice
      if (player.id === selectedPlayer1.id) {
        return;
      }
      
      // Ensure both players are properly set before changing game phase
      try {
        setPlayer1(selectedPlayer1);
        setPlayer2(player);
        // Small delay to ensure store is updated
        setTimeout(() => setGamePhase('playing'), 100);
      } catch (error) {
        console.error('Error selecting players:', error);
        setSelectedPlayer1(null);
      }
    }
  };

  const renderAttributeBar = (value) => (
    <div style={{ 
      width: '100px', 
      height: '10px', 
      backgroundColor: '#ddd',
      borderRadius: '5px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${value}%`,
        height: '100%',
        backgroundColor: `hsl(${value}, 70%, 50%)`,
        transition: 'width 0.3s ease'
      }} />
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%', 
      background: 'linear-gradient(135deg, #1a4774, #0066cc)' 
    }}>
      <h1 style={{ 
        color: 'white', 
        fontSize: '3rem', 
        marginBottom: '1rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        {!selectedPlayer1 ? 'Select Player 1' : 'Select Player 2'}
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        padding: '2rem',
        maxWidth: '1200px',
        width: '100%'
      }}>
        {topPlayers.map((player) => (
          <div 
            key={player.id} 
            onClick={() => handlePlayerSelect(player)}
            style={{ 
              padding: '1.5rem',
              backgroundColor: selectedPlayer1 === player ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: selectedPlayer1 === player ? 'scale(1.05)' : 'scale(1)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h2 style={{ marginBottom: '1rem' }}>{player.name}</h2>
            <p style={{ color: '#ccc', marginBottom: '0.5rem' }}>{player.country}</p>
            
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {Object.entries(player.attributes).map(([attr, value]) => (
                <div key={attr} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ textTransform: 'capitalize', marginRight: '1rem' }}>{attr}</span>
                  {renderAttributeBar(value)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedPlayer1 && (
        <button 
          onClick={() => setSelectedPlayer1(null)}
          style={{
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>
      )}
    </div>
  );
}

export default PlayerSelect;