// src/utils/aiController.js
import { Vector3 } from 'three';
import { PLAY_STYLES, DIFFICULTY_LEVELS } from '../stores/gameStore';
import { SHOT_TYPES, SERVE_TYPES, calculateShotParameters, calculateServeStrategy } from './shotTypes';

export class AIController {
  constructor(playerAttributes, difficulty = 'MEDIUM') {
    // Initialize serve history
    this.previousServes = [];
    this.serveInProgress = false;
    this.isServingGame = false;
    this.baseAttributes = playerAttributes;
    this.targetPosition = new Vector3(0, 0, -8);
    this.lastDecisionTime = 0;
    this.decisionInterval = 100;
    this.currentState = 'idle';
    this.ballLastPosition = new Vector3();
    this.predictedBallPosition = new Vector3();
    this.rallyCount = 0;
    
    // Determine play style based on player attributes
    this.playStyle = this.determinePlayStyle(playerAttributes);
    
    // Apply difficulty multiplier
    this.difficultyMultiplier = DIFFICULTY_LEVELS[difficulty].multiplier;
    
    // Calculate effective attributes
    this.attributes = this.calculateEffectiveAttributes(
      playerAttributes,
      this.playStyle,
      this.difficultyMultiplier
    );

    // Set behavior parameters based on play style
    this.setBehaviorParameters();
  }

  determinePlayStyle(attributes) {
    if (attributes.power > 85 && attributes.speed > 85) {
      return PLAY_STYLES.AGGRESSIVE;
    } else if (attributes.accuracy > 85 && attributes.stamina > 85) {
      return PLAY_STYLES.DEFENSIVE;
    } else if (attributes.volley > 85) {
      return PLAY_STYLES.SERVE_AND_VOLLEY;
    } else {
      return PLAY_STYLES.ALLROUND;
    }
  }

  calculateEffectiveAttributes(baseAttributes, playStyle, difficultyMultiplier) {
    const effective = { ...baseAttributes };
    
    // Apply play style multipliers
    effective.power *= playStyle.attributes.powerMultiplier;
    effective.accuracy *= playStyle.attributes.accuracyMultiplier;
    
    // Apply difficulty multiplier to all attributes
    Object.keys(effective).forEach(attr => {
      effective[attr] *= difficultyMultiplier;
      // Ensure attributes stay within reasonable bounds
      effective[attr] = Math.min(100, Math.max(0, effective[attr]));
    });

    return effective;
  }

  setBehaviorParameters() {
    const style = this.playStyle.attributes;
    
    // Set reaction time based on speed and difficulty
    this.reactionDelay = (100 - this.attributes.speed) / 100;
    
    // Set positioning preferences
    this.preferredDistance = style.netApproach === true ? 3 :
                            style.netApproach === 'aggressive' ? 4 :
                            style.netApproach === 'situational' ? 6 : 8;
    
    // Set risk taking behavior
    this.riskFactor = style.riskTaking === 'high' ? 1.2 :
                      style.riskTaking === 'medium' ? 1 : 0.8;
  }

  // Calculate optimal position based on ball trajectory and play style
  calculateInterceptPosition(ballPosition, ballVelocity) {
    const prediction = new Vector3().copy(ballPosition);
    prediction.add(new Vector3().copy(ballVelocity).multiplyScalar(0.5));
    
    // Adjust based on play style
    if (this.playStyle === PLAY_STYLES.SERVE_AND_VOLLEY) {
      // Move closer to net
      prediction.z = Math.max(-8, Math.min(-4, prediction.z));
    } else if (this.playStyle === PLAY_STYLES.DEFENSIVE) {
      // Stay back more
      prediction.z = Math.max(-11, Math.min(-7, prediction.z));
    } else {
      // Standard positioning
      prediction.z = Math.max(-11, Math.min(-4, prediction.z));
    }
    
    // Limit x-position to court width
    prediction.x = Math.max(-5, Math.min(5, prediction.x));
    
    return prediction;
  }

  // Decide whether to attempt a shot based on play style
  shouldHit(ballPosition, playerPosition) {
    const distance = new Vector3().copy(ballPosition).distanceTo(playerPosition);
    const baseRange = 2 * this.riskFactor; // Adjust range based on risk taking
    
    // Aggressive players will attempt more difficult shots
    const maxDistance = this.playStyle === PLAY_STYLES.AGGRESSIVE ? 
      baseRange * 1.2 : baseRange;
      
    return distance < maxDistance && ballPosition.z < -2;
  }

  // Calculate optimal shot parameters based on play style and situation
  calculateShot(ballPosition, opponentPosition, gameState) {
    // Determine if this is a serve
    if (this.serveInProgress) {
      const serveStrategy = calculateServeStrategy(
        this.attributes,
        gameState,
        this.previousServes
      );
      
      // Record serve type
      this.previousServes.push(serveStrategy.serveType.name);
      if (this.previousServes.length > 3) this.previousServes.shift();
      
      // Return serve parameters
      return {
        ...calculateShotParameters(serveStrategy.serveType, this.attributes, gameState.courtSurface),
        targetPosition: serveStrategy.targetPosition,
        shotType: serveStrategy.serveType.name
      };
    }

    // Regular shot selection
    let selectedShot;
    const opponentDistance = new Vector3().copy(opponentPosition).distanceTo(ballPosition);
    const ballHeight = ballPosition.y;
    const playerPosition = new Vector3().copy(this.targetPosition);
    
    // Shot selection based on situation
    if (ballHeight > 2.5) {
      // High ball - good for aggressive shots
      selectedShot = this.playStyle === PLAY_STYLES.AGGRESSIVE ? 
        SHOT_TYPES.FLAT : SHOT_TYPES.TOPSPIN;
    } else if (opponentDistance > 8) {
      // Opponent far from position - try drop shot
      selectedShot = Math.random() > 0.7 ? SHOT_TYPES.DROP_SHOT : SHOT_TYPES.SLICE;
    } else if (playerPosition.z < -6) {
      // Deep in our court - defensive play
      selectedShot = SHOT_TYPES.TOPSPIN;
    } else if (this.rallyCount > 6) {
      // Long rally - mix it up
      const shots = [SHOT_TYPES.FLAT, SHOT_TYPES.TOPSPIN, SHOT_TYPES.SLICE];
      selectedShot = shots[Math.floor(Math.random() * shots.length)];
    } else {
      // Default shot based on play style
      switch(this.playStyle.attributes.riskTaking) {
        case 'high':
          selectedShot = Math.random() > 0.3 ? SHOT_TYPES.FLAT : SHOT_TYPES.TOPSPIN;
          break;
        case 'low':
          selectedShot = Math.random() > 0.3 ? SHOT_TYPES.SLICE : SHOT_TYPES.TOPSPIN;
          break;
        default:
          selectedShot = SHOT_TYPES.TOPSPIN;
      }
    }

    // Calculate base parameters
    const params = calculateShotParameters(selectedShot, this.attributes, gameState.courtSurface);
    
    // Calculate target position
    let targetX = opponentPosition.x > 0 ? -5 : 5;
    let targetZ = 8;

    // Adjust target based on play style and situation
    switch(this.playStyle.attributes.riskTaking) {
      case 'high':
        targetX = Math.sign(targetX) * (4 + Math.random() * 2);
        targetZ = selectedShot === SHOT_TYPES.DROP_SHOT ? 3 : 7 + Math.random() * 4;
        break;
      case 'medium':
        targetX = Math.sign(targetX) * (3 + Math.random() * 3);
        targetZ = selectedShot === SHOT_TYPES.DROP_SHOT ? 4 : 6 + Math.random() * 4;
        break;
      case 'low':
        targetX = Math.sign(targetX) * (2 + Math.random() * 3);
        targetZ = selectedShot === SHOT_TYPES.DROP_SHOT ? 5 : 5 + Math.random() * 4;
        break;
    }

    // Apply accuracy and randomness
    const randomOffset = (100 - params.accuracy) / 100 * 4;

    return {
      targetPosition: new Vector3(
        targetX + (Math.random() - 0.5) * randomOffset,
        selectedShot.heightMultiplier,
        targetZ
      ),
      power: params.power,
      spin: params.spin,
      shotType: selectedShot.name
    };
  }

  // Main update function called every frame
  update(ballPosition, ballVelocity, playerPosition, opponentPosition, gameState, deltaTime) {
    const now = Date.now();
    
    // Apply reaction delay based on difficulty and attributes
    if (now - this.lastDecisionTime < this.decisionInterval * this.reactionDelay) {
      return null;
    }
    this.lastDecisionTime = now;

    // Check if this is a serving game
    if (gameState.servingPlayer === 'player2' && !this.isServingGame) {
      this.isServingGame = true;
      this.serveInProgress = true;
      this.currentState = 'serving';
    }

    // Store ball position for trajectory prediction
    this.ballLastPosition.copy(ballPosition);

    // Update AI state with play style considerations
    switch (this.currentState) {
      case 'serving':
        if (this.serveInProgress) {
          const serveParams = this.calculateShot(ballPosition, opponentPosition, gameState);
          this.serveInProgress = false;
          return {
            type: 'serve',
            ...serveParams
          };
        }
        this.currentState = 'idle';
        break;
      case 'idle':
        if (ballPosition.z < 0) { // Ball on AI's side
          this.currentState = 'approaching';
          
          // Serve and volley players move forward more aggressively
          if (this.playStyle === PLAY_STYLES.SERVE_AND_VOLLEY && this.rallyCount === 0) {
            this.targetPosition.z = -4;
          }
        }
        break;

      case 'approaching':
        // Calculate position based on play style
        this.targetPosition = this.calculateInterceptPosition(ballPosition, ballVelocity);
        
        // Adjust positioning based on play style
        if (this.playStyle === PLAY_STYLES.DEFENSIVE) {
          // Stay further back
          this.targetPosition.z -= 2;
        } else if (this.playStyle === PLAY_STYLES.AGGRESSIVE && ballPosition.z > -6) {
          // Move forward more
          this.targetPosition.z += 1;
        }
        
        if (this.shouldHit(ballPosition, playerPosition)) {
          this.currentState = 'hitting';
        }
        break;

      case 'hitting':
        const shot = this.calculateShot(ballPosition, opponentPosition, gameState);
        
        // Reset rally count if ball goes out
        if (Math.abs(ballPosition.x) > 11 || Math.abs(ballPosition.z) > 12) {
          this.rallyCount = 0;
        }
        
        this.currentState = 'idle';
        return {
          type: 'hit',
          ...shot
        };

      default:
        this.currentState = 'idle';
        this.rallyCount = 0;
    }

    // Calculate movement with momentum based on play style
    const moveDirection = new Vector3()
      .copy(this.targetPosition)
      .sub(playerPosition)
      .normalize();

    // Adjust movement speed based on play style and situation
    const speed = this.playStyle === PLAY_STYLES.AGGRESSIVE ? 1.2 :
                 this.playStyle === PLAY_STYLES.DEFENSIVE ? 0.9 : 1;

    return {
      type: 'move',
      x: moveDirection.x * speed,
      z: moveDirection.z * speed
    };
  }
}
