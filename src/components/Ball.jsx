// src/components/Ball.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { SHOT_TYPES } from '../utils/shotTypes';

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
  const spin = useRef([0, 0, 0]);
  const currentShotType = useRef(null);

  useEffect(() => {
    const handleBallHit = (e) => {
      const { 
        power, 
        spin,
        targetPosition,
        shotType
      } = e.detail;

      const startPos = new Vector3(...position.current);
      const target = new Vector3().copy(targetPosition);
      
      // Get shot type parameters
      const shot = SHOT_TYPES[shotType] || SHOT_TYPES.FLAT;
      currentShotType.current = shot;

      // Calculate trajectory based on shot type
      const direction = target.sub(startPos);
      const distance = direction.length();
      direction.normalize();

      // Adjust trajectory based on shot type
      const heightMultiplier = shot.heightMultiplier;
      const powerMultiplier = shot.powerMultiplier;
      const spinMultiplier = shot.spinMultiplier;

      // Calculate initial velocity components
      const speed = power * powerMultiplier;
      const horizontalSpeed = speed * 0.8;
      const verticalSpeed = speed * 0.4 * heightMultiplier;

      // Apply shot-specific adjustments
      switch(shotType) {
        case 'TOPSPIN':
          // Add downward force over time
          direction.y += 0.2;
          break;
        case 'SLICE':
          // Reduce speed and add backspin
          direction.y += 0.1;
          break;
        case 'LOB':
          // High arc
          direction.y += 0.4;
          break;
        case 'DROP_SHOT':
          // Soft shot with backspin
          direction.y += 0.15;
          break;
      }

      // Apply final velocity
      const finalVelocity = direction.multiplyScalar(horizontalSpeed);
      finalVelocity.y = verticalSpeed;

      api.velocity.set(
        finalVelocity.x,
        finalVelocity.y,
        finalVelocity.z
      );

      // Apply spin
      api.angularVelocity.set(
        spin * spinMultiplier * (Math.random() - 0.5) * 2,
        spin * spinMultiplier,
        spin * spinMultiplier * (Math.random() - 0.5) * 2
      );
    };

    window.addEventListener('ballHit', handleBallHit);
    return () => window.removeEventListener('ballHit', handleBallHit);
  }, [api]);

  // Apply shot-specific physics
  useFrame((state, delta) => {
    if (!currentShotType.current) return;

    api.velocity.get(velocity.current);
    api.position.get(position.current);
    api.angularVelocity.get(spin.current);

    const shotType = currentShotType.current;

    // Apply shot-specific forces
    switch(shotType.name) {
      case 'Topspin':
        // Add downward force as ball moves forward
        api.velocity.set(
          velocity.current[0],
          velocity.current[1] - 9.81 * delta * 1.5, // Enhanced gravity
          velocity.current[2]
        );
        break;
      case 'Slice':
        // Maintain height longer
        api.velocity.set(
          velocity.current[0],
          velocity.current[1] - 9.81 * delta * 0.7, // Reduced gravity
          velocity.current[2]
        );
        break;
      case 'Drop Shot':
        // Quick drop with backspin
        if (position.current[1] > 0.5) {
          api.velocity.set(
            velocity.current[0] * 0.95,
            velocity.current[1] - 9.81 * delta * 1.2,
            velocity.current[2] * 0.95
          );
        }
        break;
    }
  });

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
        currentShotType.current = null;
        
        // Award point to opposite player
        const scoringPlayer = p[2] > 0 ? 'player1' : 'player2';
        addPoint(scoringPlayer);
      }
    });
  }, [api, addPoint]);

  return (
    <mesh ref={ref} castShadow name="ball">
      <sphereGeometry args={[0.033, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

export default Ball;
