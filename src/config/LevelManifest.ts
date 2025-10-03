import { LevelConfig } from '../types/LevelTypes';

export const LevelManifest: Record<number, LevelConfig> = {
  1: {
    id: 1,
    name: "Космический дебют",
    description: "Освойтесь в космосе и соберите первые звезды",
    background: "deep_space",
    zoom: 1.0,
    gameSpeed: 1.0,
    worldScale: 1.0,
    duration: 60,
    difficulty: 'easy',
    objectives: [
      { 
        type: 'survive', 
        target: 60, 
        description: "Выжить 60 секунд",
        current: 0 
      },
      { 
        type: 'collect', 
        target: 15, 
        description: "Собрать 15 звезд", 
        current: 0 
      }
    ],
    spawnSettings: {
      stars: 8,
      powerStars: 2,
      asteroids: 6
    }
  },
  2: {
    id: 2,
    name: "Астероидный шторм", 
    description: "Больше астероидов - больше опасностей!",
    background: "asteroid_field",
    zoom: 1.2,
    gameSpeed: 1.2,
    worldScale: 1.3,
    duration: 75,
    difficulty: 'medium',
    objectives: [
      { 
        type: 'survive', 
        target: 75, 
        description: "Выжить 75 секунд",
        current: 0 
      },
      { 
        type: 'collect', 
        target: 25, 
        description: "Собрать 25 звезд",
        current: 0 
      },
      { 
        type: 'destroy', 
        target: 10, 
        description: "Уничтожить 10 астероидов",
        current: 0 
      }
    ],
    spawnSettings: {
      stars: 10,
      powerStars: 3,
      asteroids: 12
    }
  },
  3: {
    id: 3,
    name: "Звездный охотник",
    description: "Покажите свои навыки сбора ресурсов",
    background: "nebula",
    zoom: 1.5,
    gameSpeed: 1.4,
    worldScale: 1.8,
    duration: 90,
    difficulty: 'hard',
    objectives: [
      { 
        type: 'reach_score', 
        target: 1000, 
        description: "Набрать 1000 очков",
        current: 0 
      },
      { 
        type: 'collect', 
        target: 40, 
        description: "Собрать 40 звезд",
        current: 0 
      },
      { 
        type: 'destroy', 
        target: 20, 
        description: "Уничтожить 20 астероидов", 
        current: 0 
      }
    ],
    spawnSettings: {
      stars: 12,
      powerStars: 4,
      asteroids: 15
    }
  }
};
