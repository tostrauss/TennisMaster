// src/components/GameUI.jsx
import React from 'react';
import { Joystick } from 'react-joystick-component';
import useGameStore from '../stores/gameStore';

function GameUI({ player1, player2, court }) {
  const { setGamePhase, score, servingPlayer } = useGameStore();

  const handleMove = (e) => {
    window.dispatchEvent(new CustomEvent('playerMove', { 
      detail: { x: e.x, y: e.y }
    }));
  };

  const handleStop = () => {
    window.dispatchEvent(new CustomEvent('playerMove', { 
      detail: { x: 0, y: 0 }
    }));
  };
  
  const handleHit = () => {
    window.dispatchEvent(new CustomEvent('playerHit'));
  };

  const formatScore = (playerScore) => {
    return playerScore === 0 ? '00' : playerScore;
  };

  const renderScore = () => {
    const p1Score = score.player1;
    const p2Score = score.player2;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '20px',
        borderRadius: '10px',
        minWidth: '250px',
        fontFamily: '"Courier New", Courier, monospace'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: servingPlayer === 'player1' ? '#ffd700' : 'white', marginRight: '10px' }}>
              {servingPlayer === 'player1' ? '●' : ''}
            </span>
            <span style={{ color: 'white' }}>{player1.name}</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', color: 'white' }}>
            <span>{p1Score.sets}</span>
            <span>{p1Score.games}</span>
            <span>{formatScore(p1Score.points)}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: servingPlayer === 'player2' ? '#ffd700' : 'white', marginRight: '10px' }}>
              {servingPlayer === 'player2' ? '●' : ''}
            </span>
            <span style={{ color: 'white' }}>{player2.name}</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', color: 'white' }}>
            <span>{p2Score.sets}</span>
            <span>{p2Score.games}</span>
            <span>{formatScore(p2Score.points)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none' 
    }}>
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0 }}>{court.name}</h2>
        <p style={{ margin: '5px 0' }}>{court.location}</p>
      </div>

      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px'
      }}>
        {renderScore()}
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '50px', 
        left: '50px', 
        pointerEvents: 'auto' 
      }}>
        <Joystick 
          size={120} 
          baseColor="rgba(255, 255, 255, 0.2)" 
          stickColor="rgba(255, 255, 255, 0.8)" 
          move={handleMove} 
          stop={handleStop}
        />
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '50px', 
        right: '50px', 
        pointerEvents: 'auto',
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: '1fr 1fr'
      }}>
        <button 
          onClick={handleHit} 
          style={{
            width: '80px', height: '80px', borderRadius: '50%',
            backgroundColor: '#4CAF50', border: 'none', color: 'white',
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
        >
          HIT
        </button>
        <button 
          onClick={() => setGamePhase('menu')} 
          style={{
            width: '80px', height: '80px', borderRadius: '50%',
            backgroundColor: '#f44336', border: 'none', color: 'white',
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
        >
          MENU
        </button>
      </div>
    </div>
  );
}

export default GameUI;