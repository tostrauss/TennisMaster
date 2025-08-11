// src/components/GameUI.jsx
import React from 'react';
import { Joystick } from 'react-joystick-component';
import useGameStore from '../stores/gameStore';
import Score from './Score'; // Import the Score component

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
  
  const handleHit = (shotType) => {
    window.dispatchEvent(new CustomEvent('playerHit', { detail: { type: shotType }}));
  };

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      color: 'white'
    }}>
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        textAlign: 'center',
        textShadow: '1px 1px 2px black'
      }}>
        <h2 style={{ margin: 0 }}>{court.name}</h2>
        <p style={{ margin: '5px 0' }}>{court.location}</p>
      </div>

      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Score 
          player1Name={player1.name}
          player2Name={player2.name}
          score={score}
          servingPlayer={servingPlayer}
        />
      </div>

      <div style={{ position: 'absolute', bottom: '50px', left: '50px', pointerEvents: 'auto' }}>
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
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        alignItems: 'center',
        width: '200px'
      }}>
        <button onClick={() => handleHit('TOPSPIN')} style={shotButtonStyle('#e74c3c', { gridColumn: '1 / 3' })}>TOPSPIN</button>
        <button onClick={() => handleHit('SLICE')} style={shotButtonStyle('#3498db')}>SLICE</button>
        <button onClick={() => handleHit('LOB')} style={shotButtonStyle('#f1c40f')}>LOB</button>
        <button onClick={() => handleHit('DROP_SHOT')} style={shotButtonStyle('#9b59b6')}>DROP</button>
        <button onClick={() => setGamePhase('menu')} style={menuButtonStyle}>MENU</button>
      </div>
    </div>
  );
}

// Button styles for reusability
const baseButtonStyle = {
  width: '80px', height: '80px', borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.5)', color: 'white',
  fontSize: '14px', fontWeight: 'bold', cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  textShadow: '1px 1px 1px black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const shotButtonStyle = (color, additionalStyles = {}) => ({
  ...baseButtonStyle,
  backgroundColor: color,
  ...additionalStyles
});

const menuButtonStyle = {
  ...baseButtonStyle,
  width: '60px', height: '60px',
  backgroundColor: '#95a5a6',
  fontSize: '12px'
};

export default GameUI;