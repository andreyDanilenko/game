import { Player } from '../game/objects/Player';
import { EntityManager } from '../managers/EntityManager';
import { LevelSystem } from './LevelSystem';
import { SoundSystem } from './SoundSystem';

export class CollisionSystem {
  constructor(
    private entityManager: EntityManager,
    private levelSystem: LevelSystem,
    private soundSystem: SoundSystem
  ) {}

  checkCollisions(player: Player, onGameOver: () => void): { 
    score: number, 
    armor: number, 
    power: number 
  } {
    let score = 0;
    let armor = 0;
    let power = 0;

    this.checkStarCollisions(player, score);
    this.checkPowerStarCollisions(player, armor, power, score);
    this.checkAsteroidCollisions(player, onGameOver, score);

    return { score, armor, power };
  }

  private checkStarCollisions(player: Player, score: number): void {
    const stars = this.entityManager.stars;
    
    for (let i = stars.length - 1; i >= 0; i--) {
      const star = stars[i];
      const dx = star.x - player.x;
      const dy = star.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < player.radius + star.radius) {
        this.entityManager.removeEntity('stars', star);
        score += 10;
        this.soundSystem.playEffect('collect_star');
        this.levelSystem.updateObjectiveProgress('star_collected', 1);
        this.levelSystem.updateObjectiveProgress('score', 10);
      }
    }
  }

  private checkPowerStarCollisions(
    player: Player, 
    armor: number, 
    power: number, 
    score: number
  ): void {
    const powerStars = this.entityManager.powerStars;
    
    for (let i = powerStars.length - 1; i >= 0; i--) {
      const powerStar = powerStars[i];
      const dx = powerStar.x - player.x;
      const dy = powerStar.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < player.radius + powerStar.radius) {
        this.entityManager.removeEntity('powerStars', powerStar);
        armor += 1;
        power += 30;
        score += 25;
        this.levelSystem.updateObjectiveProgress('power_star_collected', 1);
        this.levelSystem.updateObjectiveProgress('score', 25);
      }
    }
  }

  private checkAsteroidCollisions(
    player: Player, 
    onGameOver: () => void, 
    _score: number
  ): void {
    const asteroids = this.entityManager.asteroids;
    
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroid = asteroids[i];
      const dx = asteroid.x - player.x;
      const dy = asteroid.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < player.radius + asteroid.radius) {
        if (player.armor > 0) {
          player.armor--;
          this.entityManager.removeEntity('asteroids', asteroid);
          this.levelSystem.updateObjectiveProgress('asteroid_destroyed', 1);
        } else {
          onGameOver();
          return;
        }
      }
    }
  }
}
