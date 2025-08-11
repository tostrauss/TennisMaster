// src/components/Court.jsx
import React, { useEffect, useState } from 'react';
import { usePlane, useBox } from '@react-three/cannon';
import { Plane, Box } from '@react-three/drei';
import useGameStore from '../stores/gameStore';
import { courts } from '../data/players';

function Court() {
  const currentCourtId = useGameStore(state => state.currentCourt);
  const court = courts.find(c => c.id === currentCourtId) || courts[0];

  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: {
      friction: court.surface === 'clay' ? 0.8 : court.surface === 'grass' ? 0.4 : 0.6,
      restitution: court.bounceHeight
    }
  }));

  const [netPost1] = useBox(() => ({ args: [0.2, 1, 0.2], position: [-10.5, 0.5, 0], type: 'Static' }));
  const [netPost2] = useBox(() => ({ args: [0.2, 1, 0.2], position: [10.5, 0.5, 0], type: 'Static' }));
  const [net] = useBox(() => ({ args: [21, 1, 0.1], position: [0, 0.5, 0], type: 'Static' }));

  return (
    <>
      <Plane args={[100, 100]} ref={groundRef} receiveShadow>
        <meshStandardMaterial color={court.color} />
      </Plane>
      <Box ref={netPost1}><meshStandardMaterial color="grey" /></Box>
      <Box ref={netPost2}><meshStandardMaterial color="grey" /></Box>
      <Box ref={net}><meshStandardMaterial color="white" transparent opacity={0.5} /></Box>

      {/* Court Lines */}
      <Box args={[22, 0.01, 0.1]} position={[0, 0.05, 11.88]}><meshStandardMaterial color="white" /></Box>
      <Box args={[22, 0.01, 0.1]} position={[0, 0.05, -11.88]}><meshStandardMaterial color="white" /></Box>
      <Box args={[0.1, 0.01, 23.76]} position={[5.48, 0.05, 0]}><meshStandardMaterial color="white" /></Box>
      <Box args={[0.1, 0.01, 23.76]} position={[-5.48, 0.05, 0]}><meshStandardMaterial color="white" /></Box>
      <Box args={[10.96, 0.01, 0.1]} position={[0, 0.05, 6.4]}><meshStandardMaterial color="white" /></Box>
      <Box args={[10.96, 0.01, 0.1]} position={[0, 0.05, -6.4]}><meshStandardMaterial color="white" /></Box>
      <Box args={[0.1, 0.01, 12.8]} position={[0, 0.05, 0]}><meshStandardMaterial color="white" /></Box>
    </>
  );
}

export default Court;