// src/components/Game.jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import GameUI from './GameUI';
import useGameStore from '../stores/gameStore';

function Game() {
  const { player1, player2 } = useGameStore();
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  return (
    <>
      <Canvas shadows camera={{ position: [0, 15, 30], fov: 45 }}>
        <Scene player1={player1} player2={player2} setScore={setScore} />
      </Canvas>
      <GameUI score={score} />
    </>
  );
}

export default Game;