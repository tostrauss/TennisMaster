// src/components/Ball.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { SHOT_TYPES } from '../utils/shotTypes';
import { PhysicsError } from './ErrorBoundary';
import useGameStore from '../stores/gameStore';

const COURT_LENGTH = 23.77;

function Ball({ addPoint }) {
  const [ref, api] = useSphere(() => ({
    mass: 0.057, // Official tennis ball mass in kg
    position: [0, 5, 0], // Start high to drop into play
    args: [0.033], // Official tennis ball radius in meters
    linearDamping: 0.2,
    angularDamping: 0.2,
    material: {
      friction: 0.5,
      restitution: 0.8
    }
  }));

  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 0, 0]);
  const spin = useRef([0, 0, 0]);
  const currentShotType = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.userData.api = api;
    }
  }, [ref, api]);

  const resetForServe = () => {
    const { servingPlayer, score } = useGameStore.getState();
    const pointMap = { 0: 0, 15: 1, 30: 2, 40: 3, 'AD': 4 };
    const p1Points = pointMap[score.player1.points] || 0;
    const p2Points = pointMap[score.player2.points] || 0;
    const totalPoints = p1Points + p2Points;
    
    const serveX = totalPoints % 2 === 0 ? 2 : -2; // Deuce court (right) on even points, Ad court (left) on odd
    const serveZ = servingPlayer === 'player1' ? (COURT_LENGTH / 2) - 1 : (-COURT_LENGTH / 2) + 1;
    
    api.position.set(serveX, 1, serveZ);
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
    currentShotType.current = null;
  };

  useEffect(() => {
    // Initial serve position
    resetForServe();
  }, []);

  const validateBallState = (pos, vel) => {
    if (pos.some(v => !isFinite(v)) || vel.some(v => !isFinite(v))) {
      throw new PhysicsError('Ball physics calculation resulted in non-finite values.');
    }
    if (pos.some(v => Math.abs(v) > 1000) || vel.some(v => Math.abs(v) > 1000)) {
      throw new PhysicsError('Ball state is out of physical bounds.');
    }
  };

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
      
      const shot = SHOT_TYPES[shotType] || SHOT_TYPES.FLAT;
      currentShotType.current = shot;

      const direction = target.sub(startPos).normalize();

      const heightMultiplier = shot.heightMultiplier;
      const powerMultiplier = shot.powerMultiplier;
      const spinMultiplier = shot.spinMultiplier;

      const speed = power * powerMultiplier * 0.15;
      const horizontalSpeed = speed;
      const verticalSpeed = speed * heightMultiplier * 0.5;

      const finalVelocity = new Vector3(
        direction.x * horizontalSpeed,
        verticalSpeed,
        direction.z * horizontalSpeed
      );

      api.velocity.set(finalVelocity.x, finalVelocity.y, finalVelocity.z);
      api.angularVelocity.set(
        spin * spinMultiplier * (Math.random() - 0.5),
        spin * spinMultiplier,
        spin * spinMultiplier * (Math.random() - 0.5)
      );
    };

    window.addEventListener('ballHit', handleBallHit);
    return () => window.removeEventListener('ballHit', handleBallHit);
  }, [api]);

  useFrame((state, delta) => {
    if (!currentShotType.current) return;

    api.velocity.get(velocity.current);
    api.position.get(position.current);
    
    validateBallState(position.current, velocity.current);

    const shot = currentShotType.current;

    // Apply Magnus force for spin effects
    if (shot.name === 'Topspin' || shot.name === 'Kick Serve') {
      api.applyForce([0, -0.2, 0], position.current); // Downward force
    } else if (shot.name === 'Slice' || shot.name === 'Drop Shot') {
      api.applyForce([0, 0.1, 0], position.current); // Upward lift
    }
  });

  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => {
      position.current = p;
      if (p[1] < -5) { // Ball fell through the ground
        const scoringPlayer = p[2] > 0 ? 'player1' : 'player2';
        addPoint(scoringPlayer);
        resetForServe();
      }
    });
    return unsubscribe;
  }, [api, addPoint]);

  return (
    <mesh ref={ref} castShadow name="ball">
      <sphereGeometry args={[0.033, 32, 32]} />
      <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.8} />
    </mesh>
  );
}

export default Ball;