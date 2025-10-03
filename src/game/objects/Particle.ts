import { BaseObject } from './BaseObject';
import type { ParticleObject } from '../types';

export class Particle extends BaseObject implements ParticleObject {
  vx: number;
  vy: number;
  life: number;
  color: string;

  constructor(x: number, y: number, vx: number, vy: number, radius: number, color: string) {
    super(x, y, radius);
    this.vx = vx;
    this.vy = vy;
    this.life = 40;
    this.color = color;
  }

  update(gameSpeed: number): void {
    this.x += this.vx * gameSpeed;
    this.y += this.vy * gameSpeed;
    this.life--;
    this.vy += 0.1 * gameSpeed;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.life <= 0) return;
    
    ctx.globalAlpha = this.life / 40;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
