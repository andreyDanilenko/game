import { LevelConfig, LevelObjective } from '../types/LevelTypes';
import { LevelManifest } from '../config/LevelManifest';

export class LevelSystem {
  private currentLevelId: number = 1;
  private currentLevel: LevelConfig;
  private objectivesProgress: Map<string, number> = new Map();
  
  private levelStats = {
    starsCollected: 0,
    asteroidsDestroyed: 0,
    powerStarsCollected: 0,
    score: 0,
    timeSurvived: 0
  };

  constructor() {
    this.currentLevel = LevelManifest[this.currentLevelId];
    this.initializeObjectives();
  }

  private initializeObjectives(): void {
    this.levelStats = {
      starsCollected: 0,
      asteroidsDestroyed: 0,
      powerStarsCollected: 0,
      score: 0,
      timeSurvived: 0
    };
    
    // Инициализируем прогресс целей
    this.currentLevel.objectives.forEach(obj => {
      this.objectivesProgress.set(this.getObjectiveKey(obj), 0);
    });
  }

  private getObjectiveKey(objective: LevelObjective): string {
    return `${objective.type}_${objective.target}`;
  }

  loadLevel(levelId: number): LevelConfig {
    if (!LevelManifest[levelId]) {
      throw new Error(`Level ${levelId} not found`);
    }

    this.currentLevelId = levelId;
    this.currentLevel = { ...LevelManifest[levelId] };
    this.initializeObjectives();
    
    return this.currentLevel;
  }

  getCurrentLevel(): LevelConfig {
    return this.currentLevel;
  }

  updateObjectiveProgress(type: string, value: number): void {
    switch(type) {
      case 'star_collected':
        this.levelStats.starsCollected += value;
        break;
      case 'asteroid_destroyed':
        this.levelStats.asteroidsDestroyed += value;
        break;
      case 'power_star_collected':
        this.levelStats.powerStarsCollected += value;
        break;
      case 'score':
        this.levelStats.score += value;
        break;
      case 'time':
        this.levelStats.timeSurvived += value;
        break;
    }

    this.updateObjectives();
  }

  private updateObjectives(): void {
    this.currentLevel.objectives.forEach(obj => {
      let current = 0;
      
      switch(obj.type) {
        case 'survive':
          current = this.levelStats.timeSurvived;
          break;
        case 'collect':
          current = this.levelStats.starsCollected;
          break;
        case 'destroy':
          current = this.levelStats.asteroidsDestroyed;
          break;
        case 'reach_score':
          current = this.levelStats.score;
          break;
      }
      
      obj.current = Math.min(current, obj.target);
    });
  }

  checkLevelCompletion(): { completed: boolean; objectives: LevelObjective[] } {
    const allCompleted = this.currentLevel.objectives.every(
      obj => obj.current >= obj.target
    );

    return {
      completed: allCompleted,
      objectives: this.currentLevel.objectives
    };
  }

  getLevelProgress(): number {
    const totalTarget = this.currentLevel.objectives.reduce(
      (sum, obj) => sum + obj.target, 0
    );
    const totalCurrent = this.currentLevel.objectives.reduce(
      (sum, obj) => sum + obj.current, 0
    );

    return totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
  }

  getLevelStats() {
    return { ...this.levelStats };
  }

  hasNextLevel(): boolean {
    return !!LevelManifest[this.currentLevelId + 1];
  }

  getNextLevel(): LevelConfig | null {
    return LevelManifest[this.currentLevelId + 1] || null;
  }
}
