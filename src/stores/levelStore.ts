import { Writable, writable } from 'svelte/store';
import { LevelObjective } from '../types/LevelTypes';

const initialObjectivesState: LevelObjective[] = [];

export const objectives: Writable<LevelObjective[]> = writable(initialObjectivesState);

// Добавь подписку для дебага
objectives.subscribe(value => {
  console.log('🔄 Objectives store updated:', value);
  console.log('📊 Types:', value.map(obj => obj.type));
});
