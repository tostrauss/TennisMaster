// src/components/Player.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { gsap } from 'gsap';
import { Vector3 } from 'three';
import { AIController } from '../utils/aiController';
import { SHOT_TYPES, calculateShotParameters } from '../utils/shotTypes';
import useGameStore from '../stores/gameStore';

const COURT_LENGTH = 23.77;
const SERVICE_LINE_Z = 6.4;

function Player({ playerData, position, isOpponent, gameState }) {
  const { scene: gameScene } = useThree();
  const playerGroupRef = useRef();
  
  const { pointState, setPointState, servingPlayer } = useGameStore();

  const [ref, api] = useSphere(() => ({
    mass: 80,
    position,
    args: [0.5],
    fixedRotation: true,
    linearDamping: 0.95,
  }));

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => (velocity.current = v));
    return unsubscribe;
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

  const hit = (shotDetails = {}) => {
    if (!playerGroupRef.current || !ballRef.current) return;

    gsap.to(playerGroupRef.current.rotation, { z: isOpponent ? -Math.PI / 4 : Math.PI / 4, duration: 0.1, yoyo: true, repeat: 1 });

    const playerPosition = new Vector3();
    playerGroupRef.current.getWorldPosition(playerPosition);

    const isMyTurnToServe = (servingPlayer === 'player1' && !isOpponent) || (servingPlayer === 'player2' && isOpponent);
    
    let shotParams;

    if (pointState === 'serving' && isMyTurnToServe) {
        if (playerPosition.distanceTo(ballRef.current.position) > 2) return; // Must be close to the ball to serve
        
        const targetZ = isOpponent ? SERVICE_LINE_Z - 1 : -SERVICE_LINE_Z + 1;
        const targetX = playerPosition.x > 0 ? -3 : 3; // Aim cross-court

        shotParams = {
            power: playerData.attributes.power * 1.2, // Serves are stronger
            spin: playerData.attributes.spin,
            accuracy: playerData.attributes.accuracy,
            shotType: 'FLAT', // Default serve type
            targetPosition: new Vector3(targetX, 0.5, targetZ),
        };
        setPointState('rally');
    } else {
        if (playerPosition.distanceTo(ballRef.current.position) > 3.5) return; // Must be close to the ball to hit

        if (isOpponent) { // AI Shot
            shotParams = { ...shotDetails };
        } else { // Player Shot
            const targetPosition = new Vector3(
              (Math.random() - 0.5) * 6, // Keep within singles court width
              0.5,
              isOpponent ? COURT_LENGTH/2 - 1 : -COURT_LENGTH/2 + 1
            );
            const params = calculateShotParameters(
              SHOT_TYPES[shotDetails.type || 'TOPSPIN'],
              playerData.attributes,
              gameState.courtSurface
            );
            shotParams = {
                ...params,
                shotType: shotDetails.type || 'TOPSPIN',
                targetPosition,
            };
        }
    }

    if (shotParams) {
        window.dispatchEvent(new CustomEvent('ballHit', { detail: shotParams }));
    }
  };

  return (
    <group ref={playerGroupRef} name={isOpponent ? 'player2Group' : 'player1Group'}>
      <mesh ref={ref} position={[0, 1, 0]}>
        <capsuleGeometry args={[0.4, 1, 4]} />
        <meshStandardMaterial color={isOpponent ? "#ff4444" : "#4466ff"} />
      </mesh>
    </group>
  );
}

export default Player;