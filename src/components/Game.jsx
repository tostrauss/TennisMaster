// src/components/Game.jsx
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky, Environment } from '@react-three/drei';
import Scene from './Scene';
import GameUI from './GameUI';
import useGameStore from '../stores/gameStore';
import { courts } from '../data/players';
import Tournament from './Tournament';

function Game() {
  const [gameMode, setGameMode] = useState('quickMatch');
  const state = useGameStore();
  const { 
    player1, 
    player2, 
    currentCourt,
    score,
    resetGame,
    setGamePhase
  } = state;

  const court = courts.find(c => c.id === currentCourt) || courts[0];

  useEffect(() => {
    resetGame();
    return () => {
      resetGame();
    };
  }, [resetGame]);

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setGamePhase('menu');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  if (gameMode === 'tournament') {
    return <Tournament />;
  }

  return (
    <>
      <div className="game-mode-selector">
        <button 
          className={gameMode === 'quickMatch' ? 'active' : ''} 
          onClick={() => setGameMode('quickMatch')}
        >
          Quick Match
        </button>
        <button 
          className={gameMode === 'tournament' ? 'active' : ''} 
          onClick={() => setGameMode('tournament')}
        >
          Tournament
        </button>
      </div>
      
      <Canvas shadows camera={{ position: [0, 15, 30], fov: 45 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[50, 50, 25]}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <Physics
          gravity={[0, -9.81, 0]}
          defaultContactMaterial={{
            friction: court.surface === 'clay' ? 0.8 : court.surface === 'grass' ? 0.4 : 0.6,
            restitution: court.bounceHeight
          }}
        >
          <Scene 
            player1={player1} 
            player2={player2}
            court={court}
          />
        </Physics>
      </Canvas>
      <GameUI 
        score={score}
        player1={player1}
        player2={player2}
        court={court}
      />
    </>
  );
}

export default Game;