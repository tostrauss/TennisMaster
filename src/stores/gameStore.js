// src/stores/gameStore.js
import { create } from 'zustand';
import { courts } from '../data/players';

export const DIFFICULTY_LEVELS = {
  EASY: { label: 'Easy', multiplier: 0.7 },
  MEDIUM: { label: 'Medium', multiplier: 0.85 },
  HARD: { label: 'Hard', multiplier: 1 },
  PRO: { label: 'Pro', multiplier: 1.15 }
};

export const PLAY_STYLES = {
  AGGRESSIVE: {
    label: 'Aggressive',
    attributes: {
      powerMultiplier: 1.2,
      accuracyMultiplier: 0.9,
      netApproach: true,
      riskTaking: 'high'
    }
  },
  DEFENSIVE: {
    label: 'Defensive',
    attributes: {
      powerMultiplier: 0.9,
      accuracyMultiplier: 1.1,
      netApproach: false,
      riskTaking: 'low'
    }
  },
  ALLROUND: {
    label: 'All-Round',
    attributes: {
      powerMultiplier: 1,
      accuracyMultiplier: 1,
      netApproach: 'situational',
      riskTaking: 'medium'
    }
  },
  SERVE_AND_VOLLEY: {
    label: 'Serve & Volley',
    attributes: {
      powerMultiplier: 1.1,
      accuracyMultiplier: 0.95,
      netApproach: 'aggressive',
      riskTaking: 'high'
    }
  }
};

const useGameStore = create((set, get) => ({
  // Game Phase
  gamePhase: 'menu', // 'menu', 'select', 'playing', 'gameover'
  setGamePhase: (phase) => set({ gamePhase: phase }),

  // Players
  player1: null,
  player2: null,
  setPlayer1: (player) => set({ player1: player }),
  setPlayer2: (player) => set({ player2: player }),

  // Court Selection
  currentCourt: courts[0].id,
  setCurrentCourt: (courtId) => set({ currentCourt: courtId }),

  // Score
  score: {
    player1: { points: 0, games: 0, sets: 0 },
    player2: { points: 0, games: 0, sets: 0 }
  },
  
  // Score Update Logic
  addPoint: (player) => set((state) => {
    const newScore = { ...state.score };
    const currentPlayer = newScore[player];
    const otherPlayer = newScore[player === 'player1' ? 'player2' : 'player1'];

    // Tennis scoring: 0, 15, 30, 40, game
    switch (currentPlayer.points) {
      case 0: currentPlayer.points = 15; break;
      case 15: currentPlayer.points = 30; break;
      case 30: currentPlayer.points = 40; break;
      case 40:
        if (otherPlayer.points < 40) {
          // Win game
          currentPlayer.points = 0;
          otherPlayer.points = 0;
          currentPlayer.games++;
          
          // Check for set win
          if (currentPlayer.games >= 6 && currentPlayer.games - otherPlayer.games >= 2) {
            currentPlayer.games = 0;
            otherPlayer.games = 0;
            currentPlayer.sets++;
          }
        } else {
          // Deuce
          currentPlayer.points = 'AD';
        }
        break;
      case 'AD':
        // Win game
        currentPlayer.points = 0;
        otherPlayer.points = 0;
        currentPlayer.games++;
        break;
    }

    return { score: newScore };
  }),

  // Game State
  servingPlayer: 'player1',
  toggleServe: () => set((state) => ({ 
    servingPlayer: state.servingPlayer === 'player1' ? 'player2' : 'player1' 
  })),

  // Game Settings
  difficulty: 'MEDIUM',
  setDifficulty: (level) => set({ difficulty: level }),

  // Reset Game
  resetGame: () => set({
    score: {
      player1: { points: 0, games: 0, sets: 0 },
      player2: { points: 0, games: 0, sets: 0 }
    },
    servingPlayer: 'player1'
  })
}));

export default useGameStore;