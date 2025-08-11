// src/components/Menu.jsx
import React from 'react';
import useGameStore from '../stores/gameStore';
import { courts } from '../data/players';
import { DIFFICULTY_LEVELS } from '../stores/gameStore';

function Menu() {
  const {
    setGamePhase,
    setCurrentCourt,
    currentCourt,
    difficulty,
    setDifficulty
  } = useGameStore();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      background: 'linear-gradient(135deg, #1a472a, #2E8B57)'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '4rem',
        marginBottom: '2rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        TennisMaster
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {courts.map(court => (
          <div
            key={court.id}
            onClick={() => setCurrentCourt(court.id)}
            style={{
              padding: '1rem',
              margin: '0.5rem',
              backgroundColor: currentCourt === court.id ? court.color : '#fff',
              color: currentCourt === court.id ? '#fff' : '#000',
              border: `2px solid ${court.color}`,
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <h3>{court.name}</h3>
            <p>{court.location}</p>
            <p>Surface: {court.surface}</p>
          </div>
        ))}
      </div>

      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        {Object.entries(DIFFICULTY_LEVELS).map(([key, { label, multiplier }]) => (
          <button
            key={key}
            onClick={() => setDifficulty(key)}
            style={{
              padding: '0.8rem 1.5rem',
              fontSize: '1.2rem',
              cursor: 'pointer',
              backgroundColor: difficulty === key ? '#4CAF50' : '#fff',
              color: difficulty === key ? '#fff' : '#000',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              opacity: difficulty === key ? 1 : 0.8
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setGamePhase('select')}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.5rem',
          cursor: 'pointer',
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Menu;