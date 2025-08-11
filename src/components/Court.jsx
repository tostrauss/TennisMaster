// src/components/Court.jsx
import React, { useEffect } from 'react';
import { usePlane, useBox } from '@react-three/cannon';
import { Plane, Box, useTexture } from '@react-three/drei';
import useGameStore from '../stores/gameStore';
import { courts } from '../data/players';

function Court() {
  const currentCourt = useGameStore(state => state.currentCourt);
  const court = courts.find(c => c.id === currentCourt) || courts[0];
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!court) {
        throw new Error('Invalid court configuration');
      }
      
      // Validate court physics properties
      if (typeof court.bounceHeight !== 'number' || 
          typeof court.speed !== 'number' ||
          court.bounceHeight < 0 || 
          court.bounceHeight > 1 ||
          court.speed < 0 || 
          court.speed > 1) {
        throw new Error('Invalid court physics properties');
      }

      setIsInitialized(true);
      setError(null);
    } catch (err) {
      console.error('Court initialization error:', err);
      setError(err.message);
      setIsInitialized(false);
    }
  }, [court]);
  
  // Load court texture based on surface type
  const texture = useTexture(`/textures/${court.surface}_court.jpg`);
  
  useEffect(() => {
    // Update physics parameters based on court surface
    // This would affect ball bounce and player movement
    const physicsParams = {
      friction: court.surface === 'clay' ? 0.8 : court.surface === 'grass' ? 0.4 : 0.6,
      restitution: court.bounceHeight,
    };
    // Update physics world parameters here
  }, [court]);
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
        <meshStandardMaterial 
          map={texture}
          color={court.color}
          roughness={court.surface === 'clay' ? 1 : court.surface === 'grass' ? 0.3 : 0.7}
        />
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