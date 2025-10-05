import { ParticlePreset } from "../../systems/ParticleSystem";

export class AdvancedParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
  maxLife: number;
  preset: ParticlePreset;

  constructor(
    x: number, y: number, 
    vx: number, vy: number, 
    radius: number, color: string,
    life: number, preset: ParticlePreset
  ) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.preset = preset;
  }

  update(gameSpeed: number): void {
    this.x += this.vx * gameSpeed;
    this.y += this.vy * gameSpeed;
    
    // Гравитация
    if (this.preset.gravity) {
      this.vy += this.preset.gravity * gameSpeed;
    }
    
    this.life -= 0.016 * gameSpeed; // ~60 FPS
    
    // Уменьшение размера при fade
    if (this.preset.fade) {
      this.radius *= 0.98;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const alpha = this.preset.fade ? this.life / this.maxLife : 1;
    
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}
