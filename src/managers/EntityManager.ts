import { ENTITY_TYPES } from "../constants/gameConstants";
import { Asteroid } from "../game/objects/Asteroid";
import { Explosion } from "../game/objects/Explosion";
import { Particle } from "../game/objects/Particle";
import { PowerStar } from "../game/objects/PowerStar";
import { Star } from "../game/objects/Star";
import { EntityType, GameObject, Collectible } from "../game/types";

export class EntityManager {
  private entities: Map<EntityType, GameObject[]> = new Map();

  constructor() {
    Object.values(ENTITY_TYPES).forEach(type => {
      if (type !== ENTITY_TYPES.PLAYER) {
        this.entities.set(type, []);
      }
    });
  }

  // Базовые методы
  addEntity<T extends GameObject>(type: EntityType, entity: T): void {
    this.entities.get(type)!.push(entity);
  }

  removeEntity(type: EntityType, entity: GameObject): void {
    const entities = this.entities.get(type);
    if (entities) {
      const index = entities.indexOf(entity);
      if (index > -1) {
        entities.splice(index, 1);
      }
    }
  }

  clearEntities(type?: EntityType): void {
    if (type) {
      this.entities.set(type, []);
    } else {
      Object.values(ENTITY_TYPES).forEach(entityType => {
        if (entityType !== ENTITY_TYPES.PLAYER) {
          this.entities.set(entityType, []);
        }
      });
    }
  }

 updateStars(speed: number): void {
    this.stars.forEach(star => star.update(speed));
  }

  updatePowerStars(speed: number): void {
    this.powerStars.forEach(powerStar => powerStar.update(speed));
  }

  updateAsteroids(speed: number, worldWidth?: number, worldHeight?: number): void {
    const alive: Asteroid[] = [];
    this.asteroids.forEach(asteroid => {
      asteroid.update(speed, worldWidth, worldHeight);
      if (!(asteroid as any).markedForRemoval) alive.push(asteroid);
    });
    this.entities.set(ENTITY_TYPES.ASTEROIDS, alive);
  }

  updateParticles(speed: number): void {
    this.particles.forEach(particle => particle.update(speed));
  }

  updateExplosions(speed: number): void {
    this.explosions.forEach(explosion => explosion.update(speed));
  }

  updateAllWithIndividualSpeeds(
    asteroidSpeed: number,
    worldWidth?: number,
    worldHeight?: number
  ): void {
    this.updateStars(1.0);
    this.updatePowerStars(1.0);
    this.updateAsteroids(asteroidSpeed, worldWidth, worldHeight);
    this.updateParticles(1.0);
    this.updateExplosions(1.0);
  }

  get stars(): Star[] {
    return this.entities.get(ENTITY_TYPES.STARS) as Star[] || [];
  }

  get powerStars(): PowerStar[] {
    return this.entities.get(ENTITY_TYPES.POWER_STARS) as PowerStar[] || [];
  }

  get asteroids(): Asteroid[] {
    return this.entities.get(ENTITY_TYPES.ASTEROIDS) as Asteroid[] || [];
  }

  get particles(): Particle[] {
    return this.entities.get(ENTITY_TYPES.PARTICLES) as Particle[] || [];
  }

  get explosions(): Explosion[] {
    return this.entities.get(ENTITY_TYPES.EXPLOSIONS) as Explosion[] || [];
  }

  // Общие геттеры для групп
  get collectibles(): Collectible[] {
    return [...this.stars, ...this.powerStars];
  }

  get allEntities(): GameObject[] {
    return Array.from(this.entities.values()).flat();
  }

  updateEntities(deltaTime: number, worldWidth?: number, worldHeight?: number): void {
    this.entities.forEach((entities, type) => {
      entities.forEach(entity => {
        if (type === ENTITY_TYPES.ASTEROIDS) {
          (entity as Asteroid).update(deltaTime, worldWidth, worldHeight);
        } else {
          entity.update(deltaTime);
        }
      });
    });
  }

  renderEntities(ctx: CanvasRenderingContext2D): void {
    this.entities.forEach(entities => {
      entities.forEach(entity => entity.render(ctx));
    });
  }

  getCount(type: EntityType): number {
    return this.entities.get(type)?.length || 0;
  }

  get starCount(): number { return this.stars.length; }
  get powerStarCount(): number { return this.powerStars.length; }
  get asteroidCount(): number { return this.asteroids.length; }
  get particleCount(): number { return this.particles.length; }
  get explosionCount(): number { return this.explosions.length; }
}
