// src/utils/aiController.js
import { Vector3 } from 'three';
import { PLAY_STYLES, DIFFICULTY_LEVELS } from '../stores/gameStore';
import { SHOT_TYPES, SERVE_TYPES, calculateShotParameters, calculateServeStrategy } from './shotTypes';

export class AIController {
  constructor(playerAttributes, difficulty = 'MEDIUM') {
    this.baseAttributes = playerAttributes;
    this.targetPosition = new Vector3(0, 0.5, -10);
    this.lastDecisionTime = 0;
    this.decisionInterval = 120; // ms between decisions
    this.currentState = 'idle';
    this.ballLastPosition = new Vector3();
    this.rallyCount = 0;
    
    this.playStyle = this.determinePlayStyle(playerAttributes);
    this.difficultyMultiplier = DIFFICULTY_LEVELS[difficulty].multiplier;
    this.attributes = this.calculateEffectiveAttributes(playerAttributes, this.playStyle, this.difficultyMultiplier);

    this.setBehaviorParameters();
  }

  determinePlayStyle(attributes) {
    if (attributes.power > 88 && attributes.volley > 80) return PLAY_STYLES.AGGRESSIVE;
    if (attributes.accuracy > 88 && attributes.stamina > 85) return PLAY_STYLES.DEFENSIVE;
    if (attributes.volley > 88 && attributes.power > 85) return PLAY_STYLES.SERVE_AND_VOLLEY;
    return PLAY_STYLES.ALLROUND;
  }

  calculateEffectiveAttributes(base, style, difficulty) {
    const effective = { ...base };
    effective.power *= style.attributes.powerMultiplier;
    effective.accuracy *= style.attributes.accuracyMultiplier;
    Object.keys(effective).forEach(attr => {
      effective[attr] *= difficulty;
      effective[attr] = Math.min(100, Math.max(0, effective[attr]));
    });
    return effective;
  }

  setBehaviorParameters() {
    const style = this.playStyle.attributes;
    // Reaction time is inversely proportional to speed and difficulty
    this.reactionDelay = (110 - this.attributes.speed) * (1 / this.difficultyMultiplier);
    this.riskFactor = style.riskTaking === 'high' ? 1.2 : style.riskTaking === 'medium' ? 1 : 0.8;
  }

  calculateInterceptPosition(ballPos, ballVel) {
    const timeToNet = Math.abs(ballPos.z / (ballVel.z || -1));
    const predictedX = ballPos.x + ballVel.x * timeToNet * 0.8; // Predict where it will cross the net
    
    // Clamp to court boundaries
    const targetX = Math.max(-4, Math.min(4, predictedX));
    let targetZ = -8; // Default baseline position

    // Adjust Z based on play style and ball height
    if (this.playStyle.attributes.netApproach) {
      targetZ = -6; // Move up for volleys
    }
    if (ballPos.y > 2) { // High ball, good to attack
      targetZ = -5;
    }

    return new Vector3(targetX, 0.5, targetZ);
  }

  shouldHit(ballPosition, playerPosition) {
    const distance = ballPosition.distanceTo(playerPosition);
    const isBallApproaching = ballPosition.z < this.ballLastPosition.z;
    // Only hit if the ball is within range and coming towards the AI
    return distance < 3.5 && isBallApproaching && ballPosition.z < -1;
  }

  calculateShot(ballPosition, opponentPosition, gameState) {
    let selectedShotType;
    const opponentIsAtNet = opponentPosition.z > 5;
    const isBallHigh = ballPosition.y > 1.5;

    if (opponentIsAtNet) {
      selectedShotType = SHOT_TYPES.LOB;
    } else if (isBallHigh) {
      selectedShotType = SHOT_TYPES.FLAT; // Aggressive smash
    } else {
      // Basic rally shot selection
      const random = Math.random();
      if (random < 0.6) selectedShotType = SHOT_TYPES.TOPSPIN;
      else if (random < 0.9) selectedShotType = SHOT_TYPES.SLICE;
      else selectedShotType = SHOT_TYPES.DROP_SHOT;
    }

    const params = calculateShotParameters(selectedShotType, this.attributes, gameState.courtSurface);
    
    // Aim away from the opponent
    const targetX = -opponentPosition.x * 0.8;
    const targetZ = 10; // Aim deep
    
    const randomOffset = (100 - params.accuracy) / 100 * 5; // Higher means less accurate

    return {
      power: params.power,
      spin: params.spin,
      accuracy: params.accuracy,
      shotType: selectedShotType.name,
      targetPosition: new Vector3(
        targetX + (Math.random() - 0.5) * randomOffset,
        0.5,
        targetZ
      ),
    };
  }

  update(ballPosition, ballVelocity, playerPosition, opponentPosition, gameState, deltaTime) {
    const now = performance.now();
    this.ballLastPosition.copy(ballPosition);

    if (now - this.lastDecisionTime < this.reactionDelay) {
      return null;
    }
    this.lastDecisionTime = now;

    const ballOnOurSide = ballPosition.z < 0;

    if (ballOnOurSide) {
      this.targetPosition = this.calculateInterceptPosition(ballPosition, ballVelocity);

      if (this.shouldHit(ballPosition, playerPosition)) {
        this.rallyCount++;
        const shot = this.calculateShot(ballPosition, opponentPosition, gameState);
        return { type: 'hit', ...shot };
      }
    } else {
      // If ball is not on our side, return to a neutral position
      this.targetPosition.set(0, 0.5, -10);
      this.rallyCount = 0;
    }

    const moveDirection = new Vector3()
      .copy(this.targetPosition)
      .sub(playerPosition);

    if (moveDirection.length() > 0.5) { // Only move if far enough
        moveDirection.normalize();
        return {
            type: 'move',
            x: moveDirection.x,
            z: moveDirection.z
        };
    }

    return null; // No action
  }
}