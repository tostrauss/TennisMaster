// src/components/Scene.jsx
import React, { Suspense } from 'react';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Player from './Player';
import Opponent from './Opponent';
// You will need a Ball component as well
// import Ball from './Ball'; 
import Court from './Court'; // Assuming you have a Court component

function Scene({ player1, player2, setScore }) {
  return (
    <Suspense fallback={null}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Physics>
        <Court />
        <Player player={player1} />
        <Opponent player={player2} />
        {/* <Ball setScore={setScore} /> */}
      </Physics>
      <OrbitControls />
    </Suspense>
  );
}

export default Scene;