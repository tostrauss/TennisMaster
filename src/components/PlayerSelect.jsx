// src/components/PlayerSelect.jsx
import React, { useState, useEffect } from 'react';
import useGameStore from '../stores/gameStore';
import { topPlayers } from '../data/players';

const REQUIRED_ATTRIBUTES = ['speed', 'power', 'accuracy', 'spin', 'stamina', 'volley'];

function PlayerSelect() {
  const { setGamePhase, setPlayer1, setPlayer2, resetGame } = useGameStore();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const validatePlayer = (player) => {
    if (!player || typeof player !== 'object') {
      throw new Error('Invalid player data');
    }

    for (const attr of REQUIRED_ATTRIBUTES) {
      const value = player.attributes[attr];
      if (typeof value !== 'number' || value < 0 || value > 100) {
        throw new Error(`Invalid ${attr} value for ${player.name}`);
      }
    }

    return true;
  };

  const handlePlayerSelect = (player) => {
    try {
      if (isTransitioning) return;
      setError(null);
      validatePlayer(player);
      setSelectedPlayer(player);
    } catch (error) {
      console.error('Player selection error:', error);
      setError(error.message);
    }
  };

  const handleStartGame = async () => {
    if (!selectedPlayer) {
      setError("Please select a player to start the game.");
      return;
    }
    setIsTransitioning(true);
    try {
      setPlayer1(selectedPlayer);
      // Assign a random opponent
      const opponent = topPlayers.find(p => p.id !== selectedPlayer.id);
      setPlayer2(opponent);
      await resetGame();
      setTimeout(() => {
        setGamePhase('playing');
      }, 100);
    } catch (error) {
      console.error('Error initializing game:', error);
      setError('Failed to start game. Please try again.');
    } finally {
      setIsTransitioning(false);
    }
  };

  useEffect(() => {
    resetGame();
    setPlayer1(null);
    setPlayer2(null);
  }, []);

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
      {error && (
        <div style={{
          position: 'fixed',
          top: '20px',
          padding: '1rem',
          backgroundColor: '#ff4444',
          color: 'white',
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {error}
        </div>
      )}

      <h1 style={{
        color: 'white',
        fontSize: '3rem',
        marginBottom: '1rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        {isTransitioning ? 'Starting Game...' : 'Select Your Player'}
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        padding: '2rem',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '70vh',
        overflowY: 'auto',
        opacity: isTransitioning ? 0.7 : 1,
        pointerEvents: isTransitioning ? 'none' : 'auto'
      }}>
        {topPlayers.map((player) => (
          <div
            key={player.id}
            onClick={() => handlePlayerSelect(player)}
            style={{
              padding: '1.5rem',
              backgroundColor: selectedPlayer?.id === player.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: 'white',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              transform: selectedPlayer?.id === player.id ? 'scale(1.05)' : 'scale(1)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h2 style={{ marginBottom: '1rem' }}>{player.name}</h2>
            <p style={{ color: '#ccc', marginBottom: '0.5rem' }}>{player.country}</p>

            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {REQUIRED_ATTRIBUTES.map((attr) => (
                <div key={attr} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ textTransform: 'capitalize', marginRight: '1rem' }}>{attr}</span>
                  {renderAttributeBar(player.attributes[attr])}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        <button
          onClick={handleStartGame}
          disabled={isTransitioning || !selectedPlayer}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.5rem',
            cursor: 'pointer',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          Start Game
        </button>
        <button
          onClick={() => setGamePhase('menu')}
          disabled={isTransitioning}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.5rem',
            cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
}

export default PlayerSelect;