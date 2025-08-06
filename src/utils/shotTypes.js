// src/utils/shotTypes.js
import { Vector3 } from 'three';

export const SHOT_TYPES = {
  FLAT: {
    name: 'Flat',
    powerMultiplier: 1.2,
    spinMultiplier: 0.7,
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
    heightMultiplier: 2.0,
    accuracyModifier: -10,
    energyCost: 15
  },
  DROP_SHOT: {
    name: 'Drop Shot',
    powerMultiplier: 0.4,
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
        new Vector3(10.5, 0, 8), // Wide
        new Vector3(8, 0, 8),    // Body
        new Vector3(6, 0, 8)     // T-line
      ],
      ad: [
        new Vector3(-10.5, 0, 8), // Wide
        new Vector3(-8, 0, 8),    // Body
        new Vector3(-6, 0, 8)     // T-line
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
        new Vector3(10.8, 0, 7), // Extra wide
        new Vector3(9, 0, 7),    // Wide body
        new Vector3(7, 0, 8)     // T-line
      ],
      ad: [
        new Vector3(-10.8, 0, 7),
        new Vector3(-9, 0, 7),
        new Vector3(-7, 0, 8)
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
        new Vector3(9, 0, 6),   // Wide
        new Vector3(7.5, 0, 7), // Body
        new Vector3(6, 0, 8)    // T-line
      ],
      ad: [
        new Vector3(-9, 0, 6),
        new Vector3(-7.5, 0, 7),
        new Vector3(-6, 0, 8)
      ]
    }
  }
};

// Helper function to calculate shot parameters
export function calculateShotParameters(shotType, playerAttributes, courtSurface) {
  // Base parameters
  let params = {
    power: 0,
    spin: 0,
    height: 0,
    accuracy: 0,
    trajectory: new Vector3()
  };

  // Apply shot type modifiers
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
      // Standard values
      break;
  }

  return params;
}

// Helper function to select serve type and position based on strategy
export function calculateServeStrategy(playerAttributes, gameState, previousServes = []) {
  const { points, games, sets } = gameState;
  const isImportantPoint = (points === 30 && games >= 4) || points === 40;
  
  // Calculate serve type probabilities based on player attributes and game state
  let serveTypeProbs = {
    FLAT_SERVE: playerAttributes.power / 100,
    SLICE_SERVE: playerAttributes.spin / 100,
    KICK_SERVE: playerAttributes.accuracy / 100
  };

  // Adjust probabilities based on previous serves (avoid repetition)
  if (previousServes.length > 0) {
    const lastServe = previousServes[previousServes.length - 1];
    serveTypeProbs[lastServe] *= 0.7; // Reduce probability of same serve
  }

  // Select serve type
  const serveType = selectBasedOnProbability(serveTypeProbs);
  
  // Select position based on game state and player tendencies
  const court = points % 2 === 0 ? 'deuce' : 'ad';
  let positionIndex;

  if (isImportantPoint) {
    // On important points, favor the player's strength
    positionIndex = playerAttributes.accuracy > 85 ? 2 : // T-line for accurate players
                    playerAttributes.power > 85 ? 0 : 1; // Wide for powerful players, body for others
  } else {
    // Regular points - mix it up
    positionIndex = Math.floor(Math.random() * 3);
  }

  return {
    serveType: SERVE_TYPES[serveType],
    targetPosition: SERVE_TYPES[serveType].positions[court][positionIndex]
  };
}

function selectBasedOnProbability(probs) {
  const total = Object.values(probs).reduce((sum, p) => sum + p, 0);
  let random = Math.random() * total;
  
  for (const [type, prob] of Object.entries(probs)) {
    random -= prob;
    if (random <= 0) return type;
  }
  
  return Object.keys(probs)[0]; // Fallback
}
