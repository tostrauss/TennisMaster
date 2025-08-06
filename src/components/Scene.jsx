// src/components/Scene.jsx
import React, { Suspense, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Sky, Environment, useGLTF } from '@react-three/drei';
import { Physics, useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import Player from './Player';
import Court from './Court';
import useGameStore from '../stores/gameStore';

function Ball({ addPoint }) {
  const [ref, api] = useSphere(() => ({
    mass: 0.057, // Official tennis ball mass in kg
    position: [0, 1, 0],
    args: [0.033], // Official tennis ball radius in meters
    linearDamping: 0.2,
    angularDamping: 0.2
  }));

  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 0, 0]);

  useEffect(() => {
    const handleBallHit = (e) => {
      const { power, spin, position: playerPos, targetPosition } = e.detail;
      
      let direction;
      if (targetPosition) {
        // AI shot with specific target
        direction = new Vector3()
          .copy(targetPosition)
          .sub(new Vector3(...playerPos))
          .normalize();
      } else {
        // Human player shot with accuracy-based randomness
        const accuracy = e.detail.accuracy;
        direction = new Vector3(
          (Math.random() - 0.5) * (100 - accuracy) / 100,
          0.5 + (power / 200),
          playerPos[2] > 0 ? -1 : 1
        ).normalize();
      }

      // Apply force with power scaling
      const force = direction.multiplyScalar(power * 50);
      
      // Add topspin or backspin effect
      force.y += spin * 0.1;
      
      api.velocity.set(force.x, force.y, force.z);

      // Apply spin effects
      api.angularVelocity.set(
        spin * (Math.random() - 0.5) * 2,
        spin,
        spin * (Math.random() - 0.5) * 2
      );
    };

    window.addEventListener('ballHit', handleBallHit);
    return () => window.removeEventListener('ballHit', handleBallHit);
  }, [api]);

  // Monitor ball position for scoring
  useEffect(() => {
    api.position.subscribe((p) => {
      position.current = p;
      // Check if ball is out
      if (Math.abs(p[0]) > 11 || Math.abs(p[2]) > 12 || p[1] < 0) {
        // Reset ball
        api.position.set(0, 1, 0);
        api.velocity.set(0, 0, 0);
        api.angularVelocity.set(0, 0, 0);
        
        // Award point to opposite player
        const scoringPlayer = p[2] > 0 ? 'player1' : 'player2';
        addPoint(scoringPlayer);
      }
    });
  }, [api, addPoint]);

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.033, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

function Scene({ player1, player2, court }) {
  const { addPoint, score, servingPlayer } = useGameStore();
  const { camera } = useThree();
  
  // Load court model if available
  const courtModel = useGLTF(`/models/courts/${court.model}`, true);

  // Game state for AI decision making
  const gameState = {
    score,
    servingPlayer,
    courtSurface: court.surface,
    points: score.player1.points,
    games: score.player1.games,
    sets: score.player1.sets
  };

  useEffect(() => {
    // Set initial camera position based on court
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <Suspense fallback={null}>
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="sunset" />
      
      <Court court={court} model={courtModel} />
      
      <Player 
        playerData={player1}
        position={[0, 1, 8]}
        isOpponent={false}
        gameState={gameState}
      />
      
      <Player 
        playerData={player2}
        position={[0, 1, -8]}
        isOpponent={true}
        gameState={gameState}
      />
      
      <Ball addPoint={addPoint} />
    </Suspense>
  );
}

export default Scene;