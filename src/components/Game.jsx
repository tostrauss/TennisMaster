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
import { withErrorBoundary, PhysicsError, ScoreError } from './ErrorBoundary';

function Game() {
  const [gameMode, setGameMode] = useState('quickMatch'); // 'quickMatch' or 'tournament'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { 
    player1, 
    player2, 
    currentCourt,
    score,
    resetGame,
    setGamePhase
  } = useGameStore();

  // Validate game state
  useEffect(() => {
    try {
      setError(null);
      setIsLoading(true);

      if (!player1 || !player2) {
        throw new Error('Players not selected');
      }

      if (!currentCourt) {
        throw new Error('Court not selected');
      }

      // Validate player data
      if (!player1.attributes || !player2.attributes) {
        throw new Error('Invalid player data');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Game initialization error:', error);
      setError(error.message);
      setGamePhase('menu');
    }
  }, [player1, player2, currentCourt]);

  const court = courts.find(c => c.id === currentCourt);

  useEffect(() => {
    // Validate required game data before initializing
    if (!player1 || !player2 || !court) {
      console.error('Missing required game data:', { player1, player2, court });
      setGamePhase('menu');
      return;
    }

    // Initialize game
    try {
      resetGame();
    } catch (error) {
      console.error('Error initializing game:', error);
      setGamePhase('menu');
    }
    
    // Cleanup on unmount
    return () => {
      resetGame();
    };
  }, [player1, player2, court]);

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

// Wrap Game component with error boundary and handlers
export default withErrorBoundary(Game, {
  onPhysicsReset: () => {
    const resetGame = useGameStore.getState().resetGame;
    resetGame();
  },
  onScoreReset: () => {
    const { score, resetGame } = useGameStore.getState();
    // Only reset score if it's in an invalid state
    if (score.player1.points > 40 || score.player2.points > 40) {
      resetGame();
    }
  },
  onRetry: () => {
    // General retry logic
    const { setGamePhase } = useGameStore.getState();
    setGamePhase('menu');
  }
});