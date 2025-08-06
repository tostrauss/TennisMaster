// src/components/Player.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { Vector3 } from 'three';
import { AIController } from '../utils/aiController';

function Player({ playerData, position, isOpponent }) {
  const ai = useRef(isOpponent ? new AIController(playerData.attributes) : null);
  const [currentPosition] = useState(new Vector3(...position));
  const { scene: gameScene } = useThree();
  const playerRef = useRef();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position,
    args: [0.5], // Player collision radius
    fixedRotation: true,
    linearDamping: 0.95
  }));

  // Attempt to load player model if available, otherwise use placeholder
  const modelPath = `/models/players/${playerData.model}`;
  const { scene } = useGLTF(modelPath, true);
  
  const velocity = useRef([0, 0, 0]);
  const movement = useRef({ x: 0, y: 0 });
  
  // Handle player movement
  useEffect(() => {
    const handleMove = (e) => {
      if (!isOpponent) {
        const { x, y } = e.detail;
        movement.current = { x, y };
      }
    };

    const handleHit = () => {
      if (!isOpponent) {
        hit();
      }
    };

    window.addEventListener('playerMove', handleMove);
    window.addEventListener('playerHit', handleHit);
    
    return () => {
      window.removeEventListener('playerMove', handleMove);
      window.removeEventListener('playerHit', handleHit);
    };
  }, [isOpponent]);

  // Get ball reference for AI
  const ballRef = useRef();
  useEffect(() => {
    // Find ball in the scene
    ballRef.current = gameScene.getObjectByName('ball');
  }, [gameScene]);

  // Movement and physics
  useFrame((state, delta) => {
    if (!playerRef.current) return;

    // Get current velocity
    api.velocity.get(velocity.current);

    let newVelX = 0;
    let newVelZ = 0;
    const speed = playerData.attributes.speed * 0.05;

    if (isOpponent && ai.current && ballRef.current) {
      // Get ball position and velocity
      const ballPosition = ballRef.current.position;
      const ballVelocity = ballRef.current.userData.velocity || new Vector3();

      // Get player positions
      const playerPosition = new Vector3();
      playerRef.current.getWorldPosition(playerPosition);
      
      // Find human player position (assume it's the only other player)
      const humanPlayer = gameScene.getObjectByName('player1');
      const opponentPosition = humanPlayer ? humanPlayer.position : new Vector3(0, 0, 8);

      // Get AI decision
      const decision = ai.current.update(
        ballPosition,
        ballVelocity,
        playerPosition,
        opponentPosition,
        delta
      );

      if (decision) {
        if (decision.type === 'move') {
          newVelX = decision.x * speed;
          newVelZ = decision.z * speed;
        } else if (decision.type === 'hit') {
          hit(decision);
        }
      }
    } else {
      // Human player movement
      newVelX = movement.current.x * speed;
      newVelZ = -movement.current.y * speed;
    }

    // Apply velocity
    api.velocity.set(newVelX, velocity.current[1], newVelZ);

    // Update position
    api.position.get(currentPosition.toArray());
    playerRef.current.position.copy(currentPosition);

    // Face movement direction
    if (newVelX !== 0 || newVelZ !== 0) {
      const angle = Math.atan2(newVelX, newVelZ);
      playerRef.current.rotation.y = angle;
    }
  });

  // Hit animation and logic
  const hit = (aiShot) => {
    if (!playerRef.current) return;

    // Trigger hit animation
    gsap.to(playerRef.current.rotation, {
      z: isOpponent ? -Math.PI / 4 : Math.PI / 4,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Get current position
    const currentPos = new Vector3();
    playerRef.current.getWorldPosition(currentPos);

    // Calculate shot parameters
    let shotParams;
    if (aiShot) {
      // Use AI calculated shot parameters
      shotParams = {
        power: aiShot.power,
        spin: aiShot.spin,
        targetPosition: aiShot.targetPosition,
        position: currentPos.toArray()
      };
    } else {
      // Human player shot
      shotParams = {
        power: playerData.attributes.power,
        spin: playerData.attributes.spin,
        accuracy: playerData.attributes.accuracy,
        position: currentPos.toArray()
      };
    }

    // Dispatch hit event
    window.dispatchEvent(new CustomEvent('ballHit', {
      detail: shotParams
    }));
  };

  return (
    <group ref={ref}>
      <group 
        ref={playerRef}
        position={position}
        scale={[0.5, 0.5, 0.5]}
      >
        {scene ? (
          <primitive object={scene.clone()} />
        ) : (
          // Placeholder mesh if model is not available
          <mesh>
            <capsuleGeometry args={[0.5, 1, 4]} />
            <meshStandardMaterial color={isOpponent ? "#ff0000" : "#0000ff"} />
          </mesh>
        )}
      </group>
    </group>
  );
}

export default Player;