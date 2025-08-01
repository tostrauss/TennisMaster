// src/App.jsx
import React, { useState } from 'react';
import Scene from './components/Scene';
import Joystick from 'react-joystick-component';

export default function App() {
  const [playerPos, setPlayerPos] = useState({ x: -8, z: 0 });

  const movePlayer = (dx, dz) => {
    setPlayerPos(prev => ({
      x: Math.max(-11, Math.min(11, prev.x + dx)),
      z: Math.max(-5, Math.min(5, prev.z + dz))
    }));
  };

  const hitBall = (type) => {
    console.log(`🎾 Hit: ${type}`);
    // Trigger physics via window.hitTopspin etc.
    if (type === 'topspin') window.hitTopspin?.();
    if (type === 'slice') window.hitSlice?.();
    if (type === 'lob') window.hitLob?.();
  };

  return (
    <>
      <Scene onHit={hitBall} />

      {/* Joystick */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 100,
        height: 100,
      }}>
        
<Joystick
  size={100}
  baseColor="#3366ff"
  stickColor="#ffffff"
  move={(e) => console.log(e.vector)}
/>
      </div>

      {/* Shot Buttons */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <button onClick={() => hitBall('topspin')} style={btnStyle.topspin}>Topspin</button>
        <button onClick={() => hitBall('slice')} style={btnStyle.slice}>Slice</button>
        <button onClick={() => hitBall('lob')} style={btnStyle.lob}>Lob</button>
      </div>

      {/* HUD */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px black'
      }}>
        🎾 TennisMaster
      </div>
    </>
  );
}

// Button Styles
const btnStyle = {
  topspin: {
    background: '#FF5252',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  slice: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  lob: {
    background: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};