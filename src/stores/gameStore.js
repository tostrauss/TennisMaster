// src/stores/gameStore.js
import { create } from 'zustand';

const useGameStore = create((set) => ({
  gamePhase: 'menu', // 'menu', 'select', 'playing'
  setGamePhase: (phase) => set({ gamePhase: phase }),

  player1: null,
  player2: null,
  setPlayer1: (player) => set({ player1: player }),
  setPlayer2: (player) => set({ player2: player }),
}));

export default useGameStore;