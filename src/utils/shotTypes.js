// src/utils/shotTypes.js
import { Vector3 } from 'three';

export const SHOT_TYPES = {
  FLAT: {
    name: 'Flat',
    powerMultiplier: 1.2,
    spinMultiplier: 0.2,
    heightMultiplier: 0.8,
    accuracyModifier: -5,
    energyCost: 25
  },
  TOPSPIN: {
    name: 'Topspin',
    powerMultiplier: 0.9,
    spinMultiplier: 1.4,
    heightMultiplier: 1.2,
    accuracyModifier: 0,
    energyCost: 20
  },
  SLICE: {
    name: 'Slice',
    powerMultiplier: 0.7,
    spinMultiplier: -1.2, // Negative for backspin
    heightMultiplier: 0.7,
    accuracyModifier: 5,
    energyCost: 15
  },
  LOB: {
    name: 'Lob',
    powerMultiplier: 0.6,
    spinMultiplier: 0.8,
    heightMultiplier: 2.5, // Increased for a higher arc
    accuracyModifier: -10,
    energyCost: 15
  },
  DROP_SHOT: {
    name: 'Drop Shot',
    powerMultiplier: 0.3,
    spinMultiplier: -0.8,
    heightMultiplier: 1.1,
    accuracyModifier: -5,
    energyCost: 20
  }
};

export const SERVE_TYPES = {
  FLAT_SERVE: {
    name: 'Flat Serve',
    powerMultiplier: 1.3,
    spinMultiplier: 0.6,
    heightMultiplier: 1.0,
    accuracyModifier: -10,
    energyCost: 30,
    positions: {
      deuce: [
        new Vector3(4, 0, -8),    // Body
        new Vector3(5.5, 0, -8)     // T-line
      ],
      ad: [
        new Vector3(-4, 0, -8),    // Body
        new Vector3(-5.5, 0, -8)     // T-line
      ]
    }
  },
  SLICE_SERVE: {
    name: 'Slice Serve',
    powerMultiplier: 0.9,
    spinMultiplier: -1.4,
    heightMultiplier: 0.9,
    accuracyModifier: -5,
    energyCost: 25,
    positions: {
      deuce: [
        new Vector3(5, 0, -7),    // Wide body
        new Vector3(4, 0, -8)     // T-line
      ],
      ad: [
        new Vector3(-5, 0, -7),
        new Vector3(-4, 0, -8)
      ]
    }
  },
  KICK_SERVE: {
    name: 'Kick Serve',
    powerMultiplier: 0.8,
    spinMultiplier: 1.6,
    heightMultiplier: 1.4,
    accuracyModifier: 0,
    energyCost: 28,
    positions: {
      deuce: [
        new Vector3(4.5, 0, -6), // Body
        new Vector3(3, 0, -8)    // T-line
      ],
      ad: [
        new Vector3(-4.5, 0, -6),
        new Vector3(-3, 0, -8)
      ]
    }
  }
};

export function calculateShotParameters(shotType, playerAttributes, courtSurface) {
  let params = {
    power: 0,
    spin: 0,
    height: 0,
    accuracy: 0,
  };

  params.power = playerAttributes.power * shotType.powerMultiplier;
  params.spin = playerAttributes.spin * shotType.spinMultiplier;
  params.accuracy = playerAttributes.accuracy + shotType.accuracyModifier;
  
  // Adjust for court surface
  switch(courtSurface) {
    case 'clay':
      params.spin *= 1.2;
      params.power *= 0.9;
      break;
    case 'grass':
      params.spin *= 0.8;
      params.power *= 1.1;
      break;
    case 'hard':
    default:
      break;
  }

  return params;
}

export function calculateServeStrategy(playerAttributes, gameState, previousServes = []) {
  const isImportantPoint = (gameState.points === 30 && gameState.games >= 4) || gameState.points === 40;
  
  let serveTypeProbs = {
    FLAT_SERVE: playerAttributes.power / 100,
    SLICE_SERVE: playerAttributes.spin / 100,
    KICK_SERVE: playerAttributes.accuracy / 100
  };

  if (previousServes.length > 0) {
    const lastServe = previousServes[previousServes.length - 1];
    if (serveTypeProbs[lastServe]) {
      serveTypeProbs[lastServe] *= 0.7; 
    }
  }

  const serveType = selectBasedOnProbability(serveTypeProbs);
  
  const courtSide = gameState.points % 2 === 0 ? 'deuce' : 'ad';
  let positionIndex = Math.floor(Math.random() * SERVE_TYPES[serveType].positions[courtSide].length);

  return {
    serveType: SERVE_TYPES[serveType],
    targetPosition: SERVE_TYPES[serveType].positions[courtSide][positionIndex]
  };
}

function selectBasedOnProbability(probs) {
  const total = Object.values(probs).reduce((sum, p) => sum + p, 0);
  let random = Math.random() * total;
  
  for (const [type, prob] of Object.entries(probs)) {
    random -= prob;
    if (random <= 0) return type;
  }
  
  return Object.keys(probs)[0];
}