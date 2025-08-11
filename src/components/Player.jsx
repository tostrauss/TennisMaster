// src/components/Player.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { gsap } from 'gsap';
import { Vector3 } from 'three';
import { AIController } from '../utils/aiController';
import useGameStore from '../stores/gameStore';

function Player({ playerData, position, isOpponent, gameState }) {
  const { scene: gameScene } = useThree();
  const playerGroupRef = useRef();

  const [ref, api] = useSphere(() => ({
    mass: 80,
    position,
    args: [0.5],
    fixedRotation: true,
    linearDamping: 0.95,
  }));

  // Ref to store the current velocity
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    // Subscribe to the velocity property
    const unsubscribe = api.velocity.subscribe((v) => (velocity.current = v));
    return unsubscribe; // Unsubscribe on component unmount
  }, [api.velocity]);

  const ai = useRef(null);
  if (isOpponent && !ai.current) {
    const difficulty = useGameStore.getState().difficulty;
    ai.current = new AIController(playerData.attributes, difficulty);
  }

  const movement = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => !isOpponent && (movement.current = e.detail);
    const handleHit = (e) => !isOpponent && hit(e.detail);
    
    window.addEventListener('playerMove', handleMove);
    window.addEventListener('playerHit', handleHit);
    return () => {
      window.removeEventListener('playerMove', handleMove);
      window.removeEventListener('playerHit', handleHit);
    };
  }, [isOpponent]);
  
  const ballRef = useRef();
  const ballApi = useRef();
  useEffect(() => {
      ballRef.current = gameScene.getObjectByName('ball');
      if(ballRef.current) ballApi.current = ballRef.current.userData.api;
  }, [gameScene]);

  useFrame((state, delta) => {
    if(!playerGroupRef.current) return;
    api.position.subscribe(p => playerGroupRef.current.position.set(p[0], p[1] - 0.5, p[2]));
    
    const speed = playerData.attributes.speed * 0.08;
    let newVelX = 0;
    let newVelZ = 0;

    if (isOpponent && ai.current && ballRef.current && ballApi.current) {
        const ballVelocity = new Vector3();
        ballApi.current.velocity.subscribe(v => ballVelocity.set(v[0], v[1], v[2]));

        const decision = ai.current.update(
            ballRef.current.position, 
            ballVelocity, 
            playerGroupRef.current.position, 
            gameScene.getObjectByName('player1Group')?.position || new Vector3(0, 1, 8), 
            gameState, 
            delta
        );
        if (decision) {
            if (decision.type === 'move') {
                newVelX = decision.x * speed;
                newVelZ = decision.z * speed;
            } else if (decision.type === 'hit' || decision.type === 'serve') {
                hit(decision);
            }
        }
    } else {
      newVelX = movement.current.x * speed;
      newVelZ = -movement.current.y * speed;
    }

    api.velocity.set(newVelX, velocity.current[1], newVelZ);
    if (newVelX !== 0 || newVelZ !== 0) {
      playerGroupRef.current.rotation.y = Math.atan2(newVelX, newVelZ);
    }
  });

  const hit = (aiShot = null) => {
    if (!playerGroupRef.current || !ballRef.current) return;

    gsap.to(playerGroupRef.current.rotation, { z: isOpponent ? -Math.PI / 4 : Math.PI / 4, duration: 0.1, yoyo: true, repeat: 1 });

    const playerPosition = new Vector3();
    playerGroupRef.current.getWorldPosition(playerPosition);

    if (playerPosition.distanceTo(ballRef.current.position) > 3.5) return;

    let shotParams;
    if (aiShot) {
      shotParams = { ...aiShot };
    } else {
      const targetPosition = new Vector3((Math.random() - 0.5) * 10, 0.5, isOpponent ? 8 : -8);
      shotParams = {
        power: playerData.attributes.power,
        spin: playerData.attributes.spin,
        accuracy: playerData.attributes.accuracy,
        shotType: 'TOPSPIN',
        targetPosition,
      };
    }
    window.dispatchEvent(new CustomEvent('ballHit', { detail: shotParams }));
  };

  return (
    <group ref={ref} name={isOpponent ? 'player2' : 'player1'}>
        <group ref={playerGroupRef} name={isOpponent ? 'player2Group' : 'player1Group'} scale={0.5} position-y={-0.5}>
            <mesh>
              <capsuleGeometry args={[0.4, 1, 4]} />
              <meshStandardMaterial color={isOpponent ? "#ff4444" : "#4466ff"} />
            </mesh>
        </group>
    </group>
  );
}

export default Player;