import { Asteroid } from '../game/objects/Asteroid';
import { PowerStar } from '../game/objects/PowerStar';
import { Star } from '../game/objects/Star';
import { EntityManager } from '../managers/EntityManager';
import { WorldSystem } from './WorldSystem';


export class SpawnSystem {
  constructor(
    private entityManager: EntityManager,
    private worldSystem: WorldSystem
  ) {}

  spawnLevelObjects(spawnSettings: any): void {
    this.entityManager.clearEntities('stars');
    this.entityManager.clearEntities('powerStars');
    this.entityManager.clearEntities('asteroids');

    for (let i = 0; i < spawnSettings.stars; i++) this.createStar();
    for (let i = 0; i < spawnSettings.powerStars; i++) this.createPowerStar();
    for (let i = 0; i < spawnSettings.asteroids; i++) this.createAsteroid();
  }

  private createStar(): void {
    const spawnArea = this.worldSystem.getSpawnArea();
    const x = Math.random() * (spawnArea.width - 200) + 100;
    const y = Math.random() * (spawnArea.height - 200) + 100;
    const r = Math.random() * 8 + 4;
    this.entityManager.addEntity('stars', new Star(x, y, r));
  }

  private createPowerStar(): void {
    const spawnArea = this.worldSystem.getSpawnArea();
    const x = Math.random() * (spawnArea.width - 200) + 100;
    const y = Math.random() * (spawnArea.height - 200) + 100;
    const r = Math.random() * 10 + 6;
    this.entityManager.addEntity('powerStars', new PowerStar(x, y, r));
  }

  private createAsteroid(): void {
    const spawnArea = this.worldSystem.getSpawnArea();
    const size = Math.random() * 25 + 15;
    const x = Math.random() * (spawnArea.width - size * 4) + size * 2;
    const y = Math.random() * (spawnArea.height - size * 4) + size * 2;
    
    const baseSpeed = (Math.random() * 2 + 1);
    const angle = Math.random() * Math.PI * 2;
    
    const asteroid = new Asteroid(
      x, y, size, 
      Math.cos(angle) * baseSpeed, 
      Math.sin(angle) * baseSpeed
    );
    
    this.entityManager.addEntity('asteroids', asteroid);
  }
}
