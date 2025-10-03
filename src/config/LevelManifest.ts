import { LevelConfig } from '../types/LevelTypes';

export const LevelManifest: Record<number, LevelConfig> = {
  // УРОВНИ 1-7: ЛЕГКИЕ (для обучения и тестирования)
  1: {
    id: 1,
    name: "Космический дебют",
    description: "Освойтесь в космосе",
    background: "deep_space",
    gameSpeed: 1.0,
    worldScale: 1.0,
    duration: 25,
    music: 'music_level1',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 25, description: "Выжить 25 секунд", current: 0 },
      { type: 'collect', target: 8, description: "Собрать 8 звезд", current: 0 }
    ],
    spawnSettings: { stars: 6, powerStars: 1, asteroids: 4 }
  },
  2: {
    id: 2,
    name: "Первые астероиды", 
    description: "Научитесь избегать препятствия",
    background: "deep_space",
    gameSpeed: 1.1,
    worldScale: 1.1,
    duration: 30,
    music: '',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 30, description: "Выжить 30 секунд", current: 0 },
      { type: 'collect', target: 12, description: "Собрать 12 звезд", current: 0 },
      { type: 'destroy', target: 5, description: "Уничтожить 5 астероидов", current: 0 }
    ],
    spawnSettings: { stars: 8, powerStars: 2, asteroids: 6 }
  },
  3: {
    id: 3,
    name: "Звездный сборщик",
    description: "Соберите как можно больше звезд",
    background: "nebula",
    gameSpeed: 1.0,
    worldScale: 1.2,
    duration: 35,
    music: '',
    difficulty: 'easy',
    objectives: [
      { type: 'collect', target: 20, description: "Собрать 20 звезд", current: 0 },
      { type: 'reach_score', target: 300, description: "Набрать 300 очков", current: 0 }
    ],
    spawnSettings: { stars: 10, powerStars: 2, asteroids: 5 }
  },
  4: {
    id: 4,
    name: "Расширяющаяся вселенная",
    description: "Мир становится больше",
    background: "deep_space", 
    gameSpeed: 1.0,
    worldScale: 1.5,
    duration: 40,
    music: '',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 40, description: "Выжить 40 секунд", current: 0 },
      { type: 'collect', target: 15, description: "Собрать 15 звезд", current: 0 }
    ],
    spawnSettings: { stars: 9, powerStars: 2, asteroids: 7 }
  },
  5: {
    id: 5,
    name: "Тренировка с POWER",
    description: "Освойте взрывную волну",
    background: "nebula",
    gameSpeed: 1.1,
    worldScale: 1.3,
    duration: 35,
    music: '',
    difficulty: 'easy',
    objectives: [
      { type: 'destroy', target: 10, description: "Уничтожить 10 астероидов", current: 0 },
      { type: 'collect', target: 18, description: "Собрать 18 звезд", current: 0 }
    ],
    spawnSettings: { stars: 8, powerStars: 3, asteroids: 8 }
  },
  6: {
    id: 6, 
    name: "Скоростной полет",
    description: "Астероиды начинают двигаться быстрее",
    background: "deep_space",
    gameSpeed: 1.3,
    worldScale: 1.2,
    duration: 30,
    music: '',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 30, description: "Выжить 30 секунд", current: 0 },
      { type: 'reach_score', target: 400, description: "Набрать 400 очков", current: 0 }
    ],
    spawnSettings: { stars: 7, powerStars: 2, asteroids: 9 }
  },
  7: {
    id: 7,
    name: "Комбинированная задача",
    description: "Проверьте все навыки",
    background: "nebula",
    gameSpeed: 1.2,
    worldScale: 1.4,
    duration: 45,
    music: '',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 45, description: "Выжить 45 секунд", current: 0 },
      { type: 'collect', target: 25, description: "Собрать 25 звезд", current: 0 },
      { type: 'destroy', target: 12, description: "Уничтожить 12 астероидов", current: 0 }
    ],
    spawnSettings: { stars: 11, powerStars: 3, asteroids: 10 }
  },

  // УРОВНИ 8-9: СРЕДНЕЙ СЛОЖНОСТИ
  8: {
    id: 8,
    name: "Астероидный шторм", 
    description: "Интенсивность возрастает",
    background: "asteroid_field",
    gameSpeed: 1.4,
    worldScale: 1.6,
    duration: 50,
    music: '',
    difficulty: 'medium',
    objectives: [
      { type: 'survive', target: 50, description: "Выжить 50 секунд", current: 0 },
      { type: 'collect', target: 30, description: "Собрать 30 звезд", current: 0 },
      { type: 'destroy', target: 18, description: "Уничтожить 18 астероидов", current: 0 }
    ],
    spawnSettings: { stars: 12, powerStars: 3, asteroids: 14 }
  },
  9: {
    id: 9,
    name: "Космический марафон", 
    description: "Выносливость и стратегия",
    background: "asteroid_field",
    gameSpeed: 1.5,
    worldScale: 1.8,
    duration: 60,
    music: '',
    difficulty: 'medium',
    objectives: [
      { type: 'survive', target: 60, description: "Выжить 60 секунд", current: 0 },
      { type: 'reach_score', target: 800, description: "Набрать 800 очков", current: 0 },
      { type: 'collect', target: 35, description: "Собрать 35 звезд", current: 0 }
    ],
    spawnSettings: { stars: 13, powerStars: 4, asteroids: 16 }
  },

  // УРОВЕНЬ 10: СЛОЖНЫЙ
  10: {
    id: 10,
    name: "Звездный охотник",
    description: "Финальное испытание",
    background: "nebula",
    gameSpeed: 1.6,
    worldScale: 2.0,
    duration: 75,
    music: '',
    difficulty: 'hard',
    objectives: [
      { type: 'reach_score', target: 1200, description: "Набрать 1200 очков", current: 0 },
      { type: 'collect', target: 40, description: "Собрать 40 звезд", current: 0 },
      { type: 'destroy', target: 25, description: "Уничтожить 25 астероидов", current: 0 }
    ],
    spawnSettings: { stars: 15, powerStars: 4, asteroids: 18 }
  }
};
