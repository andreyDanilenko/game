import { writable } from 'svelte/store';

type ScreenState = 'start' | 'game' | 'levelComplete' | 'gameComplete' | 'levelFailed'

const initialScreenState: ScreenState = 'start';
const initialStatState = {
  score: 0,
  level: 1,
  gameTime: 60,
  power: 0,
  gameRunning: false,
  gameWon: false,
  animationId: null
};
const initialScreenData = {
  levelComplete: { title: '', score: 0, asteroidsDestroyed: 0 },
  levelFailed: { title: '', score: 0, survivalTime: 0, asteroidsDestroyed: 0 },
  gameComplete: { finalScore: 0, levelsCompleted: 0 }
};


export const screenState = writable(initialScreenState as ScreenState);
export const statState = writable(initialStatState);
export const screenData = writable(initialScreenData);

export function resetStore() {
  statState.set(initialStatState);
  screenData.set(initialScreenData);
  screenState.set(initialScreenState);
}

export function resetGame() {
  statState.set(initialStatState);
}

export function resetScreenData() {
  screenData.set(initialScreenData);
}

export function resetScreenState() {
  screenState.set(initialScreenState);
}

