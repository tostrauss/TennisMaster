// src/components/GameUI.jsx
import React from 'react';
import { Joystick } from 'react-joystick-component';
import useGameStore from '../stores/gameStore';

function GameUI({ score }) {
  const { player1, player2 } = useGameStore();

  const handleMove = (e) => {
    // This is where you will connect the joystick to the player movement
    console.log('Move:', e);
  };

  const handleStop = (e) => {
    console.log('Stop:', e);
  };
  
  const handleHit = () => {
      // This is where you will trigger the hit animation and logic
      console.log('Hit!');
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px' }}>
        <p>{player1.name}: {score.player1}</p>
        <p>{player2.name}: {score.player2}</p>
      </div>

      <div style={{ position: 'absolute', bottom: '50px', left: '50px', pointerEvents: 'auto' }}>
        <Joystick size={100} baseColor="rgba(255, 255, 255, 0.5)" stickColor="rgba(255, 255, 255, 0.8)" move={handleMove} stop={handleStop} />
      </div>

      <div style={{ position: 'absolute', bottom: '50px', right: '50px', pointerEvents: 'auto' }}>
          <button onClick={handleHit} style={{width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none'}}>
              HIT
          </button>
      </div>
    </div>
  );
}

export default GameUI;