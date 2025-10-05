import { ENTITY_TYPES } from "../constants/gameConstants";

export interface GameObject {
  x: number;
  y: number;
  radius: number;
  update(gameSpeed: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}

export interface Collectible extends GameObject {
  type: 'star' | 'powerStar';
}

export interface ParticleObject extends GameObject {
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export type EntityType = typeof ENTITY_TYPES[keyof typeof ENTITY_TYPES];


export interface Destroyable extends GameObject {
  health: number;
  takeDamage(damage: number): void;
}
