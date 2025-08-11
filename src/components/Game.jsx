// src/components/Game.jsx
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import Scene from './Scene';
import GameUI from './GameUI';
import useGameStore from '../stores/gameStore';
import { courts } from '../data/players';
import Tournament from './Tournament';
import { withErrorBoundary } from './ErrorBoundary';

function Game() {
  const { 
    player1, 
    player2, 
    currentCourt,
    resetGame,
    setGamePhase,
    activeTournamentMatch
  } = useGameStore();

  const court = courts.find(c => c.id === currentCourt);

  useEffect(() => {
    if (!player1 || !player2 || !court) {
      console.error('Game data is incomplete. Returning to menu.');
      setGamePhase('menu');
      return;
    }
    // Reset score and server for the new match
    resetGame();
  }, [player1, player2, court, resetGame, setGamePhase]);

  if (!player1 || !player2 || !court) {
    return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>Loading Match...</div>;
  }

  return (
    <>
      <Canvas shadows camera={{ position: [0, 15, 30], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight
          castShadow
          position={[50, 50, 25]}
          intensity={1.5}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Physics
          gravity={[0, -9.81, 0]}
          defaultContactMaterial={{
            friction: court.surface === 'clay' ? 0.8 : court.surface === 'grass' ? 0.4 : 0.6,
            restitution: court.bounceHeight * 0.9
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
        player1={player1}
        player2={player2}
        court={court}
      />
    </>
  );
}

export default withErrorBoundary(Game, {
  onRetry: () => {
    const { setGamePhase } = useGameStore.getState();
    setGamePhase('menu');
  }
});