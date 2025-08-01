import { create } from 'zustand';

export const useGameStore = create((set) => ({
  gamePhase: 'menu', // 'menu', 'select', 'playing'
  player: null,
  opponent: null,
  setPhase: (phase) => set({ gamePhase: phase }),
  selectPlayer: (player) => set({ player }),
  startGame: () => set({ gamePhase: 'playing' }),
}));