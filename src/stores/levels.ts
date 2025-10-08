export interface LevelObjective {
  type: 'survive' | 'collect' | 'destroy' | 'reach_score';
  target: number;
  description: string;
  current: number;
}

export interface LevelConfig {
  id: number;
  name: string;
  description: string;
  background: string;
  gameSpeed: number;
  worldScale: number;
  duration: number;
  music: string;
  difficulty: 'easy' | 'medium' | 'hard';
  objectives: LevelObjective[];
  spawnSettings: any;
}

// Используем массив вместо Record
export const levels: LevelConfig[] = [
  {
    id: 1,
    name: "Космический дебют",
    description: "Освойтесь в космосе",
    background: "deep_space",
    gameSpeed: 1.0,
    worldScale: 1.0,
    duration: 15,
    music: 'music_level10',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 15, description: "Выжить 15 секунд", current: 0 },
      { type: 'reach_score', target: 100, description: "Набрать 100 очков", current: 0},
      { type: 'collect', target: 5, description: "Собрать 5 звезд", current: 0 },
      { type: 'destroy', target: 1, description: "Уничтожить 1 астероид", current: 0 }
    ],
    spawnSettings: { stars: 15, powerStars: 3, asteroids: 20, armor: 10 }
  },
  {
    id: 2,
    name: "Первые астероиды", 
    description: "Научитесь избегать препятствия",
    background: "deep_space",
    gameSpeed: 1.1,
    worldScale: 1.1,
    duration: 30,
    music: 'music_level9',
    difficulty: 'easy',
    objectives: [
      { type: 'survive', target: 30, description: "Выжить 30 секунд", current: 0 },
      { type: 'collect', target: 12, description: "Собрать 12 звезд", current: 0 },
      { type: 'destroy', target: 5, description: "Уничтожить 5 астероидов", current: 0 }
    ],
    spawnSettings: { stars: 8, powerStars: 2, asteroids: 6, deathAsteroids: 1 }
  }
];

// Если нужен доступ по ID, создаем helper
export const getLevelById = (id: number): LevelConfig | undefined => {
  return levels.find(level => level.id === id);
};
