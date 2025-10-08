import { LevelConfig } from '../types/LevelTypes';

export const LevelManifest: Record<number, LevelConfig> = {
  // УРОВНИ 1-7: ЛЕГКИЕ (для обучения и тестирования)
  1: {
    id: 1,
    name: "Космический дебют",
    description: "Освойтесь в космосе",
    background: "deep_space",
    gameSpeed: 1.0,
    worldScale: 1.5,
    duration: 15,
    music: 'music_level10',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 15, description: "Выжить 30 секунд", current: 0 },
      { type: 'reach_score', target: 500, description: "Набрать 500 очков", current: 0},
      { type: 'collect', target: 5, description: "Собрать 5 звезд", current: 0 },
      { type: 'destroy', target: 1, description: "Уничтожить 1 астероид", current: 0 }
    ],
    spawnSettings: { stars: 15, powerStars: 3, asteroids: 10, armor: 10 }
  },
  2: {
    id: 2,
    name: "Первые астероиды", 
    description: "Научитесь избегать препятствия",
    background: "deep_space",
    gameSpeed: 1.1,
    worldScale: 1.5,
    duration: 30,
    music: 'music_level9',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 30, description: "Выжить 30 секунд", current: 0 },
      { type: 'reach_score', target: 700, description: "Набрать 700 очков", current: 0},
      { type: 'collect', target: 12, description: "Собрать 12 звезд", current: 0 },
      { type: 'destroy', target: 5, description: "Уничтожить 5 астероидов", current: 0 }
    ],
    spawnSettings: { stars: 8, powerStars: 2, asteroids: 8, deathAsteroids: 1 }
  },
  3: {
    id: 3,
    name: "Звездный сборщик",
    description: "Соберите как можно больше звезд",
    background: "nebula",
    gameSpeed: 1.0,
    worldScale: 1.5,
    duration: 40,
    music: 'music_level8',
    difficulty: 'easy',
    objectives: [
      { type: 'collect', target: 20, description: "Собрать 20 звезд", current: 0 },
      { type: 'reach_score', target: 1000, description: "Набрать 1000 очков", current: 0 }
    ],
    spawnSettings: { stars: 10, powerStars: 2, asteroids: 10 }
  },
  4: {
    id: 4,
    name: "Расширяющаяся вселенная",
    description: "Мир становится больше",
    background: "deep_space", 
    gameSpeed: 1.0,
    worldScale: 1.5,
    duration: 40,
    music: 'music_level7',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 40, description: "Выжить 40 секунд", current: 0 },
      { type: 'collect', target: 140, description: "Собрать 140 звезд", current: 0 }
    ],
    spawnSettings: { stars: 19, powerStars: 2, asteroids: 7, deathAsteroids: 2  }
  },
  5: {
    id: 5,
    name: "Тренировка с POWER",
    description: "Освойте взрывную волну",
    background: "nebula",
    gameSpeed: 1.1,
    worldScale: 1.7,
    duration: 50,
    music: 'music_level6',
    difficulty: 'easy',
    objectives: [
      { type: 'destroy', target: 20, description: "Уничтожить 20 астероидов", current: 0 },
      { type: 'collect', target: 100, description: "Собрать 100 звезд", current: 0 }
    ],
    spawnSettings: { stars: 15, powerStars: 3, asteroids: 12 }
  },
  6: {
    id: 6, 
    name: "Скоростной полет",
    description: "Астероиды начинают двигаться быстрее",
    background: "deep_space",
    gameSpeed: 1.3,
    worldScale: 1.7,
    duration: 30,
    music: 'music_level5',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 30, description: "Выжить 30 секунд", current: 0 },
      { type: 'reach_score', target: 400, description: "Набрать 400 очков", current: 0 }
    ],
    spawnSettings: { stars: 7, powerStars: 2, asteroids: 9, deathAsteroids: 2  }
  },
  7: {
    id: 7,
    name: "Комбинированная задача",
    description: "Проверьте все навыки",
    background: "nebula",
    gameSpeed: 1.2,
    worldScale: 1.7,
    duration: 60,
    music: 'music_level4',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 60, description: "Выжить 60 секунд", current: 0 },
      { type: 'collect', target: 125, description: "Собрать 125 звезд", current: 0 },
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
    worldScale: 2.0,
    duration: 75,
    music: 'music_level3',
    difficulty: 'medium',
    objectives: [
      { type: 'survive', target: 75, description: "Выжить 75 секунд", current: 0 },
      { type: 'collect', target: 100, description: "Собрать 100 звезд", current: 0 },
      { type: 'reach_score', target: 2000, description: "Набрать 2000 очков", current: 0 },
      { type: 'destroy', target: 40, description: "Уничтожить 40 астероидов", current: 0 }
    ],
    spawnSettings: { stars: 15, powerStars: 6, asteroids: 14 }
  },
  9: {
    id: 9,
    name: "Космический марафон", 
    description: "Выносливость и стратегия",
    background: "asteroid_field",
    gameSpeed: 1.5,
    worldScale: 2.2,
    duration: 60,
    music: 'music_level2',
    difficulty: 'medium',
    objectives: [
      { type: 'survive', target: 60, description: "Выжить 60 секунд", current: 0 },
      { type: 'reach_score', target: 800, description: "Набрать 800 очков", current: 0 },
      { type: 'collect', target: 135, description: "Собрать 135 звезд", current: 0 }
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
    worldScale: 3.0,
    duration: 75,
    music: 'music_level1',
    difficulty: 'hard',
    objectives: [
      { type: 'reach_score', target: 3200, description: "Набрать 3200 очков", current: 0 },
      { type: 'collect', target: 140, description: "Собрать 140 звезд", current: 0 },
      { type: 'destroy', target: 145, description: "Уничтожить 145 астероидов", current: 0 }
    ],
    spawnSettings: { stars: 10, powerStars: 4, asteroids: 18 }
  }
};
