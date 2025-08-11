// src/components/Court.jsx
import React from 'react';
import { usePlane, useBox } from '@react-three/cannon';
import { Plane, Box } from '@react-three/drei';
import useGameStore from '../stores/gameStore';
import { courts } from '../data/players';

// Define court dimensions for physics (ITF standards)
const COURT_LENGTH = 23.77;
const COURT_WIDTH = 10.97; // Doubles width for physics bounds
const SINGLES_WIDTH = 8.23;
const NET_HEIGHT = 1.07;
const BASELINE_Z = COURT_LENGTH / 2;
const SINGLES_SIDELINE_X = SINGLES_WIDTH / 2;
const SERVICE_LINE_Z = 6.4;

function Court() {
  const { addPoint } = useGameStore();
  const currentCourtId = useGameStore(state => state.currentCourt);
  const court = courts.find(c => c.id === currentCourtId) || courts[0];
  let lastCollisionTime = 0; // Debounce handler

  const handlePointScored = (scoringPlayer) => {
    const now = Date.now();
    if (now - lastCollisionTime > 500) { // 500ms debounce to prevent double points
      addPoint(scoringPlayer);
      lastCollisionTime = now;
    }
  };

  // Main playing surface - triggers a point if ball bounces out of singles court
  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: {
      friction: court.surface === 'clay' ? 0.8 : court.surface === 'grass' ? 0.4 : 0.6,
      restitution: court.bounceHeight
    },
    onCollide: (e) => {
      const ballPosition = e.contact.rj;
      const isOutOfBounds = Math.abs(ballPosition[0]) > SINGLES_SIDELINE_X || Math.abs(ballPosition[2]) > BASELINE_Z;
      if (isOutOfBounds) {
        // Point goes to the player on the opposite side of where the ball landed
        handlePointScored(ballPosition[2] > 0 ? 'player1' : 'player2');
      }
    }
  }));

  // Net collision body
  const [netRef] = useBox(() => ({
    args: [COURT_WIDTH + 0.5, NET_HEIGHT, 0.1], // Slightly wider to catch edge cases
    position: [0, NET_HEIGHT / 2, 0],
    type: 'Static',
    onCollide: (e) => {
      // Point goes to the player whose side the ball did NOT land on
      handlePointScored(e.contact.rj[2] > 0 ? 'player1' : 'player2');
    }
  }));

  return (
    <>
      <Plane args={[100, 100]} ref={groundRef} receiveShadow>
        <meshStandardMaterial color={court.color} />
      </Plane>
      
      {/* Net and Posts */}
      <Box ref={netRef}>
        <meshStandardMaterial color="white" transparent opacity={0.5} />
      </Box>
      <Box args={[0.2, NET_HEIGHT, 0.2]} position={[-COURT_WIDTH/2 - 0.2, NET_HEIGHT/2, 0]}><meshStandardMaterial color="grey" /></Box>
      <Box args={[0.2, NET_HEIGHT, 0.2]} position={[COURT_WIDTH/2 + 0.2, NET_HEIGHT/2, 0]}><meshStandardMaterial color="grey" /></Box>

      {/* Court Lines (Visual Only) */}
      <Box args={[SINGLES_WIDTH, 0.01, 0.1]} position={[0, 0.05, BASELINE_Z]}><meshStandardMaterial color="white" /></Box>
      <Box args={[SINGLES_WIDTH, 0.01, 0.1]} position={[0, 0.05, -BASELINE_Z]}><meshStandardMaterial color="white" /></Box>
      <Box args={[0.1, 0.01, COURT_LENGTH]} position={[SINGLES_SIDELINE_X, 0.05, 0]}><meshStandardMaterial color="white" /></Box>
      <Box args={[0.1, 0.01, COURT_LENGTH]} position={[-SINGLES_SIDELINE_X, 0.05, 0]}><meshStandardMaterial color="white" /></Box>
      <Box args={[SINGLES_WIDTH, 0.01, 0.1]} position={[0, 0.05, SERVICE_LINE_Z]}><meshStandardMaterial color="white" /></Box>
      <Box args={[SINGLES_WIDTH, 0.01, 0.1]} position={[0, 0.05, -SERVICE_LINE_Z]}><meshStandardMaterial color="white" /></Box>
      <Box args={[0.1, 0.01, SERVICE_LINE_Z * 2]} position={[0, 0.05, 0]}><meshStandardMaterial color="white" /></Box>
    </>
  );
}

export default Court;