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
  difficulty: 'easy' | 'medium' | 'hard';
  music: string; 
  objectives: LevelObjective[];
  spawnSettings: {
    stars: number;
    powerStars: number;
    asteroids: number;
    enemySpawnRate?: number;
    deathAsteroids?: number;
  };
}
