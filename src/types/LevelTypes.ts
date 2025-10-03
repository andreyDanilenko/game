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
  zoom: number;
  gameSpeed: number;
  worldScale: number;
  duration: number; // секунды
  objectives: LevelObjective[];
  spawnSettings: {
    stars: number;
    powerStars: number;
    asteroids: number;
    enemySpawnRate?: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
}
