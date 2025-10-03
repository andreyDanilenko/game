import { BaseObject } from './BaseObject';

export class Explosion extends BaseObject {
  maxRadius: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(x: number, y: number, radius: number, color: string) {
    super(x, y, radius);
    this.maxRadius = radius * 3;
    this.color = color;
    this.life = 30;
    this.maxLife = 30;
  }

  update(gameSpeed: number): void {
    console.log(gameSpeed);
  
    this.life--;
    this.radius += (this.maxRadius - this.radius) * 0.1;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.life <= 0) return;
    
    const alpha = this.life / this.maxLife;
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );
    gradient.addColorStop(0, `rgba(255, 102, 255, ${alpha * 0.8})`);
    gradient.addColorStop(1, `rgba(255, 102, 255, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
