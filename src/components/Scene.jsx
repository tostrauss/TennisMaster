// src/components/Scene.jsx
import React, { Suspense, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Sky, Environment, ContactShadows } from '@react-three/drei';
import Player from './Player';
import Court from './Court';
import Ball from './Ball';
import useGameStore from '../stores/gameStore';
import { withErrorBoundary } from './ErrorBoundary';

function Scene({ player1, player2, court }) {
  const { addPoint, score, servingPlayer, setGamePhase } = useGameStore();
  const { camera } = useThree();
  
  useEffect(() => {
    if (!player1 || !player2 || !court) {
      console.error('Missing required props in Scene, returning to menu.');
      setGamePhase('menu');
    }
  }, [player1, player2, court, setGamePhase]);
  
  const gameState = {
    score,
    servingPlayer,
    courtSurface: court.surface,
    points: score.player1.points, // Simplified for AI
    games: score.player1.games,
    sets: score.player1.sets
  };

  useEffect(() => {
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  if (!player1 || !player2 || !court) {
    return null; 
  }

  return (
    <Suspense fallback={null}>
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="sunset" />
      <ContactShadows 
        position={[0, 0.01, 0]} 
        opacity={0.6} 
        scale={60} 
        blur={1.5} 
        far={25}
      />
      
      <Court />
      
      <Player 
        playerData={player1}
        position={[0, 1, 10]} // Player starts further back
        isOpponent={false}
        gameState={gameState}
      />
      
      <Player 
        playerData={player2}
        position={[0, 1, -10]} // Opponent starts further back
        isOpponent={true}
        gameState={gameState}
      />
      
      <Ball addPoint={addPoint} />
    </Suspense>
  );
}

export default withErrorBoundary(Scene, {
  onPhysicsReset: () => {
    const { resetGame } = useGameStore.getState();
    resetGame();
  }
});