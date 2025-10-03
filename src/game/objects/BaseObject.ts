import type { GameObject } from '../types';

export abstract class BaseObject implements GameObject {
  x: number;
  y: number;
  radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  abstract update(gameSpeed: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}
