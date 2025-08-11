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
    attributes: { powerMultiplier: 1.2, accuracyMultiplier: 0.9, netApproach: true, riskTaking: 'high' }
  },
  DEFENSIVE: {
    label: 'Defensive',
    attributes: { powerMultiplier: 0.9, accuracyMultiplier: 1.1, netApproach: false, riskTaking: 'low' }
  },
  ALLROUND: {
    label: 'All-Round',
    attributes: { powerMultiplier: 1, accuracyMultiplier: 1, netApproach: 'situational', riskTaking: 'medium' }
  },
  SERVE_AND_VOLLEY: {
    label: 'Serve & Volley',
    attributes: { powerMultiplier: 1.1, accuracyMultiplier: 0.95, netApproach: 'aggressive', riskTaking: 'high' }
  }
};

const useGameStore = create((set, get) => ({
  gamePhase: 'menu', // 'menu', 'select', 'playing', 'tournament', 'gameover'
  setGamePhase: (phase) => set({ gamePhase: phase }),

  pointState: 'serving', // 'serving', 'rally', 'point_over'
  setPointState: (state) => set({ pointState: state }),

  player1: null,
  player2: null,
  setPlayer1: (player) => set({ player1: player }),
  setPlayer2: (player) => set({ player2: player }),
  
  currentCourt: courts[0].id,
  setCurrentCourt: (courtId) => set({ currentCourt: courtId }),

  score: {
    player1: { points: 0, games: 0, sets: 0 },
    player2: { points: 0, games: 0, sets: 0 }
  },
  servingPlayer: 'player1',
  
  difficulty: 'MEDIUM',
  setDifficulty: (level) => set({ difficulty: level }),

  activeTournamentMatch: null,
  lastMatchWinner: null,
  
  startTournamentMatch: (match) => {
    set({
      activeTournamentMatch: match,
      player1: match.player1,
      player2: match.player2,
      gamePhase: 'playing',
      lastMatchWinner: null
    });
    get().resetGame();
  },

  addPoint: (player) => {
    set((state) => {
      const newScore = JSON.parse(JSON.stringify(state.score));
      const p = player; // 'player1' or 'player2'
      const o = player === 'player1' ? 'player2' : 'player1';

      // This function is called when a point is won
      const onPointEnd = (nextState = {}) => {
        return { ...nextState, pointState: 'serving' };
      };
      
      const winGame = () => {
        newScore[p].games++;
        newScore.player1.points = 0;
        newScore.player2.points = 0;
        
        // Check for set win
        if (newScore[p].games >= 6 && newScore[p].games - newScore[o].games >= 2) {
          newScore[p].sets++;
          newScore[p].games = 0;
          newScore[o].games = 0;
        }

        // Check for match win (Best of 3 sets)
        if (newScore[p].sets >= 2) {
          const winner = state[p];
          if (state.activeTournamentMatch) {
            return onPointEnd({
              gamePhase: 'tournament',
              lastMatchWinner: winner,
              activeTournamentMatch: null
            });
          } else {
            return onPointEnd({ gamePhase: 'gameover' });
          }
        }
        // Switch server after a game is won
        return onPointEnd({ score: newScore, servingPlayer: state.servingPlayer === 'player1' ? 'player2' : 'player1' });
      };

      const pPoints = newScore[p].points;
      const oPoints = newScore[o].points;

      if (pPoints === 0) newScore[p].points = 15;
      else if (pPoints === 15) newScore[p].points = 30;
      else if (pPoints === 30) newScore[p].points = 40;
      else if (pPoints === 40) {
        if (oPoints === 40) newScore[p].points = 'AD'; // Advantage
        else if (oPoints === 'AD') newScore[o].points = 40; // Deuce
        else return winGame();
      } else if (pPoints === 'AD') {
        return winGame();
      }
      return onPointEnd({ score: newScore });
    });
  },

  resetGame: () => set({
    score: {
      player1: { points: 0, games: 0, sets: 0 },
      player2: { points: 0, games: 0, sets: 0 }
    },
    servingPlayer: 'player1',
    pointState: 'serving'
  })
}));

export default useGameStore;