// src/components/Court.jsx
import React from 'react';
import { usePlane, useBox } from '@react-three/cannon';
import { Plane, Box } from '@react-three/drei';

function Court() {
  // Create a static plane for the ground
  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static',
  }));

  // Create static boxes for the net posts
  const [netPost1] = useBox(() => ({
    args: [0.2, 1, 0.2],
    position: [-10.5, 0.5, 0],
    type: 'Static',
  }));
  const [netPost2] = useBox(() => ({
    args: [0.2, 1, 0.2],
    position: [10.5, 0.5, 0],
    type: 'Static',
  }));

    // Create a sensor box for the net itself to detect ball collision
    const [net] = useBox(() => ({
        args: [21, 0.8, 0.1],
        position: [0, 0.4, 0],
        isTrigger: true, // It's a sensor, not a solid object
        type: 'Static',
      }));

  return (
    <>
      {/* Ground */}
      <Plane args={[100, 100]} ref={groundRef} receiveShadow>
        <meshStandardMaterial color="#3E8A5A" />
      </Plane>

      {/* Court Lines */}
      {/* Base lines */}
      <Box args={[22, 0.1, 0.2]} position={[0, 0.05, 12]}>
        <meshStandardMaterial color="white" />
      </Box>
      <Box args={[22, 0.1, 0.2]} position={[0, 0.05, -12]}>
        <meshStandardMaterial color="white" />
      </Box>
      {/* Side lines */}
      <Box args={[0.2, 0.1, 24]} position={[11, 0.05, 0]}>
        <meshStandardMaterial color="white" />
      </Box>
      <Box args={[0.2, 0.1, 24]} position={[-11, 0.05, 0]}>
        <meshStandardMaterial color="white" />
      </Box>
      {/* Service lines */}
      <Box args={[22, 0.1, 0.2]} position={[0, 0.05, 6]}>
        <meshStandardMaterial color="white" />
      </Box>
      <Box args={[22, 0.1, 0.2]} position={[0, 0.05, -6]}>
        <meshStandardMaterial color="white" />
      </Box>
      <Box args={[0.2, 0.1, 12]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="white" />
      </Box>


      {/* Net */}
      <Box ref={netPost1}>
        <meshStandardMaterial color="gray" />
      </Box>
      <Box ref={netPost2}>
        <meshStandardMaterial color="gray" />
      </Box>
      <Box ref={net} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="white" transparent opacity={0.3} />
      </Box>
    </>
  );
}

export default Court;