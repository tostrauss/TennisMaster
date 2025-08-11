import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useGameStore from '../stores/gameStore';
import { DIFFICULTY_LEVELS, PLAY_STYLES } from '../stores/gameStore';

// Court dimensions and constraints (official tennis court measurements)
const COURT_WIDTH = 8.23; // Singles court width in meters
const COURT_LENGTH = 23.77; // Court length in meters
const COURT_HALF = COURT_LENGTH / 2;
const SERVICE_LINE = 6.4; // Distance from net to service line
const BASELINE_MARGIN = 2; // How far behind baseline player can move
const BASE_POSITION = [0, 1, COURT_HALF - 1.5]; // Default position near baseline

// Tennis-specific constants
const SHOT_TYPES = {
    GROUNDSTROKE: {
        height: 1.2,
        spin: 2000,
        speed: 25
    },
    SERVE: {
        height: 2.5,
        spin: 2500,
        speed: 30
    },
    VOLLEY: {
        height: 1.0,
        spin: 1000,
        speed: 20
    },
    LOB: {
        height: 5,
        spin: 500,
        speed: 15
    },
    SLICE: {
        height: 0.8,
        spin: -1500,
        speed: 18
    }
};

const Opponent = ({ ballPosition, ballVelocity, onHitBall, playerPosition }) => {
  // Game state and settings
  const difficulty = useGameStore(state => state.difficulty);
  const difficultySettings = DIFFICULTY_LEVELS[difficulty];
  
  // AI state
  const [playStyle, setPlayStyle] = useState(PLAY_STYLES.ALLROUND);
  const [stamina, setStamina] = useState(100);
  const [isReadyToHit, setIsReadyToHit] = useState(true);
  const [currentStance, setCurrentStance] = useState('ready');
  
  // Movement and positioning refs
  const velocity = useRef([0, 0, 0]);
  const position = useRef(BASE_POSITION);
  const targetPosition = useRef(BASE_POSITION);
  const lastHitTime = useRef(Date.now());
  const recoveryTimer = useRef(null);
  
  // Physics body setup with advanced properties
  const [ref, api] = useSphere(() => ({
    mass: 70, // Average player mass in kg
    position: BASE_POSITION,
    args: [0.4], // Player radius
    fixedRotation: true,
    linearDamping: 0.9,
    angularDamping: 0.9,
    material: {
      friction: 0.5,
      restitution: 0.2
    }
  }));

  // Calculate optimal court position based on game situation
  const calculateOptimalPosition = useMemo(() => (ballPos, ballVel) => {
    if (!ballPos || !ballVel) return BASE_POSITION;

    // Predict ball trajectory
    const predictedPos = new THREE.Vector3(...ballPos);
    const velocity = new THREE.Vector3(...ballVel);
    const timeToIntercept = 1.0; // seconds
    
    predictedPos.add(velocity.multiplyScalar(timeToIntercept));
    
    // Adjust for court boundaries
    const optimalX = Math.max(-COURT_WIDTH/2 + 0.5, 
                             Math.min(COURT_WIDTH/2 - 0.5, predictedPos.x));
    const optimalZ = Math.max(0, 
                             Math.min(COURT_HALF + BASELINE_MARGIN, predictedPos.z));
    
    return [optimalX, 1, optimalZ];
  }, []);  // Physics and state management
  useEffect(() => {
    const unsubscribePosition = api.position.subscribe(v => position.current = v);
    const unsubscribeVelocity = api.velocity.subscribe(v => velocity.current = v);
    
    // Stamina recovery system
    const staminaRecovery = setInterval(() => {
      setStamina(prev => Math.min(100, prev + 2));
    }, 1000);
    
    // Dynamic play style adjustment based on game situation
    const styleAdjustment = setInterval(() => {
      if (!playerPosition) return;
      
      const [, , playerZ] = playerPosition;
      // Adapt play style based on player position and stamina
      if (playerZ > SERVICE_LINE) {
        setPlayStyle(PLAY_STYLES.AGGRESSIVE); // Player at net, play more aggressively
      } else if (stamina < 30) {
        setPlayStyle(PLAY_STYLES.DEFENSIVE); // Low stamina, play conservatively
      } else {
        setPlayStyle(PLAY_STYLES.ALLROUND); // Default to balanced play
      }
    }, 2000);

    return () => {
      unsubscribePosition();
      unsubscribeVelocity();
      clearInterval(staminaRecovery);
      clearInterval(styleAdjustment);
    };
  }, [api, playerPosition]);

  // Real-time AI decision making and movement
  useFrame(() => {
    if (!ballPosition || !ballVelocity) return;

    const [bx, by, bz] = ballPosition;
    const [px, py, pz] = position.current;
    const [vx, vy, vz] = ballVelocity;
    
    // Only react to balls on opponent's side or approaching
    if (bz < 0 && vz <= 0) return;

    // Advanced court positioning and movement
    const optimalPos = calculateOptimalPosition(ballPosition, ballVelocity);
    targetPosition.current = optimalPos;

    // Energy management system
    const now = Date.now();
    const timeSinceLastHit = now - lastHitTime.current;
    const energyCost = Math.min(20, timeSinceLastHit / 1000);
    
    // Movement speed based on stamina and difficulty
    const baseSpeed = 15 * difficultySettings.multiplier;
    const staminaFactor = Math.max(0.5, stamina / 100);
    const currentSpeed = baseSpeed * staminaFactor;

    // Calculate movement with momentum and acceleration
    const dx = targetPosition.current[0] - px;
    const dz = targetPosition.current[2] - pz;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist > 0.1) {
      const moveX = (dx / dist) * currentSpeed;
      const moveZ = (dz / dist) * currentSpeed;
      
      // Apply movement with current momentum
      const currentVx = velocity.current[0];
      const currentVz = velocity.current[2];
      const newVx = currentVx + (moveX - currentVx) * 0.15;
      const newVz = currentVz + (moveZ - currentVz) * 0.15;
      
      api.velocity.set(newVx, velocity.current[1], newVz);
      setStamina(prev => Math.max(0, prev - energyCost * 0.1));
    }

    // Shot selection and execution
    const hitDistance = 1.5;
    const canHitBall = isReadyToHit && 
                      Math.abs(bx - px) < hitDistance && 
                      Math.abs(bz - pz) < hitDistance && 
                      by > 0.5 && by < 2.5;

    if (canHitBall) {
      // Determine optimal shot type based on game situation
      let shotType = SHOT_TYPES.GROUNDSTROKE;
      if (by > 2) {
        shotType = SHOT_TYPES.VOLLEY;
      } else if (by < 1 && stamina > 40) {
        shotType = SHOT_TYPES.LOB;
      } else if (Math.abs(bx) > COURT_WIDTH/3) {
        shotType = SHOT_TYPES.SLICE;
      }

      // Apply difficulty and style modifiers
      const power = shotType.speed * difficultySettings.multiplier * 
                   playStyle.attributes.powerMultiplier;
      const accuracy = 0.8 + (0.2 * difficultySettings.multiplier * 
                    playStyle.attributes.accuracyMultiplier);
      
      // Strategic shot placement
      const targetX = -px * accuracy * (Math.random() * 0.4 + 0.8);
      const targetY = shotType.height * (Math.random() * 0.3 + 0.85);
      const targetZ = -COURT_HALF + 2 + Math.random() * 4;

      if (onHitBall) {
        onHitBall(
          [targetX, targetY, targetZ],
          power,
          shotType.spin * (playStyle.attributes.powerMultiplier)
        );
        
        // Update state after shot
        setIsReadyToHit(false);
        setStamina(prev => Math.max(0, prev - 15));
        lastHitTime.current = now;
        setCurrentStance('follow-through');
        
        // Reset stance and shot availability
        clearTimeout(recoveryTimer.current);
        recoveryTimer.current = setTimeout(() => {
          setIsReadyToHit(true);
          setCurrentStance('ready');
        }, 1000);
      }
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Opponent;