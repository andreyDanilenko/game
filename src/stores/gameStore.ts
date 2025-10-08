import { writable, Writable } from 'svelte/store';

// Определяем интерфейсы
export interface ScreenState {
  value: 'start' | 'game' | 'levelComplete' | 'gameComplete' | 'levelFailed';
}

export interface StatState {
  score: number;
  level: number;
  gameTime: number;
  power: number;
  gameRunning: boolean;
  gameWon: boolean;
}

export interface PlayerState {
  armor: number;
}

export interface LevelCompleteData {
  title: string;
  score: number;
  asteroidsDestroyed: number;
}

export interface LevelFailedData {
  title: string;
  score: number;
  survivalTime: number;
  asteroidsDestroyed: number;
}

export interface GameCompleteData {
  finalScore: number;
  levelsCompleted: number;
}

export interface ScreenData {
  levelComplete: LevelCompleteData;
  levelFailed: LevelFailedData;
  gameComplete: GameCompleteData;
}

// Начальные состояния
const initialScreenState: ScreenState['value'] = 'start';
const initialPlayerState: PlayerState = {
  armor: 0
}


const initialStatState: StatState = {
  score: 0,
  level: 1,
  gameTime: 60,
  power: 0,
  gameRunning: false,
  gameWon: false,
};

const initialScreenData: ScreenData = {
  levelComplete: { title: '', score: 0, asteroidsDestroyed: 0 },
  levelFailed: { title: '', score: 0, survivalTime: 0, asteroidsDestroyed: 0 },
  gameComplete: { finalScore: 0, levelsCompleted: 0 }
};

// Создаем stores с явными типами
export const screenState: Writable<ScreenState['value']> = writable(initialScreenState);
export const playerState: Writable<PlayerState> = writable(initialPlayerState);
export const statState: Writable<StatState> = writable(initialStatState);
export const screenData: Writable<ScreenData> = writable(initialScreenData);

// Функции сброса
export function resetStore(): void {
  statState.set(initialStatState);
  screenData.set(initialScreenData);
  screenState.set(initialScreenState);
}

export function resetGame(): void {
  statState.set(initialStatState);
}

export function resetScreenData(): void {
  screenData.set(initialScreenData);
}

export function resetScreenState(): void {
  screenState.set(initialScreenState);
}
