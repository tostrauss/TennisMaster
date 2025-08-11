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
  
  const handleHit = (shotType) => {
    window.dispatchEvent(new CustomEvent('playerHit', { detail: { type: shotType }}));
  };

  const formatScore = (playerScore) => {
    if (playerScore === 'AD') return 'AD';
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
        minWidth: '280px',
        fontFamily: '"Courier New", Courier, monospace',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: servingPlayer === 'player1' ? '#ffd700' : 'transparent', marginRight: '10px', fontSize: '20px', lineHeight: '10px' }}>
              ●
            </span>
            <span style={{ color: 'white' }}>{player1.name}</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', color: 'white', fontWeight: 'bold' }}>
            <span>{p1Score.sets}</span>
            <span>{p1Score.games}</span>
            <span>{formatScore(p1Score.points)}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: servingPlayer === 'player2' ? '#ffd700' : 'transparent', marginRight: '10px', fontSize: '20px', lineHeight: '10px' }}>
              ●
            </span>
            <span style={{ color: 'white' }}>{player2.name}</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', color: 'white', fontWeight: 'bold' }}>
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
        {renderScore()}
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
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <button onClick={() => handleHit('SLICE')} style={shotButtonStyle('#3498db')}>SLICE</button>
        <button onClick={() => handleHit('TOPSPIN')} style={shotButtonStyle('#e74c3c')}>TOPSPIN</button>
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
  textShadow: '1px 1px 1px black'
};

const shotButtonStyle = (color) => ({
  ...baseButtonStyle,
  backgroundColor: color,
});

const menuButtonStyle = {
  ...baseButtonStyle,
  width: '60px', height: '60px',
  backgroundColor: '#95a5a6',
  fontSize: '12px'
};

export default GameUI;