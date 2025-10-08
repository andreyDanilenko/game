import { writable } from 'svelte/store';

// Прогресс игрока по уровням
export const playerProgress = writable<Record<number, {
  completed: boolean;
  objectives: Record<string, number>;
  score: number;
}>>({});
