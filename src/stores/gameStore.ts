import { writable } from 'svelte/store';

export const gameState = writable({
  currentScreen: 'start' as 'start' | 'game' | 'levelComplete' | 'gameComplete' | 'levelFailed'
});

// ТОЛЬКО данные для экранов завершения
export const screenData = writable({
  levelComplete: {
    title: '',
    score: 0,
    asteroidsDestroyed: 0
  },
  levelFailed: {
    title: '', 
    score: 0,
    survivalTime: 0,
    asteroidsDestroyed: 0
  },
  gameComplete: {
    finalScore: 0,
    levelsCompleted: 0
  }
});
